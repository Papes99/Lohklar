#!/usr/bin/env node
/**
 * Concurrent official-page scrape: tel/mailto, room hints, clinic-local header image.
 * Writes src/lib/domain/_fill/official-scrape.json incrementally. Never invents.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const UA = "LohklarCatalogBot/1.0 (orientation tool; public facts only)";
const OUT = "src/lib/domain/_fill/official-scrape.json";
const CONCURRENCY = 8;

const ROOM_HINTS = [
  [/ausschlie(?:ss|ß)lich\s+(?:in\s+)?einzelzimmer/i, "einbett"],
  [/nur\s+einzelzimmer/i, "einbett"],
  [/alle\s+(?:patienten)?zimmer\s+sind\s+einzelzimmer/i, "einbett"],
  [/einzelzimmer\s+als\s+regelfall/i, "einbett"],
  [/regelversorgung[:\s]+einzelzimmer/i, "einbett"],
  [/unterbringung\s+erfolgt\s+in\s+einzelzimmer/i, "einbett"],
  [/jedes\s+(?:zimmer\s+ist\s+ein\s+)?einzelzimmer/i, "einbett"],
  [/freuen\s+sie\s+sich\s+auf\s+ihr\s+einzelzimmer/i, "einbett"],
  [/\d{2,3}\s+einzelzimmer(?![^.]{0,40}zwei)/i, "einbett-mehrheit"],
  [/überwiegend\s+einzelzimmer/i, "einbett-mehrheit"],
  [/haupts[äa]chlich\s+einzelzimmer/i, "einbett-mehrheit"],
  [/mehrheitlich\s+einzelzimmer/i, "einbett-mehrheit"],
  [/standard(?:m[aä](?:ss|ß)ig)?\s+einzelzimmer/i, "einbett"],
  [/zweibettzimmer\s+als\s+regel/i, "zweibett"],
  [/unterbringung\s+in\s+(?:modernen\s+)?doppelzimmer/i, "zweibett"],
  [/unterbringung\s+in\s+(?:modernen\s+)?zweibettzimmer/i, "zweibett"],
  [/ausschlie(?:ss|ß)lich\s+zweibett/i, "kein-einbett"],
];

function houses() {
  const extra = JSON.parse(readFileSync("/tmp/clinic-fill/extra.json", "utf8"));
  const core = JSON.parse(readFileSync("/tmp/clinic-fill/core.json", "utf8"));
  return [...core, ...extra].map((h) => ({ id: h.id, web: h.web, name: h.name }));
}

function absUrl(base, href) {
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
}

function sameSite(pageUrl, imgUrl) {
  try {
    const a = new URL(pageUrl);
    const b = new URL(imgUrl);
    const ah = a.hostname.replace(/^www\./, "");
    const bh = b.hostname.replace(/^www\./, "");
    return bh === ah || bh.endsWith("." + ah) || ah.endsWith("." + bh);
  } catch {
    return false;
  }
}

function cleanPhone(raw) {
  if (!raw) return null;
  let s = String(raw).replace(/\s+/g, " ").trim();
  s = s.replace(/[).,;]+$/, "");
  if (s.startsWith("00 ") || s.startsWith("0 0 ")) s = "0" + s.replace(/^0\s*0\s*/, " ");
  if (s.startsWith("+49")) s = "0" + s.slice(3).replace(/^[\s-]/, "");
  s = s.replace(/[()]/g, " ").replace(/\s+/g, " ").trim();
  let d = s.replace(/\D/g, "");
  if (d.startsWith("00") && d.length > 10) d = d.slice(1);
  if (d.startsWith("49") && d.length >= 11) {
    s = "0" + s.replace(/^(\+?49|0?49)/, "").replace(/^[\s-]/, "");
    d = s.replace(/\D/g, "");
    if (!d.startsWith("0")) d = "0" + d;
  }
  if (!d.startsWith("0") || d.length < 8 || d.length > 13) return null;
  return s.replace(/\s+/g, " ").trim();
}

function pickPhone(html, text) {
  const visible = [];
  for (const m of html.matchAll(/href=["']tel:([^"']+)["'][^>]*>([\s\S]{0,80}?)<\/a>/gi)) {
    const inner = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    visible.push(cleanPhone(inner) || cleanPhone(decodeURIComponent(m[1])));
  }
  for (const m of html.matchAll(/href=["']tel:([^"']+)["']/gi)) {
    visible.push(cleanPhone(decodeURIComponent(m[1])));
  }
  for (const m of html.matchAll(/"telephone"\s*:\s*"([^"]+)"/gi)) {
    visible.push(cleanPhone(m[1]));
  }
  const first = visible.find(Boolean);
  if (first) return first;
  const re =
    /(?:Tel(?:efon)?|Fon|Klinikkontakt|Zentrale)[^0-9+]{0,24}(\+49[\d\s/().-]{8,22}|\(?0\d{2,5}\)?[\s/-][\d\s/-]{5,16})/gi;
  for (const m of text.matchAll(re)) {
    const p = cleanPhone(m[1]);
    if (p) return p;
  }
  return null;
}

function pickEmail(html, text, pageUrl) {
  const found = [];
  for (const m of html.matchAll(/mailto:([^"'?\s]+)/gi)) {
    found.push(decodeURIComponent(m[1]).toLowerCase());
  }
  for (const m of html.matchAll(/"email"\s*:\s*"([^"]+)"/gi)) {
    found.push(m[1].toLowerCase());
  }
  const extras = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [];
  for (const e of extras) found.push(e.toLowerCase());
  const host = (() => {
    try {
      return new URL(pageUrl).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  })();
  const clean = [...new Set(found)].filter(
    (e) =>
      e.includes("@") &&
      !e.endsWith(".png") &&
      !e.endsWith(".jpg") &&
      !e.includes("example") &&
      !e.includes("wixpress") &&
      !e.includes("sentry") &&
      !e.startsWith("noreply") &&
      !e.startsWith("privacy") &&
      !e.includes("schema.org"),
  );
  const domainHit = clean.find((e) => host && e.endsWith(host.split(".").slice(-2).join(".")));
  const kontakt = clean.find((e) => /kontakt|info|aufnahme|reha|klinik|fachklinik/.test(e));
  return domainHit || kontakt || clean[0] || null;
}

function pickRoom(text) {
  for (const [re, kind] of ROOM_HINTS) {
    if (re.test(text)) return kind;
  }
  return null;
}

function pickPhoto(html, pageUrl) {
  const cands = [];
  const push = (href, score) => {
    const abs = absUrl(pageUrl, href);
    if (!abs || !/^https?:/i.test(abs)) return;
    const low = abs.toLowerCase();
    if (!/\.(jpe?g|png|webp)(\?|$)/i.test(low) && !/\/dam\/|\/fileadmin\/|\/wp-content\/uploads\//.test(low))
      return;
    if (/(logo|favicon|sprite|icon-|siegel|badge|tracking|placeholder|dummy|avatar)/.test(low)) return;
    cands.push({ url: abs, score });
  };
  for (const m of html.matchAll(/property=["']og:image["'][^>]*content=["']([^"']+)/gi)) push(m[1], 40);
  for (const m of html.matchAll(/content=["']([^"']+)["'][^>]*property=["']og:image/gi)) push(m[1], 40);
  for (const m of html.matchAll(/<img[^>]+src=["']([^"']+)/gi)) {
    const src = m[1];
    const tag = m[0].toLowerCase();
    let score = 10;
    if (/header|hero|aussen|außen|luftbild|klinikgebaeude|klinikgebäude|titel|startseite/.test(src.toLowerCase() + tag))
      score += 50;
    if (/lokale_dateien|klinikbilder|fileadmin/.test(src)) score += 15;
    if (/team|blog|news|icon|logo/.test(src.toLowerCase())) score -= 40;
    push(src, score);
  }
  cands.sort((a, b) => b.score - a.score);
  const local = cands.find((c) => sameSite(pageUrl, c.url) && c.score >= 20);
  return (local || cands.find((c) => c.score >= 50) || null)?.url ?? null;
}

function wohnenLinks(html, pageUrl) {
  const out = [];
  for (const m of html.matchAll(/href=["']([^"']+)["']/gi)) {
    const abs = absUrl(pageUrl, m[1]);
    if (!abs) continue;
    if (!sameSite(pageUrl, abs)) continue;
    const low = abs.toLowerCase();
    if (/(wohnen|zimmer|unterkunft|ausstattung|aufenthalt|leben-und-wohnen)/.test(low)) out.push(abs);
  }
  return [...new Set(out)].slice(0, 2);
}

async function fetchPage(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 14000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml" },
    });
    if (!res.ok) return { url, status: res.status, html: "", text: "" };
    const html = (await res.text()).slice(0, 350000);
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&/g, "&")
      .replace(/\s+/g, " ");
    return { url: res.url || url, status: res.status, html, text };
  } catch (err) {
    return { url, status: 0, html: "", text: "", error: String(err) };
  } finally {
    clearTimeout(t);
  }
}

function extraUrls(web) {
  const base = web.replace(/\/$/, "");
  return [
    `${base}/impressum/`,
    `${base}/impressum`,
    `${base}/kontakt/`,
    `${base}/kontakt`,
    `${base}/kontakt-anfahrt/`,
    `${base}/ueber-uns/kontakt-und-anfahrt/`,
  ];
}

async function scrapeHouse(house) {
  let phone = null;
  let email = null;
  let room = null;
  let photoUrl = null;
  let source = house.web;
  const pages = [];
  const home = await fetchPage(house.web);
  pages.push(home);
  const harvest = (page) => {
    if (!page.text && !page.html) return;
    phone = phone || pickPhone(page.html, page.text);
    email = email || pickEmail(page.html, page.text, page.url);
    room = room || pickRoom(page.text);
    photoUrl = photoUrl || pickPhoto(page.html, page.url);
    source = page.url;
  };
  harvest(home);
  const next = [];
  if (!phone || !email) next.push(...extraUrls(house.web));
  if (!room) next.push(...wohnenLinks(home.html, home.url || house.web));
  const uniq = [...new Set(next)].filter((u) => u !== house.web).slice(0, 4);
  for (const url of uniq) {
    if (phone && email && room && photoUrl) break;
    const page = await fetchPage(url);
    harvest(page);
  }
  return {
    id: house.id,
    phone,
    email,
    room,
    photoUrl,
    source,
    note: "official-scrape",
  };
}

mkdirSync("src/lib/domain/_fill", { recursive: true });
const list = houses();
const out = [];
let i = 0;
async function worker() {
  while (true) {
    const idx = i++;
    if (idx >= list.length) return;
    const house = list[idx];
    try {
      const row = await scrapeHouse(house);
      out.push(row);
      process.stdout.write(
        `${row.id}  tel=${row.phone ?? "—"}  mail=${row.email ?? "—"}  room=${row.room ?? "—"}  photo=${row.photoUrl ? "yes" : "—"}\n`,
      );
    } catch (err) {
      out.push({ id: house.id, phone: null, email: null, room: null, photoUrl: null, note: String(err) });
      process.stdout.write(`${house.id}  ERROR ${err}\n`);
    }
    if (out.length % 10 === 0) writeFileSync(OUT, JSON.stringify(out, null, 2));
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
writeFileSync(OUT, JSON.stringify(out, null, 2));
const tel = out.filter((r) => r.phone).length;
const mail = out.filter((r) => r.email).length;
const room = out.filter((r) => r.room).length;
const photo = out.filter((r) => r.photoUrl).length;
console.log(`DONE ${out.length}  phone ${tel}  email ${mail}  room ${room}  photo ${photo}`);

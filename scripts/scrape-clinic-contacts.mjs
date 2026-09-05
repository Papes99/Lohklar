#!/usr/bin/env node
/**
 * Fetch official clinic pages and extract published phone/email. Never invent.
 */
import { readFileSync, writeFileSync } from "node:fs";

const extra = JSON.parse(readFileSync("artifacts/clinic-fill/extra.json", "utf8"));
const core = JSON.parse(readFileSync("artifacts/clinic-fill/core.json", "utf8"));
const houses = [...core, ...extra];

const PHONE_RE = /(?:Tel(?:efon)?|Fon|Phone|Klinikkontakt|Zentrale)[^0-9+]{0,24}(\+49[\d\s\/().-]{8,20}|\(?0\d{2,5}\)?[\s\/-][\d\s\/-]{5,16})/gi;
const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const ROOM_HINTS = [
  [/ausschlie(?:ss|ß)lich\s+einzelzimmer/i, "einbett"],
  [/alle\s+zimmer\s+sind\s+einzelzimmer/i, "einbett"],
  [/einzelzimmer\s+als\s+regelfall/i, "einbett"],
  [/ausschlie(?:ss|ß)lich\s+einbett/i, "einbett"],
  [/\d+\s+einzelzimmer/i, "einbett-mehrheit"],
  [/überwiegend\s+einzelzimmer/i, "einbett-mehrheit"],
  [/hauptsächlich\s+einzelzimmer/i, "einbett-mehrheit"],
  [/zweibettzimmer\s+als\s+regel/i, "zweibett"],
  [/unterbringung\s+in\s+doppelzimmer/i, "zweibett"],
];

function cleanPhone(raw) {
  let s = raw.replace(/\s+/g, " ").trim();
  s = s.replace(/[).,;]+$/, "");
  if (s.startsWith("+49")) s = "0" + s.slice(3).replace(/^[\s-]/, "");
  s = s.replace(/[()]/g, " ").replace(/\s+/g, " ").trim();
  const digits = s.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return null;
  return s;
}

function pickPhone(text) {
  const found = [];
  for (const m of text.matchAll(PHONE_RE)) {
    const p = cleanPhone(m[1]);
    if (p) found.push(p);
  }
  return found[0] ?? null;
}

function pickEmail(text, url) {
  const host = (() => {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  })();
  const emails = [...new Set((text.match(EMAIL_RE) || []).map((e) => e.toLowerCase()))].filter(
    (e) =>
      !e.endsWith(".png") &&
      !e.endsWith(".jpg") &&
      !e.includes("example") &&
      !e.includes("wixpress") &&
      !e.includes("sentry") &&
      !e.startsWith("noreply"),
  );
  const domainHit = emails.find((e) => host && e.endsWith(host.split(".").slice(-2).join(".")));
  return domainHit ?? emails[0] ?? null;
}

function pickRoom(text) {
  for (const [re, kind] of ROOM_HINTS) {
    if (re.test(text)) return kind;
  }
  return null;
}

async function fetchText(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "user-agent": "LohklarCatalogBot/1.0 (orientation tool; public facts only)" },
    });
    if (!res.ok) return { status: res.status, text: "" };
    const html = await res.text();
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&/g, "&");
    return { status: res.status, text: text.slice(0, 120000), html: html.slice(0, 200000) };
  } catch (err) {
    return { status: 0, text: "", error: String(err) };
  } finally {
    clearTimeout(t);
  }
}

function contactUrls(web) {
  const base = web.replace(/\/$/, "");
  return [
    web,
    `${base}/kontakt/`,
    `${base}/kontakt`,
    `${base}/ueber-uns/kontakt-und-anfahrt/`,
    `${base}/impressum/`,
    `${base}/impressum`,
  ];
}

const out = [];
for (const house of houses) {
  if (!house.needPhone && !house.needEmail && !house.needRoom) continue;
  let phone = null;
  let email = null;
  let room = null;
  let source = house.web;
  for (const url of contactUrls(house.web)) {
    const page = await fetchText(url);
    if (!page.text) continue;
    phone = phone || pickPhone(page.text);
    email = email || pickEmail(page.text, house.web);
    room = room || pickRoom(page.text);
    source = url;
    if (phone && email && room) break;
  }
  out.push({
    id: house.id,
    phone,
    email,
    room,
    source,
    note: "scrape",
  });
  process.stdout.write(`${house.id}  tel=${phone ?? "—"}  mail=${email ?? "—"}  room=${room ?? "—"}\n`);
}

writeFileSync("artifacts/clinic-fill/scrape.json", JSON.stringify(out, null, 2));
const tel = out.filter((r) => r.phone).length;
const mail = out.filter((r) => r.email).length;
const room = out.filter((r) => r.room).length;
console.log(`DONE ${out.length}  phone ${tel}  email ${mail}  room ${room}`);

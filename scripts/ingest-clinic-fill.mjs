#!/usr/bin/env node
/**
 * Merge fill JSON → katalog houses + official cover photos.
 * Never invents phone/email/room/photo. Does not overwrite a present value.
 */
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  existsSync,
  statSync,
} from "node:fs";

const ROOM = new Set(["einbett", "einbett-mehrheit", "zweibett", "zweibett-plus", "kein-einbett"]);
const UA = "LohklarCatalogBot/1.0 (orientation tool; public facts only)";
const MISSING = /angabe liegt nicht vor/i;

function cleanPhone(raw) {
  if (!raw) return null;
  let s = String(raw)
    .replace(/"?/g, "")
    .replace(/tel:\s*/i, "")
    .replace(/Zentrale.*/i, "")
    .replace(/·/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  s = s.replace(/^0?\s*Tel:?\s*/i, "");
  s = s.replace(/[).,;]+$/, "");
  if (s.startsWith("00 ") || s.startsWith("0 0 ")) s = "0" + s.replace(/^0\s*0\s*/, " ");
  if (s.startsWith("+49")) s = "0" + s.slice(3).replace(/^[\s-]/, "");
  if (s.startsWith("0049")) s = "0" + s.slice(4).replace(/^[\s-]/, "");
  s = s.replace(/[()]/g, " ").replace(/\s+/g, " ").trim();
  let d = s.replace(/\D/g, "");
  if (d.startsWith("00") && d.length > 10) d = d.slice(1);
  if (d.startsWith("49") && d.length >= 11) {
    d = "0" + d.slice(2);
    s = "0" + s.replace(/^\+?0?49[\s-]*/, "");
  }
  if (!d.startsWith("0")) d = d.length >= 8 ? "0" + d : d;
  if (!d.startsWith("0") || d.length < 8 || d.length > 13) return null;
  if (/^0*123456/.test(d) || /^0*111111/.test(d) || /^0800/.test(d)) return null;
  if (s.startsWith("+49")) s = "0" + s.slice(3).replace(/^[\s-]/, "");
  if (s.startsWith("0 0 ")) s = "0" + s.slice(4);
  return s.replace(/\s+/g, " ").trim();
}

function junkEmail(e) {
  if (!e || !e.includes("@")) return true;
  const low = e.toLowerCase();
  return (
    /karriere|bewerbung|jobs@|datenschutz|medizinprodukt|sentry|noreply|privacy|schema\.org|wixpress|example|veranstaltungen@|redaktion@/.test(
      low,
    ) || low.endsWith(".png") || low.endsWith(".jpg")
  );
}

function loadFills() {
  const dirs = ["src/lib/domain/_fill", "artifacts/clinic-fill", "/tmp/clinic-fill"];
  const byId = new Map();
  const names = [];
  for (const dir of dirs) {
    let list = [];
    try {
      list = readdirSync(dir);
    } catch {
      continue;
    }
    for (const name of list) {
      if (!name.endsWith(".json")) continue;
      if (name.includes("-ids")) continue;
      if (name === "extra.json" || name === "core.json" || name === "batch-core.json") continue;
      const trusted = /^batch-\d+\.json$/.test(name) || name === "batch-core-out.json";
      names.push({ path: `${dir}/${name}`, trusted, name });
    }
  }
  names.sort((a, b) => Number(b.trusted) - Number(a.trusted) || a.name.localeCompare(b.name));
  for (const { path, trusted } of names) {
    let data;
    try {
      data = JSON.parse(readFileSync(path, "utf8"));
    } catch {
      continue;
    }
    const rows = Array.isArray(data) ? data : [data];
    for (const row of rows) {
      if (!row?.id) continue;
      const prev = byId.get(row.id) ?? { id: row.id };
      const phone = cleanPhone(row.phone);
      const email = row.email && !junkEmail(String(row.email)) ? String(row.email).toLowerCase().trim() : null;
      const room = row.room && ROOM.has(row.room) ? row.room : null;
      const photoUrl = row.photoUrl || null;
      if (trusted) {
        byId.set(row.id, {
          id: row.id,
          phone: phone || prev.phone || null,
          email: email || prev.email || null,
          room: room || prev.room || null,
          photoUrl: photoUrl || prev.photoUrl || null,
        });
      } else {
        byId.set(row.id, {
          id: row.id,
          phone: prev.phone || phone || null,
          email: prev.email || email || null,
          room: prev.room || room || null,
          photoUrl: prev.photoUrl || photoUrl || null,
        });
      }
    }
  }
  return byId;
}

function fieldMissing(block, key) {
  const m = block.match(new RegExp(`${key}:\\s*(NA|"[^"]*")`));
  if (!m) return true;
  const val = m[1] === "NA" ? "Angabe liegt nicht vor" : m[1].slice(1, -1);
  if (key === "room") return val === "unbekannt";
  return MISSING.test(val) || val.trim() === "";
}

function patchBlock(block, fill) {
  let next = block;
  if (fill.phone && fieldMissing(block, "phone")) {
    next = next.replace(/phone:\s*(?:NA|"[^"]*")/, `phone: ${JSON.stringify(fill.phone)}`);
    next = next.replace(/Telefon: Angabe liegt nicht vor\./g, `Telefon: ${fill.phone}.`);
  }
  if (fill.email && fieldMissing(block, "email")) {
    next = next.replace(/email:\s*(?:NA|"[^"]*")/, `email: ${JSON.stringify(fill.email)}`);
  }
  if (fill.room && ROOM.has(fill.room) && fieldMissing(block, "room")) {
    next = next.replace(/room:\s*"[^"]*"/, `room: ${JSON.stringify(fill.room)}`);
  }
  return next;
}

function patchFile(path, fills) {
  let src = readFileSync(path, "utf8");
  let applied = 0;
  for (const [id, fill] of fills) {
    const re = new RegExp(`(\\{\\s*id:\\s*"${id}"[\\s\\S]*?\\n  \\},)`, "m");
    const m = src.match(re);
    if (!m) continue;
    const patched = patchBlock(m[1], fill);
    if (patched !== m[1]) {
      src = src.replace(m[1], patched);
      applied += 1;
    }
  }
  writeFileSync(path, src);
  return applied;
}

function isImage(buf) {
  if (buf.length < 24) return false;
  if (buf[0] === 0xff && buf[1] === 0xd8) return true;
  if (buf[0] === 0x89 && buf[1] === 0x50) return true;
  if (buf.slice(0, 4).toString() === "RIFF" && buf.slice(8, 12).toString() === "WEBP") return true;
  return false;
}

async function downloadPhoto(id, url) {
  if (!url || !/^https?:\/\//i.test(url)) return false;
  const low = url.toLowerCase();
  if (/(logo|favicon|sprite|icon-|icons\/|siegel|badge|pixel|1x1|tracking|focus-siegel)/.test(low)) return false;
  const dir = `public/clinics/${id}`;
  mkdirSync(dir, { recursive: true });
  const dest = `${dir}/aussen.jpg`;
  if (existsSync(dest) && statSync(dest).size > 12000) return true;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 18000);
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "user-agent": UA, accept: "image/*,*/*;q=0.8" },
    });
    clearTimeout(t);
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 12000 || buf.length > 8_000_000) return false;
    if (!isImage(buf)) return false;
    writeFileSync(dest, buf);
    return true;
  } catch {
    return false;
  }
}

function patchPhotoUnique(ids) {
  const path = "src/lib/domain/katalog.ts";
  let src = readFileSync(path, "utf8");
  const start = src.indexOf("const PHOTO_UNIQUE");
  const end = src.indexOf("};", start);
  if (start < 0 || end < 0) throw new Error("PHOTO_UNIQUE not found");
  const block = src.slice(start, end + 2);
  const added = [];
  let insert = "";
  for (const id of ids) {
    if (block.includes(`"${id}"`)) continue;
    insert += `  "${id}": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],\n`;
    added.push(id);
  }
  if (!insert) return added;
  src = src.slice(0, end) + insert + src.slice(end);
  writeFileSync(path, src);
  return added;
}

mkdirSync("src/lib/domain/_fill", { recursive: true });
const fills = loadFills();
console.log("fills loaded", fills.size);

const extra = patchFile("src/lib/domain/katalog-houses-extra.ts", fills);
const core = patchFile("src/lib/domain/katalog-houses.ts", fills);
console.log("applied extra", extra, "core", core);

const photoIds = [];
for (const [id, fill] of fills) {
  if (!fill.photoUrl) continue;
  const ok = await downloadPhoto(id, fill.photoUrl);
  if (ok) photoIds.push(id);
  else process.stdout.write(`SKIP ${id}\n`);
}
const unique = patchPhotoUnique(photoIds);
console.log("photos ok", photoIds.length, "PHOTO_UNIQUE +", unique.length);

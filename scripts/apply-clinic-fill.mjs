#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";

const NA = "Angabe liegt nicht vor";
const ROOM = new Set(["einbett", "einbett-mehrheit", "zweibett", "zweibett-plus", "kein-einbett"]);

function junkPhone(p) {
  if (!p) return true;
  const d = String(p).replace(/\D/g, "");
  if (d.length < 8 || d.length > 15) return true;
  if (String(p).startsWith("0 0 ")) return true;
  if (d.startsWith("00") && !String(p).includes("+")) return true;
  return false;
}

function loadFills() {
  const dirs = ["src/lib/domain/_fill", "artifacts/clinic-fill", "/tmp/clinic-fill"];
  const byId = new Map();
  for (const dir of dirs) {
    let names = [];
    try {
      names = readdirSync(dir);
    } catch {
      continue;
    }
    for (const name of names) {
      if (!name.endsWith(".json")) continue;
      if (name.includes("-ids")) continue;
      if (name === "extra.json" || name === "core.json" || name === "batch-core.json") continue;
      let data;
      try {
        data = JSON.parse(readFileSync(`${dir}/${name}`, "utf8"));
      } catch {
        continue;
      }
      const rows = Array.isArray(data) ? data : [data];
      for (const row of rows) {
        if (!row?.id) continue;
        const prev = byId.get(row.id) ?? {};
        byId.set(row.id, {
          id: row.id,
          phone: row.phone || prev.phone || null,
          email: row.email || prev.email || null,
          room: row.room && ROOM.has(row.room) ? row.room : prev.room || null,
          photoUrl: row.photoUrl || prev.photoUrl || null,
        });
      }
    }
  }
  return byId;
}

function patchBlock(block, fill) {
  let next = block;
  if (fill.phone && !junkPhone(fill.phone)) {
    next = next.replace(/phone:\s*(?:NA|"[^"]*")/, `phone: ${JSON.stringify(fill.phone)}`);
  }
  if (fill.email && fill.email.includes("@")) {
    next = next.replace(/email:\s*(?:NA|"[^"]*")/, `email: ${JSON.stringify(fill.email)}`);
  }
  if (fill.room && ROOM.has(fill.room)) {
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

mkdirSync("src/lib/domain/_fill", { recursive: true });
const fills = loadFills();
console.log("fills loaded", fills.size);
const extra = patchFile("src/lib/domain/katalog-houses-extra.ts", fills);
const core = patchFile("src/lib/domain/katalog-houses.ts", fills);
console.log("applied extra", extra, "core", core);

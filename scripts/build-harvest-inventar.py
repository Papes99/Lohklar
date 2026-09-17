#!/usr/bin/env python3
"""Write docs/harvest-inventar.md: every catalog house unique photos or skip reason."""
from __future__ import annotations

import hashlib
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CLINICS = ROOT / "public/clinics"
OUT = ROOT / "docs/harvest-inventar.md"
HARVEST = ROOT / "src/lib/domain/_fill/photo-harvest.json"
FILE_CAPTION = {
    "aussen.jpg": "Eingang",
    "zimmer.jpg": "Zimmer",
    "bad.jpg": "Bad",
    "umgebung.jpg": "Gelände",
    "speiseraum.jpg": "Speisesaal",
    "besonderheit.jpg": "Halle",
    "adaption.jpg": "Adaption",
    "blaues-haus.jpg": "Halle",
}


def unique_files(hid: str) -> list[str]:
    d = CLINICS / hid
    if not d.is_dir():
        return []
    seen = set()
    names = []
    for p in sorted(d.glob("*.jpg"), key=lambda x: (0 if x.name == "aussen.jpg" else 1, x.name)):
        h = hashlib.sha256(p.read_bytes()).hexdigest()
        if h in seen:
            continue
        seen.add(h)
        names.append(p.name)
    return names[:5]


def main() -> None:
    webs = json.loads(Path("/tmp/houses-web.json").read_text())
    skip_by_id: dict[str, str] = {}
    sources: dict[str, list[dict]] = {}
    if HARVEST.exists():
        data = json.loads(HARVEST.read_text())
        if isinstance(data, list):
            for row in data:
                hid = row.get("id")
                if not hid:
                    continue
                if row.get("skipped"):
                    skip_by_id[hid] = row["skipped"]
                if row.get("added"):
                    sources.setdefault(hid, []).extend(row["added"])

    rows = []
    hist = Counter()
    extras = 0
    skipped = 0
    for hid in sorted(webs):
        files = unique_files(hid)
        n = len(files)
        hist[n] += 1
        caps = ", ".join(FILE_CAPTION.get(f, f) for f in files) or "—"
        if n <= 1:
            reason = skip_by_id.get(hid) or "kein Beleg auf offizieller Klinik-/Träger-Seite"
            status = f"übersprungen: {reason}"
            skipped += 1
        else:
            status = "ok"
            extras += 1
        src = webs.get(hid, "")
        rows.append((hid, n, caps, status, src))

    lines = [
        "# Harvest-Inventar Kliniken",
        "",
        "Stand nach offiziellem Klinik-/Träger-Harvest. Max. 5 Motive/Haus, SHA-Dedup, Ein-Wort-Captions.",
        "",
        f"- Katalog: **{len(webs)}** Häuser",
        f"- Mit Zusatzmotiven (2–5 unique): **{extras}**",
        f"- Titel-only / übersprungen: **{skipped}**",
        f"- Unique-Histogramm: `{dict(sorted(hist.items()))}`",
        "",
        "| ID | Unique | Captions | Status | Quelle |",
        "| --- | ---: | --- | --- | --- |",
    ]
    for hid, n, caps, status, src in rows:
        src_md = src.replace("|", "\\|")
        lines.append(f"| `{hid}` | {n} | {caps} | {status} | {src_md} |")
    lines.append("")
    OUT.write_text("\n".join(lines) + "\n")
    print({"houses": len(webs), "extras": extras, "skipped": skipped, "hist": dict(sorted(hist.items()))})
    print("wrote", OUT)


if __name__ == "__main__":
    main()

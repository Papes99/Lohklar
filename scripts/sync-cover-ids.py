#!/usr/bin/env python3
"""Emit COVER_PHOTO_IDS from public/clinics/*/aussen.jpg."""
from pathlib import Path

root = Path(__file__).resolve().parents[1]
clinics = root / "public/clinics"
ids = sorted(
    p.parent.name
    for p in clinics.glob("ck-*/aussen.jpg")
    if p.stat().st_size > 12000
)
out = root / "src/lib/domain/katalog-cover-ids.ts"
body = "export const COVER_PHOTO_IDS = new Set<string>([\n" + "".join(f'  "{i}",\n' for i in ids) + "]);\n"
out.write_text(body)
print(f"wrote {out} n={len(ids)}")

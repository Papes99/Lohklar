#!/usr/bin/env python3
"""Rebuild PHOTO_CAPTION_OVERRIDES from unique local files. One-word captions."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/lib/domain/photo-captions.ts"
CLINICS = ROOT / "public/clinics"

FILE_MAP = {
    "aussen.jpg": ("aussen", "Eingang"),
    "zimmer.jpg": ("zimmer_bad", "Zimmer"),
    "bad.jpg": ("zimmer_bad", "Bad"),
    "umgebung.jpg": ("umgebung", "Gelände"),
    "speiseraum.jpg": ("speiseraum", "Speisesaal"),
    "besonderheit.jpg": ("besonderheit", "Halle"),
    "adaption.jpg": ("umgebung", "Adaption"),
    "blaues-haus.jpg": ("besonderheit", "Halle"),
}


def webs():
    return json.loads(Path("/tmp/houses-web.json").read_text())


def unique_files(hid: str) -> list[tuple[str, str, str]]:
    d = CLINICS / hid
    if not d.is_dir():
        return []
    by_hash = {}
    for p in sorted(d.glob("*.jpg")):
        h = hashlib.sha256(p.read_bytes()).hexdigest()
        if h in by_hash:
            continue
        meta = FILE_MAP.get(p.name)
        if not meta:
            continue
        by_hash[h] = (p.name, meta[0], meta[1])
    items = list(by_hash.values())
    items.sort(key=lambda x: 0 if x[0] == "aussen.jpg" else 1)
    return items[:5]


def main():
    catalog = webs()
    blocks = []
    stats = {"houses": 0, "with_extra": 0, "photos": 0}
    for hid in sorted(catalog):
        files = unique_files(hid)
        if not files:
            continue
        stats["houses"] += 1
        stats["photos"] += len(files)
        if len(files) > 1:
            stats["with_extra"] += 1
        lines = [f'  "{hid}": [']
        for fname, slot, cap in files:
            lines.append(f'    {{ file: "{fname}", slot: "{slot}", caption: "{cap}" }},')
        lines.append("  ],")
        blocks.append("\n".join(lines))

    ts = f'''import type {{ ClinicPhoto, PhotoSlot }} from "./types.ts";

/** Max. 1 Titel + 4 Galerie. */
export const MAX_CLINIC_PHOTOS = 5;

type PhotoOverride = {{
  file: string;
  slot: PhotoSlot;
  caption: string;
  href?: string;
}};

export const PHOTO_CAPTION_OVERRIDES: Partial<Record<string, PhotoOverride[]>> = {{
{chr(10).join(blocks)}
}};

const SLOT_CAPTION: Record<PhotoSlot, string> = {{
  aussen: "Eingang",
  zimmer_bad: "Zimmer",
  umgebung: "Gelände",
  speiseraum: "Speisesaal",
  besonderheit: "Halle",
}};

export function capPhotos<T>(photos: T[]): T[] {{
  return photos.slice(0, MAX_CLINIC_PHOTOS);
}}

export function applyPhotoPolicy(clinicId: string, photos: ClinicPhoto[]): ClinicPhoto[] {{
  const override = PHOTO_CAPTION_OVERRIDES[clinicId];
  if (override?.length) {{
    return capPhotos(
      override.map((item) => ({{
        slot: item.slot,
        caption: item.caption,
        alt: item.caption,
        imagePath: item.href ?? `/clinics/${{clinicId}}/${{item.file}}`,
        source: "klinik" as const,
        asOf: photos[0]?.asOf ?? "09.2026",
      }})),
    );
  }}
  const seen = new Set<string>();
  const unique: ClinicPhoto[] = [];
  for (const photo of photos) {{
    if (!photo.imagePath) continue;
    if (seen.has(photo.imagePath)) continue;
    seen.add(photo.imagePath);
    unique.push({{
      ...photo,
      caption: SLOT_CAPTION[photo.slot],
      alt: SLOT_CAPTION[photo.slot],
    }});
  }}
  if (unique.length) return capPhotos(unique);
  return capPhotos(
    photos.map((photo) => ({{
      ...photo,
      caption: SLOT_CAPTION[photo.slot],
      alt: SLOT_CAPTION[photo.slot],
    }})),
  );
}}
'''
    OUT.write_text(ts)
    print(stats, "wrote", OUT)


if __name__ == "__main__":
    main()

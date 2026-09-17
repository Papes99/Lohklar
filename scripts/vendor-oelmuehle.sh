#!/usr/bin/env bash
# Lädt die 4 offiziellen Ölmühle-Motive nach public/clinics/ck-oelmuehle/.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/public/clinics/ck-oelmuehle"
BASE="https://www.fachklinik-alte-oelmuehle.de"
mkdir -p "$DEST"
curl -fsSL -o "$DEST/zimmer.jpg" "$BASE/fileadmin/_processed_/a/c/csm_Zimmer2_67c44c308e.jpg"
curl -fsSL -o "$DEST/bad.jpg" "$BASE/fileadmin/_processed_/1/f/csm_Badezimmer_bearbeitet_8c38a644de.jpg"
curl -fsSL -o "$DEST/adaption.jpg" "$BASE/fileadmin/_processed_/c/c/csm_Adaptionshaus_Bearbeitet_409d344792.jpg"
curl -fsSL -o "$DEST/blaues-haus.jpg" "$BASE/fileadmin/_processed_/e/0/csm_Blaues_Haus_Sonne1_cfafe9e970.jpg"
echo "vendored:"
ls -l "$DEST"/*.jpg

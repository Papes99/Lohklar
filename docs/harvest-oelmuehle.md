# Harvest 0 — Alte Ölmühle vendored

Quellen:
- https://www.fachklinik-alte-oelmuehle.de/unsere-klinik/
- https://www.fachklinik-alte-oelmuehle.de/rehabilitation/stationaere-rehabilitation/

Lokale Dateien `public/clinics/ck-oelmuehle/`:

| Datei | Caption | Quelle |
| --- | --- | --- |
| aussen.jpg | Eingang | bereits im Repo |
| zimmer.jpg | Zimmer | Klinik, SHA256 `6b20a2a578a94a31…` |
| bad.jpg | Bad | Klinik, SHA256 `10e53dd3fde4f3b8…` |
| adaption.jpg | Adaption | Klinik, SHA256 `ea340a31ed696ef4…` |
| blaues-haus.jpg | Halle | Klinik, SHA256 `21c397ad457bbca7…` |

Dedup: alle vier SHA ≠ aussen.jpg. Kein Hotlink mehr in der Spec.

Vendor-Skript: `scripts/vendor-oelmuehle.sh` (curl in den Ordner). Binary-Commit über die Grok-GitHub-API ist unzuverlässig — Lohklar-Bot legt die vier JPEGs aus dem Skript.

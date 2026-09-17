#!/usr/bin/env python3
"""Harvest extra official clinic photos. Never invents stock. Dedup by SHA (per house and globally)."""
from __future__ import annotations

import hashlib
import json
import re
import ssl
import threading
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from io import BytesIO
from pathlib import Path
from urllib.parse import urljoin, urlparse

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "clinics"
LOG = ROOT / "src/lib/domain/_fill/photo-harvest.json"
UA = (
    "Mozilla/5.0 (compatible; LohklarCatalogBot/1.1; "
    "+https://lohklar.de; orientation tool; public clinic photos)"
)
CTX = ssl.create_default_context()
CONCURRENCY = 10
MAX_PER_HOUSE = 5
TIMEOUT = 16

STOCK_RE = re.compile(
    r"adobe|unsplash|shutterstock|getty|pixabay|istock|pexels|stock\.adobe|placeholder|dummy|lorempixel",
    re.I,
)
SKIP_NAME_RE = re.compile(
    r"logo|favicon|sprite|icon[-_/]|siegel|badge|tracking|avatar|cookie|"
    r"facebook|instagram|twitter|linkedin|youtube|mapbox|recaptcha|pixel|"
    r"/themes/|/library/images/|slider-|menue-|menu-|header-logo|"
    r"wordpress|wordmark|word-mark|opengraph-default|default-og|"
    r"placeholder|dummy|1x1|spacer|blank\.|/flags/|flagge",
    re.I,
)
GALLERY_HREF_RE = re.compile(
    r"galerie|impression|bilderstrecke|bilder|fotos?|rundgang|ausstattung|"
    r"zimmer|wohnen|unsere-klinik|unsere-haeuser|aufenthalt|einrichtung|"
    r"ueber-uns|über-uns|/haus/|/klinik/|therapie|aussenanlagen|garten|"
    r"virtuell|360|wohnbereich|patientenzimmer",
    re.I,
)
CAPTION_RULES = [
    (re.compile(r"badezimmer|nasszelle|dusche|\bbad\b|waschbecken|wc-", re.I), "Bad", "zimmer_bad", "bad.jpg"),
    (re.compile(r"einzelzimmer|patientenzimmer|zweibett|doppelzimmer|wohnraum|\bzimmer\b", re.I), "Zimmer", "zimmer_bad", "zimmer.jpg"),
    (re.compile(r"speise|cafeteria|restaurant|kantine|esszimmer|mensa", re.I), "Speisesaal", "speiseraum", "speiseraum.jpg"),
    (re.compile(r"adaption", re.I), "Adaption", "umgebung", "adaption.jpg"),
    (re.compile(r"werkstatt|turnhalle|kraftraum|fitness|sport|gym|sauna|\bhalle\b", re.I), "Halle", "besonderheit", "besonderheit.jpg"),
    (re.compile(r"garten|park|gelände|gelaende|lage|umgebung|aussenanlage|außenanlage|hof|terrasse", re.I), "Gelände", "umgebung", "umgebung.jpg"),
    (re.compile(r"eingang|fassade|gebäude|gebaeude|außen|aussen|luftbild|klinikgeb", re.I), "Eingang", "aussen", "aussen.jpg"),
]
EXTRA_PATHS = [
    "/",
    "/unsere-klinik/",
    "/galerie/",
    "/impressionen/",
    "/bilder/",
    "/fotos/",
    "/aufenthalt/",
    "/wohnen/",
    "/zimmer/",
    "/ausstattung/",
    "/rundgang/",
    "/ueber-uns/",
]
USED: set[str] = set()
USED_LOCK = threading.Lock()


def load_webs() -> dict[str, str]:
    return json.loads(Path("/tmp/houses-web.json").read_text())


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def existing_unique(house_id: str) -> dict[str, Path]:
    d = OUT_DIR / house_id
    out: dict[str, Path] = {}
    if not d.is_dir():
        return out
    for p in d.iterdir():
        if p.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
            continue
        try:
            out[sha256(p.read_bytes())] = p
        except OSError:
            continue
    return out


def load_used(webs: dict[str, str]) -> set[str]:
    s: set[str] = set()
    for hid in webs:
        d = OUT_DIR / hid
        if not d.is_dir():
            continue
        for p in d.glob("*.jpg"):
            if p.name == "aussen.jpg":
                continue
            try:
                s.add(sha256(p.read_bytes()))
            except OSError:
                pass
    return s


def host_ok(page: str, img: str) -> bool:
    try:
        a = (urlparse(page).hostname or "").lower().removeprefix("www.")
        b = (urlparse(img).hostname or "").lower().removeprefix("www.")
    except Exception:
        return False
    if not a or not b:
        return False
    if b == a or b.endswith("." + a) or a.endswith("." + b):
        return True
    a2 = ".".join(a.split(".")[-2:])
    b2 = ".".join(b.split(".")[-2:])
    if a2 and a2 == b2:
        return True
    groups = [
        ("median-kliniken.de", "median-gruppe.de"),
        ("celenus.com", "celenus-kliniken.de"),
        ("asklepios.com", "asklepios.de"),
        ("mediclin.de",),
        ("salus-kliniken.de",),
        ("ahg.de",),
        ("ameos.eu", "ameos.de"),
        ("heiligenfeld.de",),
        ("johannesbad.com", "johannesbad.de"),
        ("vitrea-gesundheit.de",),
    ]
    for g in groups:
        if any(a.endswith(x) for x in g) and any(b.endswith(x) for x in g):
            return True
    return False


def fetch(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT, context=CTX) as res:
            return res.geturl(), res.read(), res.headers.get("Content-Type", ""), res.status
    except Exception:
        return url, b"", "", 0


def abs_url(base: str, href: str) -> str | None:
    if not href or href.startswith("data:") or href.startswith("javascript:"):
        return None
    try:
        return urljoin(base, href.split()[0].strip("'\""))
    except Exception:
        return None


def extract_imgs(html: str, page_url: str) -> list[tuple[str, str]]:
    found: list[tuple[str, str]] = []

    def add(href: str, hint: str):
        absu = abs_url(page_url, href.strip("'\""))
        if not absu:
            return
        low = absu.lower()
        if STOCK_RE.search(low) or SKIP_NAME_RE.search(low):
            return
        if not re.search(r"\.(jpe?g|png|webp)(\?|$)|/fileadmin/|/wp-content/uploads/|/media/|/dam/|/bilder/", low):
            return
        found.append((absu, hint + " " + low))

    for m in re.finditer(r'property=["\']og:image["\'][^>]*content=["\']([^"\']+)', html, re.I):
        add(m.group(1), "og")
    for m in re.finditer(r'content=["\']([^"\']+)["\'][^>]*property=["\']og:image', html, re.I):
        add(m.group(1), "og")
    for m in re.finditer(r'<(?:img|source)[^>]+(?:src|data-src|data-lazy-src|data-original|data-full)=["\']([^"\']+)', html, re.I):
        add(m.group(1), m.group(0)[:220])
    for m in re.finditer(r'(?:srcset|data-srcset)=["\']([^"\']+)', html, re.I):
        parts = [p.strip().split(" ")[0] for p in m.group(1).split(",")]
        if parts:
            add(parts[-1], "srcset")
    for m in re.finditer(r'url\(([^)]+\.(?:jpe?g|png|webp)[^)]*)\)', html, re.I):
        add(m.group(1).strip("'\""), "css")
    for m in re.finditer(r'href=["\']([^"\']+\.(?:jpe?g|png|webp)[^"\']*)', html, re.I):
        add(m.group(1), "href")
    seen = set()
    out = []
    for u, h in found:
        if u in seen:
            continue
        seen.add(u)
        out.append((u, h))
    return out[:50]


def extract_gallery_pages(html: str, page_url: str) -> list[str]:
    urls = []
    for m in re.finditer(r'href=["\']([^"\'#]+)', html, re.I):
        absu = abs_url(page_url, m.group(1))
        if not absu:
            continue
        if not host_ok(page_url, absu) and not host_ok(page_url, absu + "/"):
            continue
        if GALLERY_HREF_RE.search(absu):
            urls.append(absu.split("#")[0])
    seen, out = set(), []
    for u in urls:
        if u not in seen:
            seen.add(u)
            out.append(u)
    return out[:8]


def classify(hint: str) -> tuple[str, str, str] | None:
    for rx, caption, slot, fname in CAPTION_RULES:
        if rx.search(hint):
            return caption, slot, fname
    return None


def looks_like_logo(im: Image.Image) -> bool:
    w, h = im.size
    if w / max(h, 1) > 4.2 or h / max(w, 1) > 4.2:
        return True
    small = im.convert("RGB").resize((64, 64))
    px = list(small.getdata())
    white = sum(1 for r, g, b in px if r > 235 and g > 235 and b > 235)
    if white / len(px) >= 0.88:
        return True
    return False


def to_jpeg(data: bytes) -> bytes | None:
    try:
        im = Image.open(BytesIO(data))
        im = im.convert("RGB")
        w, h = im.size
        if w < 260 or h < 170:
            return None
        if looks_like_logo(im):
            return None
        if w > 1600:
            im = im.resize((1600, int(h * 1600 / w)), Image.Resampling.LANCZOS)
        buf = BytesIO()
        im.save(buf, format="JPEG", quality=82, optimize=True)
        out = buf.getvalue()
        if len(out) < 8000:
            return None
        return out
    except Exception:
        return None


def origin_of(web: str) -> str:
    parsed = urlparse(web if "://" in web else "https://" + web)
    scheme = parsed.scheme or "https"
    netloc = parsed.netloc or parsed.path.split("/")[0]
    return f"{scheme}://{netloc}"


def extra_pages(web: str) -> list[str]:
    if not web:
        return []
    if "://" not in web:
        web = "https://" + web
    parsed = urlparse(web)
    origin = f"{parsed.scheme}://{parsed.netloc}"
    urls = [web, origin + "/"]
    host = (parsed.netloc or "").removeprefix("www.")
    if parsed.netloc.startswith("www."):
        urls.append(f"{parsed.scheme}://{host}{parsed.path or '/'}")
    else:
        urls.append(f"{parsed.scheme}://www.{host}{parsed.path or '/'}")
    for p in EXTRA_PATHS:
        urls.append(origin + p)
    urls.append(origin + "/sitemap.xml")
    seen, out = set(), []
    for u in urls:
        if u not in seen:
            seen.add(u)
            out.append(u)
    return out[:10]


def harvest_house(house_id: str, web: str) -> dict:
    dest = OUT_DIR / house_id
    dest.mkdir(parents=True, exist_ok=True)
    have = existing_unique(house_id)
    used_names = {p.name for p in have.values()}
    added = []
    skipped = "ok"
    pages_ok = 0
    candidates: list[tuple[str, str]] = []
    pages = extra_pages(web)
    visited = set()
    for page in pages:
        if page in visited:
            continue
        visited.add(page)
        final, data, ctype, status = fetch(page)
        if not data:
            continue
        low = data[:5000].lower()
        is_html = b"<html" in low or b"<img" in data.lower() or b"<url>" in low
        if not (status and is_html):
            continue
        pages_ok += 1
        html = data.decode("utf-8", "ignore")[:500000]
        candidates.extend(extract_imgs(html, final or page))
        for extra in extract_gallery_pages(html, final or page):
            if extra not in visited and len(pages) < 16:
                pages.append(extra)
        if len(candidates) > 60:
            break
    scored = []
    seen_url = set()
    for url, hint in candidates:
        if url in seen_url:
            continue
        seen_url.add(url)
        media = "/fileadmin/" in url or "/wp-content/" in url or "/media/" in url or "/dam/" in url
        if not host_ok(web, url) and not media:
            continue
        cls = classify(hint)
        if not cls:
            if re.search(r"team|mitarbeiter|news|aktuell|blog|karriere|stellen", url + hint, re.I):
                continue
            if re.search(r"(haus|gebaeude|gebäude|klinik|eingang|garten|park|zimmer|wohnen|hof)", url + hint, re.I):
                cls = ("Gelände", "umgebung", "umgebung.jpg")
            else:
                continue
        caption, slot, fname = cls
        if fname == "aussen.jpg":
            continue  # never replace title
        if hint.startswith("og ") and "umgebung.jpg" in used_names:
            continue
        scored.append((caption, slot, fname, url, hint))

    # one URL → one file; never reassign the same photo to another slot
    order = ["zimmer.jpg", "bad.jpg", "umgebung.jpg", "speiseraum.jpg", "besonderheit.jpg", "adaption.jpg"]
    picked: list[tuple[str, str, str, str, str]] = []
    used_fn: set[str] = set(used_names)
    used_url: set[str] = set()
    for want in order:
        if want in used_fn:
            continue
        for item in scored:
            if item[2] == want and item[3] not in used_url:
                picked.append(item)
                used_fn.add(want)
                used_url.add(item[3])
                break
    for item in scored:
        if len(picked) + len(have) >= MAX_PER_HOUSE:
            break
        if item[3] in used_url or item[2] in used_fn:
            continue
        picked.append(item)
        used_fn.add(item[2])
        used_url.add(item[3])

    for caption, slot, fname, url, hint in picked:
        if fname in used_names or fname == "aussen.jpg":
            continue
        if len(have) + len(added) >= MAX_PER_HOUSE:
            break
        _final, raw, ctype, status = fetch(url)
        if not raw or status == 0:
            continue
        jpg = to_jpeg(raw)
        if not jpg:
            continue
        h = sha256(jpg)
        with USED_LOCK:
            if h in have or h in USED:
                continue
            USED.add(h)
        path = dest / fname
        path.write_bytes(jpg)
        have[h] = path
        used_names.add(fname)
        added.append({"file": fname, "slot": slot, "caption": caption, "source": url})

    unique_now = len(existing_unique(house_id))
    if not added and unique_now <= 1:
        skipped = "kein Beleg auf offizieller Klinik-/Träger-Seite" if pages_ok else "Seite nicht erreichbar"
    else:
        skipped = ""
    return {
        "id": house_id,
        "web": web,
        "pages": pages_ok,
        "added": added,
        "unique": unique_now,
        "skipped": skipped,
    }


def main():
    global USED
    webs = load_webs()
    USED = load_used(webs)
    jobs = []
    for hid, web in sorted(webs.items()):
        uniq = existing_unique(hid)
        if len(uniq) >= MAX_PER_HOUSE:
            continue
        jobs.append((hid, web, len(uniq)))
    jobs.sort(key=lambda x: x[2])
    print(f"jobs {len(jobs)} / {len(webs)} used_hashes={len(USED)}", flush=True)
    results = []
    done = 0
    with ThreadPoolExecutor(max_workers=CONCURRENCY) as ex:
        futs = {ex.submit(harvest_house, hid, web): hid for hid, web, _ in jobs}
        for fut in as_completed(futs):
            hid = futs[fut]
            try:
                row = fut.result()
            except Exception as e:
                row = {"id": hid, "added": [], "unique": 1, "skipped": f"error {e}"}
            results.append(row)
            done += 1
            if done % 15 == 0:
                LOG.parent.mkdir(parents=True, exist_ok=True)
                LOG.write_text(json.dumps(results, indent=1, ensure_ascii=False))
            if done % 20 == 0 or row.get("added"):
                print(
                    f"{done}/{len(jobs)} {row['id']} +{len(row.get('added') or [])} unique={row.get('unique')} {row.get('skipped','')}",
                    flush=True,
                )
    LOG.parent.mkdir(parents=True, exist_ok=True)
    LOG.write_text(json.dumps(results, indent=1, ensure_ascii=False))
    added_n = sum(len(r.get("added") or []) for r in results)
    skip_n = sum(1 for r in results if r.get("skipped"))
    print(f"DONE added_files={added_n} houses_with_skip={skip_n} log={LOG}", flush=True)


if __name__ == "__main__":
    main()

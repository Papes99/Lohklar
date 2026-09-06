import { normalizeName } from "./folder-search.ts";
import type { SteckbriefKey } from "./types.ts";
import {
  HEADING_KEYS,
  LOHLOTSE_HEADINGS,
  PERSONAL_MERGE_HEADING,
  WAIT_COMPONENT_BULLET,
  WAIT_ONLY_BULLETS,
  WAIT_SPAN_RE,
  asksClinicTopic,
  asksWait,
  headingLabel,
  splitUnits,
  wantsPersonalSave,
  type HighlightBlock,
  type LohlotseHeadingKey,
  type LohlotseHighlight,
  type LohlotseMode,
  type LohlotseOffer,
  type LohlotsePayload,
  type PersonalField,
} from "./lohlotse-core.ts";

export function fieldFromMergeHeading(heading: string | null | undefined): PersonalField {
  const n = compactAlias(heading ?? "");
  if (n.includes("nichtpasst") || n.includes("passtnicht")) return "passtNicht";
  if (n.includes("offene")) return "offeneFragen";
  if (n.includes("rueckmeldung")) return "rueckmeldungen";
  return "passt";
}

export function hasWaitNumber(text: string): boolean {
  WAIT_SPAN_RE.lastIndex = 0;
  return WAIT_SPAN_RE.test(text);
}

export function stripWaitNumbersFromText(text: string): string {
  WAIT_SPAN_RE.lastIndex = 0;
  return text
    .replace(WAIT_SPAN_RE, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,;:])/g, "$1")
    .trim();
}

export function stripWaitNumbersFromBullets(bullets: string[]): string[] {
  return bullets
    .map((item) => stripWaitNumbersFromText(item))
    .filter((item) => {
      if (item.length < 8) return false;
      if (hasWaitNumber(item)) return false;
      if (/schätzung,\s*stand/i.test(item) && /\d/.test(item)) return false;
      return true;
    });
}

export function appliedMergePayload(args: {
  clientName: string;
  offer: LohlotseOffer;
  clinicId: string | null;
}): LohlotsePayload {
  const heading = PERSONAL_MERGE_HEADING[args.offer.field];
  return {
    mode: "guided",
    headingKey: "naechster",
    heading: headingLabel("naechster"),
    bullets: [
      `Übernommen in Persönlich für ${args.clientName}, Block „${heading}“.`,
      "Offizieller Klinik-Steckbrief unverändert.",
      "Undo steht unter dem persönlichen Block.",
    ],
    sources: [],
    clinicId: args.clinicId,
    highlights: [
      {
        surface: "personal",
        field: args.offer.field,
        quote: args.offer.text,
      },
    ],
    showWait: false,
    offer: { ...args.offer, status: "applied" },
  };
}

export function sanitizeLohlotsePayload(
  payload: LohlotsePayload,
  message: string,
  fallback?: LohlotsePayload | null,
): LohlotsePayload {
  const mode: LohlotseMode =
    payload.mode === "free" || payload.mode === "guided"
      ? payload.mode
      : payload.prose?.trim()
        ? "free"
        : "guided";

  const waitAsked =
    asksWait(message) || payload.showWait || payload.headingKey === "wartezeit";
  const clinicAsked = asksClinicTopic(message) || payload.headingKey === "klinik";

  let headingKey: LohlotseHeadingKey | null = payload.headingKey ?? null;
  if (waitAsked && clinicAsked && (headingKey === "wartezeit" || headingKey == null)) {
    headingKey = "klinik";
  } else if (waitAsked && !clinicAsked) {
    headingKey = "wartezeit";
  } else if (mode === "guided" && headingKey == null) {
    headingKey = "ueberblick";
  } else if (mode === "free" && !waitAsked && payload.headingKey == null) {
    headingKey = null;
  }

  const showWait = Boolean(waitAsked && headingKey !== "ueberblick");

  let prose = payload.prose?.trim()
    ? stripWaitNumbersFromText(payload.prose)
    : undefined;
  if (prose && prose.length < 8) prose = undefined;

  let bullets = stripWaitNumbersFromBullets(payload.bullets ?? []).filter(
    (item) => !/^[🧭🏥⏳📋⚠️]/.test(item),
  );

  if (showWait) {
    const corpus = `${prose ?? ""} ${bullets.join(" ")}`;
    const hasPointer = /wartezeit-komponente|rechenweg ansehen/i.test(corpus);
    if (!hasPointer) {
      if (mode === "free") {
        prose = [prose, WAIT_COMPONENT_BULLET].filter(Boolean).join(" ").trim();
      } else if (headingKey === "wartezeit") {
        bullets = WAIT_ONLY_BULLETS.slice();
      } else {
        bullets = [...bullets.slice(0, 5), WAIT_COMPONENT_BULLET];
      }
    }
  }

  let offer = payload.offer ?? null;
  if (!offer && fallback?.offer && headingKey !== "wartezeit") {
    offer = fallback.offer;
  }
  if (headingKey === "wartezeit" && !wantsPersonalSave(message)) {
    offer = payload.offer;
  }

  let highlights = payload.highlights;
  if (highlights.length === 0 && fallback?.highlights.length) {
    highlights = fallback.highlights;
  }
  if (showWait && !highlights.some((item) => item.block === "wartezeit")) {
    highlights = [
      ...highlights,
      { surface: "official", block: "wartezeit", quote: "Wartezeit-Schätzung" },
    ];
  }

  let nextBullets =
    bullets.length > 0
      ? bullets
      : mode === "guided"
        ? fallback?.bullets ?? payload.bullets
        : [];
  nextBullets = nextBullets.slice(0, 7);

  if (mode === "free" && !prose) {
    const fromFallback = fallback?.prose?.trim();
    const fromBullets = (nextBullets.length ? nextBullets : fallback?.bullets ?? []).join(" ");
    prose = stripWaitNumbersFromText(fromFallback || fromBullets || "");
    if (prose && prose.length < 8) prose = undefined;
  }

  return {
    ...payload,
    mode,
    prose: prose || undefined,
    headingKey,
    heading: headingLabel(headingKey),
    bullets: mode === "free" ? nextBullets.slice(0, 4) : nextBullets,
    highlights,
    showWait,
    offer,
    clinicId: payload.clinicId ?? fallback?.clinicId ?? null,
    sources: payload.sources.length ? payload.sources : fallback?.sources ?? [],
  };
}

export function parseLohlotsePayload(raw: unknown): LohlotsePayload | null {
  if (!raw) return null;
  let value = raw;
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
    const jsonText = fenced?.[1]?.trim() ?? trimmed;
    const start = jsonText.indexOf("{");
    const end = jsonText.lastIndexOf("}");
    if (start < 0 || end <= start) return proseFallback(trimmed);
    try {
      value = JSON.parse(jsonText.slice(start, end + 1));
    } catch {
      return proseFallback(trimmed);
    }
  }
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const proseRaw = typeof row.prose === "string" ? row.prose.trim() : "";
  const modeRaw = row.mode === "free" || row.mode === "guided" ? row.mode : undefined;
  const hasExplicitHeading =
    (typeof row.headingKey === "string" && row.headingKey.length > 0) ||
    (typeof row.heading === "string" && row.heading.trim().length > 0);
  const headingKey = hasExplicitHeading
    ? coerceHeading(
        row.headingKey,
        typeof row.heading === "string" ? row.heading : "",
        row,
      )
    : modeRaw === "free" || proseRaw
      ? null
      : coerceHeading(
          row.headingKey,
          typeof row.heading === "string" ? row.heading : "",
          row,
        );
  const bullets = Array.isArray(row.bullets)
    ? row.bullets.map((item) => String(item).trim()).filter(Boolean).slice(0, 8)
    : [];
  if (bullets.length === 0 && !proseRaw && typeof row.content === "string") {
    return proseFallback(row.content);
  }
  const golden =
    row.wait_time != null ||
    row.action != null ||
    row.merge_preview != null ||
    row.pane != null;
  const mode: LohlotseMode =
    modeRaw ?? (proseRaw && !hasExplicitHeading ? "free" : proseRaw ? "free" : "guided");
  if (bullets.length === 0 && !proseRaw && !golden) return null;
  const pane = row.pane && typeof row.pane === "object" ? (row.pane as Record<string, unknown>) : null;
  const highlightSource = Array.isArray(row.highlights)
    ? row.highlights
    : Array.isArray(pane?.highlights)
      ? pane.highlights
      : [];
  const highlights = highlightSource
    .map((item) => mapHighlight(item))
    .filter((item): item is LohlotseHighlight => Boolean(item));
  const offer = coerceOffer(row);
  const waitTime = typeof row.wait_time === "string" ? row.wait_time : "";
  const showWait =
    waitTime === "use_component_c" ||
    (waitTime !== "none" && (Boolean(row.showWait) || headingKey === "wartezeit"));
  return {
    mode,
    prose: proseRaw || undefined,
    headingKey,
    heading: headingLabel(headingKey),
    bullets,
    sources: coerceSources(row.sources),
    clinicId:
      (typeof row.clinicId === "string" && row.clinicId) ||
      (typeof row.focus_clinic_id === "string" && row.focus_clinic_id) ||
      null,
    highlights,
    showWait,
    offer,
  };
}

function coerceSources(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (item && typeof item === "object") {
        const rec = item as Record<string, unknown>;
        const label = String(rec.label ?? "").trim();
        const stand = String(rec.stand ?? "").trim();
        if (label && stand) return `${label}, Stand ${stand}`;
        return label;
      }
      return "";
    })
    .filter(Boolean)
    .slice(0, 6);
}

function coerceOffer(row: Record<string, unknown>): LohlotseOffer | null {
  const offerRaw = row.offer && typeof row.offer === "object" ? (row.offer as Record<string, unknown>) : null;
  const offerField = offerRaw ? coerceField(offerRaw.field) : undefined;
  const offerText = offerRaw ? String(offerRaw.text ?? "").trim() : "";
  if (offerField && offerText) {
    return {
      field: offerField,
      text: offerText,
      status:
        offerRaw?.status === "applied" || offerRaw?.status === "dismissed" ? offerRaw.status : "open",
    };
  }
  if (row.action !== "preview_merge") return null;
  const preview = row.merge_preview && typeof row.merge_preview === "object"
    ? (row.merge_preview as Record<string, unknown>)
    : null;
  const bullets = Array.isArray(preview?.proposed_bullets)
    ? preview.proposed_bullets.map((item) => String(item).trim()).filter(Boolean)
    : [];
  if (!bullets[0]) return null;
  return {
    field: fieldFromMergeHeading(typeof preview?.target_heading === "string" ? preview.target_heading : ""),
    text: bullets[0],
    status: "open",
  };
}

function mapHighlight(item: unknown): LohlotseHighlight | null {
  if (!item || typeof item !== "object") return null;
  const rec = item as Record<string, unknown>;
  const quote = String(rec.quote ?? rec.reason ?? "").trim();
  const scope = rec.surface ?? rec.scope;
  const surface: LohlotseHighlight["surface"] = scope === "personal" ? "personal" : "official";
  const blockRaw = rec.block ?? rec.block_id;
  if (surface === "personal") {
    return {
      surface,
      field: coerceField(rec.field ?? blockRaw) ?? "passt",
      quote: quote || PERSONAL_MERGE_HEADING.passt,
    };
  }
  const block = coerceBlock(blockRaw);
  if (!quote && !block) return null;
  return {
    surface,
    block,
    field: coerceField(rec.field),
    quote: quote || String(blockRaw ?? ""),
  };
}

function compactAlias(value: string): string {
  return normalizeName(value).replace(/\s+/g, "");
}

function coerceHeading(key: unknown, heading: string, row?: Record<string, unknown>): LohlotseHeadingKey {
  if (typeof key === "string" && HEADING_KEYS.includes(key as LohlotseHeadingKey)) {
    return key as LohlotseHeadingKey;
  }
  for (const item of HEADING_KEYS) {
    if (heading.includes(LOHLOTSE_HEADINGS[item]) || heading.includes(item)) return item;
  }
  if (row?.action === "ask_name") return "ueberblick";
  if (row?.action === "preview_merge") return "klinik";
  const waitTime = typeof row?.wait_time === "string" ? row.wait_time : "";
  if (waitTime === "use_component_c") {
    const pane = row?.pane && typeof row.pane === "object" ? (row.pane as Record<string, unknown>) : null;
    const marks = Array.isArray(pane?.highlights) ? pane.highlights : [];
    const ids = marks
      .map((item) => {
        if (!item || typeof item !== "object") return "";
        return compactAlias(String((item as Record<string, unknown>).block_id ?? ""));
      })
      .join(" ");
    if (ids.includes("kinder") || ids.includes("wohnen") || ids.includes("indikation")) return "klinik";
    return "wartezeit";
  }
  return "ueberblick";
}

function coerceField(value: unknown): PersonalField | undefined {
  if (value === "passt" || value === "passtNicht" || value === "offeneFragen" || value === "rueckmeldungen") {
    return value;
  }
  if (typeof value !== "string") return undefined;
  const n = compactAlias(value);
  if (n === "wahlkriterien" || n === "passung" || n.includes("passungdiewir")) return "passt";
  if (n.includes("nichtpasst") || n === "passtnicht") return "passtNicht";
  if (n.includes("offene")) return "offeneFragen";
  if (n.includes("rueckmeldung")) return "rueckmeldungen";
  return undefined;
}

function coerceBlock(value: unknown): HighlightBlock | undefined {
  if (typeof value !== "string" || !value) return undefined;
  const n = compactAlias(value);
  const aliases: Record<string, HighlightBlock> = {
    indikation: "indikation",
    kontraindikation: "kontraindikation",
    settingdauer: "settingDauer",
    settingunddauer: "settingDauer",
    wohnenalltag: "wohnenAlltag",
    wohnenundalltag: "wohnenAlltag",
    kinderfamilie: "kinderFamilie",
    kinderfamiliegeschlecht: "kinderFamilie",
    therapie: "therapie",
    therapieundkonzept: "therapie",
    medizin: "medizin",
    sozialdienst: "sozialdienst",
    kostentraeger: "kostentraeger",
    kostentraegerundzugang: "kostentraeger",
    besonderheiten: "besonderheiten",
    kontakt: "kontakt",
    datenstand: "datenstand",
    kopf: "kopf",
    wartezeit: "wartezeit",
  };
  if (aliases[n]) return aliases[n];
  const keys: HighlightBlock[] = [
    "indikation",
    "kontraindikation",
    "settingDauer",
    "wohnenAlltag",
    "kinderFamilie",
    "therapie",
    "medizin",
    "sozialdienst",
    "kostentraeger",
    "besonderheiten",
    "kontakt",
    "datenstand",
    "kopf",
    "wartezeit",
  ];
  return keys.find((item) => item === value);
}

function proseFallback(text: string): LohlotsePayload | null {
  const cleaned = text.replace(/```[\s\S]*?```/g, "").trim();
  if (cleaned.length < 2) return null;
  const headingKey = coerceHeading(undefined, cleaned.slice(0, 80));
  const withoutHeading = cleaned.replace(/^[^\n]*🧭[^\n]*\n?|^[^\n]*🏥[^\n]*\n?|^[^\n]*⏳[^\n]*\n?|^[^\n]*📋[^\n]*\n?|^[^\n]*⚠️[^\n]*\n?/, "");
  const units = splitUnits(withoutHeading || cleaned).slice(0, 8);
  const looksGuided = /^[🧭🏥⏳📋⚠️]/.test(cleaned.trim());
  if (looksGuided && units.length) {
    return {
      mode: "guided",
      headingKey,
      heading: headingLabel(headingKey),
      bullets: units,
      sources: [],
      clinicId: null,
      highlights: [],
      showWait: headingKey === "wartezeit",
      offer: null,
    };
  }
  const prose = (withoutHeading || cleaned).replace(/^[-•–]\s*/gm, "").trim();
  if (!prose) return null;
  return {
    mode: "free",
    prose,
    headingKey: null,
    heading: "",
    bullets: [],
    sources: [],
    clinicId: null,
    highlights: [],
    showWait: /wartezeit/i.test(prose),
    offer: null,
  };
}

export function highlightPhrasesOf(payload: LohlotsePayload | null | undefined): string[] {
  if (!payload) return [];
  return [...new Set(payload.highlights.map((item) => item.quote).filter((item) => item.length >= 8))];
}

export function payloadToContent(payload: LohlotsePayload): string {
  const lines: string[] = [];
  if (payload.heading) lines.push(payload.heading);
  if (payload.prose?.trim()) lines.push(payload.prose.trim());
  for (const item of payload.bullets) lines.push(`• ${item}`);
  if (payload.sources.length) {
    lines.push(`Quellen: ${payload.sources.join("; ")}`);
  }
  return lines.join("\n");
}

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  WAIT_COMPONENT_BULLET,
  applyOfferToPersonal,
  composeLohlotseReply,
  hasWaitNumber,
  mergePersonalField,
  parseLohlotsePayload,
  resolveClinicMention,
  sanitizeLohlotsePayload,
  type LohlotseClinic,
} from "./lohlotse.ts";
import { formatWaitLabel } from "./wait-time.ts";

const wait = {
  clinicId: "ck-eifelhoehe",
  label: formatWaitLabel(8, 11, "2026-09-03"),
  rangeLabel: "ca. 8–11 Wochen",
  midDays: 60,
  minDays: 50,
  maxDays: 80,
  weeksMin: 8,
  weeksMax: 11,
  asOf: "2026-09-03",
  asOfLabel: "03.09.2026",
  uncertainty: "mittel" as const,
  disclaimer: "Wartezeiten = Schätzung. Keine Garantie, keine Aufnahmezusage, keine individuelle Vorfahrt. Keine Live-Warteliste.",
  factors: [],
  formula: "gespeichert",
  formulaFilled: formatWaitLabel(8, 11, "2026-09-03"),
  sources: ["Öffentliches Klinikprofil"],
  uncertain: ["Keine Live-Liste"],
  notMeaning: ["keine Aufnahmezusage"],
};

const eifel: LohlotseClinic = {
  id: "ck-eifelhoehe",
  name: "Fachklinik Eifelhöhe",
  shortName: "Eifelhöhe",
  city: "Daun",
  stateName: "Rheinland-Pfalz",
  traeger: "MEDIAN Kliniken",
  wait,
  steckbrief: {
    indikation: { bullets: ["Sucht / Entwöhnung im stationären Setting."], chips: [] },
    kontraindikation: {
      bullets: ["Nicht aufgenommen werden Personen in Substitution."],
      chips: [],
    },
    settingDauer: { bullets: ["Stationär, in der Regel mehrere Wochen."], chips: [] },
    wohnenAlltag: { bullets: ["Natursetting, klare Tagesstruktur."], chips: [] },
    kinderFamilie: {
      bullets: ["Keine Kinderbetreuung im Haus.", "Gemischtes Haus."],
      chips: [],
    },
    therapie: { bullets: ["Gruppentherapie und Bezugsgruppe."], chips: [] },
    medizin: { bullets: ["Ärztliche Versorgung im Haus."], chips: [] },
    sozialdienst: { bullets: ["Klinik-Sozialdienst klärt Nachsorge."], chips: [] },
    kostentraeger: { bullets: ["Zugang über DRV nach Kostenzusage."], chips: [] },
    besonderheiten: { bullets: ["Glücksspiel als eigener Behandlungsstrang."], chips: [] },
  },
};

describe("mergePersonalField", () => {
  it("appends in the same sentence shape and skips duplicates", () => {
    const existing =
      "Arbeitsnotiz aus Lauf 1: Sucht / Entwöhnung. Region bundesweit offen.";
    const first = mergePersonalField(existing, "Zu Eifelhöhe: Keine Kinderbetreuung im Haus");
    assert.equal(first.added, true);
    assert.match(first.next, /Keine Kinderbetreuung im Haus\./);
    assert.equal(first.next.startsWith("Arbeitsnotiz"), true);
    const again = mergePersonalField(first.next, "Keine Kinderbetreuung im Haus.");
    assert.equal(again.added, false);
    assert.equal(again.next, first.next);
  });

  it("does not invent a second heading in the block", () => {
    const result = mergePersonalField(
      "Noch offen — bitte nach Rücksprache ergänzen.",
      "Substitution ist ein Ausschluss.",
    );
    assert.equal(result.next.includes("#"), false);
    assert.equal(/\nWas passt|\nKontraindikation/i.test(result.next), false);
  });
});

describe("applyOfferToPersonal", () => {
  it("writes only the named field", () => {
    const personal = {
      passt: "Arbeitsnotiz aus Lauf 1: Sucht / Entwöhnung.",
      passtNicht: "Noch offen — bitte nach Rücksprache ergänzen.",
      offeneFragen: "Kostenträger, Mobilität.",
      rueckmeldungen: "Noch keine Rückmeldung der Klient:in dokumentiert.",
    };
    const result = applyOfferToPersonal(personal, {
      field: "passtNicht",
      text: "Zu Eifelhöhe: Nicht aufgenommen werden Personen in Substitution.",
    });
    assert.equal(result.added, true);
    assert.equal(result.next.passt, personal.passt);
    assert.equal(result.next.offeneFragen, personal.offeneFragen);
    assert.match(result.next.passtNicht, /Substitution/);
  });
});

describe("resolveClinicMention", () => {
  it("binds Eifelhöhe without mixing another house", () => {
    const see: LohlotseClinic = {
      ...eifel,
      id: "ck-seewiesen",
      name: "Klinik Seewiesen",
      shortName: "Seewiesen",
      city: "Starnberg",
    };
    const found = resolveClinicMention("Wie ist die Kinderregel in der Eifelhöhe?", [see, eifel]);
    assert.equal(found?.id, "ck-eifelhoehe");
  });
});

describe("composeLohlotseReply", () => {
  const personal = {
    passt: "Eltern-Kind-Platz für ein Kind im Vorschulalter.",
    passtNicht: "Noch offen — bitte nach Rücksprache ergänzen.",
    offeneFragen: "Kostenträger, Mobilität.",
    rueckmeldungen: "Noch keine Rückmeldung.",
  };

  it("wait-only points at the component and never prints a span", () => {
    const reply = composeLohlotseReply({
      clientName: "Schmidt, Lea",
      message: "Wie lange ist die Wartezeit in der Eifelhöhe?",
      personal,
      clinics: [eifel],
      matches: [{ clinicId: eifel.id, score: 82, wait }],
      currentClinicId: null,
    });
    assert.equal(reply.headingKey, "wartezeit");
    assert.equal(reply.heading, "⏳ Wartezeit");
    assert.equal(reply.showWait, true);
    assert.equal(reply.bullets.some((item) => item.includes(wait.label)), false);
    assert.equal(reply.bullets.some((item) => hasWaitNumber(item)), false);
    assert.ok(reply.bullets.some((item) => /Wartezeit-Komponente/.test(item)));
    assert.ok(reply.bullets.some((item) => /Rechenweg/.test(item)));
    assert.ok(reply.bullets.some((item) => item.includes("Aufnahmezusage")));
    assert.ok(reply.highlights.some((item) => item.block === "wartezeit"));
  });

  it("combined Kinder+Wartezeit stays 🏥 Klinik, showWait, no numbers", () => {
    const reply = composeLohlotseReply({
      clientName: "Mira K.",
      message: "Kann Mira das Kind mitnehmen, und wie lange wartet man da?",
      personal,
      clinics: [eifel],
      matches: [{ clinicId: eifel.id, score: 82, wait }],
      currentClinicId: "ck-eifelhoehe",
    });
    assert.equal(reply.headingKey, "klinik");
    assert.equal(reply.heading, "🏥 Klinik");
    assert.equal(reply.showWait, true);
    assert.equal(reply.offer, null);
    assert.equal(reply.bullets.some((item) => hasWaitNumber(item)), false);
    assert.equal(reply.bullets.at(-1), WAIT_COMPONENT_BULLET);
    assert.ok(reply.highlights.some((item) => item.block === "kinderFamilie"));
    assert.ok(reply.highlights.some((item) => item.block === "wartezeit"));
    assert.ok(reply.highlights.some((item) => item.surface === "personal" && item.field === "passt"));
    assert.ok(reply.bullets.some((item) => /Kinder/.test(item)));
  });

  it("marks an official steckbrief line and keeps the rest available", () => {
    const reply = composeLohlotseReply({
      clientName: "Schmidt, Lea",
      message: "Gibt es Kinderbetreuung in der Eifelhöhe?",
      personal,
      clinics: [eifel],
      matches: [{ clinicId: eifel.id, score: 82, wait }],
      currentClinicId: "ck-eifelhoehe",
    });
    assert.equal(reply.headingKey, "klinik");
    assert.ok(reply.highlights.some((item) => /Kinderbetreuung/.test(item.quote)));
    assert.equal(reply.clinicId, "ck-eifelhoehe");
    assert.equal(reply.showWait, false);
  });

  it("missing Speisesaal stays 🏥, Angabe fehlt, merge to passt", () => {
    const reply = composeLohlotseReply({
      clientName: "Mira K.",
      message: "Steht irgendwo, ob es einen richtigen Speisesaal gibt oder nur Tabletts aufs Zimmer?",
      personal,
      clinics: [eifel],
      matches: [{ clinicId: eifel.id, score: 82, wait }],
      currentClinicId: "ck-eifelhoehe",
    });
    assert.equal(reply.headingKey, "klinik");
    assert.equal(reply.showWait, false);
    assert.ok(reply.bullets.some((item) => /Angabe liegt nicht vor/.test(item)));
    assert.ok(reply.highlights.some((item) => item.block === "wohnenAlltag"));
    assert.equal(reply.offer?.field, "passt");
    assert.match(reply.offer?.text ?? "", /Speiseraum|Verpflegung/);
  });

  it("stays on one name when no house is named", () => {
    const reply = composeLohlotseReply({
      clientName: "Schmidt, Lea",
      message: "Womit fange ich an?",
      personal,
      clinics: [eifel],
      matches: [{ clinicId: eifel.id, score: 82, wait }],
      currentClinicId: null,
    });
    assert.ok(reply.bullets.some((item) => item.includes("Schmidt, Lea")));
    assert.ok(reply.bullets.some((item) => /Klinik wählen oder nennen/i.test(item)));
    assert.equal(reply.bullets.some((item) => item.includes(wait.label)), false);
  });
});

describe("sanitizeLohlotsePayload", () => {
  it("keeps 🏥 on combined wait, strips spans, does not unshift wait.label", () => {
    const local = composeLohlotseReply({
      clientName: "Mira K.",
      message: "Kann Mira das Kind mitnehmen, und wie lange wartet man da?",
      personal: {
        passt: "Eltern-Kind-Platz für ein Kind im Vorschulalter.",
        passtNicht: "",
        offeneFragen: "",
        rueckmeldungen: "",
      },
      clinics: [eifel],
      matches: [{ clinicId: eifel.id, score: 82, wait }],
      currentClinicId: "ck-eifelhoehe",
    });
    const dirty = {
      ...local,
      headingKey: "wartezeit" as const,
      heading: "⏳ Wartezeit",
      showWait: true,
      bullets: [
        "Eltern-Kind-Plätze für Kinder von 1 bis 6 Jahren, begrenzt.",
        wait.label,
        "ca. 8–11 Wochen Wartezeit.",
      ],
    };
    const clean = sanitizeLohlotsePayload(
      dirty,
      "Kann Mira das Kind mitnehmen, und wie lange wartet man da?",
      local,
    );
    assert.equal(clean.headingKey, "klinik");
    assert.equal(clean.showWait, true);
    assert.equal(clean.bullets.some((item) => hasWaitNumber(item)), false);
    assert.equal(clean.bullets.some((item) => item.includes(wait.label)), false);
    assert.ok(clean.bullets.some((item) => /Wartezeit-Komponente/.test(item)));
  });
});

describe("parseLohlotsePayload", () => {
  it("reads json and falls back to a single heading", () => {
    const parsed = parseLohlotsePayload(
      JSON.stringify({
        headingKey: "klinik",
        bullets: ["Natursetting.", "Keine Kinderbetreuung im Haus."],
        sources: ["App-Steckbrief"],
        clinicId: "ck-eifelhoehe",
        highlights: [{ surface: "official", block: "kinderFamilie", quote: "Keine Kinderbetreuung im Haus." }],
        showWait: false,
        offer: { field: "passt", text: "Zu Eifelhöhe: Keine Kinderbetreuung im Haus." },
      }),
    );
    assert.ok(parsed);
    assert.equal(parsed.heading, "🏥 Klinik");
    assert.equal(parsed.offer?.field, "passt");
    const prose = parseLohlotsePayload("🧭 Überblick\n• Nur dieser Ordner.\n• Klinik nennen.");
    assert.equal(prose?.headingKey, "ueberblick");
    assert.equal(prose?.bullets.length, 2);
  });

  it("maps golden-turn JSON wait_time and merge_preview", () => {
    const parsed = parseLohlotsePayload({
      case_name: "Mira K.",
      focus_clinic_id: "ck-eifelhoehe",
      headingKey: "klinik",
      bullets: ["Im offiziellen Steckbrief unter Wohnen und Alltag: Angabe fehlt."],
      pane: {
        show_official: true,
        show_personal: true,
        official_state: "clinic",
        highlights: [
          { scope: "official", block_id: "WOHNEN_UND_ALLTAG", reason: "Verpflegung / Speiseraum im offiziellen Steck leer" },
        ],
      },
      wait_time: "none",
      action: "preview_merge",
      merge_preview: {
        target_heading: "Passung, die wir prüfen",
        proposed_bullets: [
          "Geprüft für Klinik X: Speiseraum auf der Klinikseite beschrieben.",
        ],
        style: "match_neighbors",
      },
      sources: [{ label: "Klinikseite Klinik X", stand: "03.09.2026" }],
    });
    assert.ok(parsed);
    assert.equal(parsed.headingKey, "klinik");
    assert.equal(parsed.showWait, false);
    assert.equal(parsed.offer?.field, "passt");
    assert.match(parsed.offer?.text ?? "", /Speiseraum/);
    assert.ok(parsed.highlights.some((item) => item.block === "wohnenAlltag"));
  });
});

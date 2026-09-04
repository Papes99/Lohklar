import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  coerceWaitEstimate,
  computeWaitEstimate,
  formatWaitLabel,
  summarizeWaitEstimates,
  type WaitClinic,
} from "./wait-time.ts";

const asOf = new Date("2026-09-03T12:00:00Z");

const base: WaitClinic = {
  id: "ck-see",
  waitBaseDays: 32,
  waitVarianceDays: 10,
  occupancyIndex: 1.12,
  genderSetting: "gemischt",
  placesEstimate: 118,
  aufnahmeModus: "rollierend nach Kostenzusage",
  kinderbetreuung: false,
  stateCode: "BY",
  indicationAreas: ["psychosomatik"],
  datenstand: {
    geprueft: "2026-09-01",
    quellen: "Musterprofil Lohklar",
  },
};

const peers: WaitClinic[] = [
  base,
  { ...base, id: "ck-a", waitBaseDays: 28, placesEstimate: 90 },
  { ...base, id: "ck-b", waitBaseDays: 36, placesEstimate: 70 },
  { ...base, id: "ck-c", waitBaseDays: 30, stateCode: "NW" },
];

describe("formatWaitLabel", () => {
  it("uses the fixed display line", () => {
    assert.equal(
      formatWaitLabel(8, 12, "2026-09-03"),
      "ca. 8–12 Wochen (Schätzung, Stand 03.09.2026)",
    );
  });
});

describe("computeWaitEstimate", () => {
  const estimate = computeWaitEstimate(base, {
    indication: "psychosomatik",
    asOf,
    peers,
  });

  it("is deterministic", () => {
    const again = computeWaitEstimate(base, {
      indication: "psychosomatik",
      asOf,
      peers,
    });
    assert.equal(again.label, estimate.label);
    assert.equal(again.weeksMin, estimate.weeksMin);
    assert.equal(again.weeksMax, estimate.weeksMax);
    assert.equal(again.uncertainty, estimate.uncertainty);
    assert.equal(again.formulaFilled, estimate.formulaFilled);
  });

  it("prints weeks with Stand, never a day house number in the headline", () => {
    assert.match(
      estimate.label,
      /^ca\. \d+(–\d+)? Wochen \(Schätzung, Stand \d{2}\.\d{2}\.\d{4}\)$/,
    );
    assert.equal(/\d+ Tage/.test(estimate.label), false);
    assert.equal(estimate.label.includes("Garantie"), false);
  });

  it("exposes eight weighted factors and the filled formula", () => {
    assert.equal(estimate.factors.length, 8);
    assert.equal(estimate.factors[0]?.nr, "1");
    assert.equal(estimate.factors[7]?.nr, "8");
    assert.match(estimate.formulaFilled, /T = /);
    assert.match(estimate.formulaFilled, /×/);
    assert.ok(estimate.sources.length >= 3);
    assert.ok(estimate.notMeaning.some((item) => item.includes("Aufnahmezusage")));
    assert.ok(estimate.notMeaning.some((item) => item.includes("Vorfahrt")));
  });

  it("uses a week span, not a single invented day", () => {
    assert.ok(estimate.weeksMax >= estimate.weeksMin);
    assert.ok(["schmal", "mittel", "breit"].includes(estimate.uncertainty));
    if (estimate.uncertainty !== "schmal") {
      assert.ok(estimate.weeksMax > estimate.weeksMin);
    }
  });

  it("lengthens dual-diagnosis vs psychosomatics", () => {
    const dual = computeWaitEstimate(base, {
      indication: "dual",
      asOf,
      peers,
    });
    assert.ok(dual.midDays >= estimate.midDays);
  });

  it("does not invent beds and widens when capacity is missing", () => {
    const bare = computeWaitEstimate(
      {
        id: "ck-test",
        waitBaseDays: 30,
        waitVarianceDays: 10,
        occupancyIndex: 1,
        genderSetting: "gemischt",
      },
      { indication: "sucht", asOf, month: 9 },
    );
    assert.equal(bare.uncertainty, "breit");
    assert.match(bare.factors.find((item) => item.nr === "3")?.effect ?? "", /keine Betten erfunden/i);
    assert.match(bare.label, /Schätzung/);
  });

  it("falls back to a wide band without clinic statement", () => {
    const empty = computeWaitEstimate(
      {
        id: "ck-empty",
        waitBaseDays: 0,
        waitVarianceDays: 0,
        occupancyIndex: 0,
        genderSetting: "gemischt",
      },
      { asOf },
    );
    assert.equal(empty.uncertainty, "breit");
    assert.equal(empty.weeksMin, 6);
    assert.equal(empty.weeksMax, 16);
    assert.match(empty.formula, /Keine Punktrechnung/);
  });
});

describe("coerce and summarize", () => {
  it("rebuilds the fixed label from an old snapshot", () => {
    const coerced = coerceWaitEstimate({
      clinicId: "ck-see",
      label: "ca. 5 Wochen",
      weeksMin: 5,
      weeksMax: 8,
      asOf: "2026-09-01",
      midDays: 40,
      minDays: 30,
      maxDays: 55,
      disclaimer: "alt",
      factors: [{ label: "Grundwert", effect: "32 Tage" }],
    });
    assert.ok(coerced);
    assert.equal(coerced.label, "ca. 5–8 Wochen (Schätzung, Stand 01.09.2026)");
    assert.equal(coerced.uncertainty, "mittel");
    assert.ok(coerced.notMeaning.length > 0);
  });

  it("summarizes with the same label format, no second formula", () => {
    const a = computeWaitEstimate(base, {
      indication: "psychosomatik",
      asOf,
      peers,
    });
    const summary = summarizeWaitEstimates([a, a], asOf);
    assert.ok(summary);
    assert.match(
      summary.label,
      /^ca\. \d+(–\d+)? Wochen \(Schätzung, Stand \d{2}\.\d{2}\.\d{4}\)$/,
    );
    assert.match(summary.factors[0]?.effect ?? "", /Keine neue Formel/);
  });
});

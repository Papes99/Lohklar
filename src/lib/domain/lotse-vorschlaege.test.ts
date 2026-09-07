import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CLINIC_SEED } from "./clinic-seed.ts";
import { emptyAnswers, rankClinics } from "./matching.ts";
import { generateLotseVorschlaege } from "./lotse-vorschlaege.ts";

describe("lotse-vorschlaege", () => {
  it("legt passende und unpassende Zeilen aus dem Lauf an, keine Rückmeldungen", () => {
    const answers = {
      ...emptyAnswers(),
      indication: "sucht" as const,
      bedarfe: ["alkohol"],
      states: ["NW"],
      roomPref: "einbett" as const,
      substitutionNeed: "ja" as const,
    };
    const matches = rankClinics(CLINIC_SEED, answers);
    const names = Object.fromEntries(CLINIC_SEED.map((clinic) => [clinic.id, clinic.shortName]));
    const drafts = generateLotseVorschlaege({
      runId: "run-1",
      answers,
      matches,
      clinicNames: names,
    });
    assert.ok(drafts.some((item) => item.section === "passt"));
    assert.ok(drafts.some((item) => item.section === "passt_nicht"));
    assert.equal(drafts.some((item) => item.section === "rueckmeldung"), false);
    assert.equal(drafts.every((item) => !/\d+\s*Tage/.test(item.body)), true);
    assert.equal(new Set(drafts.map((item) => item.sourceKey)).size, drafts.length);
  });

  it("stellt offene Fragen, wenn Angaben fehlen — ohne Aufnahmezusage", () => {
    const answers = { ...emptyAnswers(), indication: "sucht" as const, bedarfe: ["alkohol"] };
    const matches = rankClinics(CLINIC_SEED, answers);
    const drafts = generateLotseVorschlaege({
      runId: "run-2",
      answers,
      matches,
      clinicNames: { [matches[0]?.clinicId ?? "x"]: "TestHaus" },
    });
    assert.ok(drafts.some((item) => item.section === "fragen" && /Zimmerart/.test(item.body)));
    assert.ok(drafts.some((item) => item.section === "fragen" && /Region/.test(item.body)));
    assert.equal(drafts.some((item) => /Aufnahme zu|garant/i.test(item.body)), false);
  });

  it("liefert nichts ohne Lauf-Treffer", () => {
    assert.equal(
      generateLotseVorschlaege({
        runId: "run-3",
        answers: emptyAnswers(),
        matches: [],
        clinicNames: {},
      }).length,
      0,
    );
  });
});

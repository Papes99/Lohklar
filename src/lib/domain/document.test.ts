import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CLINIC_SEED } from "./clinic-seed.ts";
import { emptyAnswers, rankClinics } from "./matching.ts";
import {
  buildResultDocument,
  formulateNeeds,
  houseFeatures,
  isDocumentBody,
  moveItem,
  parkHouse,
  restoreHouse,
} from "./document.ts";
import type { KlaromatAnswers } from "./types.ts";

function sampleAnswers(over: Partial<KlaromatAnswers> = {}): KlaromatAnswers {
  return {
    ...emptyAnswers(),
    indication: "psychosomatik",
    bedarfe: ["depression", "angst"],
    states: ["BY"],
    genderSetting: "egal",
    setting: "stationaer",
    ahb: true,
    extras: ["trauma"],
    notes: "Mobilität mit ÖPNV klären.",
    ...over,
  };
}

describe("formulateNeeds", () => {
  it("writes results, not a question catalogue", () => {
    const text = formulateNeeds(sampleAnswers());
    assert.equal(text.includes("?"), false);
    assert.equal(/welche|bitte wählen|indikationsbereich:/i.test(text), false);
    assert.match(text, /psychosomatischen Rehabilitation/);
    assert.match(text, /Depressive Symptomatik/);
    assert.match(text, /Bayern/);
    assert.match(text, /Anschlussheilbehandlung/);
    assert.match(text, /Traumafokus/);
    assert.match(text, /keine Diagnose/i);
  });

  it("covers empty bedarfe without echoing a prompt", () => {
    const text = formulateNeeds(sampleAnswers({ bedarfe: [], extras: [], notes: "" }));
    assert.equal(text.includes("?"), false);
    assert.match(text, /keine engeren Arbeitsschwerpunkte/);
  });
});

describe("buildResultDocument", () => {
  const answers = sampleAnswers();
  const matches = rankClinics(CLINIC_SEED, answers);
  const body = buildResultDocument({
    clinics: CLINIC_SEED,
    answers,
    matches,
    generatedAt: "2026-09-03T18:00:00.000Z",
  });

  it("builds one house per ranked match with wait from C", () => {
    assert.ok(matches.length > 0);
    assert.equal(body.houses.length, matches.length);
    const first = body.houses[0];
    const match = matches[0];
    assert.ok(first && match);
    assert.equal(first.clinicId, match.clinicId);
    assert.equal(first.wait.label, match.wait.label);
    assert.equal(first.wait.midDays, match.wait.midDays);
    assert.equal(first.wait.asOf, match.wait.asOf);
    assert.match(first.location, /,/);
    assert.ok(first.fitSentence.includes(first.clinicName));
    assert.equal(first.fitSentence.includes("?"), false);
  });

  it("fills 3–5 official short features and prefilled hints", () => {
    for (const house of body.houses) {
      assert.ok(house.features.length >= 3 && house.features.length <= 5);
      assert.ok(house.hints.length > 20);
      assert.ok(house.specials.length > 0);
    }
    const seewiesen = CLINIC_SEED.find((clinic) => clinic.id === "ck-seewiesen");
    assert.ok(seewiesen);
    const features = houseFeatures(seewiesen);
    assert.ok(features.length >= 3 && features.length <= 5);
  });

  it("attaches an exterior mini photo when the official slot exists", () => {
    const withPhoto = body.houses.find((house) => house.photo);
    assert.ok(withPhoto?.photo?.path.startsWith("/clinics/"));
  });

  it("is a valid stored body", () => {
    assert.equal(isDocumentBody(body), true);
    assert.equal(isDocumentBody({}), false);
    assert.equal(body.staffNotes, "");
    assert.match(body.waitNote, /Schätzung/);
  });
});

describe("park and reorder", () => {
  it("removes a house from the document, not from the catalog", () => {
    const answers = sampleAnswers();
    const matches = rankClinics(CLINIC_SEED, answers);
    const body = buildResultDocument({ clinics: CLINIC_SEED, answers, matches });
    const id = body.houses[1]?.clinicId;
    assert.ok(id);
    const parked = parkHouse(body, id);
    assert.equal(parked.houses.some((house) => house.clinicId === id), false);
    assert.equal(parked.parked.some((house) => house.clinicId === id), true);
    assert.equal(CLINIC_SEED.some((clinic) => clinic.id === id), true);
    const back = restoreHouse(parked, id);
    assert.equal(back.houses.some((house) => house.clinicId === id), true);
  });

  it("moves houses with up/down indices", () => {
    const list = ["a", "b", "c"];
    assert.deepEqual(moveItem(list, 0, 2), ["b", "c", "a"]);
    assert.deepEqual(moveItem(list, 2, 0), ["c", "a", "b"]);
    assert.deepEqual(moveItem(list, 1, 1), list);
  });
});

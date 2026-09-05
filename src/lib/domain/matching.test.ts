import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CLINIC_SEED } from "./clinic-seed.ts";
import {
  coverageLabel,
  emptyAnswers,
  isBlocked,
  listedNeeds,
  normalizeAnswers,
  rankClinics,
} from "./matching.ts";

describe("rankClinics", () => {
  it("liefert eine Rangliste über den ganzen Katalog, sortiert nach Deckung", () => {
    const matches = rankClinics(CLINIC_SEED, {
      ...emptyAnswers(),
      indication: "sucht",
      bedarfe: ["alkohol"],
      states: ["NW"],
    });
    assert.equal(matches.length, CLINIC_SEED.length);
    assert.equal(matches[0]?.rank, 1);
    const viable = matches.filter((item) => !isBlocked(item));
    const blocked = matches.filter((item) => isBlocked(item));
    assert.ok(viable.length > 0);
    assert.ok(blocked.length > 0);
    for (let i = 1; i < viable.length; i += 1) {
      assert.ok((viable[i - 1]?.score ?? 0) >= (viable[i]?.score ?? 0));
    }
    const top = CLINIC_SEED.find((clinic) => clinic.id === matches[0]?.clinicId);
    assert.ok(top);
    assert.equal(top.stateCode, "NW");
    assert.ok(top.indicationAreas.includes("sucht") || top.indicationAreas.includes("dual"));
  });

  it("wertet Substanzen einzeln und schließt Häuser ohne Aufnahmeauftrag aus", () => {
    const matches = rankClinics(CLINIC_SEED, {
      ...emptyAnswers(),
      indication: "sucht",
      bedarfe: ["drogen"],
    });
    const wilhelmsheim = matches.find((item) => item.clinicId === "ck-auwald");
    const ratingen = matches.find((item) => item.clinicId === "ck-ratingen");
    const hoehenried = matches.find((item) => item.clinicId === "ck-seewiesen");
    assert.ok(wilhelmsheim && ratingen && hoehenried);
    assert.equal(isBlocked(wilhelmsheim), true);
    assert.equal(isBlocked(ratingen), false);
    assert.equal(isBlocked(hoehenried), true);
    assert.ok(ratingen.reasons.some((reason) => reason.criterion === "Illegale Drogen" && reason.status === "match"));
    assert.ok(wilhelmsheim.reasons.some((reason) => reason.criterion === "Illegale Drogen" && reason.status === "miss"));
    assert.ok((ratingen.rank ?? 99) < (wilhelmsheim.rank ?? 0));
  });

  it("schließt geschlechtsspezifische Häuser aus, die die Person nicht aufnehmen", () => {
    const forMan = rankClinics(CLINIC_SEED, {
      ...emptyAnswers(),
      indication: "sucht",
      personGender: "mann",
      bedarfe: ["alkohol"],
    });
    const huerth = forMan.find((item) => item.clinicId === "ck-elbmarsch");
    const falkenhof = forMan.find((item) => item.clinicId === "ck-bergstrasse");
    assert.ok(huerth && falkenhof);
    assert.equal(isBlocked(huerth), true);
    assert.equal(isBlocked(falkenhof), false);

    const forWoman = rankClinics(CLINIC_SEED, {
      ...emptyAnswers(),
      indication: "sucht",
      personGender: "frau",
      bedarfe: ["alkohol"],
    });
    const huerthW = forWoman.find((item) => item.clinicId === "ck-elbmarsch");
    const falkenhofW = forWoman.find((item) => item.clinicId === "ck-bergstrasse");
    assert.ok(huerthW && falkenhofW);
    assert.equal(isBlocked(huerthW), false);
    assert.equal(isBlocked(falkenhofW), true);
  });

  it("blockt Substitution, wenn sie weitergeführt werden muss", () => {
    const matches = rankClinics(CLINIC_SEED, {
      ...emptyAnswers(),
      indication: "sucht",
      bedarfe: ["drogen"],
      substitutionNeed: "ja",
    });
    const ratingen = matches.find((item) => item.clinicId === "ck-ratingen");
    const eusserthal = matches.find((item) => item.clinicId === "ck-eusserthal");
    assert.ok(ratingen && eusserthal);
    assert.equal(isBlocked(ratingen), false);
    assert.equal(isBlocked(eusserthal), true);
    assert.match(coverageLabel(ratingen), /von/);
  });

  it("blockt Häuser ohne Kinderbetreuung, wenn Kinder mit ins Haus sollen", () => {
    const matches = rankClinics(CLINIC_SEED, {
      ...emptyAnswers(),
      indication: "sucht",
      personGender: "frau",
      bedarfe: ["alkohol"],
      childrenNeed: "ja",
    });
    const huerth = matches.find((item) => item.clinicId === "ck-elbmarsch");
    const brilon = matches.find((item) => item.clinicId === "ck-rothaar");
    const ratingen = matches.find((item) => item.clinicId === "ck-ratingen");
    assert.ok(huerth && brilon && ratingen);
    assert.equal(isBlocked(huerth), false);
    assert.equal(isBlocked(brilon), false);
    assert.equal(isBlocked(ratingen), true);
    assert.ok((huerth.rank ?? 99) < (ratingen.rank ?? 0));
  });

  it("blockt AHB-Weg, wenn das Haus keine AHB ausweist", () => {
    const matches = rankClinics(CLINIC_SEED, {
      ...emptyAnswers(),
      indication: "psychosomatik",
      access: "ahb",
    });
    const hoehenried = matches.find((item) => item.clinicId === "ck-seewiesen");
    const roseneck = matches.find((item) => item.clinicId === "ck-roseneck");
    assert.ok(hoehenried && roseneck);
    assert.equal(isBlocked(hoehenried), false);
    assert.equal(isBlocked(roseneck), true);
  });

  it("hebt Essstörungshäuser, wenn Essverhalten gesetzt ist", () => {
    const matches = rankClinics(CLINIC_SEED, {
      ...emptyAnswers(),
      indication: "psychosomatik",
      bedarfe: ["ess"],
    });
    const roseneck = matches.find((item) => item.clinicId === "ck-roseneck");
    const hoehenried = matches.find((item) => item.clinicId === "ck-seewiesen");
    assert.ok(roseneck && hoehenried);
    assert.equal(isBlocked(roseneck), false);
    assert.ok(roseneck.reasons.some((reason) => reason.criterion === "Essverhalten" && reason.status === "match"));
    assert.ok(hoehenried.reasons.some((reason) => reason.criterion === "Essverhalten" && reason.status === "partial"));
    assert.ok((roseneck.rank ?? 99) < (hoehenried.rank ?? 0));
  });
});

describe("normalizeAnswers und listedNeeds", () => {
  it("zieht alte extras auf die Fachkraft-Felder", () => {
    const answers = normalizeAnswers({
      indication: "sucht",
      extras: ["kinder", "barrierefrei", "substitution"],
      bedarfe: ["alkohol", "substitution"],
    });
    assert.equal(answers.childrenNeed, "ja");
    assert.equal(answers.mobilityNeed, "ja");
    assert.equal(answers.substitutionNeed, "ja");
    assert.equal(answers.bedarfe.includes("substitution"), false);
    assert.ok(answers.extras.includes("kinder"));
  });

  it("listet nur gesetzte Anforderungen", () => {
    const needs = listedNeeds({
      ...emptyAnswers(),
      indication: "sucht",
      personGender: "frau",
      bedarfe: ["alkohol"],
      substitutionNeed: "ja",
      childrenNeed: "ja",
      states: ["NW"],
    });
    const criteria = needs.map((item) => item.criterion);
    assert.ok(criteria.includes("Indikation"));
    assert.ok(criteria.includes("Aufnahme nach Geschlecht"));
    assert.ok(criteria.includes("Alkohol"));
    assert.ok(criteria.includes("Substitution"));
    assert.ok(criteria.includes("Kinder / Eltern-Kind"));
    assert.ok(criteria.includes("Region"));
    assert.equal(criteria.includes("Barrierefreiheit"), false);
  });
});

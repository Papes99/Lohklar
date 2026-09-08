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
import { ROOM_FILTERS } from "./types.ts";

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

  it("blockt Adaptionshäuser nicht, wenn Stationär gesetzt ist — stuft sie als Teilpassung", () => {
    const matches = rankClinics(CLINIC_SEED, {
      ...emptyAnswers(),
      indication: "sucht",
      setting: "stationaer",
    });
    const adaption = matches.find((item) => item.clinicId === "ck-johannesbad-adaption-dortmund");
    const tagesklinik = CLINIC_SEED.find(
      (clinic) => clinic.setting === "tagesklinik" && clinic.indicationAreas.includes("sucht"),
    );
    assert.ok(adaption);
    assert.equal(isBlocked(adaption), false);
    assert.ok(
      adaption.reasons.some(
        (reason) => reason.criterion === "Behandlungssetting" && reason.status === "partial",
      ),
    );
    if (tagesklinik) {
      const row = matches.find((item) => item.clinicId === tagesklinik.id);
      assert.ok(row);
      assert.equal(isBlocked(row), true);
    }
  });

  it("nimmt bei Setting Adaption nur Adaptionshäuser, ohne die übrigen zu rangieren", () => {
    const matches = rankClinics(CLINIC_SEED, {
      ...emptyAnswers(),
      indication: "sucht",
      setting: "adaption",
    });
    const dortmund = matches.find((item) => item.clinicId === "ck-johannesbad-adaption-dortmund");
    const ratingen = matches.find((item) => item.clinicId === "ck-ratingen");
    assert.ok(dortmund && ratingen);
    assert.equal(isBlocked(dortmund), false);
    assert.equal(isBlocked(ratingen), true);
    assert.ok(
      dortmund.reasons.some(
        (reason) => reason.criterion === "Behandlungssetting" && reason.status === "match",
      ),
    );
    assert.ok((dortmund.rank ?? 99) < (ratingen.rank ?? 0));
    const viable = matches.filter((item) => !isBlocked(item));
    assert.ok(viable.length >= 1);
    for (const row of viable) {
      const clinic = CLINIC_SEED.find((item) => item.id === row.clinicId);
      assert.equal(clinic?.setting, "adaption");
    }
  });

  it("blockt Drogenhäuser ohne Alkohol-Auftrag, wenn Alkohol gesetzt ist", () => {
    const matches = rankClinics(CLINIC_SEED, {
      ...emptyAnswers(),
      indication: "sucht",
      bedarfe: ["alkohol"],
    });
    const prowo = matches.find((item) => item.clinicId === "ck-prowo");
    assert.ok(prowo);
    assert.equal(isBlocked(prowo), true);
    assert.ok(prowo.reasons.some((reason) => reason.criterion === "Alkohol" && reason.status === "miss"));
  });

  it("hebt Häuser am Wasser, ohne die übrigen auszuschließen", () => {
    const matches = rankClinics(CLINIC_SEED, {
      ...emptyAnswers(),
      indication: "psychosomatik",
      lagePref: "wasser",
    });
    const see = matches.find((item) => item.clinicId === "ck-seewiesen");
    const inland = matches.find((item) => item.clinicId === "ck-sonnenberg");
    assert.ok(see);
    assert.ok(inland);
    assert.equal(isBlocked(see), false);
    assert.equal(isBlocked(inland), false);
    assert.ok(see.reasons.some((reason) => reason.criterion === "Umgebung" && reason.status === "match"));
    assert.ok(inland.reasons.some((reason) => reason.criterion === "Umgebung" && reason.status === "partial"));
    assert.ok((see.rank ?? 99) < (inland.rank ?? 0));
  });

  it("hebt Inselhäuser, ohne Binnenlage auszuschließen", () => {
    const matches = rankClinics(CLINIC_SEED, {
      ...emptyAnswers(),
      indication: "psychosomatik",
      lagePref: "insel",
    });
    const island = matches.find((item) => item.clinicId === "ck-borkum");
    const inland = matches.find((item) => item.clinicId === "ck-sonnenberg");
    assert.ok(island);
    assert.ok(inland);
    assert.equal(isBlocked(island), false);
    assert.equal(isBlocked(inland), false);
    assert.ok(island.reasons.some((reason) => reason.criterion === "Umgebung" && reason.status === "match"));
    assert.ok((island.rank ?? 99) < (inland.rank ?? 0));
  });

  it("hebt MPU-Häuser und blockt Klinik statt Strafe nur ohne Anerkennung", () => {
    const mpuMatches = rankClinics(CLINIC_SEED, {
      ...emptyAnswers(),
      indication: "sucht",
      bedarfe: ["drogen"],
      mpuNeed: "ja",
    });
    const castrop = mpuMatches.find((item) => item.clinicId === "ck-salus-castrop");
    const ratingen = mpuMatches.find((item) => item.clinicId === "ck-ratingen");
    assert.ok(castrop && ratingen);
    assert.equal(isBlocked(castrop), false);
    assert.equal(isBlocked(ratingen), false);
    assert.ok(
      castrop.reasons.some((reason) => reason.criterion === "MPU-Vorbereitung" && reason.status === "match"),
    );
    assert.ok(
      ratingen.reasons.some((reason) => reason.criterion === "MPU-Vorbereitung" && reason.status === "miss"),
    );
    assert.ok((castrop.rank ?? 99) < (ratingen.rank ?? 0));

    const kssMatches = rankClinics(CLINIC_SEED, {
      ...emptyAnswers(),
      indication: "sucht",
      bedarfe: ["drogen"],
      klinikStattStrafeNeed: "ja",
    });
    const friedberg = kssMatches.find((item) => item.clinicId === "ck-salus-friedberg");
    const eusserthal = kssMatches.find((item) => item.clinicId === "ck-eusserthal");
    const suedergellersen = kssMatches.find((item) => item.clinicId === "ck-suedergellersen");
    const ratingenKss = kssMatches.find((item) => item.clinicId === "ck-ratingen");
    const huerthKss = kssMatches.find((item) => item.clinicId === "ck-elbmarsch");
    assert.ok(friedberg && eusserthal && suedergellersen && ratingenKss && huerthKss);
    assert.equal(isBlocked(friedberg), false);
    assert.equal(isBlocked(suedergellersen), false);
    assert.equal(isBlocked(ratingenKss), false);
    assert.equal(isBlocked(eusserthal), true);
    assert.equal(isBlocked(huerthKss), true);
    assert.ok(
      friedberg.reasons.some(
        (reason) => reason.criterion === "Klinik statt Strafe" && reason.status === "match",
      ),
    );
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

  it("führt Adaption als eigenes Setting", () => {
    const needs = listedNeeds({
      ...emptyAnswers(),
      indication: "sucht",
      setting: "adaption",
    });
    assert.ok(
      needs.some(
        (item) =>
          item.criterion === "Behandlungssetting" &&
          item.value === "Adaption (Anschlusswohnen nach Entwöhnung)",
      ),
    );
  });

  it("führt Umgebung Am Wasser als gesetzte Anforderung", () => {
    const needs = listedNeeds({
      ...emptyAnswers(),
      indication: "sucht",
      lagePref: "wasser",
    });
    assert.ok(needs.some((item) => item.criterion === "Umgebung" && item.value === "Am Wasser"));
  });

  it("führt Umgebung Insel als gesetzte Anforderung", () => {
    const needs = listedNeeds({
      ...emptyAnswers(),
      indication: "sucht",
      lagePref: "insel",
    });
    assert.ok(needs.some((item) => item.criterion === "Umgebung" && item.value === "Insel"));
  });

  it("führt MPU-Vorbereitung und Klinik statt Strafe als gesetzte Anforderungen", () => {
    const needs = listedNeeds({
      ...emptyAnswers(),
      indication: "sucht",
      mpuNeed: "ja",
      klinikStattStrafeNeed: "ja",
    });
    assert.ok(needs.some((item) => item.criterion === "MPU-Vorbereitung"));
    assert.ok(needs.some((item) => item.criterion === "Klinik statt Strafe"));
    assert.ok(
      needs.some((item) =>
        item.value.includes("Medizinisch-Psychologische Untersuchung"),
      ),
    );
    assert.ok(needs.some((item) => item.value.includes("Betäubungsmittelgesetz")));
  });

  it("formuliert Zimmerwünsche ohne interne IDs", () => {
    const einbett = listedNeeds({
      ...emptyAnswers(),
      indication: "sucht",
      roomPref: "einbett",
    });
    const keinMehrbett = listedNeeds({
      ...emptyAnswers(),
      indication: "sucht",
      roomPref: "kein-mehrbett",
    });
    assert.ok(
      einbett.some(
        (item) => item.criterion === "Zimmer" && item.value === "Einbettzimmer bevorzugt",
      ),
    );
    assert.ok(
      keinMehrbett.some(
        (item) => item.criterion === "Zimmer" && item.value === "kein Mehrbettzimmer (Zweibett ok)",
      ),
    );
    assert.equal(
      einbett.some((item) => /\beinbett\b|kein-mehrbett/i.test(`${item.criterion} ${item.value}`)),
      false,
    );
  });

  it("schreibt AHB, DRV und GKV in den gesetzten Anforderungen aus", () => {
    const ahbDrv = listedNeeds({
      ...emptyAnswers(),
      indication: "psychosomatik",
      access: "ahb",
      payer: "drv",
    });
    assert.ok(
      ahbDrv.some(
        (item) => item.criterion === "Zugang" && item.value === "Anschlussheilbehandlung (AHB) nach Krankenhaus",
      ),
    );
    assert.ok(
      ahbDrv.some(
        (item) =>
          item.criterion === "Kostenträger" &&
          item.value === "Deutsche Rentenversicherung (DRV)",
      ),
    );
    const hvGkv = listedNeeds({
      ...emptyAnswers(),
      indication: "psychosomatik",
      access: "heilverfahren",
      payer: "gkv",
    });
    assert.ok(
      hvGkv.some(
        (item) =>
          item.criterion === "Zugang" &&
          item.value === "Heilverfahren (geplante Reha nach Kostenzusage)",
      ),
    );
    assert.ok(
      hvGkv.some(
        (item) =>
          item.criterion === "Kostenträger" &&
          item.value === "Gesetzliche Krankenversicherung (GKV)",
      ),
    );
  });

  it("beschreibt Zimmer-Chips ohne interne IDs", () => {
    const einbett = ROOM_FILTERS.find((item) => item.id === "einbett");
    const keinMehrbett = ROOM_FILTERS.find((item) => item.id === "kein-mehrbett");
    assert.ok(einbett && /allein im Zimmer/.test(einbett.label));
    assert.ok(keinMehrbett && /Zweibett/.test(keinMehrbett.label));
    assert.match(einbett.label, /Einbettzimmer/);
    assert.match(keinMehrbett.label, /Kein Mehrbettzimmer/);
    assert.equal(/\beinbett\b|kein-mehrbett/.test(`${einbett.label} ${keinMehrbett.label}`), false);
  });
});

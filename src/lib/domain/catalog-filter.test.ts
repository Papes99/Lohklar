import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CLINIC_SEED } from "./clinic-seed.ts";
import {
  CATALOG_EDITIONS,
  catalogFilterActive,
  catalogPulse,
  clinicGaps,
  clinicSearchHits,
  emptyCatalogFilter,
  filterClinics,
  isClinicComplete,
} from "./catalog-filter.ts";
import { clinicHasLage } from "./lage.ts";
import { clinicCardTags } from "./types.ts";

describe("catalog completeness", () => {
  it("counts complete houses as a subset of the catalog", () => {
    const complete = CLINIC_SEED.filter(isClinicComplete);
    assert.ok(complete.length >= 1);
    assert.ok(complete.length <= CLINIC_SEED.length);
    assert.equal(CLINIC_SEED.length, 386);
    for (const clinic of complete) {
      assert.ok(clinic.photos.some((photo) => photo.slot === "aussen" && photo.imagePath));
      assert.ok(clinic.website.startsWith("https://"));
    }
  });

  it("names gaps without inventing contact data", () => {
    const missingZimmer = CLINIC_SEED.find(
      (clinic) => !clinic.photos.some((p) => p.slot === "zimmer_bad" && p.imagePath),
    );
    assert.ok(missingZimmer);
    assert.ok(clinicGaps(missingZimmer).includes("Zimmerfoto fehlt"));
    const missingPhone = CLINIC_SEED.find(
      (clinic) => !clinic.phone.trim() || /^angabe liegt nicht vor\.?$/i.test(clinic.phone.trim()),
    );
    if (missingPhone) {
      assert.ok(clinicGaps(missingPhone).includes("Telefon fehlt"));
    }
  });
});

describe("catalog filter", () => {
  it("returns all houses for an empty filter", () => {
    const rows = filterClinics(CLINIC_SEED, emptyCatalogFilter());
    assert.equal(rows.length, 386);
    assert.equal(catalogFilterActive(emptyCatalogFilter()), false);
  });

  it("finds a house by city typo", () => {
    const rows = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), q: "Bernrid" });
    assert.equal(rows[0]?.id, "ck-seewiesen");
  });

  it("filters Dualdiagnose and Einzelzimmer", () => {
    const dual = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), auftrag: "dual" });
    assert.ok(dual.length >= 1);
    assert.ok(dual.every((clinic) => clinic.indicationAreas.includes("dual")));
    const einzel = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), einzelzimmer: true });
    assert.ok(einzel.length >= 1);
    assert.ok(
      einzel.every((clinic) =>
        clinic.steckbrief.wohnenAlltag.chips.some(
          (chip) => chip.label === "Einbettzimmer" && chip.status === "vorhanden",
        ),
      ),
    );
  });

  it("filters complete houses only", () => {
    const rows = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), vollstaendig: true });
    assert.ok(rows.length >= 1);
    assert.ok(rows.every(isClinicComplete));
  });

  it("finds Adaption Dortmund across name and city", () => {
    const rows = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), q: "Adaption Dortmund" });
    assert.ok(rows.length >= 1);
    assert.equal(rows[0]?.city, "Dortmund");
    assert.equal(rows[0]?.setting, "adaption");
    assert.ok(rows.some((clinic) => clinic.id === "ck-johannesbad-adaption-dortmund"));
    assert.equal(
      rows.some((clinic) => clinic.city === "Kerpen"),
      false,
    );
  });

  it("finds a house by PLZ", () => {
    const rows = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), q: "82347" });
    assert.equal(rows[0]?.id, "ck-seewiesen");
  });

  it("filters Adaption, Glücksspiel, Traumafokus, junge Erwachsene, MPU and Klinik statt Strafe", () => {
    const adaption = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), setting: "adaption" });
    assert.ok(adaption.length >= 1);
    assert.ok(adaption.every((clinic) => clinic.setting === "adaption"));
    const stationaer = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), setting: "stationaer" });
    assert.ok(stationaer.every((clinic) => clinic.setting === "stationaer" || clinic.setting === "beides"));
    const glueck = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), gluecksspiel: true });
    assert.ok(glueck.length >= 1);
    assert.ok(glueck.every((clinic) => clinic.gluecksspiel));
    const trauma = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), trauma: true });
    assert.ok(trauma.length >= 1);
    assert.ok(trauma.every((clinic) => clinic.trauma));
    const junge = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), junge: true });
    assert.ok(junge.length >= 1);
    assert.ok(junge.every((clinic) => clinic.jungeErwachsene));
    const mpu = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), mpu: true });
    assert.ok(mpu.length >= 1);
    assert.ok(mpu.every((clinic) => clinic.mpu));
    assert.ok(mpu.some((clinic) => clinic.id === "ck-salus-castrop"));
    const kss = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), klinikStattStrafe: true });
    assert.ok(kss.length >= 1);
    assert.ok(kss.every((clinic) => clinic.klinikStattStrafe));
    assert.ok(kss.some((clinic) => clinic.id === "ck-salus-friedberg"));
    assert.ok(kss.some((clinic) => clinic.id === "ck-suedergellersen"));
    assert.equal(kss.some((clinic) => clinic.id === "ck-eusserthal"), false);
  });

  it("ranks multi-token queries by how many facts fit", () => {
    const glueckNrw = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), q: "Glücksspiel NRW" });
    assert.ok(glueckNrw.length >= 1);
    assert.ok(glueckNrw.every((clinic) => clinic.gluecksspiel && clinic.stateCode === "NW"));

    const traumaBayern = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), q: "Trauma Bayern" });
    assert.ok(traumaBayern.length >= 1);
    assert.ok(traumaBayern.every((clinic) => clinic.trauma && clinic.stateCode === "BY"));
    assert.equal(traumaBayern.some((clinic) => clinic.stateCode === "NW"), false);

    const hoehenried = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), q: "Höhenried Trauma" });
    assert.equal(hoehenried[0]?.id, "ck-seewiesen");

    const mpu = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), q: "MPU" });
    assert.ok(mpu.length >= 1);
    assert.ok(mpu.every((clinic) => clinic.mpu));
    assert.ok(mpu.some((clinic) => clinic.id === "ck-salus-castrop"));
    assert.ok(mpu.some((clinic) => clinic.id === "ck-eichelsdorf"));

    const btmg = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), q: "BtMG" });
    assert.ok(btmg.length >= 1);
    assert.ok(btmg.some((clinic) => clinic.klinikStattStrafe));
    assert.ok(btmg.some((clinic) => clinic.id === "ck-salus-friedberg"));
  });

  it("understands Fachsprache: NRW, PTBS, TK, Einzelzimmer, Mutter-Kind", () => {
    const nrw = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), q: "NRW" });
    assert.ok(nrw.length >= 1);
    assert.ok(nrw.every((clinic) => clinic.stateCode === "NW"));

    const ptbs = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), q: "PTBS" });
    assert.ok(ptbs.length >= 1);
    assert.ok(ptbs.every((clinic) => clinic.trauma));

    const tk = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), q: "TK" });
    assert.ok(tk.length >= 1);
    assert.ok(tk.every((clinic) => clinic.setting === "tagesklinik" || clinic.setting === "beides"));
    assert.equal(
      tk.some((clinic) => clinic.stateCode === "TH" && clinic.setting !== "tagesklinik" && clinic.setting !== "beides"),
      false,
    );

    const einzel = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), q: "Einzelzimmer Bayern" });
    assert.ok(einzel.length >= 1);
    assert.ok(einzel.every((clinic) => clinic.stateCode === "BY"));
    assert.ok(
      einzel.some((clinic) =>
        clinic.steckbrief.wohnenAlltag.chips.some(
          (chip) => chip.label === "Einbettzimmer" && chip.status === "vorhanden",
        ),
      ),
    );

    const mutter = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), q: "Mutter-Kind" });
    assert.ok(mutter.length >= 1);
    assert.ok(mutter.every((clinic) => clinic.kinderbetreuung));
  });

  it("filters Umgebung from the official lage line", () => {
    const wasser = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), lage: "wasser" });
    assert.ok(wasser.length >= 1);
    assert.ok(wasser.some((clinic) => clinic.id === "ck-seewiesen"));
    assert.ok(wasser.every((clinic) => clinicHasLage(clinic, "wasser")));
    assert.equal(wasser.some((clinic) => clinic.id === "ck-sonnenberg"), false);

    const qWasser = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), q: "Am Wasser" });
    assert.ok(qWasser.length >= 1);
    assert.ok(qWasser.some((clinic) => clinic.id === "ck-seewiesen"));

    const rural = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), lage: "laendlich" });
    assert.ok(rural.length >= 1);
    assert.ok(rural.some((clinic) => clinic.id === "ck-rothaar"));
    assert.ok(rural.every((clinic) => clinicHasLage(clinic, "laendlich")));
    assert.equal(rural.some((clinic) => clinic.id === "ck-oldenfelde"), false);

    const insel = filterClinics(CLINIC_SEED, { ...emptyCatalogFilter(), lage: "insel" });
    assert.ok(insel.some((clinic) => clinic.id === "ck-borkum"));
    assert.ok(insel.every((clinic) => clinicHasLage(clinic, "insel")));
  });
});

describe("clinicCardTags", () => {
  it("uses Alkohol, Drogen / Medikamente, then rarer extras", () => {
    const ratingen = CLINIC_SEED.find((clinic) => clinic.id === "ck-ratingen");
    const hoehenried = CLINIC_SEED.find((clinic) => clinic.id === "ck-seewiesen");
    const brilon = CLINIC_SEED.find((clinic) => clinic.id === "ck-rothaar");
    assert.ok(ratingen && hoehenried && brilon);
    assert.deepEqual(
      clinicCardTags(ratingen).slice(0, 2),
      ["Alkohol", "Drogen / Medikamente"],
    );
    assert.ok(clinicCardTags(hoehenried).includes("Einzelzimmer"));
    assert.equal(clinicCardTags(hoehenried).includes("Psychosomatik"), false);
    assert.equal(clinicCardTags(hoehenried).includes("Alkohol"), false);
    assert.equal(clinicCardTags(brilon).includes("Dualdiagnose"), false);
    assert.ok(clinicCardTags(brilon).includes("Alkohol"));
    assert.ok(clinicCardTags(CLINIC_SEED.find((c) => c.id === "ck-elbmarsch")!).includes("Frauen"));
    const castrop = CLINIC_SEED.find((c) => c.id === "ck-salus-castrop");
    const friedberg = CLINIC_SEED.find((c) => c.id === "ck-salus-friedberg");
    assert.ok(castrop && friedberg);
    assert.ok(clinicCardTags(castrop).includes("MPU-Vorbereitung"));
    assert.ok(clinicCardTags(friedberg).includes("Klinik statt Strafe"));
    assert.equal(clinicCardTags(castrop).includes("Klinik statt Strafe"), false);
  });
});

describe("catalog pulse", () => {
  it("covers 16 Länder and records the September 2026 editions", () => {
    const pulse = catalogPulse(CLINIC_SEED, "2026-08-31");
    assert.equal(pulse.houses, 386);
    assert.equal(pulse.statesCovered, 16);
    assert.equal(pulse.addedInPeriod, 447);
    assert.equal(pulse.pruefungenInPeriod, 984);
    assert.equal(pulse.complete + pulse.incomplete, 386);
    assert.equal(pulse.complete, 386);
    assert.equal(pulse.incomplete, 0);
    assert.ok(pulse.topGaps.length >= 1);
    assert.equal(CATALOG_EDITIONS.length, 13);
    const mid = catalogPulse(CLINIC_SEED, "2026-09-02");
    assert.equal(mid.addedInPeriod, 397);
    const before = catalogPulse(CLINIC_SEED, "2026-09-08");
    assert.equal(before.addedInPeriod, 0);
  });
});

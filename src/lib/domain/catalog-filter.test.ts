import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CLINIC_SEED } from "./clinic-seed.ts";
import {
  CATALOG_EDITIONS,
  catalogFilterActive,
  catalogPulse,
  clinicGaps,
  emptyCatalogFilter,
  filterClinics,
  isClinicComplete,
} from "./catalog-filter.ts";
import { clinicCardTags } from "./types.ts";

describe("catalog completeness", () => {
  it("counts complete houses as a subset of the catalog", () => {
    const complete = CLINIC_SEED.filter(isClinicComplete);
    assert.ok(complete.length >= 1);
    assert.ok(complete.length < CLINIC_SEED.length);
    for (const clinic of complete) {
      assert.ok(clinic.photos.some((photo) => photo.slot === "aussen" && photo.imagePath));
      assert.ok(clinic.website.startsWith("https://"));
    }
  });

  it("names gaps without inventing contact data", () => {
    const missingCover = CLINIC_SEED.find((clinic) => !clinic.photos.some((p) => p.slot === "aussen" && p.imagePath));
    assert.ok(missingCover);
    assert.ok(clinicGaps(missingCover).includes("Außenfoto fehlt"));
  });
});

describe("catalog filter", () => {
  it("returns all houses for an empty filter", () => {
    const rows = filterClinics(CLINIC_SEED, emptyCatalogFilter());
    assert.equal(rows.length, 250);
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
  });
});

describe("catalog pulse", () => {
  it("covers 16 Länder and records the September 2026 editions", () => {
    const pulse = catalogPulse(CLINIC_SEED, "2026-08-31");
    assert.equal(pulse.houses, 250);
    assert.equal(pulse.statesCovered, 16);
    assert.equal(pulse.addedInPeriod, 250);
    assert.equal(pulse.pruefungenInPeriod, 250);
    assert.equal(pulse.complete + pulse.incomplete, 250);
    assert.ok(pulse.topGaps.length >= 1);
    assert.equal(CATALOG_EDITIONS.length, 4);
    const mid = catalogPulse(CLINIC_SEED, "2026-09-02");
    assert.equal(mid.addedInPeriod, 200);
    const before = catalogPulse(CLINIC_SEED, "2026-09-06");
    assert.equal(before.addedInPeriod, 0);
  });
});

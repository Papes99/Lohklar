import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CLINIC_SEED } from "./clinic-seed.ts";
import { clinicHasLage, clinicLageLine, clinicLageTags } from "./lage.ts";

describe("clinicLageTags", () => {
  it("liest Am Wasser nur aus der offiziellen Lagezeile", () => {
    const see = CLINIC_SEED.find((clinic) => clinic.id === "ck-seewiesen");
    const inland = CLINIC_SEED.find((clinic) => clinic.id === "ck-sonnenberg");
    assert.ok(see && inland);
    assert.match(clinicLageLine(see), /Starnberger See/i);
    assert.ok(clinicHasLage(see, "wasser"));
    assert.equal(clinicHasLage(inland, "wasser"), false);
  });

  it("erkennt Inselhäuser zusätzlich zu Am Wasser", () => {
    const borkum = CLINIC_SEED.find((clinic) => clinic.id === "ck-borkum");
    assert.ok(borkum);
    assert.deepEqual(clinicLageTags(borkum).sort(), ["insel", "wasser"].sort());
  });

  it("nimmt Ruhrhalbinsel nicht als Am Wasser", () => {
    const kamillus = CLINIC_SEED.find((clinic) => clinic.id === "ck-kamillushaus");
    assert.ok(kamillus);
    assert.equal(clinicHasLage(kamillus, "wasser"), false);
    assert.equal(clinicHasLage(kamillus, "insel"), false);
  });

  it("erkennt ländliche Waldlage im Sauerland", () => {
    const brilon = CLINIC_SEED.find((clinic) => clinic.id === "ck-rothaar");
    assert.ok(brilon);
    assert.ok(clinicHasLage(brilon, "laendlich"));
    assert.ok(clinicHasLage(brilon, "gebirge"));
  });

  it("erkennt Großstadt über den Ortsnamen", () => {
    const hamburg = CLINIC_SEED.find((clinic) => clinic.id === "ck-oldenfelde");
    assert.ok(hamburg);
    assert.ok(clinicHasLage(hamburg, "stadt"));
    assert.equal(clinicHasLage(hamburg, "laendlich"), false);
  });

  it("taggt einen Teil des Katalogs, ohne Diagnoseprosa", () => {
    const counts = {
      wasser: CLINIC_SEED.filter((clinic) => clinicHasLage(clinic, "wasser")).length,
      insel: CLINIC_SEED.filter((clinic) => clinicHasLage(clinic, "insel")).length,
      laendlich: CLINIC_SEED.filter((clinic) => clinicHasLage(clinic, "laendlich")).length,
      stadt: CLINIC_SEED.filter((clinic) => clinicHasLage(clinic, "stadt")).length,
      kurort: CLINIC_SEED.filter((clinic) => clinicHasLage(clinic, "kurort")).length,
      gebirge: CLINIC_SEED.filter((clinic) => clinicHasLage(clinic, "gebirge")).length,
    };
    assert.ok(counts.wasser >= 20 && counts.wasser < 120);
    assert.ok(counts.insel >= 1 && counts.insel < 20);
    assert.ok(counts.laendlich >= 40);
    assert.ok(counts.stadt >= 40);
    assert.ok(counts.kurort >= 20);
    assert.ok(counts.gebirge >= 30);
    const tagged = CLINIC_SEED.filter((clinic) => clinicLageTags(clinic).length > 0);
    assert.ok(tagged.length >= 150);
    assert.ok(tagged.length < CLINIC_SEED.length);
  });
});

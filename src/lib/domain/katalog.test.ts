import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CLINIC_SEED } from "./clinic-seed.ts";
import { HOUSES } from "./katalog-houses.ts";
import { STECKBRIEFE } from "./steckbrief-seed.ts";
import { coverAuftragTag, coverSubstanceTags } from "./types.ts";

describe("katalog 250 echte Häuser", () => {
  it("hat genau 250 Häuser, 16 Länder, einzigartige IDs", () => {
    assert.equal(HOUSES.length, 250);
    assert.equal(CLINIC_SEED.length, 250);
    assert.equal(Object.keys(STECKBRIEFE).length, 250);
    const ids = new Set(HOUSES.map((h) => h.id));
    assert.equal(ids.size, 250);
    const states = new Set(HOUSES.map((h) => h.stateCode));
    assert.equal(states.size, 16);
  });

  it("lässt die ursprünglichen 50 Kern-IDs unangetastet", () => {
    const core = HOUSES.filter((h) => h.sortOrder <= 50);
    assert.equal(core.length, 50);
    assert.equal(core[0]?.id, "ck-seewiesen");
    assert.ok(HOUSES.some((h) => h.id === "ck-nordlicht"));
    assert.ok(HOUSES.some((h) => h.id === "ck-flechtingen"));
  });

  it("enthält keine Muster- oder example.org-Daten", () => {
    const blob = JSON.stringify(HOUSES);
    assert.equal(/Muster/i.test(blob), false);
    assert.equal(/example\.org/.test(blob), false);
    assert.equal(/0000-0/.test(blob), false);
  });

  it("nennt bei jedem Haus Substanzen, Zimmer und Wahlleistungen", () => {
    for (const clinic of CLINIC_SEED) {
      const ind = clinic.steckbrief.indikation.bullets.join(" ");
      assert.match(ind, /Alkohol/);
      assert.match(ind, /Drogen|Illegale Drogen/);
      assert.match(clinic.steckbrief.wohnenAlltag.bullets.join(" "), /Einbett|Zweibett|Mehrbett|Zimmerart/);
      assert.match(clinic.steckbrief.kostentraeger.bullets.join(" "), /Wahlleistung/);
      assert.match(clinic.steckbrief.medizin.bullets.join(" "), /Substitution/);
      assert.ok(clinic.website.startsWith("https://"));
    }
  });

  it("führt Suchtbehandlung nicht als Sammelchip, sondern nur die einzelnen Substanzen", () => {
    for (const clinic of CLINIC_SEED) {
      const labels = clinic.steckbrief.indikation.chips.map((chip) => chip.label);
      assert.equal(labels.includes("Sucht-Entwöhnung"), false);
      assert.equal(labels.includes("Suchtbehandlung"), false);
      assert.ok(labels.includes("Alkohol"));
      assert.ok(labels.includes("Drogen"));
      assert.ok(labels.includes("Medikamente"));
    }
  });

  it("beschriftet Fotos nach dem tatsächlichen Motiv, ohne doppelte Dateien", () => {
    const allowed = /^(Außenansicht|Zimmer \/ Bad|Umgebung \/ Lage|Speiseraum|Besonderheit)$/;
    for (const clinic of CLINIC_SEED) {
      const paths = clinic.photos.filter((photo) => photo.imagePath).map((photo) => photo.imagePath);
      assert.equal(new Set(paths).size, paths.length);
      for (const photo of clinic.photos) {
        if (!photo.imagePath) continue;
        assert.match(photo.caption, allowed);
        assert.doesNotMatch(photo.caption, /Arbeitstherapie|Therapiegarten|Ruheraum|Patientenzimmer/);
      }
    }
  });

  it("setzt Substanz-Tags nur bei tatsächlicher Aufnahme", () => {
    const hoehenried = CLINIC_SEED.find((c) => c.id === "ck-seewiesen");
    const ratingen = CLINIC_SEED.find((c) => c.id === "ck-ratingen");
    const wilhelmsheim = CLINIC_SEED.find((c) => c.id === "ck-auwald");
    assert.ok(hoehenried && ratingen && wilhelmsheim);
    assert.deepEqual(coverSubstanceTags(hoehenried), []);
    assert.deepEqual(coverSubstanceTags(ratingen), ["Alkohol", "Drogen", "Medikamente"]);
    assert.deepEqual(coverSubstanceTags(wilhelmsheim), ["Alkohol", "Medikamente"]);
  });

  it("setzt auf dem Titelbild den Auftrag, nicht die Substanzen", () => {
    const hoehenried = CLINIC_SEED.find((c) => c.id === "ck-seewiesen");
    const ratingen = CLINIC_SEED.find((c) => c.id === "ck-ratingen");
    const brilon = CLINIC_SEED.find((c) => c.id === "ck-rothaar");
    assert.ok(hoehenried && ratingen && brilon);
    assert.equal(coverAuftragTag(hoehenried), "Psychosomatik");
    assert.equal(coverAuftragTag(ratingen), "Suchtreha");
    assert.equal(coverAuftragTag(brilon), "Dualdiagnose");
  });

  it("hat bei neuen Häusern Website, Adresse, Indikation und vollständige Spec-Felder", () => {
    const sampleIds = ["ck-aggerblick", "ck-altenkirchen", "ck-kamillushaus", "ck-weihersmuehle", "ck-irmingard"];
    for (const id of sampleIds) {
      const house = HOUSES.find((item) => item.id === id);
      assert.ok(house, `fehlt: ${id}`);
      assert.ok(house.sortOrder > 50);
      assert.ok(house.website.startsWith("https://"));
      assert.ok(house.street.length > 1);
      assert.match(house.plz, /^\d{5}$/);
      assert.ok(house.city.length > 1);
      assert.ok(["sucht", "psychosomatik", "dual"].some((k) => house.indicationAreas.includes(k as typeof house.indicationAreas[0])));
      assert.equal(house.facts.length, 3);
      assert.ok(house.fokus.length > 10);
      assert.ok(house.lage.length > 5);
      const clinic = CLINIC_SEED.find((item) => item.id === id);
      assert.ok(clinic);
      assert.equal(clinic.steckbrief.indikation.bullets.length > 0, true);
      assert.ok(clinic.address.includes(house.city));
    }
  });
});

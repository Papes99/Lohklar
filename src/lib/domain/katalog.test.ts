import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CLINIC_SEED } from "./clinic-seed.ts";
import { HOUSES } from "./katalog-houses.ts";
import { STECKBRIEFE } from "./steckbrief-seed.ts";
import { coverAuftragTag, coverSubstanceTags, STECKBRIEF_BLOCKS } from "./types.ts";
import { AUFNAHME_BY_ID } from "./katalog-aufnahme.ts";

describe("katalog echte Häuser", () => {
  it("hat 16 Länder, einzigartige IDs und vollständige Seeds", () => {
    assert.equal(HOUSES.length, CLINIC_SEED.length);
    assert.equal(Object.keys(STECKBRIEFE).length, HOUSES.length);
    assert.ok(HOUSES.length >= 250);
    const ids = new Set(HOUSES.map((h) => h.id));
    assert.equal(ids.size, HOUSES.length);
    const states = new Set(HOUSES.map((h) => h.stateCode));
    assert.equal(states.size, 16);
  });

  it("lässt die ursprünglichen Kern-IDs unangetastet, soweit sie noch im Universum liegen", () => {
    const core = HOUSES.filter((h) => h.sortOrder <= 50);
    assert.equal(core.length, 45);
    assert.equal(core[0]?.id, "ck-seewiesen");
    assert.ok(HOUSES.some((h) => h.id === "ck-nordlicht"));
    assert.ok(HOUSES.some((h) => h.id === "ck-ratingen"));
    assert.equal(HOUSES.some((h) => h.id === "ck-flechtingen"), false);
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

  it("setzt MPU-Vorbereitung und Klinik statt Strafe nur bei belegten Häusern", () => {
    const castrop = CLINIC_SEED.find((c) => c.id === "ck-salus-castrop");
    const friedberg = CLINIC_SEED.find((c) => c.id === "ck-salus-friedberg");
    const eusserthal = CLINIC_SEED.find((c) => c.id === "ck-eusserthal");
    const suedergellersen = CLINIC_SEED.find((c) => c.id === "ck-suedergellersen");
    const fehmarn = CLINIC_SEED.find((c) => c.id === "ck-fehmarn");
    const eichelsdorf = CLINIC_SEED.find((c) => c.id === "ck-eichelsdorf");
    const waldsee = CLINIC_SEED.find((c) => c.id === "ck-median-waldsee");
    const ratingen = CLINIC_SEED.find((c) => c.id === "ck-ratingen");
    assert.ok(castrop && friedberg && eusserthal && suedergellersen && fehmarn);
    assert.ok(eichelsdorf && waldsee && ratingen);
    assert.equal(castrop.mpu, true);
    assert.equal(eichelsdorf.mpu, true);
    assert.equal(eichelsdorf.klinikStattStrafe, true);
    assert.equal(castrop.klinikStattStrafe, false);
    assert.equal(friedberg.klinikStattStrafe, true);
    assert.equal(ratingen.klinikStattStrafe, true);
    assert.equal(eusserthal.klinikStattStrafe, false);
    assert.equal(waldsee.klinikStattStrafe, false);
    assert.equal(suedergellersen.klinikStattStrafe, true);
    assert.equal(fehmarn.klinikStattStrafe, true);
    assert.match(suedergellersen.steckbrief.sozialdienst.bullets.join(" "), /§§ 35\/36 BtMG/);
    assert.match(castrop.steckbrief.sozialdienst.bullets.join(" "), /MPU-Vorbereitung/);
  });

  it("setzt belegte Zimmerart bei den am 07.09. aufgenommenen Suchthäusern", () => {
    const hof = CLINIC_SEED.find((c) => c.id === "ck-kompass-hof");
    const wolkersdorf = CLINIC_SEED.find((c) => c.id === "ck-wolkersdorf");
    const fehmarn = CLINIC_SEED.find((c) => c.id === "ck-fehmarn");
    const kieferngarten = CLINIC_SEED.find((c) => c.id === "ck-kieferngarten");
    const laim = CLINIC_SEED.find((c) => c.id === "ck-prop-laim");
    const suedergellersen = CLINIC_SEED.find((c) => c.id === "ck-suedergellersen");
    assert.ok(hof && wolkersdorf && fehmarn && kieferngarten && laim && suedergellersen);
    assert.ok(
      hof.steckbrief.wohnenAlltag.chips.some(
        (chip) => chip.label === "Einbettzimmer" && chip.status === "vorhanden",
      ),
    );
    assert.ok(
      wolkersdorf.steckbrief.wohnenAlltag.chips.some(
        (chip) => chip.label === "Zweibettzimmer" && chip.status === "vorhanden",
      ),
    );
    assert.ok(
      fehmarn.steckbrief.wohnenAlltag.chips.some(
        (chip) => chip.label === "Einbettzimmer" && chip.status === "vorhanden",
      ),
    );
    assert.ok(
      kieferngarten.steckbrief.wohnenAlltag.chips.some(
        (chip) => chip.label === "Einbettzimmer" && chip.status === "vorhanden",
      ),
    );
    assert.ok(
      laim.steckbrief.wohnenAlltag.chips.some(
        (chip) => chip.label === "Einbettzimmer" && chip.status === "vorhanden",
      ),
    );
    assert.ok(
      suedergellersen.steckbrief.wohnenAlltag.chips.some(
        (chip) => chip.label === "Zweibettzimmer" && chip.status === "vorhanden",
      ),
    );
    assert.ok(hof.photos.some((photo) => photo.slot === "aussen" && photo.imagePath));
    assert.ok(wolkersdorf.photos.some((photo) => photo.slot === "aussen" && photo.imagePath));
    assert.ok(fehmarn.photos.some((photo) => photo.slot === "aussen" && photo.imagePath));
    assert.ok(kieferngarten.photos.some((photo) => photo.slot === "aussen" && photo.imagePath));
    assert.ok(laim.photos.some((photo) => photo.slot === "aussen" && photo.imagePath));
    assert.ok(suedergellersen.photos.some((photo) => photo.slot === "aussen" && photo.imagePath));
  });

  it("führt Block 14 Aufnahmeunterlagen ohne erfundene Listen und ohne Wartezahl", () => {
    const block14 = STECKBRIEF_BLOCKS.find((item) => item.key === "aufnahmeunterlagen");
    assert.ok(block14);
    assert.equal(block14.nr, "14");
    assert.equal(block14.countsForComplete, false);
    for (const clinic of CLINIC_SEED) {
      const block = clinic.steckbrief.aufnahmeunterlagen;
      assert.deepEqual(
        block.chips.map((chip) => chip.label),
        ["Unterlagenliste", "Entgiftungspflicht", "Bearbeitungszeit"],
      );
      assert.match(block.bullets.join(" "), /Keine Aufnahmezusage/);
      assert.doesNotMatch(block.bullets.join(" "), /\d+\s*Tage/);
      assert.doesNotMatch(block.bullets.join(" "), /Sie müssen/);
    }
    const seewiesen = CLINIC_SEED.find((item) => item.id === "ck-seewiesen");
    assert.ok(seewiesen);
    assert.equal(
      seewiesen.steckbrief.aufnahmeunterlagen.chips.find((chip) => chip.label === "Unterlagenliste")?.status,
      "vorhanden",
    );
    assert.match(seewiesen.steckbrief.aufnahmeunterlagen.bullets.join(" "), /Kostenzusage|Befund|Medikament/);
    assert.match(seewiesen.steckbrief.aufnahmeunterlagen.bullets.join(" "), /Keine Aufnahmezusage/);

    const richelsdorf = CLINIC_SEED.find((item) => item.id === "ck-richelsdorf");
    assert.ok(richelsdorf);
    const rich = richelsdorf.steckbrief.aufnahmeunterlagen;
    assert.equal(rich.chips.find((chip) => chip.label === "Unterlagenliste")?.status, "vorhanden");
    assert.equal(rich.chips.find((chip) => chip.label === "Entgiftungspflicht")?.status, "vorhanden");
    assert.match(rich.bullets.join(" "), /Arztbericht/);
    assert.match(rich.bullets.join(" "), /Sozialbericht/);
    assert.match(rich.bullets.join(" "), /Kostenzusage/);

    const eichelsdorf = CLINIC_SEED.find((item) => item.id === "ck-eichelsdorf");
    assert.ok(eichelsdorf);
    assert.equal(
      eichelsdorf.steckbrief.aufnahmeunterlagen.chips.find((chip) => chip.label === "Entgiftungspflicht")
        ?.status,
      "vorhanden",
    );

    const nauheim = CLINIC_SEED.find((item) => item.id === "ck-nauheim");
    assert.ok(nauheim);
    assert.equal(
      nauheim.steckbrief.aufnahmeunterlagen.chips.find((chip) => chip.label === "Unterlagenliste")?.status,
      "vorhanden",
    );
    assert.match(nauheim.steckbrief.aufnahmeunterlagen.bullets.join(" "), /Freiwilligkeitserklärung/);
    assert.ok(Object.keys(AUFNAHME_BY_ID).length >= 150);
    for (const id of Object.keys(AUFNAHME_BY_ID)) {
      assert.ok(CLINIC_SEED.some((clinic) => clinic.id === id), id);
    }
  });

  it("füllt Blöcke 01–10 mit Träger und ohne leere Stichpunkte, höchstens 8", () => {
    for (const clinic of CLINIC_SEED) {
      for (const item of STECKBRIEF_BLOCKS.filter((block) => block.countsForComplete)) {
        const bullets = clinic.steckbrief[item.key].bullets;
        assert.ok(bullets.length >= 1 && bullets.length <= 8, clinic.id + " " + item.key);
        for (const bullet of bullets) {
          assert.ok(bullet.trim().length > 0, clinic.id);
          assert.doesNotMatch(bullet, /^\s*$/);
        }
      }
      assert.match(clinic.steckbrief.kostentraeger.bullets.join(" "), /Träger laut öffentlicher Angabe/);
      assert.match(clinic.steckbrief.therapie.bullets.join(" "), /Verfahren im Haus|Therapieverfahren/);
    }
    const seewiesen = CLINIC_SEED.find((item) => item.id === "ck-seewiesen");
    assert.ok(seewiesen);
    assert.match(seewiesen.steckbrief.indikation.bullets.join(" "), /Psychosomatische Rehabilitation/);
    assert.match(seewiesen.steckbrief.kostentraeger.bullets.join(" "), /Bayern Süd/);
    assert.match(seewiesen.steckbrief.besonderheiten.bullets.join(" "), /Starnberger See/);
  });

  it("zieht öffentlich belegte Overlay-Stichpunkte in Kontraindikation, Alltag und Therapie", () => {
    const seewiesen = CLINIC_SEED.find((item) => item.id === "ck-seewiesen");
    const wilhelmsheim = CLINIC_SEED.find((item) => item.id === "ck-auwald");
    assert.ok(seewiesen && wilhelmsheim);
    const contra = seewiesen.steckbrief.kontraindikation.bullets.join(" ");
    assert.match(contra, /Suizidalität|Psychosen/);
    assert.ok(seewiesen.steckbrief.therapie.bullets.length >= 2);
    assert.match(wilhelmsheim.steckbrief.therapie.bullets.join(" "), /Glücksspiel|Verfahren/);
    const aggerblick = CLINIC_SEED.find((item) => item.id === "ck-aggerblick");
    const wied = CLINIC_SEED.find((item) => item.id === "ck-median-wied");
    assert.ok(aggerblick && wied);
    assert.match(aggerblick.steckbrief.therapie.bullets.join(" "), /Kurzzeittherapie|22 Wochen/);
    assert.match(wied.steckbrief.wohnenAlltag.bullets.join(" "), /WLAN|Doppelzimmer/);
    for (const clinic of [seewiesen, wilhelmsheim, aggerblick, wied]) {
      for (const item of STECKBRIEF_BLOCKS.filter((block) => block.countsForComplete)) {
        assert.ok(clinic.steckbrief[item.key].bullets.length <= 8, clinic.id + " " + item.key);
      }
    }
  });

  it("setzt den Auftrag als Tag, nicht als Substanz", () => {
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

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  CATALOG_LOG,
  catalogLogInRange,
  filterCatalogLog,
  formatCatalogLogLine,
  housesAt,
} from "./catalog-log.ts";
import { berlinMidnight, dashRange } from "./usage.ts";

describe("catalog log", () => {
  it("records all houses as aufgenommen, Kern am 01.09., Erweiterung am 05.09.", () => {
    const aufgenommen = CATALOG_LOG.filter((entry) => entry.kind === "aufgenommen");
    const aktualisiert = CATALOG_LOG.filter((entry) => entry.kind === "aktualisiert");
    assert.equal(aufgenommen.length, 386);
    assert.ok(aktualisiert.length >= 1);
    const ids = new Set(CATALOG_LOG.map((entry) => entry.clinicId));
    assert.equal(ids.size, 386);
    const core = CATALOG_LOG.filter((entry) => entry.ymd === "2026-09-01");
    const extra = CATALOG_LOG.filter((entry) => entry.ymd === "2026-09-05");
    const wave4 = CATALOG_LOG.filter((entry) => entry.ymd === "2026-09-06");
    const program = CATALOG_LOG.filter((entry) => entry.ymd === "2026-09-07");
    assert.equal(core.length, 45);
    assert.equal(extra.length, 227);
    assert.equal(wave4.length, 108);
    assert.equal(program.filter((entry) => entry.kind === "aufgenommen").length, 6);
    assert.ok(program.some((entry) => entry.kind === "aktualisiert"));
  });

  it("formats the changelog line", () => {
    const hoehenried = CATALOG_LOG.find((entry) => entry.clinicId === "ck-seewiesen");
    assert.ok(hoehenried);
    assert.equal(formatCatalogLogLine(hoehenried), "01.09.2026  ·  Höhenried  ·  aufgenommen");
  });

  it("counts stock at the selected instant", () => {
    assert.equal(housesAt(berlinMidnight(2026, 8, 31)), 0);
    assert.equal(housesAt(berlinMidnight(2026, 9, 2)), 45);
    assert.equal(housesAt(berlinMidnight(2026, 9, 5)), 45);
    assert.equal(housesAt(berlinMidnight(2026, 9, 6)), 272);
    assert.equal(housesAt(berlinMidnight(2026, 9, 7)), 380);
    assert.equal(housesAt(berlinMidnight(2026, 9, 8)), 386);
  });

  it("scopes the log to Tag / Monat / Jahr", () => {
    const day = dashRange("day", "2026-09-04", new Date("2026-09-05T12:00:00+02:00"));
    assert.equal(catalogLogInRange(day.from, day.to).length, 0);
    const opened = dashRange("day", "2026-09-01", new Date("2026-09-05T12:00:00+02:00"));
    assert.equal(catalogLogInRange(opened.from, opened.to).length, 45);
    const extraDay = dashRange("day", "2026-09-05", new Date("2026-09-05T18:00:00+02:00"));
    assert.equal(catalogLogInRange(extraDay.from, extraDay.to).length, 227);
    const month = dashRange("month", "2026-09-05", new Date("2026-09-05T18:00:00+02:00"));
    assert.equal(catalogLogInRange(month.from, month.to).length, CATALOG_LOG.length);
    const year = dashRange("year", "2026-09-05", new Date("2026-09-05T18:00:00+02:00"));
    assert.equal(catalogLogInRange(year.from, year.to).length, CATALOG_LOG.length);
    const lastYear = dashRange("year", "2025-12-01", new Date("2026-09-05T18:00:00+02:00"));
    assert.equal(catalogLogInRange(lastYear.from, lastYear.to).length, 0);
  });

  it("filters Neu vs Geändert without rewriting official text", () => {
    const month = dashRange("month", "2026-09-05", new Date("2026-09-05T18:00:00+02:00"));
    const rows = catalogLogInRange(month.from, month.to);
    assert.equal(filterCatalogLog(rows, "neu").length, 386);
    assert.ok(filterCatalogLog(rows, "geaendert").length >= 1);
    assert.equal(filterCatalogLog(rows, "alle").length, CATALOG_LOG.length);
    assert.equal(rows[0]?.at >= rows[1]?.at, true);
  });
});


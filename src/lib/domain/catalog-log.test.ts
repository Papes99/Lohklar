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
  it("records 50 houses as aufgenommen on 2026-09-01, newest first in range", () => {
    assert.equal(CATALOG_LOG.length, 50);
    assert.ok(CATALOG_LOG.every((entry) => entry.kind === "aufgenommen"));
    assert.ok(CATALOG_LOG.every((entry) => entry.ymd === "2026-09-01"));
    const ids = new Set(CATALOG_LOG.map((entry) => entry.clinicId));
    assert.equal(ids.size, 50);
  });

  it("formats the changelog line", () => {
    const hoehenried = CATALOG_LOG.find((entry) => entry.clinicId === "ck-seewiesen");
    assert.ok(hoehenried);
    assert.equal(formatCatalogLogLine(hoehenried), "01.09.2026  ·  Höhenried  ·  aufgenommen");
  });

  it("counts stock at the selected instant", () => {
    assert.equal(housesAt(berlinMidnight(2026, 8, 31)), 0);
    assert.equal(housesAt(berlinMidnight(2026, 9, 2)), 50);
    assert.equal(housesAt(berlinMidnight(2026, 9, 5)), 50);
  });

  it("scopes the log to Tag / Monat / Jahr", () => {
    const day = dashRange("day", "2026-09-05", new Date("2026-09-05T12:00:00+02:00"));
    assert.equal(catalogLogInRange(day.from, day.to).length, 0);
    const opened = dashRange("day", "2026-09-01", new Date("2026-09-05T12:00:00+02:00"));
    assert.equal(catalogLogInRange(opened.from, opened.to).length, 50);
    const month = dashRange("month", "2026-09-05", new Date("2026-09-05T12:00:00+02:00"));
    assert.equal(catalogLogInRange(month.from, month.to).length, 50);
    const year = dashRange("year", "2026-09-05", new Date("2026-09-05T12:00:00+02:00"));
    assert.equal(catalogLogInRange(year.from, year.to).length, 50);
    const lastYear = dashRange("year", "2025-12-01", new Date("2026-09-05T12:00:00+02:00"));
    assert.equal(catalogLogInRange(lastYear.from, lastYear.to).length, 0);
  });

  it("filters Neu vs Geändert without rewriting official text", () => {
    const month = dashRange("month", "2026-09-05", new Date("2026-09-05T12:00:00+02:00"));
    const rows = catalogLogInRange(month.from, month.to);
    assert.equal(filterCatalogLog(rows, "neu").length, 50);
    assert.equal(filterCatalogLog(rows, "geaendert").length, 0);
    assert.equal(filterCatalogLog(rows, "alle").length, 50);
    assert.equal(rows[0]?.at >= rows[1]?.at, true);
  });
});

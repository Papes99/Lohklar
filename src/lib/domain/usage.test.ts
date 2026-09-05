import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  berlinMidnight,
  berlinParts,
  buildSeries,
  catalogPhotoStats,
  dashRange,
  emptySeries,
  periodRange,
  sanitizeUsage,
} from "./usage.ts";

describe("periodRange", () => {
  const thursday = new Date("2026-09-03T19:00:00+02:00");

  it("starts the week on Monday in Europe/Berlin", () => {
    const range = periodRange("woche", thursday);
    assert.equal(range.fromYmd, "2026-08-31");
    assert.equal(range.from.toISOString(), berlinMidnight(2026, 8, 31).toISOString());
  });

  it("starts the month on the first", () => {
    const range = periodRange("monat", thursday);
    assert.equal(range.fromYmd, "2026-09-01");
  });

  it("starts the year on 1 January Berlin time", () => {
    const range = periodRange("jahr", thursday);
    assert.equal(range.fromYmd, "2026-01-01");
    assert.equal(berlinMidnight(2026, 1, 1).toISOString(), "2025-12-31T23:00:00.000Z");
  });
});

describe("dashRange", () => {
  const now = new Date("2026-09-05T12:00:00+02:00");

  it("uses the calendar day in Europe/Berlin", () => {
    const range = dashRange("day", "2026-09-05", now);
    assert.equal(range.fromYmd, "2026-09-05");
    assert.equal(range.from.toISOString(), berlinMidnight(2026, 9, 5).toISOString());
    assert.equal(range.to.toISOString(), berlinMidnight(2026, 9, 6).toISOString());
  });

  it("uses the whole month", () => {
    const range = dashRange("month", "2026-09-05", now);
    assert.equal(range.fromYmd, "2026-09-01");
    assert.equal(range.to.toISOString(), berlinMidnight(2026, 10, 1).toISOString());
  });

  it("uses the calendar year", () => {
    const range = dashRange("year", "2026-09-05", now);
    assert.equal(range.fromYmd, "2026-01-01");
    assert.equal(range.to.toISOString(), berlinMidnight(2027, 1, 1).toISOString());
  });
});

describe("buildSeries", () => {
  it("buckets Tag as hours, Monat as days, Jahr as months", () => {
    const at = new Date("2026-09-01T10:30:00+02:00");
    assert.equal(berlinParts(at).hour, 10);
    const day = buildSeries("day", "2026-09-01", [{ at, mine: true }], [at]);
    assert.equal(day.length, 24);
    assert.equal(day[10]?.all, 1);
    assert.equal(day[10]?.me, 1);
    assert.equal(day[10]?.houses, 1);
    const month = buildSeries("month", "2026-09-05", [{ at, mine: false }], [at]);
    assert.equal(month.length, 30);
    assert.equal(month[0]?.houses, 1);
    assert.equal(month[0]?.all, 1);
    assert.equal(month[0]?.me, 0);
    const year = emptySeries("year", "2026-09-05");
    assert.equal(year.length, 12);
    assert.equal(year[8]?.label, "Sep");
  });
});

describe("catalogPhotoStats", () => {
  it("counts required slots without a file as placeholders", () => {
    const stats = catalogPhotoStats([
      {
        photos: [
          {
            slot: "aussen",
            caption: "x",
            alt: "x",
            imagePath: "/a.jpg",
            source: "oeffentlich",
            asOf: "09.2026",
          },
          {
            slot: "zimmer_bad",
            caption: "x",
            alt: "x",
            imagePath: null,
            source: "fehlt",
            asOf: "09.2026",
          },
        ],
      },
    ]);
    assert.equal(stats.withImage, 1);
    assert.equal(stats.placeholder, 2);
  });
});

describe("sanitizeUsage", () => {
  it("drops unknown kinds and free text", () => {
    assert.equal(sanitizeUsage({ kind: "chat_dump", meta: "Lea hat Depression" }), null);
    const ok = sanitizeUsage({ kind: "clinic_view", clinicId: "ck-seewiesen", meta: "desktop|new" });
    assert.equal(ok?.clinicId, "ck-seewiesen");
    assert.equal(ok?.meta, "desktop|new");
    const stripped = sanitizeUsage({ kind: "session", meta: "Schmidt, Lea sagte …" });
    assert.equal(stripped?.meta, "");
  });

  it("never keeps client names or diagnoses in meta", () => {
    const name = sanitizeUsage({ kind: "session", meta: "Schmidt, Lea" });
    assert.equal(name?.meta, "");
    const health = sanitizeUsage({ kind: "wait_shown", meta: "Diagnose F10.2" });
    assert.equal(health?.meta, "");
  });
});

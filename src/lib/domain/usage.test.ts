import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  berlinMidnight,
  catalogPhotoStats,
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

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  assertLabel,
  emptyDeadlines,
  isDocStatus,
  normalizeDate,
  seedAntragDocuments,
  summarizeAntragsweg,
  SEED_DOCUMENTS,
} from "./antragsweg.ts";

describe("antragsweg", () => {
  it("seeds one item per standard document", () => {
    const ids = SEED_DOCUMENTS.map((_, i) => `id-${i}`);
    const docs = seedAntragDocuments(ids);
    assert.equal(docs.length, SEED_DOCUMENTS.length);
    assert.equal(docs[0]?.key, "antrag_formular");
    assert.equal(docs[0]?.status, "fehlt");
  });

  it("returns four empty deadlines", () => {
    const deadlines = emptyDeadlines();
    assert.equal(deadlines.length, 4);
    assert.ok(deadlines.every((item) => item.date === null));
  });

  it("validates labels and dates", () => {
    assert.equal(assertLabel("  Sozialbericht  "), "Sozialbericht");
    assert.throws(() => assertLabel("x"), /mindestens zwei/);
    assert.equal(normalizeDate("2026-09-12"), "2026-09-12");
    assert.equal(normalizeDate(""), null);
    assert.throws(() => normalizeDate("12.09.2026"), /JJJJ-MM-TT/);
  });

  it("summarizes missing and overdue items", () => {
    const docs = seedAntragDocuments(SEED_DOCUMENTS.map((_, i) => `id-${i}`));
    docs[0]!.status = "vorhanden";
    docs[1]!.status = "angefordert";
    const summary = summarizeAntragsweg(
      {
        documents: docs,
        deadlines: [
          { kind: "antrag_eingereicht", date: "2026-08-01", note: "" },
          { kind: "entscheidung_erwartet", date: "2026-09-01", note: "" },
          { kind: "entscheidung_eingegangen", date: null, note: "" },
          { kind: "widerspruchsfrist", date: "2026-09-10", note: "" },
        ],
      },
      "2026-09-12",
    );
    assert.equal(summary.ready, 1);
    assert.equal(summary.requested, 1);
    assert.equal(summary.missing, SEED_DOCUMENTS.length - 2);
    assert.equal(summary.overdue, 2);
  });

  it("recognizes doc statuses", () => {
    assert.equal(isDocStatus("fehlt"), true);
    assert.equal(isDocStatus("fertig"), false);
  });
});

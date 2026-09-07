import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  isPersonalSection,
  linesFor,
  LINE_MAX,
  normalizeLineBody,
  pendingSuggestions,
  PERSONAL_SECTIONS,
} from "./personal-notes.ts";

describe("personal-notes", () => {
  it("kennt genau vier Abschnitte", () => {
    assert.deepEqual([...PERSONAL_SECTIONS], ["passt", "passt_nicht", "fragen", "rueckmeldung"]);
    assert.equal(isPersonalSection("passt"), true);
    assert.equal(isPersonalSection("wartezeit"), false);
  });

  it("normalisiert Zeilen und schneidet Textwände ab", () => {
    assert.equal(normalizeLineBody("  Einzelzimmer  möglich.  "), "Einzelzimmer möglich.");
    assert.equal(normalizeLineBody("   "), null);
    const long = "x".repeat(LINE_MAX + 40);
    assert.equal(normalizeLineBody(long)?.length, LINE_MAX);
  });

  it("ordnet Zeilen je Abschnitt", () => {
    const lines = [
      { id: "b", section: "passt" as const, body: "B", sortOrder: 2, createdAt: "2" },
      { id: "a", section: "passt" as const, body: "A", sortOrder: 1, createdAt: "1" },
      { id: "c", section: "fragen" as const, body: "C", sortOrder: 1, createdAt: "1" },
    ];
    assert.deepEqual(linesFor(lines, "passt").map((item) => item.body), ["A", "B"]);
    assert.equal(linesFor(lines, "rueckmeldung").length, 0);
  });

  it("zeigt höchstens sechs offene Vorschläge", () => {
    const items = Array.from({ length: 8 }, (_, i) => ({
      id: String(i),
      section: "passt" as const,
      body: `V${i}`,
      source: "lohlotse" as const,
      status: i === 0 ? ("accepted" as const) : ("pending" as const),
      acceptedLineId: null,
    }));
    assert.equal(pendingSuggestions(items).length, 6);
    assert.equal(pendingSuggestions(items).some((item) => item.status !== "pending"), false);
  });
});

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { filterFolders, normalizeName, scoreName } from "./folder-search.ts";

const folders = [
  { id: "1", clientName: "Müller, Anna" },
  { id: "2", clientName: "Schmidt, Lea" },
  { id: "3", clientName: "Schneider, Jonas" },
];

describe("folder-search", () => {
  it("normalizes umlauts", () => {
    assert.equal(normalizeName("Müller, Anna"), "mueller anna");
    assert.equal(normalizeName("Straße"), "strasse");
  });

  it("returns all folders for an empty query", () => {
    assert.equal(filterFolders(folders, "").length, 3);
  });

  it("matches a last-name typo (Schmidd → Schmidt, Lea)", () => {
    const hits = filterFolders(folders, "Schmidd");
    assert.equal(hits[0]?.clientName, "Schmidt, Lea");
    assert.ok(scoreName("Schmidd", "Schmidt, Lea") > 0);
  });

  it("matches umlaut typos (Mullr → Müller, Anna)", () => {
    const hits = filterFolders(folders, "Mullr");
    assert.equal(hits[0]?.clientName, "Müller, Anna");
  });

  it("matches reordered tokens with a typo", () => {
    const hits = filterFolders(folders, "Lea Schmidd");
    assert.equal(hits[0]?.clientName, "Schmidt, Lea");
  });

  it("does not invent a match", () => {
    assert.equal(filterFolders(folders, "xyzzy").length, 0);
  });
});

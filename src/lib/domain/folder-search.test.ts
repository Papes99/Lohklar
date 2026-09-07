import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { filterFolders, normalizeName, scoreAcrossFields, scoreName } from "./folder-search.ts";

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

  it("requires every token to hit somewhere across fields", () => {
    assert.ok(scoreAcrossFields("Adaption Dortmund", ["Adaption", "Dortmund", "Johannesbad"]) >= 64);
    assert.equal(scoreAcrossFields("Adaption Dortmund", ["Adaption", "Kerpen"]), 0);
    assert.ok(scoreAcrossFields("82347", ["Höhenried 40, 82347 Bernried"]) > 0);
  });

  it("does not treat two-letter codes as a prefix of a longer query", () => {
    assert.equal(scoreName("Bernrid", "BE"), 0);
    assert.equal(scoreAcrossFields("Bernrid", ["BE", "Berlin", "Hartmut-Spittler-Fachklinik"]), 0);
    assert.ok(scoreName("Bernrid", "Bernried") > 0);
  });

  it("does not fuzzy-match short codes onto unrelated tokens", () => {
    assert.equal(scoreName("NRW", "Dr. Becker Burg-Klinik"), 0);
    assert.equal(scoreName("NRW", "NRW"), 100);
    assert.equal(scoreName("TK", "Thüringen"), 0);
  });
});

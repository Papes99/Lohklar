import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { cleanProfileName, providerLabel } from "./profile.ts";

describe("cleanProfileName", () => {
  it("trims and rejects empty or overlong names", () => {
    assert.equal(cleanProfileName("  Julian Kerl  "), "Julian Kerl");
    assert.equal(cleanProfileName("   "), null);
    assert.equal(cleanProfileName("x".repeat(81)), null);
  });
});

describe("providerLabel", () => {
  it("maps known providers", () => {
    assert.equal(providerLabel("grok-google"), "Google");
    assert.equal(providerLabel("grok-x"), "X");
    assert.equal(providerLabel("credential"), "E-Mail");
    assert.equal(providerLabel("unknown"), null);
  });
});

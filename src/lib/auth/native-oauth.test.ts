import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import { nativeSocialProviders, socialSignInAvailable, useGrokPreviewBroker } from "./native-oauth.ts";

const KEYS = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "TWITTER_CLIENT_ID",
  "TWITTER_CLIENT_SECRET",
  "X_CLIENT_ID",
  "X_CLIENT_SECRET",
  "GROK_AUTH_CLIENT_ID",
  "DATABASE_URL",
] as const;

const saved: Record<string, string | undefined> = {};

function stash() {
  for (const key of KEYS) saved[key] = process.env[key];
}

function restore() {
  for (const key of KEYS) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
}

describe("nativeSocialProviders", () => {
  stash();
  afterEach(restore);

  it("is unset without credentials", () => {
    for (const key of KEYS) delete process.env[key];
    assert.equal(nativeSocialProviders(), undefined);
  });

  it("wires Google only when both id and secret exist", () => {
    for (const key of KEYS) delete process.env[key];
    process.env.GOOGLE_CLIENT_ID = "id.apps.googleusercontent.com";
    process.env.GOOGLE_CLIENT_SECRET = "secret";
    assert.deepEqual(nativeSocialProviders(), {
      google: { clientId: "id.apps.googleusercontent.com", clientSecret: "secret" },
    });
  });
});

describe("useGrokPreviewBroker", () => {
  stash();
  afterEach(restore);

  it("is true only in preview (no DATABASE_URL, no grok client)", () => {
    for (const key of KEYS) delete process.env[key];
    assert.equal(useGrokPreviewBroker(), true);
    process.env.DATABASE_URL = "postgres://example";
    assert.equal(useGrokPreviewBroker(), false);
    assert.deepEqual(socialSignInAvailable(), { google: false, x: false });
  });
});

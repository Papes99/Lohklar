import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { AUTH_COOKIE_NAMES, expireHostCookieHeader } from "./logout-cookies.ts";

describe("expireHostCookieHeader", () => {
  it("expires __Host- cookies without Domain", () => {
    const header = expireHostCookieHeader(AUTH_COOKIE_NAMES[0]);
    assert.match(header, /^__Host-grok-auth\.session_token=; Max-Age=0; Path=\/; HttpOnly; Secure; SameSite=Lax$/);
    assert.equal(header.includes("Domain="), false);
  });

  it("covers token and session cache cookies", () => {
    assert.ok(AUTH_COOKIE_NAMES.includes("__Host-grok-auth.session_token"));
    assert.ok(AUTH_COOKIE_NAMES.includes("__Host-grok-auth.session_data"));
  });
});

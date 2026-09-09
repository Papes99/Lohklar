import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  AUTH_COOKIE_NAMES,
  expireHostCookieHeader,
  expireHostCookieHeaderVariants,
  namesToExpire,
} from "./logout-cookies.ts";

describe("expireHostCookieHeader", () => {
  it("expires __Host- cookies without Domain and with a past Expires", () => {
    const header = expireHostCookieHeader(AUTH_COOKIE_NAMES[0]);
    assert.match(
      header,
      /^__Host-grok-auth\.session_token=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=\/; HttpOnly; Secure; SameSite=Lax$/,
    );
    assert.equal(header.includes("Domain="), false);
  });

  it("covers token, session cache, and gate marker cookies", () => {
    assert.ok(AUTH_COOKIE_NAMES.includes("__Host-grok-auth.session_token"));
    assert.ok(AUTH_COOKIE_NAMES.includes("__Host-grok-auth.session_data"));
    assert.ok(AUTH_COOKIE_NAMES.includes("__Host-grok_gate_session"));
  });

  it("emits HttpOnly and non-HttpOnly variants", () => {
    const [httpOnly, open] = expireHostCookieHeaderVariants("__Host-grok-auth.session_data");
    assert.ok(httpOnly.includes("HttpOnly"));
    assert.equal(open.includes("HttpOnly"), false);
    assert.ok(open.includes("Max-Age=0"));
  });
});

describe("namesToExpire", () => {
  it("includes Better Auth chunk names even without a Cookie header", () => {
    const names = namesToExpire(null);
    assert.ok(names.includes("__Host-grok-auth.session_data"));
    assert.ok(names.includes("__Host-grok-auth.session_data.0"));
    assert.ok(names.includes("__Host-grok-auth.session_data.19"));
    assert.ok(names.includes("__Host-grok-auth.account_data.0"));
  });

  it("picks chunk names off the incoming Cookie header", () => {
    const names = namesToExpire(
      "__Host-grok-auth.session_data.0=aaa; __Host-grok-auth.session_data.1=bbb; other=1",
    );
    assert.ok(names.includes("__Host-grok-auth.session_data.0"));
    assert.ok(names.includes("__Host-grok-auth.session_data.1"));
    assert.equal(names.includes("other"), false);
  });
});

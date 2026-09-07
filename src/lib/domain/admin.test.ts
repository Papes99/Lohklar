import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isAdminIdentity } from "./admin.ts";

describe("isAdminIdentity", () => {
  it("accepts the Google admin email, case-insensitive", () => {
    assert.equal(isAdminIdentity({ email: "juliankerl1999@gmail.com" }), true);
    assert.equal(isAdminIdentity({ email: "JulianKerl1999@Gmail.com" }), true);
  });

  it("accepts the Kerlwerk X account id", () => {
    assert.equal(
      isAdminIdentity({
        accounts: [{ providerId: "grok-x", accountId: "2340176679" }],
      }),
      true,
    );
  });

  it("accepts grok-x plus handle in name or email local-part", () => {
    assert.equal(
      isAdminIdentity({
        name: "Kerlwerk",
        accounts: [{ providerId: "grok-x", accountId: "other" }],
      }),
      true,
    );
    assert.equal(
      isAdminIdentity({
        email: "kerlwerk@x.placeholder",
        accounts: [{ providerId: "twitter", accountId: "other" }],
      }),
      true,
    );
  });

  it("rejects staff, renamed accounts without X, and empty", () => {
    assert.equal(isAdminIdentity({ email: "qa-dash@lohlklar.local" }), false);
    assert.equal(isAdminIdentity({ email: "juliankerl1999@gmail.com.evil.test" }), false);
    assert.equal(isAdminIdentity({ name: "Kerlwerk" }), false);
    assert.equal(isAdminIdentity({}), false);
  });
});

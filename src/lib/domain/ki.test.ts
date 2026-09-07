import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  composeKiFallback,
  hasWaitNumber,
  sanitizeKiReply,
  stripWaitNumbers,
} from "./ki.ts";

describe("stripWaitNumbers", () => {
  it("removes week and day spans", () => {
    assert.equal(hasWaitNumber("ca. 8–11 Wochen"), true);
    assert.equal(stripWaitNumbers("Schätzung ca. 8–11 Wochen laut Profil.").includes("Wochen"), false);
  });
});

describe("sanitizeKiReply", () => {
  it("strips wait numbers from model prose", () => {
    const clean = sanitizeKiReply("In der Eifelhöhe wartet man ca. 8–11 Wochen.");
    assert.equal(hasWaitNumber(clean), false);
  });
});

describe("composeKiFallback", () => {
  it("answers wait without inventing a number", () => {
    const reply = composeKiFallback("Wie lange ist die Wartezeit?");
    assert.match(reply, /Wartezeit-Komponente/);
    assert.equal(hasWaitNumber(reply), false);
    assert.match(reply, /Aufnahmezusage/);
  });

  it("explains Klar-o-Mat", () => {
    const reply = composeKiFallback("Was macht der Klar-o-Mat?");
    assert.match(reply, /Klar-o-Mat/);
    assert.match(reply, /Durchlauf 1/);
  });

  it("refuses diagnosis framing", () => {
    const reply = composeKiFallback("Können Sie eine Diagnose stellen?");
    assert.match(reply, /orientiert nur|Diagnosen/i);
  });
});

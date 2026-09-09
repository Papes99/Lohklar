import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createInviteToken, hashInviteToken } from "./team-token.ts";
import {
  canAssignFolder,
  canManageTeam,
  canUnassignFolder,
  cleanInviteEmail,
  cleanTeamName,
  emailsMatch,
  inviteExpiresAt,
  invitePath,
  inviteUrl,
  isInviteOpen,
  removalBlock,
  safeReturnPath,
} from "./teams.ts";

describe("Team-Namen und Einladungs-E-Mail", () => {
  it("nimmt Beratungsstellennamen an und lehnt Leer- oder Überlänge ab", () => {
    assert.equal(cleanTeamName("  Beratungsstelle Altona  "), "Beratungsstelle Altona");
    assert.equal(cleanTeamName("A"), null);
    assert.equal(cleanTeamName("x".repeat(81)), null);
  });

  it("normalisiert E-Mail kleingeschrieben", () => {
    assert.equal(cleanInviteEmail("  Fachkraft@Beispiel.de "), "fachkraft@beispiel.de");
    assert.equal(cleanInviteEmail("ohne-at"), null);
    assert.ok(emailsMatch("A@B.de", "a@b.de"));
  });
});

describe("Einladungstoken", () => {
  it("hasht den Rohwert, speichert ihn nicht im Hash", () => {
    const first = createInviteToken();
    const second = createInviteToken();
    assert.notEqual(first.raw, second.raw);
    assert.equal(first.hash, hashInviteToken(first.raw));
    assert.equal(first.hash.includes(first.raw), false);
    assert.match(first.hash, /^[a-f0-9]{64}$/);
  });

  it("ist 14 Tage offen und danach geschlossen", () => {
    const now = new Date("2026-09-09T00:00:00.000Z");
    const expires = inviteExpiresAt(now);
    assert.equal(isInviteOpen("offen", expires, now), true);
    assert.equal(isInviteOpen("offen", expires, new Date(expires.getTime() + 1)), false);
    assert.equal(isInviteOpen("widerrufen", expires, now), false);
    assert.equal(isInviteOpen("angenommen", expires, now), false);
  });

  it("baut den Einladungsweg ohne Open-Redirect", () => {
    assert.equal(invitePath("abc+token"), "/einladung/abc%2Btoken");
    assert.equal(inviteUrl("https://lohklar.de/", "t"), "https://lohklar.de/einladung/t");
    assert.equal(safeReturnPath("/einladung/abc"), "/einladung/abc");
    assert.equal(safeReturnPath("/app/team"), "/app/team");
    assert.equal(safeReturnPath("https://evil.example/x"), null);
    assert.equal(safeReturnPath("//evil"), null);
    assert.equal(safeReturnPath("/login"), null);
  });
});

describe("Rechte", () => {
  it("lässt nur die Leitung verwalten", () => {
    assert.equal(canManageTeam("leitung"), true);
    assert.equal(canManageTeam("mitglied"), false);
    assert.equal(canManageTeam(null), false);
  });

  it("blockt das Entfernen der letzten Leitung", () => {
    assert.equal(
      removalBlock({
        actorRole: "leitung",
        targetRole: "leitung",
        targetIsSelf: false,
        leitungCount: 1,
      }),
      "Die letzte Leitung kann nicht entfernt werden.",
    );
    assert.equal(
      removalBlock({
        actorRole: "mitglied",
        targetRole: "mitglied",
        targetIsSelf: false,
        leitungCount: 1,
      }),
      "Nur die Leitung darf Mitglieder entfernen.",
    );
    assert.equal(
      removalBlock({
        actorRole: "leitung",
        targetRole: "mitglied",
        targetIsSelf: false,
        leitungCount: 1,
      }),
      null,
    );
  });

  it("ordnet Fälle nur die besitzende Person zu, die selbst Mitglied ist", () => {
    assert.equal(canAssignFolder({ isOwner: true, isMember: true }), true);
    assert.equal(canAssignFolder({ isOwner: true, isMember: false }), false);
    assert.equal(canAssignFolder({ isOwner: false, isMember: true }), false);
    assert.equal(canUnassignFolder({ isOwner: true, actorRole: "mitglied" }), true);
    assert.equal(canUnassignFolder({ isOwner: false, actorRole: "leitung" }), true);
    assert.equal(canUnassignFolder({ isOwner: false, actorRole: "mitglied" }), false);
  });
});

describe("Ablauf anlegen, einladen, annehmen, widerrufen", () => {
  it("führt den MVP-Pfad ohne SQL", () => {
    const world = emptyWorld();
    const team = createTeam(world, { actor: "u-leitung", name: "Beratungsstelle Altona" });
    assert.equal(team.role, "leitung");
    assert.equal(world.members.length, 1);

    const invite = inviteMember(world, {
      actor: "u-leitung",
      teamId: team.id,
      email: "kollegin@example.org",
    });
    assert.equal(invite.status, "offen");
    assert.match(invite.url, /\/einladung\//);

    assert.throws(
      () =>
        acceptInvite(world, {
          actor: "u-fremd",
          email: "anders@example.org",
          raw: invite.raw,
        }),
      /gilt für/,
    );

    const accepted = acceptInvite(world, {
      actor: "u-kollegin",
      email: "Kollegin@example.org",
      raw: invite.raw,
    });
    assert.equal(accepted.role, "mitglied");
    assert.equal(world.members.length, 2);

    const second = inviteMember(world, {
      actor: "u-leitung",
      teamId: team.id,
      email: "hospitanz@example.org",
    });
    revokeInvite(world, { actor: "u-leitung", inviteId: second.id });
    assert.throws(
      () =>
        acceptInvite(world, {
          actor: "u-hosp",
          email: "hospitanz@example.org",
          raw: second.raw,
        }),
      /nicht mehr gültig/,
    );

    removeMember(world, { actor: "u-leitung", teamId: team.id, userId: "u-kollegin" });
    assert.equal(world.members.length, 1);
    assert.throws(
      () => removeMember(world, { actor: "u-leitung", teamId: team.id, userId: "u-leitung" }),
      /letzte Leitung/,
    );
  });
});

type Member = { teamId: string; userId: string; role: "leitung" | "mitglied" };
type Invite = {
  id: string;
  teamId: string;
  email: string;
  hash: string;
  raw: string;
  status: "offen" | "angenommen" | "widerrufen";
  expiresAt: Date;
  url: string;
};
type World = { teams: { id: string; name: string }[]; members: Member[]; invites: Invite[] };

function emptyWorld(): World {
  return { teams: [], members: [], invites: [] };
}

function createTeam(world: World, input: { actor: string; name: string }) {
  const name = cleanTeamName(input.name);
  if (!name) throw new Error("Name fehlt.");
  const id = `team-${world.teams.length + 1}`;
  world.teams.push({ id, name });
  world.members.push({ teamId: id, userId: input.actor, role: "leitung" });
  return { id, name, role: "leitung" as const };
}

function roleOf(world: World, teamId: string, userId: string) {
  return world.members.find((row) => row.teamId === teamId && row.userId === userId)?.role ?? null;
}

function inviteMember(world: World, input: { actor: string; teamId: string; email: string }) {
  if (!canManageTeam(roleOf(world, input.teamId, input.actor))) {
    throw new Error("Nur die Leitung darf einladen.");
  }
  const email = cleanInviteEmail(input.email);
  if (!email) throw new Error("E-Mail ungültig.");
  if (world.members.some((row) => row.teamId === input.teamId && row.userId === email)) {
    throw new Error("Bereits Mitglied.");
  }
  const token = createInviteToken();
  const invite: Invite = {
    id: `inv-${world.invites.length + 1}`,
    teamId: input.teamId,
    email,
    hash: token.hash,
    raw: token.raw,
    status: "offen",
    expiresAt: inviteExpiresAt(),
    url: inviteUrl("https://lohklar.de", token.raw),
  };
  world.invites.push(invite);
  return invite;
}

function acceptInvite(world: World, input: { actor: string; email: string; raw: string }) {
  const hash = hashInviteToken(input.raw);
  const invite = world.invites.find((row) => row.hash === hash);
  if (!invite || !isInviteOpen(invite.status, invite.expiresAt)) {
    throw new Error("Einladung nicht mehr gültig.");
  }
  if (!emailsMatch(invite.email, input.email)) {
    throw new Error(`Diese Einladung gilt für ${invite.email}.`);
  }
  invite.status = "angenommen";
  world.members.push({ teamId: invite.teamId, userId: input.actor, role: "mitglied" });
  return { role: "mitglied" as const };
}

function revokeInvite(world: World, input: { actor: string; inviteId: string }) {
  const invite = world.invites.find((row) => row.id === input.inviteId);
  if (!invite) throw new Error("Einladung nicht gefunden.");
  if (!canManageTeam(roleOf(world, invite.teamId, input.actor))) {
    throw new Error("Nur die Leitung darf einladen.");
  }
  invite.status = "widerrufen";
}

function removeMember(world: World, input: { actor: string; teamId: string; userId: string }) {
  const target = world.members.find((row) => row.teamId === input.teamId && row.userId === input.userId);
  if (!target) throw new Error("Mitglied nicht gefunden.");
  const leitungCount = world.members.filter((row) => row.teamId === input.teamId && row.role === "leitung").length;
  const block = removalBlock({
    actorRole: roleOf(world, input.teamId, input.actor),
    targetRole: target.role,
    targetIsSelf: input.actor === input.userId,
    leitungCount,
  });
  if (block) throw new Error(block);
  world.members = world.members.filter((row) => !(row.teamId === input.teamId && row.userId === input.userId));
}

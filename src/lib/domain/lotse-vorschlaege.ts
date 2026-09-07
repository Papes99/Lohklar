import { isBlocked } from "./matching.ts";
import {
  isPersonalSection,
  normalizeLineBody,
  type PersonalSection,
} from "./personal-notes.ts";
import type { KlaromatAnswers, MatchSnapshot } from "./types.ts";

export type LotseDraft = {
  section: PersonalSection;
  body: string;
  sourceKey: string;
};

const WAIT_NUMBER = /\d+\s*(Tage|Tag|Wochen|Woche)\b/;

function houseName(id: string, names: Record<string, string>): string {
  return names[id] ?? "dieses Haus";
}

function shortReason(detail: string): string {
  return detail.replace(/\s+/g, " ").replace(/\.+$/, "").trim();
}

function key(runId: string, section: PersonalSection, body: string): string {
  const slug = body.toLowerCase().replace(/[^a-z0-9äöüß]+/gi, "-").slice(0, 80);
  return `run:${runId}:${section}:${slug}`;
}

function pushUnique(
  out: LotseDraft[],
  seen: Set<string>,
  runId: string,
  section: PersonalSection,
  raw: string,
): void {
  if (out.filter((item) => item.section === section).length >= 4) return;
  const body = normalizeLineBody(raw);
  if (!body) return;
  if (WAIT_NUMBER.test(body)) return;
  if (/aufnahme zu|garant|diagnos/i.test(body)) return;
  const sourceKey = key(runId, section, body);
  if (seen.has(sourceKey) || seen.has(body.toLowerCase())) return;
  seen.add(sourceKey);
  seen.add(body.toLowerCase());
  out.push({ section, body, sourceKey });
}

export function generateLotseVorschlaege(input: {
  runId: string;
  answers: KlaromatAnswers;
  matches: MatchSnapshot[];
  clinicNames: Record<string, string>;
}): LotseDraft[] {
  const { runId, answers, matches, clinicNames } = input;
  if (!runId || matches.length === 0) return [];

  const out: LotseDraft[] = [];
  const seen = new Set<string>();
  const viable = matches.filter((item) => !isBlocked(item)).slice(0, 2);
  const blocked = matches.filter((item) => isBlocked(item)).slice(0, 2);
  const focus = viable.length > 0 ? viable : matches.slice(0, 1);

  for (const match of focus) {
    const haus = houseName(match.clinicId, clinicNames);
    for (const reason of match.reasons) {
      if (reason.status !== "match") continue;
      pushUnique(out, seen, runId, "passt", `${shortReason(reason.detail)} (${haus})`);
    }
  }

  for (const match of [...focus, ...blocked]) {
    const haus = houseName(match.clinicId, clinicNames);
    for (const reason of match.reasons) {
      if (reason.status !== "miss") continue;
      pushUnique(out, seen, runId, "passt_nicht", `${shortReason(reason.detail)} (${haus})`);
    }
  }

  if (answers.roomPref === "egal") {
    pushUnique(out, seen, runId, "fragen", "Zimmerart mit der Person klären.");
  }
  if (answers.states.length === 0) {
    pushUnique(out, seen, runId, "fragen", "Region bzw. Wohnortnähe noch offen.");
  }
  if (answers.indication === "sucht" && answers.substitutionNeed === "egal") {
    pushUnique(out, seen, runId, "fragen", "Substitution: weiterführen oder nicht?");
  }
  if (answers.payer === "egal") {
    pushUnique(out, seen, runId, "fragen", "Kostenträger (DRV oder Krankenkasse) noch offen.");
  }

  return out.filter((item) => isPersonalSection(item.section));
}

export const PERSONAL_SECTIONS = ["passt", "passt_nicht", "fragen", "rueckmeldung"] as const;

export type PersonalSection = (typeof PERSONAL_SECTIONS)[number];

export const LINE_MAX = 160;
export const LINES_MAX = 24;

export const PERSONAL_SECTION_META: Record<
  PersonalSection,
  { title: string; ghost: string; more: string }
> = {
  passt: {
    title: "Was passt",
    ghost: "Was zum Haus oder Setting passt — eine Zeile.",
    more: "Weitere Zeile",
  },
  passt_nicht: {
    title: "Was nicht passt",
    ghost: "Was nicht geht oder vor dem Antrag zu klären ist.",
    more: "Weitere Zeile",
  },
  fragen: {
    title: "Offene Fragen",
    ghost: "Was vor dem Anruf noch offen ist.",
    more: "Weitere Frage",
  },
  rueckmeldung: {
    title: "Rückmeldungen der Klient:in",
    ghost: "Was die Person selbst gesagt hat.",
    more: "Weitere Rückmeldung",
  },
};

export type PersonalLine = {
  id: string;
  section: PersonalSection;
  body: string;
  sortOrder: number;
  createdAt: string;
};

export type PersonalSuggestion = {
  id: string;
  section: PersonalSection;
  body: string;
  source: "lohlotse";
  status: "pending" | "accepted" | "dismissed";
  acceptedLineId: string | null;
};

export type PersonalCard = {
  folderId: string;
  clientName: string;
  lines: PersonalLine[];
  suggestions: PersonalSuggestion[];
};

export function isPersonalSection(value: string): value is PersonalSection {
  return (PERSONAL_SECTIONS as readonly string[]).includes(value);
}

export function normalizeLineBody(raw: string): string | null {
  const body = raw.replace(/\s+/g, " ").trim();
  if (!body) return null;
  return body.slice(0, LINE_MAX);
}

export function linesFor(lines: PersonalLine[], section: PersonalSection): PersonalLine[] {
  return lines
    .filter((line) => line.section === section)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.createdAt.localeCompare(b.createdAt));
}

export function pendingSuggestions(items: PersonalSuggestion[]): PersonalSuggestion[] {
  return items.filter((item) => item.status === "pending").slice(0, 6);
}

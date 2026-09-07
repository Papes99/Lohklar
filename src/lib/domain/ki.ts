/** Lohklar KI — fallunabhängige Orientierungsantworten (Prosa, Sie-Form). */

const WAIT_SPAN_RE =
  /(?:ca\.\s*)?\d+(?:\s*[–\-bis]+\s*\d+)?\s*(?:Wochen|Tage)/gi;

export function hasWaitNumber(text: string): boolean {
  WAIT_SPAN_RE.lastIndex = 0;
  return WAIT_SPAN_RE.test(text);
}

export function stripWaitNumbers(text: string): string {
  WAIT_SPAN_RE.lastIndex = 0;
  return text
    .replace(WAIT_SPAN_RE, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,;:])/g, "$1")
    .trim();
}

export function sanitizeKiReply(text: string): string {
  const cleaned = stripWaitNumbers(text);
  if (!cleaned) {
    return (
      "Ich helfe bei der Orientierung in der medizinischen Rehabilitation. " +
      "Zu Wartezeiten nutzen Sie bitte die Wartezeit-Komponente in den Steckbriefen " +
      "(inkl. „Rechenweg ansehen“). Das ist keine Aufnahmezusage."
    );
  }
  if (/wartezeit|wie lange|aufnahmezeit|wartet man/i.test(cleaned) && !/Wartezeit-Komponente|Rechenweg/i.test(cleaned)) {
    return (
      `${cleaned}\n\n` +
      "Zu konkreten Wartezeiten: Bitte die Wartezeit-Komponente in den Klinik-Steckbriefen " +
      "nutzen (inkl. „Rechenweg ansehen“). Keine Zahl im Fließtext, keine Aufnahmezusage."
    );
  }
  return cleaned;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/ß/g, "ss");
}

/** Lokale FAQ-Antworten, wenn kein XAI_API_KEY gesetzt ist. */
export function composeKiFallback(message: string): string {
  const hay = normalize(message);

  if (/wartezeit|wie lange|aufnahmezeit|wartet man|liste/.test(hay)) {
    return (
      "Wartezeiten in Lohklar sind Schätzungen. Bitte öffnen Sie den betreffenden " +
      "Klinik-Steckbrief und nutzen Sie die Wartezeit-Komponente inkl. „Rechenweg ansehen“. " +
      "Im Fließtext nenne ich keine Wochen- oder Tageszahlen. Das ist keine Aufnahmezusage " +
      "und keine individuelle Vorfahrt."
    );
  }

  if (/klar[- ]?o[- ]?mat|durchlauf|treffer/.test(hay)) {
    return (
      "Der Klar-o-Mat ist der Dialog vor jedem Lauf. Sie beschreiben Bedarfe und Region; " +
      "danach entsteht eine Trefferliste mit Passungswerten. Ein Fallordner entsteht erst " +
      "mit Durchlauf 1. Lohklar trifft keine Therapieentscheidung und sagt keine Aufnahme zu."
    );
  }

  if (/fallordner|arbeitsname|fallarbeit/.test(hay)) {
    return (
      "Fallordner halten Läufe, Ergebnisdokumente und den persönlichen Steckbrief je " +
      "Arbeitsname. Der Name sitzt am Ordner, nicht am Konto. Persönliche Notizen " +
      "(Was passt / Was nicht passt / Offene Fragen / Rückmeldungen) gehören nur in den Ordner."
    );
  }

  if (/steckbrief|katalog|klinik|haus/.test(hay)) {
    return (
      "Offizielle Steckbriefe folgen einer einheitlichen 13-Block-Vorlage und sind auch " +
      "ohne Konto unter „Steckbriefe“ lesbar. Fehlende Angaben stehen als „Angabe liegt nicht vor.“ " +
      "Offizielle Kliniktexte werden in Lohklar nicht überschrieben. Für ein konkretes Haus " +
      "öffnen Sie bitte den Steckbrief im Katalog."
    );
  }

  if (/antrag|drv|kostentraeger|kostentrager|zuzahlung/.test(hay)) {
    return (
      "Zugang und Kostenträger klären Haus und Kostenträger — nicht Lohklar. In den " +
      "Steckbriefen finden Sie den Block „Kostenträger und Zugang“ zur Orientierung. " +
      "Lohklar sagt keine Kosten- oder Aufnahmezusage."
    );
  }

  if (/diagnos|therapieentscheid|behandlung|medizinprodukt/.test(hay)) {
    return (
      "Lohklar orientiert nur. Ich stelle keine Diagnosen, treffe keine Therapieentscheidung " +
      "und plane keine Behandlung. Bei medizinischen Fragen wenden Sie sich bitte an " +
      "Ärzt:innen und die zuständigen Fachstellen."
    );
  }

  return (
    "Ich bin Lohklar KI — Orientierungshilfe zur medizinischen Rehabilitation " +
    "(Sucht, Psychosomatik, Dualdiagnosen). Fragen Sie frei zu Katalog, Klar-o-Mat, " +
    "Fallarbeit oder App-Nutzung. Keine Diagnosen, keine Betten, keine Aufnahmezusagen. " +
    "Für Klinikfakten bitte die offiziellen Steckbriefe nutzen."
  );
}

export const KI_SYSTEM_PROMPT = `Du bist Lohklar KI in der App Lohklar (founded by Kerlwerk).
Sie-Form, Deutsch, klare Prosa (kurze Absätze, keine JSON-Antwort, keine Emoji-Überschriften-Pflicht).

Rolle: Orientierungshilfe für Sozialarbeiter:innen in der medizinischen Rehabilitation
(Sucht, Psychosomatik, Dualdiagnosen und verwandte Bedarfe).

Du erklärst:
- den Klinikatalog und die einheitlichen Steckbriefe (13 Blöcke),
- den Klar-o-Mat (Dialog vor jedem Lauf; Fallordner erst mit Durchlauf 1),
- Fallarbeit und persönlichen Steckbrief (4 Felder: Was passt / Was nicht passt / Offene Fragen / Rückmeldungen),
- die Wartezeit-Idee (eine Schätzungs-Komponente),
- die App-Nutzung allgemein.

Du bist NICHT an einen Fallordner oder Arbeitsnamen gebunden. Kein Merge in persönliche Felder.

HARTE GRENZEN:
- Keine Diagnose, keine Therapieentscheidung, keine Behandlungsplanung.
- Keine Betten erfinden, keine Live-Warteliste, keine Aufnahmezusage, keine Garantie, keine individuelle Vorfahrt.
- Keine Wartezahl, keine Wochen-/Tages-Spanne und kein „ca. X Wochen“ im Fließtext.
  Bei Wartezeit-Themen: auf die Wartezeit-Komponente in den Steckbriefen verweisen (inkl. „Rechenweg ansehen“).
- Keine erfundenen Klinikfakten. Bei Unsicherheit auf die offiziellen Steckbriefe verweisen („Angabe liegt nicht vor.“ / Steckbrief öffnen).
- Offizielle Kliniktexte werden nie überschrieben.

Ton: knapp, scannbar, hilfreich. Keine Floskeln, keine Essays.`;

# Lohklar — Projekthandbuch

**Produkt:** Lohklar (founded by Kerlwerk)  
**Für:** Sozialarbeiter:innen, Orientierung in der medizinischen Rehabilitation (Sucht, Psychosomatik, Dualdiagnosen)  
**Sprache:** Deutsch, Sie-Form. Keine Floskeln, keine Essays.

Auth und Datenbank sind **AN**. Jede Serverfunktion mit Nutzerbezug trägt `authMiddleware`; Abfragen nur über `context.userId`.

Diese Datei ist die einzige verbindliche Projektanweisung. Direkte Nutzeranweisungen in der Session haben Vorrang.

Es gibt **keine separaten System-Prompt-Dateien**. Die Rollen A–G sind Ownership bei der Weiterentwicklung, keine Runtime-Agenten. Jede Änderung am Objekt eines Owners muss dessen Dateien und die Regeln unten einhalten.

---

## Was Lohklar ist (und nicht ist)

Lohklar **orientiert**. Es diagnostiziert nicht, trifft keine Therapieentscheidung, sagt keine Aufnahme zu, erfindet keine Betten und keine Live-Warteliste.

Wartezeiten sind **Schätzungen**. Genau eine Wartezeit-Komponente (Agent C). Keine zweite Formel, keine Zahl/Spanne/Tages-Hausnummer im Fließtext von Chat oder Dokument — Zahlen nur in der Komponente inkl. „Rechenweg ansehen“.

Offizielle Kliniktexte werden **niemals** überschrieben. Ergänzungen nur im persönlichen Steckbrief (Fallordner); Lohklar KI bleibt fallunabhängig.
Katalog: 380 echte, öffentlich belegte Häuser in src/lib/domain/katalog-houses.ts (Agent E). Keine Musterdaten. Jedes Haus hat die 13-Block-Vorlage inkl. Zimmerart, Substanzen, Substitution und Wahlleistungen. Wartezeiten bleiben Schätzungen.

DSGVO: keine Diagnosen speichern, keine Rohgesundheitsdaten in Nutzungsstatistiken. Dashboard zählt nur Vorgänge, keine Namen.

---

## Module (bindend)

| Modul | Zweck |
|---|---|
| Klar-o-Mat | Dialog vor jedem Lauf. Kein Fallordner ohne Durchlauf 1. |
| Fallordner | Arbeitsname sitzt am Ordner, nicht am Konto. Entwürfe erlaubt. Gast: ein Lauf + Claim. |
| Ergebnisdokument | Nur nach Lauf. Wartezeit von C, offizielle Fakten von E. Editor: umordnen, streichen, umschreiben, Autosave, PDF/DOCX. |
| Wartezeit-Schätzung | Einzige Anzeige. 8-Signal-Modell, Unsicherheit, Rechenweg. Keine Garantiesprache. |
| Lohklar KI | Fallunabhängige Orientierungshilfe. Ein Thread pro Nutzer. Kein Fallordner-Picker, keine Steckbrief-Leiste, kein Merge. |
| Offizieller Steckbrief | Einheitliche 13-Block-Vorlage inkl. Fotos. Owner: Agent E. |
| Persönlicher Steckbrief | Genau 4 Felder: `passt` / `passtNicht` / `offeneFragen` / `rueckmeldungen`. |
| Dashboard | Nur angemeldet. Tag / Monat / Jahr (Europe/Berlin). URL `?view=&date=`. Nur Zahlen, plus Katalog-Log (aufgenommen / aktualisiert / entfernt). |
| Antragsweg | Unterlagen- und Fristen-Checkliste am Fallordner. Keine Dokumentinhalte, keine Diagnosen. |

Navigation: Dashboard, Klar-o-Mat, Fälle, Lohklar KI, Steckbriefe. Fallordner-Tabs inkl. Antragsweg.

Lauf-Status: `entwurf` | `fertig` | `exportiert`.

---

## Agent-Ownership (niemand sonst erfindet das Objekt)

| Owner | Objekt | Dateien |
|---|---|---|
| **A** | Klar-o-Mat, Fallordner, Arbeitsname, Gastlauf + Claim, Antragsweg | `src/components/klaromat/*`, `src/components/antragsweg/*`, `src/routes/klar-o-mat.tsx`, `src/routes/app/klar-o-mat.tsx`, `src/routes/app/fallordner/*`, `src/lib/server/cases.ts`, `src/lib/server/cases-read.ts`, `src/lib/server/cases-write.ts`, `src/lib/server/cases-shared.ts`, `src/lib/server/antragsweg.ts`, `src/lib/domain/folder-search.ts`, `src/lib/domain/matching.ts`, `src/lib/domain/antragsweg.ts`, `src/lib/guest-run.ts`, `migrations/0002_schema.sql`, `migrations/0003_case_runs.sql`, `migrations/0007_antragsweg.sql`, `migrations/0009_antragsweg.sql` |
| **B** | Ergebnisdokument + Editor + PDF/DOCX | `src/components/dokument/*`, `src/lib/domain/document.ts`, `src/lib/domain/document-export.ts`, `migrations/0004_result_document.sql` |
| **C** | Wartezeit-Komponente | `src/components/wait/wartezeit-schaetzung.tsx`, `src/lib/domain/wait-time.ts` |
| **D** | Lohklar KI | `src/components/ki/*`, `src/routes/app/ki.tsx`, `src/routes/app/lohlotse.tsx` (Redirect), `src/lib/domain/ki.ts`, `src/lib/server/ki.ts`, `migrations/0010_ki_messages.sql`, `migrations/0011_drop_lohlotse.sql` |
| **E** | Offizieller Steckbrief + Fotos, persönlicher Steckbrief | `src/components/clinic/*`, `src/routes/kliniken/*`, `src/lib/domain/clinic-seed.ts`, `src/lib/domain/steckbrief-seed.ts`, `src/lib/domain/katalog.ts`, `src/lib/domain/katalog-houses.ts`, `src/lib/domain/katalog-houses-extra.ts`, `src/lib/domain/katalog-houses-wave3.ts`, `src/lib/domain/katalog-houses-wave4.ts`, `src/lib/server/clinics.ts` |
| **F** | Dashboard + Nutzungszahlen | `src/routes/app/index.tsx`, `src/lib/server/dashboard.ts`, `src/lib/domain/usage.ts`, `src/lib/server/usage.ts`, `src/components/usage/beacon.tsx`, `migrations/0006_usage_events.sql` |
| **G** | Markenzeile, Masthead, Typografie | `src/components/brand/*`, `src/components/layout/public-header.tsx`, `src/styles.css`, `src/lib/og/site.json` |

Shared shell (nicht owner-spezifisch): `src/components/layout/app-shell.tsx`, `src/routes/__root.tsx`, `src/components/ui/*`.

---

## Workflow (Handoff)

1. **A** startet mit Dialog und Namen. Ohne Durchlauf 1 kein Ordner.
2. Trefferliste speichert Match + **C**-Snapshot. **B** erzeugt das Ergebnisdokument nur aus diesem Lauf.
3. **E** liefert offizielle Fakten und Fotos. **B** liest sie, schreibt sie nicht. **D** (Lohklar KI) verweist darauf, ohne Fallbezug.
4. Persönliche Ergänzungen nur in die 4 Felder von **E** im Fallordner — nicht über Lohklar KI.
5. **C** bleibt die einzige Wartezeit-Anzeige — in Trefferliste, Dokument, Steckbrief; Lohklar KI nennt keine Wartezahlen.
6. **F** zählt Vorgänge, keine Namen.
7. **G** bleibt unverändert, solange niemand die Marke anfasst.

Konflikt: die Owner-Datei gilt.

---

## Offizieller Steckbrief — 13 Blöcke (Agent E)

Niemand erfindet eine zweite Vorlage. Fehlende Angabe: „Angabe liegt nicht vor.“

| Nr | Block | Leitfrage |
|---|---|---|
| 01 | Indikation | Für wen das Haus vorrangig arbeitet. |
| 02 | Kontraindikation | Was die Aufnahme ausschließt oder verzögert. |
| 03 | Setting und Dauer | In welcher Form und wie lange behandelt wird. |
| 04 | Wohnen und Alltag | Einzel- oder Mehrbettzimmer, Regeln und Tagesstruktur. Immer: Zimmerart und ob Einbett im Regelsatz liegt. |
| 05 | Kinder, Familie, Geschlecht | Für wen das Haus familiär und geschlechtsspezifisch ausgelegt ist. |
| 06 | Therapie und Konzept | Welche Verfahren das Haus vorhält. Lohklar wählt keine Therapie. |
| 07 | Medizin, Pflege, Mitbehandlung | Ärztliche Besetzung, Medikation und pflegerische Grenzen. |
| 08 | Sozialdienst und Nachsorge | Was der Klinik-Sozialdienst konkret tut. |
| 09 | Kostenträger und Zugang | Wer zahlt, gesetzliche Zuzahlung, Wahlleistungen und Preise. Immer: ob und was zusätzlich kaufbar ist. |
| 10 | Besonderheiten | Nur belegte Alleinsteller, ohne Superlative. |
| 11 | Kontakt | Erreichbarkeit, wie belegt. |
| 12 | Fotos | Fotoleiste (Außen, Zimmer/Bad, Umgebung, Besonderheit). |
| 13 | Datenstand | Geprüft am, Quellen. |

---

## Persönlicher Steckbrief

Keine 6 H2-Samenüberschriften erfinden. Mapping:

- „Passung, die wir prüfen“ / „Wahlkriterien“ / „Was passt“ → `passt`
- „Was nicht passt“ → `passtNicht`
- „Offene Fragen“ → `offeneFragen`
- „Rückmeldungen der Klient:in“ → `rueckmeldungen`

Merge: Vorschau → Übernehmen / Verwerfen → Undo. Ton der Nachbarzeilen. Duplikate überspringen. Offizieller Kliniktext unangetastet.

---

## Lohklar KI (bindend)

Route `/app/ki`. Display-Name **Lohklar KI**, Icon Sparkles. **Kein** Fallordner, kein Picker, keine Steckbrief-Leiste, kein Merge in persönliche Felder.

Antworten in **Prosa** (Sie-Form). Persistenz: ein Thread pro Nutzer (`ki_messages`). LLM: xAI/`XAI_API_KEY`, Modell `grok-4.5`, temperature ~0.3–0.5. Ohne Key: lokale FAQ-Fallbacks.

HARTE GRENZEN wie Produkt: keine Diagnose, keine Therapieentscheidung, keine Betten, keine Garantie/Aufnahmezusage. Keine Wartezahl im Fließtext — bei Wartezeit auf die Wartezeit-Komponente in den Steckbriefen verweisen. Keine erfundenen Klinikfakten — bei Unsicherheit Steckbriefe.

`/app/lohlotse` redirected nach `/app/ki`. Alte Lohlotse-Tabellen werden per Migration gedroppt.

---

## Wartezeit (Agent C)

- `computeWaitEstimate` / gespeicherter Snapshot ist die einzige Quelle.
- Komponente: `WartezeitSchaetzung` — nicht duplizieren, nicht intern umbauen.
- Headline der Komponente enthält nie das Wort „Tage“.
- Alte Snapshots über `coerceWaitEstimate` hydratisieren.

---

## Dashboard (Agent F)

Nur angemeldet. Zeiträume: Tag, Monat, Jahr — Europe/Berlin. URL `?view=month&date=YYYY-MM-DD`.
Nur Zähler, keine Klientennamen. Offizielle Kliniktexte nicht umschreiben — nur zählen und loggen.
Katalog-Log: aufgenommen | aktualisiert | entfernt.
Nicht zählen: Dokument-Edit-Protokolle, Chat-Inhalte, Rohgesundheitsdaten.

---

## Qualität / UX

- Scannbar, Stichpunkte gleicher Granularität.
- WCAG: Kontrast, Fokus, tap ≥ 44px.
- Leere Leiste: nur „Klinik wählen oder nennen“ — die Leiste nicht im Fließtext beschreiben, außer sie ist leer.
- Keine Diagnose- oder Garantiesprache in UI-Texten.
- Marke: Fraunces + Source Sans 3, Creme `#f3f0e8`, Tinte `#1a2420`, Grün `#245c4a`. Nicht restylen, ohne dass G das Objekt anfasst.

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

Offizielle Kliniktexte werden **niemals** überschrieben. Ergänzungen nur in Chat und persönlichem Steckbrief.

DSGVO: keine Diagnosen speichern, keine Rohgesundheitsdaten in Nutzungsstatistiken. Dashboard zählt nur Vorgänge, keine Namen.

---

## Module (bindend)

| Modul | Zweck |
|---|---|
| Klar-o-Mat | Dialog vor jedem Lauf. Kein Fallordner ohne Durchlauf 1. |
| Fallordner | Arbeitsname sitzt am Ordner, nicht am Konto. Entwürfe erlaubt. Gast: ein Lauf + Claim. |
| Ergebnisdokument | Nur nach Lauf. Wartezeit von C, offizielle Fakten von E. Editor: umordnen, streichen, umschreiben, Autosave, PDF/DOCX. |
| Wartezeit-Schätzung | Einzige Anzeige. 8-Signal-Modell, Unsicherheit, Rechenweg. Keine Garantiesprache. |
| Lohlotse | Eigene Navigation. Ein Thread pro Fallordner-Name. Leiste Pflicht (offiziell + persönlich). |
| Offizieller Steckbrief | Einheitliche 13-Block-Vorlage inkl. Fotos. Owner: Agent E. |
| Persönlicher Steckbrief | Genau 4 Felder: `passt` / `passtNicht` / `offeneFragen` / `rueckmeldungen`. |
| Dashboard | Nur angemeldet. Woche / Monat / Jahr (Europe/Berlin, Woche ab Montag). Nur Zahlen. |

Navigation: Dashboard, Klar-o-Mat, Fälle, Lohlotse, Steckbriefe.

Lauf-Status: `entwurf` | `fertig` | `exportiert`.

---

## Agent-Ownership (niemand sonst erfindet das Objekt)

| Owner | Objekt | Dateien |
|---|---|---|
| **A** | Klar-o-Mat, Fallordner, Arbeitsname, Gastlauf + Claim | `src/components/klaromat/*`, `src/routes/klar-o-mat.tsx`, `src/routes/app/klar-o-mat.tsx`, `src/routes/app/fallordner/*`, `src/lib/server/cases.ts`, `src/lib/domain/folder-search.ts`, `src/lib/domain/matching.ts`, `src/lib/guest-run.ts`, `migrations/0002_schema.sql`, `migrations/0003_case_runs.sql` |
| **B** | Ergebnisdokument + Editor + PDF/DOCX | `src/components/dokument/*`, `src/lib/domain/document.ts`, `src/lib/domain/document-export.ts`, `migrations/0004_result_document.sql` |
| **C** | Wartezeit-Komponente | `src/components/wait/wartezeit-schaetzung.tsx`, `src/lib/domain/wait-time.ts` |
| **D** | Lohlotse | `src/components/lohlotse/*`, `src/routes/app/lohlotse.tsx`, `src/lib/domain/lohlotse.ts`, `src/lib/server/lohlotse.ts`, `migrations/0005_lohlotse.sql` |
| **E** | Offizieller Steckbrief + Fotos, persönlicher Steckbrief | `src/components/clinic/*`, `src/routes/kliniken/*`, `src/lib/domain/clinic-seed.ts`, `src/lib/domain/steckbrief-seed.ts`, `src/lib/server/clinics.ts` |
| **F** | Dashboard + Nutzungszahlen | `src/routes/app/index.tsx`, `src/lib/server/dashboard.ts`, `src/lib/domain/usage.ts`, `src/lib/server/usage.ts`, `src/components/usage/beacon.tsx`, `migrations/0006_usage_events.sql` |
| **G** | Markenzeile, Masthead, Typografie | `src/components/brand/*`, `src/components/layout/public-header.tsx`, `src/styles.css`, `src/lib/og/site.json` |

Shared shell (nicht owner-spezifisch): `src/components/layout/app-shell.tsx`, `src/routes/__root.tsx`, `src/components/ui/*`.

---

## Workflow (Handoff)

1. **A** startet mit Dialog und Namen. Ohne Durchlauf 1 kein Ordner.
2. Trefferliste speichert Match + **C**-Snapshot. **B** erzeugt das Ergebnisdokument nur aus diesem Lauf.
3. **E** liefert offizielle Fakten und Fotos. **B** und **D** lesen sie, schreiben sie nicht.
4. **D** arbeitet im Faden des Ordnernamens. Persönliche Ergänzungen nur in die 4 Felder von **E**.
5. **C** bleibt die einzige Wartezeit-Anzeige — in Trefferliste, Dokument, Steckbrief, Lohlotse.
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
| 04 | Wohnen und Alltag | Zimmer, Regeln und Tagesstruktur. |
| 05 | Kinder, Familie, Geschlecht | Für wen das Haus familiär und geschlechtsspezifisch ausgelegt ist. |
| 06 | Therapie und Konzept | Welche Verfahren das Haus vorhält. Lohklar wählt keine Therapie. |
| 07 | Medizin, Pflege, Mitbehandlung | Ärztliche Besetzung, Medikation und pflegerische Grenzen. |
| 08 | Sozialdienst und Nachsorge | Was der Klinik-Sozialdienst konkret tut. |
| 09 | Kostenträger und Zugang | Wer zahlt und welche Voraussetzungen belegt sind. |
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

## Lohlotse — Goldrunden (bindend)

Genau **eine** Emoji-Überschrift pro Antwort: 🧭 Überblick · 🏥 Klinik · ⏳ Wartezeit · 📋 Nächster Schritt · ⚠️ Wichtig.

**TURN A — kein Name:** 🧭 Überblick, drei Stichpunkte „für welche Person?“. Aktion: Name erfragen. Wartezeit: keine. Ohne Namen kein Thread, kein persönlicher Steckbrief.

**TURN B — Name + Klinik, Kinder + Wartezeit kombiniert:** genau **eine** Überschrift 🏥 Klinik (nicht ⏳). Stichpunkte zur Kinderregel aus dem App-Steckbrief. Letzter Stichpunkt: *„Wartezeit nicht selbst geschätzt. Es gilt die Anzeige der Wartezeit-Komponente inkl. ‚Rechenweg ansehen‘. Das ist keine Aufnahmezusage.“* Keine Wartezahl im Fließtext. `showWait=true`. Markierung: Kinder/Familie/Geschlecht + Wartezeit (offiziell) + Wahlkriterien/`passt` (persönlich). Kein Merge-Angebot.

**TURN B2 — nur Wartezeit:** ⏳ Wartezeit. Stichpunkte zeigen auf die Komponente. **Keine Zahl im Fließtext.**

**TURN C — fehlende offizielle Angabe** (z. B. Speisesaal): 🏥 Klinik, „Angabe liegt nicht vor“. Zusatzinfos nur als Chat-Stichpunkte mit öffentlicher Quelle, nie in den offiziellen Text. Merge-Vorschau auf `passt` („Passung, die wir prüfen“). Nach Übernehmen: 📋 Nächster Schritt, persönliche Markierung, Undo.

App-Steckbrief sticht Web. Ein Faden, ein Name. Keine Diagnosen, keine Betten, keine Garantie, keine zweite Warteformel.

---

## Wartezeit (Agent C)

- `computeWaitEstimate` / gespeicherter Snapshot ist die einzige Quelle.
- Komponente: `WartezeitSchaetzung` — nicht duplizieren, nicht intern umbauen.
- Headline der Komponente enthält nie das Wort „Tage“.
- Alte Snapshots über `coerceWaitEstimate` hydratisieren.

---

## Dashboard (Agent F)

Nur angemeldet. Zeiträume: Woche, Monat, Jahr — Europe/Berlin, Woche ab Montag.  
Nur Zähler, keine Klientennamen. Nicht zählen: Dokument-Edit-Protokolle, Chat-Inhalte, Rohgesundheitsdaten.

---

## Qualität / UX

- Scannbar, Stichpunkte gleicher Granularität.
- WCAG: Kontrast, Fokus, tap ≥ 44px.
- Leere Leiste: nur „Klinik wählen oder nennen“ — die Leiste nicht im Fließtext beschreiben, außer sie ist leer.
- Keine Diagnose- oder Garantiesprache in UI-Texten.
- Marke: Fraunces + Source Sans 3, Creme `#f3f0e8`, Tinte `#1a2420`, Grün `#245c4a`. Nicht restylen, ohne dass G das Objekt anfasst.

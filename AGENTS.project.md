# Lohklar — Projekthandbuch

**Produkt:** Lohklar (founded by Kerlwerk)  
**Für:** Sozialarbeiter:innen, Orientierung in der medizinischen Rehabilitation (Sucht, Psychosomatik, Dualdiagnosen)  
**Sprache:** Deutsch, Sie-Form. Keine Floskeln, keine Essays.

Auth und Datenbank sind **AN**. Jede Serverfunktion mit Nutzerbezug trägt `authMiddleware`; Abfragen nur über `context.userId`.

---

## Deploy (verbindlich)

Live geht nur so: Branch → Commit → Push → Pull Request gegen `main` → Merge. Vercel (Hobby-Projekt lohklar) deployed Production automatisch auf [lohklar.de](https://lohklar.de).

- Kein „Veröffentlichen“, kein Upload-/Apex-Assign, kein Token-Deploy außerhalb von Git.
- Secrets niemals ins Repo oder in eine `.env` committen: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`. Nur in Vercel. Nach Env-Änderung: Redeploy Production.
- PR-Titel und Kurzbeschreibung auf Deutsch. Kleine, reviewbare Diffs. Migrationen nur wenn nötig, mit fortlaufender Nummer.
- Wenn kein PR angelegt werden kann: Branch-Namen nennen und fertigen PR-Text liefern.

## Auth (Production)

- Direct-Google über Better Auth (`GOOGLE_*`). Redirect: `https://lohklar.de/api/auth/callback/google`. Origin: `https://lohklar.de`.
- `BETTER_AUTH_URL` = `https://lohklar.de`.
- Kein Grok-Auth-Broker und kein X-Login auf Production. Preview/Sandbox darf den Broker behalten.
- Bestehende Auth-/Deploy-Pfade nicht zurückbauen.

---

Diese Datei ist die einzige verbindliche Projektanweisung. Direkte Nutzeranweisungen in der Session haben Vorrang.

Es gibt **keine separaten System-Prompt-Dateien**. Die Rollen A–G sind Ownership bei der Weiterentwicklung, keine Runtime-Agenten. Jede Änderung am Objekt eines Owners muss dessen Dateien und die Regeln unten einhalten.

---

## Was Lohklar ist (und nicht ist)

Lohklar **orientiert**. Es diagnostiziert nicht, trifft keine Therapieentscheidung, sagt keine Aufnahme zu, erfindet keine Betten und keine Live-Warteliste.

Wartezeiten sind **Schätzungen**. Genau eine Wartezeit-Komponente (Agent C). Keine zweite Formel, keine Zahl/Spanne/Tages-Hausnummer im Fließtext von Chat oder Dokument — Zahlen nur in der Komponente inkl. „Rechenweg ansehen“.

Offizielle Kliniktexte werden **niemals** überschrieben.
Katalog: 386 echte, öffentlich belegte Häuser in src/lib/domain/katalog-houses.ts (Agent E). Keine Musterdaten. Jedes Haus hat die 14-Block-Vorlage inkl. Zimmerart, Substanzen, Substitution, Wahlleistungen und Aufnahmeunterlagen. Wartezeiten bleiben Schätzungen. MPU-Vorbereitung und Klinik statt Strafe (§ 35 BtMG) nur bei öffentlich belegten Häusern, keine Erfindung.

DSGVO: keine Diagnosen speichern, keine Rohgesundheitsdaten in Nutzungsstatistiken. Dashboard zählt nur Vorgänge, keine Namen.

---

## Module (bindend)

| Modul | Zweck |
|---|---|
| Klar-o-Mat | Dialog vor jedem Lauf. Kein Fallordner ohne Durchlauf 1. |
| Fallordner | Arbeitsname sitzt am Ordner, nicht am Konto. Entwürfe erlaubt. Gast: ein Lauf + Claim. Tabs: Durchläufe, Dokumente. Karte: persönlicher Steckbrief. |
| Ergebnisdokument | Nur nach Lauf. Wartezeit von C, offizielle Fakten von E. Editor: umordnen, streichen, umschreiben, Autosave, PDF/DOCX. |
| Wartezeit-Schätzung | Einzige Anzeige. 8-Signal-Modell, Unsicherheit, Rechenweg. Keine Garantiesprache. |
| Offizieller Steckbrief | Einheitliche 14-Block-Vorlage inkl. Fotos. Owner: Agent E. |
| Persönlicher Steckbrief | Karte am Fallordner: „Persönlich für {Arbeitsname}“. Vier Listen. Owner: Agent E. Vorschläge: Agent D. |
| Dashboard | Nur angemeldet. Tag / Monat / Jahr (Europe/Berlin). URL `?view=&date=`. Nur Zahlen, plus Katalog-Log (aufgenommen / aktualisiert / entfernt). |
| Profil | Konto der Fachkraft unter `/app/profil`. Name am Konto, keine Fallnamen. Abmelden. |

**Entfernt, nicht wieder einbauen:** Antragsweg, Lohklar-KI-Chat.

Navigation: Dashboard, Klar-o-Mat, Fälle, Steckbriefe.

Lauf-Status: `entwurf` | `fertig` | `exportiert`.

---

## Agent-Ownership (niemand sonst erfindet das Objekt)

| Owner | Objekt | Dateien |
|---|---|---|
| **A** | Klar-o-Mat, Fallordner, Arbeitsname, Gastlauf + Claim | `src/components/klaromat/*`, `src/routes/klar-o-mat.tsx`, `src/routes/app/klar-o-mat.tsx`, `src/routes/app/fallordner/*`, `src/lib/server/cases.ts`, `src/lib/server/cases-read.ts`, `src/lib/server/cases-write.ts`, `src/lib/server/cases-shared.ts`, `src/lib/domain/folder-search.ts`, `src/lib/domain/matching.ts`, `src/lib/guest-run.ts`, `migrations/0002_schema.sql`, `migrations/0003_case_runs.sql` |
| **B** | Ergebnisdokument + Editor + PDF/DOCX | `src/components/dokument/*`, `src/lib/domain/document.ts`, `src/lib/domain/document-export.ts`, `migrations/0004_result_document.sql` |
| **C** | Wartezeit-Komponente | `src/components/wait/wartezeit-schaetzung.tsx`, `src/lib/domain/wait-time.ts` |
| **D** | Lohlotse-Vorschläge für die persönliche Karte | `src/lib/domain/lotse-vorschlaege.ts` |
| **E** | Offizieller Steckbrief + Fotos; persönlicher Steckbrief | `src/components/clinic/*`, `src/components/personal/*`, `src/routes/kliniken/*`, `src/lib/domain/clinic-seed.ts`, `src/lib/domain/steckbrief-seed.ts`, `src/lib/domain/katalog.ts`, `src/lib/domain/katalog-houses.ts`, `src/lib/domain/katalog-houses-extra.ts`, `src/lib/domain/katalog-houses-wave3.ts`, `src/lib/domain/katalog-houses-wave4.ts`, `src/lib/domain/personal-notes.ts`, `src/lib/server/clinics.ts`, `src/lib/server/personal-notes.ts`, `migrations/0015_personal_notes.sql` |
| **F** | Dashboard + Nutzungszahlen | `src/routes/app/index.tsx`, `src/lib/server/dashboard.ts`, `src/lib/domain/usage.ts`, `src/lib/server/usage.ts`, `src/components/usage/beacon.tsx`, `migrations/0006_usage_events.sql` |
| **G** | Markenzeile, Masthead, Typografie | `src/components/brand/*`, `src/components/layout/public-header.tsx`, `src/styles.css`, `src/lib/og/site.json` |

Shared shell (nicht owner-spezifisch): `src/components/layout/app-shell.tsx`, `src/routes/__root.tsx`, `src/components/ui/*`.

---

## Workflow (Handoff)

1. **A** startet mit Dialog und Namen. Ohne Durchlauf 1 kein Ordner.
2. Trefferliste speichert Match + **C**-Snapshot. **B** erzeugt das Ergebnisdokument nur aus diesem Lauf.
3. **E** liefert offizielle Fakten und Fotos. **B** liest sie, schreibt sie nicht.
4. **D** legt Vorschläge in die persönliche Karte. **E** zeigt sie; Offizielles bleibt unangetastet.
5. **C** bleibt die einzige Wartezeit-Anzeige — in Trefferliste, Dokument, Steckbrief.
6. **F** zählt Vorgänge, keine Namen.
7. **G** bleibt unverändert, solange niemand die Marke anfasst.

Konflikt: die Owner-Datei gilt.

---

## Offizieller Steckbrief — 14 Blöcke (Agent E)

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
| 14 | Aufnahmeunterlagen & Fristen | Was das Haus vor der Aufnahme konkret braucht — und wie lange die Prüfung üblicherweise dauert. |

### Block 14 — Aufnahmeunterlagen & Fristen (bindend)

Zweck: Sozialarbeiter:innen sehen vor dem Telefonat, welche Unterlagen das Haus öffentlich fordert, ohne eine Aufnahmezusage oder eine zweite Warteformel.

**Nur öffentlich Belegtes** (Klinikwebsite, Trägerseite, Merkblatt). Keine erfundenen Checklisten. Fehlendes: „Angabe liegt nicht vor.“

**Stichpunkte (max. 8), typische Inhalte:**
- ärztliche Unterlagen (was genau, soweit belegbar)
- Sozialbericht / sozialmedizinische Unterlagen
- Kostenzusage / Kostenträgernachweis
- Entgiftungsnachweis ja/nein bzw. wann gefordert
- sonstige Haus-spezifische Unterlagen
- übliche Bearbeitungs- / Prüfungsdauer, wenn öffentlich genannt (keine Garantie, keine Tages-Hausnummer im Sinne einer Aufnahmezusage)

**Chips (Status wie üblich: `vorhanden` | `eingeschraenkt` | `nicht_angeboten` | `unbekannt`):**
- `Unterlagenliste`
- `Entgiftungspflicht`
- `Bearbeitungszeit`

**Abgrenzung:**
- Keine Diagnosen, keine Klientendaten, keine „Sie müssen…“-Sprache.
- Keine Live-Warteliste und keine zweite Wartezeit — Wartezeit bleibt allein bei Agent C.
- Keine Aufnahmezusage. Formulierung: Orientierung, Stand der öffentlichen Quelle.
- Block 09 (Kostenträger) bleibt für Zahlung/Zuzahlung/Wahlleistungen; Block 14 ist die Unterlagen-/Fristen-Sicht.

**Vollständig** (Filter „Nur vollständige“): Außenfoto, Telefon, https-Website, bekannte Zimmerart, Blöcke 01–10 mit Inhalt. **Block 14 zählt nicht mit** — unbekannt ist der Regelzustand, bis eine öffentliche Unterlagenliste vorliegt.

**Owner:** Agent E (`OfficialSteckbrief`, Katalog-Builder, Steckbrief-UI, Ergebnisdokument-Anzeige).

---

## Persönlicher Steckbrief (Agent E, Vorschläge Agent D)

Eine Karte am Fallordner: **„Persönlich für {Arbeitsname}“**. Der Arbeitsname sitzt am Ordner (Agent A), nicht am Konto.

**Zweck:** Im Gespräch schnell scannbare Notizen der Fachkraft — klar getrennt vom offiziellen Klinik-Steckbrief.

**Vier Abschnitte, nur Listen (Zeilen, keine Textflächen):**
1. Was passt
2. Was nicht passt
3. Offene Fragen
4. Rückmeldungen der Klient:in

Ghost-Hinweis nur in leeren Abschnitten; nach der ersten Zeile weg. Zeile hinzufügen, streichen, speichern ohne Sammel-Formular. Max. 160 Zeichen je Zeile.

**Lohlotse-Vorschläge (D)** liegen in derselben Karte: Vorschau → Übernehmen / Verwerfen / Rückgängig. Quelle ist der letzte Klar-o-Mat-Lauf (Matchgründe, offene Angaben). Kein Chat, kein offizieller Kliniktext, keine Rückmeldungen erfinden, keine Wartezahl, keine Aufnahmezusage.

**Nicht:**
- vier nackte Textareas
- fünfter Abschnitt
- neuer offizieller Klinik-Block
- Diagnose-, Aufnahme- oder Garantiesprache in der UI
- Vermischung mit dem 14-Block-Steckbrief

**Owner:** Agent E (`src/components/personal/*`, `personal-notes.ts`, `personal-notes` Server). Agent A bindet die Karte nur ein. Agent D schreibt nur Vorschläge.

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
Nutzung (Konten, Aktiv, Neu, alle Vorgänge) nur Admin: Google juliankerl1999@gmail.com oder X @Kerlwerk. Andere sehen nur eigene Schritte und den Katalog.
Nicht zählen: Dokument-Edit-Protokolle, Rohgesundheitsdaten.

---

## Qualität / UX

- Scannbar, Stichpunkte gleicher Granularität.
- WCAG: Kontrast, Fokus, tap ≥ 44px.
- Leere Leiste: nur „Klinik wählen oder nennen“ — die Leiste nicht im Fließtext beschreiben, außer sie ist leer.
- Keine Diagnose- oder Garantiesprache in UI-Texten.
- Nutzerflächen ohne nackte Kürzel: Anschlussheilbehandlung, Deutsche Rentenversicherung, gesetzliche Krankenkasse, Medizinisch-Psychologische Untersuchung — Kürzel höchstens in Klammern. Interne IDs (`ahb`, `drv`, `gkv`, `mpu`) bleiben.
- Marke: Fraunces + Source Sans 3, Creme `#f3f0e8`, Tinte `#1a2420`, Grün `#245c4a`. Nicht restylen, ohne dass G das Objekt anfasst.

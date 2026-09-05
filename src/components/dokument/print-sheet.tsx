import { CompassMark } from "@/components/brand/wordmark";
import { CoverPhoto, SubstanceTags } from "@/components/clinic/cover-photo";
import { WartezeitSchaetzung } from "@/components/wait/wartezeit-schaetzung";
import { documentFooterLines, type DocumentBody } from "@/lib/domain/document";
import { formatDeDate } from "@/lib/format";

export function DokumentPrintSheet({
  body,
  clientName,
  label,
  dateIso,
}: {
  body: DocumentBody;
  clientName: string;
  label: string;
  dateIso: string;
}) {
  return (
    <div className="print-sheet print-only" aria-hidden="true">
      <header className="print-cover">
        <div className="print-brand">
          <CompassMark className="size-10 text-primary" />
          <div>
            <p className="font-display text-4xl font-semibold tracking-tight">Lohklar</p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
              founded by Kerlwerk
            </p>
          </div>
        </div>
        <p className="print-kicker">Ergebnisdokument</p>
        <h1 className="print-title">{clientName}</h1>
        <p className="print-meta">
          {label} · {formatDeDate(dateIso)}
        </p>
        <section className="print-need">
          <h2>Bedarf</h2>
          <p>{body.needsText}</p>
        </section>
        <section className="print-toc">
          <h2>Rangfolge</h2>
          {body.houses.length === 0 ? (
            <p>Keine Häuser in diesem Dokument.</p>
          ) : (
            <ol>
              {body.houses.map((house, index) => (
                <li key={house.clinicId}>
                  <span className="print-toc-rank">{index + 1}</span>
                  <span>
                    <strong>{house.clinicName}</strong>
                    <span className="print-muted"> · {house.location}</span>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </section>
        <p className="print-disclaimer">{body.disclaimer}</p>
      </header>

      {body.houses.map((house, index) => (
        <article key={house.clinicId} className="print-house">
          <div className="print-house-head">
            <div className="print-house-copy">
              <p className="print-house-rank">{index + 1}</p>
              <h2>{house.clinicName}</h2>
              <p className="print-muted">{house.location}</p>
              <p className="print-fit">{house.fitSentence}</p>
              <SubstanceTags tags={house.substances ?? []} className="print-substances" />
            </div>
            {house.photo ? (
              <CoverPhoto
                src={house.photo.path}
                alt={house.photo.alt}
                auftrag={house.auftrag}
                className="print-house-photo"
              />
            ) : null}
          </div>
          {house.features.length > 0 ? (
            <section>
              <h3>Merkmale</h3>
              <ul className="print-features">
                {house.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>
          ) : null}
          <WartezeitSchaetzung estimate={house.wait} variant="inline" track={false} />
          <section>
            <h3>Besonderheiten</h3>
            <p>{house.specials}</p>
          </section>
          <section>
            <h3>Hinweise zum Haus</h3>
            <p>{house.hints}</p>
          </section>
        </article>
      ))}

      {body.extras.length > 0 ? (
        <section className="print-extras">
          <h2>Eigene Absätze und To-dos</h2>
          {body.extras.map((extra) => (
            <div key={extra.id}>
              <p>
                <strong>
                  {extra.kind === "todo" ? (extra.done ? "Erledigt · " : "To-do · ") : ""}
                  {extra.title}
                </strong>
              </p>
              {extra.text ? <p>{extra.text}</p> : null}
            </div>
          ))}
        </section>
      ) : null}

      <section className="print-notes">
        <h2>Eigene Notizen der Fachkraft</h2>
        <p>{body.staffNotes.trim() ? body.staffNotes : "Keine eigenen Notizen."}</p>
      </section>

      <footer className="print-end">
        {documentFooterLines(body).map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p className="print-brand-end">Lohklar · founded by Kerlwerk</p>
      </footer>
    </div>
  );
}

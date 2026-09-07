import {
  CHIP_STATUS_LABEL,
  STECKBRIEF_BLOCKS,
  WAIT_UNCERTAINTY_LABEL,
  coverAuftragTag,
  genderSettingLabel,
  settingKindLabel,
  type ChipStatus,
  type ClinicWithWait,
} from "@/lib/domain/types";
import { formatDeDate } from "@/lib/format";

export function SteckbriefPrintSheet({ clinic }: { clinic: ClinicWithWait }) {
  const photo = clinic.photos.find((item) => item.slot === "aussen") ?? clinic.photos[0];
  const auftrag = coverAuftragTag(clinic);
  const wait = clinic.wait;
  const zulassung: { label: string; status: ChipStatus }[] = [
    { label: "DRV", status: clinic.zulassung.drv },
    { label: "GKV", status: clinic.zulassung.gkv },
    { label: "AHB", status: clinic.zulassung.ahb },
    { label: "Beihilfe", status: clinic.zulassung.beihilfe },
  ];
  const host = clinic.website.replace(/^https?:\/\//, "");

  return (
    <div className="print-only steckbrief-print" aria-hidden="true">
      <p className="steckbrief-print-kicker">
        Lohklar · Offizieller Steckbrief · Stand {formatDeDate(clinic.datenstand.geprueft)}
      </p>

      <header className="steckbrief-print-hero">
        {photo?.imagePath ? (
          <img
            src={photo.imagePath}
            alt={photo.alt}
            className="steckbrief-print-photo"
            crossOrigin="anonymous"
          />
        ) : null}
        <div className="steckbrief-print-copy">
          <p className="steckbrief-print-auftrag">{auftrag}</p>
          <h1>{clinic.name}</h1>
          <p>
            {clinic.city} · {clinic.stateName}
          </p>
          <p>
            {clinic.traeger} · {settingKindLabel(clinic.setting)} · {clinic.placesEstimate} Plätze ·{" "}
            {genderSettingLabel(clinic.genderSetting)} · Regel {clinic.durationWeeksMin}–
            {clinic.durationWeeksMax} Wochen
            {clinic.durationKurzWeeks ? ` · Kurzzeit ${clinic.durationKurzWeeks} Wochen` : ""}
          </p>
          <p className="steckbrief-print-wait">
            Wartezeit {wait.label}
            <span>
              {" "}
              · Unsicherheit {WAIT_UNCERTAINTY_LABEL[wait.uncertainty]} · Schätzung, Stand{" "}
              {wait.asOfLabel}
            </span>
          </p>
          <p className="steckbrief-print-chips">
            {zulassung.map((chip) => (
              <span key={chip.label} data-status={chip.status}>
                {chip.label} {CHIP_STATUS_LABEL[chip.status]}
              </span>
            ))}
          </p>
        </div>
      </header>

      <p className="steckbrief-print-contact">
        {clinic.address}
        {" · "}
        Tel. {clinic.phone}
        {" · "}
        {clinic.email}
        {" · "}
        {host}
      </p>

      <div className="steckbrief-print-blocks">
        {STECKBRIEF_BLOCKS.map((block) => {
          const data = clinic.steckbrief[block.key];
          const lines = data.bullets.length ? data.bullets : ["Angabe liegt nicht vor."];
          return (
            <section key={block.key} className="steckbrief-print-block">
              <h2>
                <span>{block.nr}</span>
                {block.title}
              </h2>
              <ul>
                {lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              {data.chips.length ? (
                <p className="steckbrief-print-chips">
                  {data.chips.map((chip) => (
                    <span key={`${chip.label}-${chip.status}`} data-status={chip.status}>
                      {chip.label} {CHIP_STATUS_LABEL[chip.status]}
                    </span>
                  ))}
                </p>
              ) : null}
            </section>
          );
        })}
        <footer className="steckbrief-print-end">
          Quellen: {clinic.datenstand.quellen}. Angaben ohne Gewähr. Lohklar vermittelt nicht und sagt
          keine Aufnahme zu.
        </footer>
      </div>
    </div>
  );
}

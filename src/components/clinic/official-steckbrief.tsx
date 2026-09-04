import { PhotoStrip } from "@/components/clinic/photo-strip";
import { StatusChip } from "@/components/clinic/status-chip";
import { HighlightedText, isHighlightHit } from "@/components/lohlotse/highlight-text";
import { WartezeitSchaetzung } from "@/components/wait/wartezeit-schaetzung";
import {
  STECKBRIEF_BLOCKS,
  genderSettingLabel,
  settingKindLabel,
  type ChipStatus,
  type ClinicWithWait,
  type StatusChip as StatusChipData,
} from "@/lib/domain/types";
import { formatDeDate } from "@/lib/format";
import { cn } from "@/lib/utils";

function BlockMark() {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-2.5 shrink-0 self-center rounded-[2px] bg-primary"
    />
  );
}

function BlockTitle({
  nr,
  title,
  size = "block",
}: {
  nr: string;
  title: string;
  size?: "block" | "aside";
}) {
  return (
    <h2
      className={
        size === "aside"
          ? "flex items-baseline gap-2 font-display text-xl tracking-tight"
          : "flex items-baseline gap-2 font-display text-2xl tracking-tight"
      }
    >
      <BlockMark />
      <span className="font-sans text-xs font-medium uppercase tracking-caps text-ink-muted">
        {nr}
      </span>
      {title}
    </h2>
  );
}

export function OfficialSteckbrief({
  clinic,
  variant = "page",
  highlightQuotes = [],
  highlightBlocks = [],
}: {
  clinic: ClinicWithWait;
  variant?: "page" | "rail";
  highlightQuotes?: string[];
  highlightBlocks?: string[];
}) {
  const rail = variant === "rail";
  return (
    <article className={cn("flex flex-col gap-8", rail && "gap-5")}>
      {rail ? (
        <PhotoStrip photos={clinic.photos} clinicName={clinic.name} variant="aside" />
      ) : (
        <div className="lg:hidden">
          <PhotoStrip photos={clinic.photos} clinicName={clinic.name} />
        </div>
      )}

      <div
        className={
          rail
            ? "flex flex-col gap-5"
            : "flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-10"
        }
      >
        <div className={cn("flex min-w-0 flex-col", rail ? "gap-5" : "gap-8")}>
          <Steckkopf clinic={clinic} compact={rail} />
          {rail ? (
            <WaitSlot estimate={clinic.wait} marked={highlightBlocks.includes("wartezeit")} />
          ) : (
            <div className="lg:hidden">
              <WaitSlot estimate={clinic.wait} marked={highlightBlocks.includes("wartezeit")} />
            </div>
          )}
          <div>
            {STECKBRIEF_BLOCKS.map((block) => {
              const data = clinic.steckbrief[block.key];
              return (
                <SteckBlockView
                  key={block.key}
                  nr={block.nr}
                  title={block.title}
                  lead={block.lead}
                  bullets={data.bullets}
                  chips={data.chips}
                  quotes={highlightQuotes}
                  marked={highlightBlocks.includes(block.key)}
                  compact={rail}
                />
              );
            })}
          </div>
          {rail ? (
            <div className="space-y-4">
              <Kontakt clinic={clinic} />
              <Datenstand clinic={clinic} />
            </div>
          ) : (
            <div className="space-y-6 lg:hidden">
              <Kontakt clinic={clinic} />
              <Datenstand clinic={clinic} />
            </div>
          )}
        </div>

        {rail ? null : (
          <aside className="hidden lg:sticky lg:top-4 lg:block lg:space-y-6">
            <PhotoStrip photos={clinic.photos} clinicName={clinic.name} variant="aside" />
            <Kontakt clinic={clinic} />
            <WaitSlot estimate={clinic.wait} marked={highlightBlocks.includes("wartezeit")} />
            <Datenstand clinic={clinic} />
          </aside>
        )}
      </div>
    </article>
  );
}

function WaitSlot({
  estimate,
  marked = false,
}: {
  estimate: ClinicWithWait["wait"];
  marked?: boolean;
}) {
  return (
    <div
      data-steck-highlight={marked ? "true" : undefined}
      data-wait-highlight={marked ? "true" : undefined}
      className={cn(marked && "rounded-[var(--radius-md)] border-l-4 border-l-primary pl-3")}
    >
      <WartezeitSchaetzung estimate={estimate} />
    </div>
  );
}

function Steckkopf({ clinic, compact }: { clinic: ClinicWithWait; compact?: boolean }) {
  const zulassungChips: { label: string; status: ChipStatus }[] = [
    { label: "DRV", status: clinic.zulassung.drv },
    { label: "GKV", status: clinic.zulassung.gkv },
    { label: "AHB", status: clinic.zulassung.ahb },
    { label: "Beihilfe", status: clinic.zulassung.beihilfe },
  ];

  return (
    <header className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-caps text-ink-muted">
        Offizieller Steckbrief
      </p>
      {compact ? (
        <h2 className="font-display text-2xl tracking-tight">{clinic.name}</h2>
      ) : (
        <h1 className="font-display text-4xl tracking-tight">{clinic.name}</h1>
      )}
      <p className={compact ? "text-ink" : "text-lg text-ink"}>
        {clinic.city} · {clinic.stateName}
      </p>
      <p className="text-ink-muted">
        {clinic.traeger} · {settingKindLabel(clinic.setting)}
      </p>
      <p className="text-sm text-ink-muted">
        {clinic.placesEstimate} Plätze · {genderSettingLabel(clinic.genderSetting)} · Regel{" "}
        {clinic.durationWeeksMin}–{clinic.durationWeeksMax} Wochen
        {clinic.durationKurzWeeks
          ? ` · Kurzzeit ${clinic.durationKurzWeeks} Wochen`
          : " · Kurzzeit unbekannt"}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {zulassungChips.map((chip) => (
          <StatusChip key={chip.label} {...chip} />
        ))}
      </div>
    </header>
  );
}

function SteckBlockView({
  nr,
  title,
  lead,
  bullets,
  chips,
  quotes = [],
  marked = false,
  compact = false,
}: {
  nr: string;
  title: string;
  lead: string;
  bullets: string[];
  chips: StatusChipData[];
  quotes?: string[];
  marked?: boolean;
  compact?: boolean;
}) {
  const lines = bullets.length ? bullets : ["Angabe liegt nicht vor."];
  const chipList = chips.length
    ? chips
    : [{ label: "Angabe", status: "unbekannt" as const }];
  const blockHit = marked || lines.some((line) => isHighlightHit(line, quotes));
  return (
    <section
      data-steck-highlight={blockHit ? "true" : undefined}
      className={cn(
        "grid gap-4 border-t border-line py-6 sm:grid-cols-[minmax(0,1fr)_11rem]",
        compact && "py-4 sm:grid-cols-1",
        blockHit && "border-l-4 border-l-primary pl-3",
      )}
    >
      <div>
        <BlockTitle nr={nr} title={title} size={compact ? "aside" : "block"} />
        <p className="mt-1 text-sm text-ink-muted">{lead}</p>
        <ul className="mt-3 space-y-1.5 text-ink">
          {lines.map((line) => (
            <li key={line} className="flex gap-2">
              <span aria-hidden="true" className="text-ink-subtle">
                –
              </span>
              <HighlightedText text={line} quotes={quotes} />
            </li>
          ))}
        </ul>
      </div>
      {compact ? null : (
        <div className="flex flex-wrap content-start gap-1.5 sm:justify-end">
          {chipList.map((chip) => (
            <StatusChip key={`${chip.label}-${chip.status}`} {...chip} />
          ))}
        </div>
      )}
      {compact && chipList.length ? (
        <div className="flex flex-wrap gap-1.5">
          {chipList.map((chip) => (
            <StatusChip key={`${chip.label}-${chip.status}`} {...chip} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function Kontakt({ clinic }: { clinic: ClinicWithWait }) {
  const host = clinic.website.replace(/^https?:\/\//, "");
  return (
    <section className="rounded-[var(--radius-lg)] bg-bg-subtle p-4">
      <BlockTitle nr="11" title="Kontakt" size="aside" />
      <p className="mt-1 text-sm text-ink-muted">Aufnahme, Sozialdienst, Hausanschrift.</p>
      <ul className="mt-3 space-y-1.5 text-sm text-ink">
        <li className="flex gap-2">
          <span aria-hidden="true" className="text-ink-subtle">
            –
          </span>
          <span>Anschrift: {clinic.address}</span>
        </li>
        <li className="flex gap-2">
          <span aria-hidden="true" className="text-ink-subtle">
            –
          </span>
          <span>
            Telefon:{" "}
            <a href={`tel:${clinic.phone.replace(/\s/g, "")}`} className="hover:underline">
              {clinic.phone}
            </a>
          </span>
        </li>
        <li className="flex gap-2">
          <span aria-hidden="true" className="text-ink-subtle">
            –
          </span>
          <span>
            Mail:{" "}
            <a href={`mailto:${clinic.email}`} className="hover:underline">
              {clinic.email}
            </a>
          </span>
        </li>
        <li className="flex gap-2">
          <span aria-hidden="true" className="text-ink-subtle">
            –
          </span>
          <span>
            Website:{" "}
            <a href={clinic.website} className="hover:underline" rel="noreferrer">
              {host}
            </a>
          </span>
        </li>
      </ul>
      <p className="mt-3 text-xs text-ink-muted">
        Musterprofil. Keine erfundenen Durchwahlen. Lohklar vermittelt nicht.
      </p>
    </section>
  );
}

function Datenstand({ clinic }: { clinic: ClinicWithWait }) {
  return (
    <section className="rounded-[var(--radius-lg)] bg-bg-subtle p-4">
      <BlockTitle nr="13" title="Datenstand" size="aside" />
      <p className="mt-1 text-sm text-ink-muted">Letzte Prüfung, Quelle, Gewähr.</p>
      <ul className="mt-3 space-y-1.5 text-sm text-ink">
        <li className="flex gap-2">
          <span aria-hidden="true" className="text-ink-subtle">
            –
          </span>
          <span>Letzte Prüfung: {formatDeDate(clinic.datenstand.geprueft)}</span>
        </li>
        <li className="flex gap-2">
          <span aria-hidden="true" className="text-ink-subtle">
            –
          </span>
          <span>Quellenkurz: {clinic.datenstand.quellen}</span>
        </li>
        <li className="flex gap-2">
          <span aria-hidden="true" className="text-ink-subtle">
            –
          </span>
          <span>Angaben ohne Gewähr.</span>
        </li>
      </ul>
      <div className="mt-3">
        <StatusChip label="Musterkatalog" status="vorhanden" />
      </div>
    </section>
  );
}

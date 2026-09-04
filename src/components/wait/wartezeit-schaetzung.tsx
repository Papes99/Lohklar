import { useEffect, useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WAIT_UNCERTAINTY_LABEL, type WaitEstimate } from "@/lib/domain/types";
import { emitUsage } from "@/lib/domain/usage";
import { coerceWaitEstimate } from "@/lib/domain/wait-time";
import { cn } from "@/lib/utils";

type Variant = "block" | "inline" | "chip";

/**
 * Single UI for every wait-time display. Never duplicate this markup.
 * Values must come from `computeWaitEstimate` (live) or a stored snapshot (documents).
 */
export function WartezeitSchaetzung({
  estimate,
  variant = "block",
  className,
  track = true,
}: {
  estimate: WaitEstimate;
  variant?: Variant;
  className?: string;
  track?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const value = coerceWaitEstimate(estimate);
  useEffect(() => {
    if (!track || !value) return;
    emitUsage("wait_shown", { clinicId: value.clinicId });
  }, [track, value?.clinicId]);
  if (!value) return null;

  const uncertaintyTone =
    value.uncertainty === "schmal" ? "ok" : value.uncertainty === "breit" ? "warn" : "neutral";

  if (variant === "chip") {
    return (
      <span
        className={cn(
          "inline-flex max-w-full flex-wrap items-center gap-1.5 text-xs font-medium text-ink-muted",
          className,
        )}
        title={value.disclaimer}
      >
        <span className="tabular-nums text-ink">{value.rangeLabel}</span>
        <span>(Schätzung, Stand {value.asOfLabel})</span>
        <Badge tone={uncertaintyTone}>Unsicherheit {WAIT_UNCERTAINTY_LABEL[value.uncertainty]}</Badge>
      </span>
    );
  }

  if (variant === "inline") {
    return (
      <span className={cn("tabular-nums text-ink", className)} title={value.disclaimer}>
        <span className="font-medium">{value.label}</span>
        <span className="text-ink-muted">
          {" "}
          · Unsicherheit {WAIT_UNCERTAINTY_LABEL[value.uncertainty]}
        </span>
      </span>
    );
  }

  return (
    <section
      className={cn("rounded-[var(--radius-lg)] bg-bg-subtle p-4", className)}
      aria-label="Wartezeit-Schätzung"
    >
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
        Wartezeit-Schätzung
      </p>
      <p className="mt-1 font-display text-2xl tracking-tight text-ink tabular-nums">
        {value.label}
      </p>
      <div className="mt-2">
        <Badge tone={uncertaintyTone}>
          Unsicherheit {WAIT_UNCERTAINTY_LABEL[value.uncertainty]}
        </Badge>
      </div>
      <button
        type="button"
        data-wait-rechenweg="toggle"
        className="no-print mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (track && !open) emitUsage("wait_rechenweg", { clinicId: value.clinicId });
          setOpen((current) => !current);
        }}
      >
        Rechenweg {open ? "verbergen" : "ansehen"}
        <ChevronDown
          className={cn("size-4 transition-transform duration-150", open && "rotate-180")}
        />
      </button>
      {open ? (
        <div className="no-print">
          <Rechenweg estimate={value} id={panelId} />
        </div>
      ) : null}
      <div className="print-only">
        <Rechenweg estimate={value} />
      </div>
    </section>
  );
}

function Rechenweg({ estimate, id }: { estimate: WaitEstimate; id?: string }) {
  return (
    <div
      id={id}
      className="mt-3 space-y-4 border-t border-line pt-3 text-sm text-ink"
    >
      <section>
        <h3 className="font-medium">Ergebnis und Spanne</h3>
        <p className="mt-1 tabular-nums">{estimate.label}</p>
        <p className="text-ink-muted">
          Unsicherheit {WAIT_UNCERTAINTY_LABEL[estimate.uncertainty]}.
        </p>
      </section>
      <section>
        <h3 className="font-medium">Verwendete Quellen / Stand</h3>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-ink-muted">
          {estimate.sources.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="font-medium">Gewichtete Faktoren</h3>
        <p className="mt-1 text-ink-muted">{estimate.formula}</p>
        <p className="mt-1">{estimate.formulaFilled}</p>
        <ol className="mt-2 space-y-2">
          {estimate.factors.map((item) => (
            <li key={item.nr ?? item.label}>
              <span className="font-medium">
                {item.nr ? `${item.nr} · ` : ""}
                {item.label}
              </span>
              {item.weight ? (
                <span className="text-ink-muted"> · Gewicht {item.weight}</span>
              ) : null}
              {item.formula ? <p className="text-ink-muted">{item.formula}</p> : null}
              <p className="text-ink-muted">{item.effect}</p>
            </li>
          ))}
        </ol>
      </section>
      <section>
        <h3 className="font-medium">Was unsicher ist</h3>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-ink-muted">
          {estimate.uncertain.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="font-medium">Was die Zahl nicht bedeutet</h3>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-ink-muted">
          {estimate.notMeaning.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-2 text-ink-muted">{estimate.disclaimer}</p>
      </section>
    </div>
  );
}

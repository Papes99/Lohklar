import { useState } from "react";
import { ChevronDown, ChevronUp, GripVertical, Undo2, X } from "lucide-react";
import { WartezeitSchaetzung } from "@/components/wait/wartezeit-schaetzung";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import type { DocumentHouse } from "@/lib/domain/document";
import { cn } from "@/lib/utils";

export function HouseBlock({
  house,
  rank,
  total,
  onChange,
  onMove,
  onPark,
  onDragStart,
  onDrop,
}: {
  house: DocumentHouse;
  rank: number;
  total: number;
  onChange: (next: DocumentHouse) => void;
  onMove: (dir: -1 | 1) => void;
  onPark: () => void;
  onDragStart: () => void;
  onDrop: () => void;
}) {
  return (
    <article
      className="dokument-house rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5"
      draggable
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", house.clinicId);
        onDragStart();
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        onDrop();
      }}
    >
      <header className="flex items-start gap-3">
        <span
          className="no-print mt-1 hidden text-ink-subtle sm:inline"
          aria-hidden="true"
        >
          <GripVertical className="size-4" />
        </span>
        <span className="font-display text-2xl tabular-nums text-primary">{rank}</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl tracking-tight">{house.clinicName}</h3>
          <p className="text-sm text-ink-muted">{house.location}</p>
        </div>
        {house.photo ? (
          <img
            src={house.photo.path}
            alt={house.photo.alt}
            className="aspect-photo h-16 w-24 shrink-0 rounded-[var(--radius-sm)] object-cover sm:h-20 sm:w-32"
          />
        ) : null}
      </header>

      <div className="no-print mt-3 flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          type="button"
          id={`house-${house.clinicId}-up`}
          aria-label={`${house.clinicName} nach oben`}
          disabled={rank === 1}
          onClick={() => onMove(-1)}
        >
          <ChevronUp className="size-4" aria-hidden="true" />
          Auf
        </Button>
        <Button
          variant="secondary"
          size="sm"
          type="button"
          id={`house-${house.clinicId}-down`}
          aria-label={`${house.clinicName} nach unten`}
          disabled={rank === total}
          onClick={() => onMove(1)}
        >
          <ChevronDown className="size-4" aria-hidden="true" />
          Ab
        </Button>
        <RemoveHouseButton name={house.clinicName} clinicId={house.clinicId} onPark={onPark} />
      </div>

      <Field
        id={`house-${house.clinicId}-fit`}
        label="Passung"
        value={house.fitSentence}
        onChange={(fitSentence) => onChange({ ...house, fitSentence })}
      />

      <Field
        id={`house-${house.clinicId}-features`}
        label="Merkmale"
        value={house.features.join("\n")}
        onChange={(raw) =>
          onChange({
            ...house,
            features: raw
              .split("\n")
              .map((line) => line.replace(/^•\s*/, "").trim())
              .filter(Boolean)
              .slice(0, 8),
          })
        }
        printList={house.features}
      />

      <div className="mt-4">
        <WartezeitSchaetzung estimate={house.wait} />
      </div>

      <Field
        id={`house-${house.clinicId}-specials`}
        label="Besonderheiten"
        value={house.specials}
        onChange={(specials) => onChange({ ...house, specials })}
      />
      <Field
        id={`house-${house.clinicId}-hints`}
        label="Hinweise zum Haus"
        value={house.hints}
        onChange={(hints) => onChange({ ...house, hints })}
      />
    </article>
  );
}

function RemoveHouseButton({
  name,
  clinicId,
  onPark,
}: {
  name: string;
  clinicId: string;
  onPark: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        id={`house-${clinicId}-remove`}
        aria-label={`${name} aus diesem Dokument nehmen`}
        onClick={() => setOpen(true)}
      >
        <X className="size-4" aria-hidden="true" />
        Haus aus diesem Dokument nehmen
      </Button>
      {open ? (
        <Modal titleId={`remove-${clinicId}`} title="Haus aus diesem Dokument nehmen">
          <p className="mt-2 text-sm text-ink-muted">
            Nur aus diesem Dokument entfernen. Die Klinik bleibt in der Datenbank.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={() => {
                onPark();
                setOpen(false);
              }}
            >
              Entfernen
            </Button>
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export function ParkedHouse({
  house,
  onRestore,
}: {
  house: DocumentHouse;
  onRestore: () => void;
}) {
  return (
    <li className="no-print flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-md)] bg-bg-subtle px-3 py-2 text-sm">
      <span>
        {house.clinicName}
        <span className="text-ink-muted"> · {house.location}</span>
      </span>
      <Button variant="ghost" size="sm" type="button" onClick={onRestore}>
        <Undo2 className="size-4" aria-hidden="true" />
        Wieder in die Rangfolge
      </Button>
    </li>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  printList,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  printList?: string[];
}) {
  return (
    <div className="mt-4 space-y-1.5">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
        {label}
      </label>
      <Textarea
        id={id}
        className={cn("no-print min-h-20")}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {printList ? (
        <ul className="print-only list-disc space-y-1 pl-5 text-sm">
          {printList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="print-only text-sm text-ink">{value}</p>
      )}
    </div>
  );
}

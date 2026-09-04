import { CHIP_STATUS_LABEL, type ChipStatus, type StatusChip } from "@/lib/domain/types";
import { cn } from "@/lib/utils";

const TONE: Record<ChipStatus, string> = {
  vorhanden: "bg-primary-soft text-ok",
  eingeschraenkt: "bg-bg-subtle text-warn",
  nicht_angeboten: "bg-bg-subtle text-ink-muted",
  unbekannt: "bg-surface text-ink-subtle shadow-[var(--shadow-border)]",
};

export function StatusChip({ label, status, className }: StatusChip & { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        TONE[status],
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current opacity-70" />
      {label}
      <span className="font-normal opacity-80">· {CHIP_STATUS_LABEL[status]}</span>
    </span>
  );
}

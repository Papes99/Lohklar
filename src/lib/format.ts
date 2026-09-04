import { RUN_STATUS_LABEL, type RunStatus } from "@/lib/domain/types";

export function formatDeDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    const [y, m, d] = iso.split("-");
    if (y && m && d) return `${d}.${m}.${y}`;
    return iso;
  }
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDeTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDeDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return formatDeDate(iso);
  return date.toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatRunStatus(status: RunStatus): string {
  return RUN_STATUS_LABEL[status] ?? status;
}

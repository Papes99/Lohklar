import type { KlaromatAnswers, MatchSnapshot } from "@/lib/domain/types";

export const GUEST_RUN_KEY = "lohklar.guest-run.v1";

export type GuestRun = {
  answers: KlaromatAnswers;
  matches: MatchSnapshot[];
  completedAt: string;
};

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readGuestRun(): GuestRun | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(GUEST_RUN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GuestRun;
    if (!parsed?.answers || !Array.isArray(parsed.matches)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeGuestRun(run: GuestRun): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(GUEST_RUN_KEY, JSON.stringify(run));
}

export function clearGuestRun(): void {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(GUEST_RUN_KEY);
}

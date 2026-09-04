import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "primary" | "ok" | "warn" | "danger";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "neutral" && "bg-bg-subtle text-ink-muted",
        tone === "primary" && "bg-primary-soft text-primary",
        tone === "ok" && "bg-primary-soft text-ok",
        tone === "warn" && "bg-bg-subtle text-warn",
        tone === "danger" && "bg-bg-subtle text-danger",
        className,
      )}
      {...props}
    />
  );
}

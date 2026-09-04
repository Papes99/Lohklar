import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Modal({
  titleId,
  title,
  children,
  className,
}: {
  titleId: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-ink/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "w-full max-w-lg rounded-[var(--radius-xl)] bg-surface p-6 shadow-[var(--shadow-border)]",
          className,
        )}
      >
        <h2 id={titleId} className="font-display text-2xl tracking-tight">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

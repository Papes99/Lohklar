import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function ProfileChip({
  name,
  image,
  className,
}: {
  name: string;
  image?: string | null;
  className?: string;
}) {
  const label = name.trim() || "Profil";
  const initial = label.charAt(0).toUpperCase();
  return (
    <Link
      to="/app/profil"
      className={cn(
        "inline-flex min-h-11 max-w-44 shrink-0 items-center gap-2 rounded-[var(--radius-md)] px-2 text-sm font-medium text-ink hover:bg-bg-subtle",
        className,
      )}
      aria-label="Profil"
    >
      {image ? (
        <img
          src={image}
          alt=""
          className="size-8 rounded-full object-cover"
          crossOrigin="anonymous"
        />
      ) : (
        <span className="grid size-8 place-items-center rounded-full bg-primary-soft text-sm font-medium text-primary">
          {initial}
        </span>
      )}
      <span className="truncate">{label}</span>
    </Link>
  );
}

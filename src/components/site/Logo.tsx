import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2 ${className}`} aria-label="FitCo home">
      <span aria-hidden className="relative grid h-9 w-9 place-items-center rounded-2xl bg-ink text-ink-foreground font-display text-base font-bold">
        <span className="text-primary">F</span>
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        Fit<span className="text-primary">Co</span>
      </span>
    </Link>
  );
}

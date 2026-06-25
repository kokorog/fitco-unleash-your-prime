import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-baseline gap-0.5 ${className}`}
      aria-label="FitCo home"
    >
      <span className="font-display text-2xl font-bold tracking-tight text-foreground">Fit</span>
      <span className="font-display text-2xl font-bold tracking-tight text-primary">Co</span>
    </Link>
  );
}

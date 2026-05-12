import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2 ${className}`}>
      <span className="relative grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground font-bold glow transition-transform group-hover:scale-105">
        F
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        FIT<span className="text-primary">CO</span>
      </span>
    </Link>
  );
}
import { Link } from "@tanstack/react-router";
import fitcoMark from "@/assets/fitco-mark-crop.jpg";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2 ${className}`}
      aria-label="FitCo home"
    >
      <span
        aria-hidden
        className="relative grid h-10 w-10 overflow-hidden rounded-2xl bg-ink shadow-soft ring-1 ring-white/10"
      >
        <img src={fitcoMark} alt="" className="h-full w-full object-cover" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        Fit<span className="text-primary">Co</span>
      </span>
    </Link>
  );
}

import { Apple } from "lucide-react";

export function StoreButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href="#"
        aria-label="Изтегли от App Store"
        className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 transition-all hover:border-primary/60 hover:shadow-soft"
      >
        <Apple className="h-7 w-7" />
        <div className="text-left leading-tight">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Изтегли от</div>
          <div className="text-base font-semibold">App Store</div>
        </div>
      </a>
      <a
        href="#"
        aria-label="Изтегли от Google Play"
        className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 transition-all hover:border-primary/60 hover:shadow-soft"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
          <path fill="oklch(0.46 0.13 158)" d="M3.6 2.3 14.5 12 3.6 21.7c-.4-.3-.6-.8-.6-1.3V3.6c0-.5.2-1 .6-1.3z"/>
          <path fill="oklch(0.92 0.22 145)" d="M16.6 14.1 18.9 12l-2.3-2.1L14.5 12z"/>
          <path fill="#fff" opacity=".85" d="M3.6 2.3c.3-.2.7-.3 1-.3.3 0 .6.1.9.2L17 9 14.5 12z"/>
          <path fill="#fff" opacity=".55" d="M3.6 21.7 14.5 12 17 15l-11.5 6.8c-.3.1-.6.2-.9.2-.3 0-.7-.1-1-.3z"/>
        </svg>
        <div className="text-left leading-tight">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Свали от</div>
          <div className="text-base font-semibold">Google Play</div>
        </div>
      </a>
    </div>
  );
}
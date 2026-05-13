import { useEffect, useState } from "react";

export function ComingSoon() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("bg-BG", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#05070a] text-white">
      {/* Ambient gradient field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.62 0.16 152 / 0.28), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 110%, oklch(0.46 0.13 158 / 0.22), transparent 60%), radial-gradient(ellipse 50% 40% at 10% 90%, oklch(0.55 0.14 155 / 0.16), transparent 60%)",
        }}
      />

      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
        }}
      />

      {/* Animated orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-pulse-orb"
        style={{
          background:
            "conic-gradient(from 90deg, oklch(0.62 0.16 152 / 0.5), oklch(0.46 0.13 158 / 0.0), oklch(0.62 0.16 152 / 0.5))",
        }}
      />

      {/* Top bar */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/5 backdrop-blur-md">
            <span
              className="block h-2.5 w-2.5 rounded-full"
              style={{
                background: "oklch(0.72 0.18 152)",
                boxShadow: "0 0 18px oklch(0.72 0.18 152 / 0.85)",
              }}
            />
          </div>
          <span className="font-display text-lg font-semibold tracking-[0.2em]">
            FITCO
          </span>
        </div>
        <div className="hidden items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/50 sm:flex">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Stealth Mode
          </span>
          <span className="text-white/20">/</span>
          <span className="font-mono text-white/60">{time}</span>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-180px)] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-white/70 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          В подготовка · 2026
        </span>

        <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-[8rem]">
          <span className="block bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Coming
          </span>
          <span
            className="block bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(120deg, oklch(0.85 0.16 152), oklch(0.62 0.16 152) 50%, oklch(0.45 0.13 158))",
            }}
          >
            Soon.
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-balance text-base text-white/60 sm:text-lg">
          Something powerful is being crafted. A new standard for movement,
          performance and discipline — designed in silence.
        </p>

        <div className="mt-12 flex w-full max-w-md items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            FITCO ⁄ STEALTH
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Subtle orbiting dots */}
        <div className="relative mt-14 h-32 w-full max-w-sm">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-4 rounded-full border border-white/5" />
          <div className="absolute inset-8 rounded-full border border-white/5" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_24px_oklch(0.72_0.18_152/0.9)]" />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mx-auto max-w-6xl px-6 pb-8">
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.25em] text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} FITCO. All rights reserved.</span>
          <span>contact: hello@fitcoapp.com</span>
        </div>
      </footer>

      <style>{`
        @keyframes pulse-orb {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.08); opacity: 1; }
        }
        .animate-pulse-orb { animation: pulse-orb 9s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
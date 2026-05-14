import type { ReactNode } from "react";

export function PhoneShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto w-[260px] sm:w-[280px] ${className}`}>
      <div className="rounded-[2.5rem] border border-border bg-ink p-2 shadow-elevated">
        <div className="overflow-hidden rounded-[2rem] bg-background">
          <div className="flex items-center justify-between px-5 py-2 text-[10px] text-muted-foreground">
            <span>9:41</span>
            <span aria-hidden className="h-1.5 w-12 rounded-full bg-foreground/40" />
          </div>
          <div className="px-4 pb-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function NutritionMockup() {
  return (
    <PhoneShell>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-primary">Today</p>
        <h4 className="font-display text-xl font-bold">Macros</h4>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { v: "24g", l: "Protein" },
            { v: "39g", l: "Carbs" },
            { v: "6.5g", l: "Fat" },
            { v: "2100ml", l: "Water" },
          ].map((m) => (
            <div key={m.l} className="rounded-2xl bg-secondary p-3">
              <p className="font-display text-lg font-bold">{m.v}</p>
              <p className="text-[10px] text-muted-foreground">{m.l}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-2xl bg-primary/15 p-3 text-center">
          <p className="text-[10px] uppercase text-primary">Remaining</p>
          <p className="font-display text-base font-bold">1,894 kcal</p>
        </div>
        <div className="mt-3 rounded-full bg-ink py-2.5 text-center text-[11px] font-semibold text-ink-foreground">+ Add food</div>
      </div>
    </PhoneShell>
  );
}

export function TrainingMockup() {
  return (
    <PhoneShell>
      <div>
        <div className="card-ink rounded-2xl p-4 text-ink-foreground">
          <p className="text-[10px] uppercase tracking-wider text-primary">Day 5</p>
          <p className="mt-1 font-display text-xl font-bold">Strength · 17m</p>
          <p className="mt-1 text-[10px] opacity-70">3 exercises · 188 kcal</p>
        </div>
        <div className="mt-3 flex gap-1.5">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div key={i} className={`flex-1 rounded-xl py-2 text-center text-[10px] ${i === 4 ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{d}</div>
          ))}
        </div>
        <div className="mt-3 rounded-full bg-primary py-2.5 text-center text-[11px] font-semibold text-primary-foreground">▸ Start workout</div>
        <div className="mt-3 space-y-2">
          {[
            { t: "Brisk walk", d: "5 min · Warm-up" },
            { t: "Sprint intervals", d: "10 min · Cardio" },
          ].map((x) => (
            <div key={x.t} className="flex items-center gap-2 rounded-2xl bg-secondary p-2.5">
              <div className="h-9 w-9 rounded-xl bg-primary/20" />
              <div className="flex-1">
                <p className="text-xs font-semibold">{x.t}</p>
                <p className="text-[10px] text-muted-foreground">{x.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneShell>
  );
}

export function CommunityMockup() {
  return (
    <PhoneShell>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-primary">Feed</p>
        <h4 className="font-display text-xl font-bold">Friends</h4>
        <div className="mt-3 space-y-2.5">
          {[
            { n: "Mia", t: "Hit 5 km this morning 🌅", k: "+18 XP" },
            { n: "Alex", t: "Day 12 streak ✅", k: "+25 XP" },
          ].map((p) => (
            <div key={p.n} className="rounded-2xl bg-secondary p-3">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-primary/30" />
                <p className="text-xs font-semibold">{p.n}</p>
                <span className="ml-auto rounded-full bg-primary/20 px-2 py-0.5 text-[9px] font-semibold text-primary">{p.k}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{p.t}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-2xl bg-ink p-3 text-ink-foreground">
          <p className="text-[10px] uppercase opacity-70">Challenge</p>
          <p className="mt-1 text-xs font-semibold">7-day consistency</p>
          <div className="mt-2 h-1.5 rounded-full bg-white/10">
            <div className="h-1.5 w-3/4 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

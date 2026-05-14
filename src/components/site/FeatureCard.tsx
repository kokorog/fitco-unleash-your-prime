import type { ReactNode } from "react";

export function FeatureCard({ icon, title, body }: { icon?: ReactNode; title: string; body: string }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated">
      {icon && (
        <div className="mb-4 grid h-10 w-10 place-items-center rounded-2xl bg-primary/15 text-primary">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

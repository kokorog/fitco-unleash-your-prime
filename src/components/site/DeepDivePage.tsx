import type { ReactNode } from "react";
import { PageShell, PageHero } from "./PageShell";
import { CTASection } from "./CTASection";

export function DeepDivePage({ eyebrow, title, sub, bullets, mockup }: { eyebrow: string; title: string; sub: string; bullets: readonly string[]; mockup: ReactNode }) {
  return (
    <PageShell>
      <PageHero eyebrow={eyebrow} title={title} description={sub} />
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <ul className="grid gap-3 sm:grid-cols-2">
            {bullets.map((b) => (
              <li key={b} className="rounded-2xl border border-border bg-card p-4 text-sm">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" /> {b}
              </li>
            ))}
          </ul>
          <div className="flex justify-center">{mockup}</div>
        </div>
      </section>
      <CTASection />
    </PageShell>
  );
}

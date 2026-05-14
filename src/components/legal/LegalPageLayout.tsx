import type { ReactNode } from "react";
import { PageShell, PageHero } from "@/components/site/PageShell";

export function LegalPageLayout({ eyebrow, title, updated, intro, children }: { eyebrow?: string; title: string; updated: string; intro: string; children: ReactNode }) {
  return (
    <PageShell>
      <PageHero eyebrow={eyebrow} title={title} description={intro} />
      <article className="prose-fitco mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{updated}: 2026-05-14</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/90">{children}</div>
      </article>
    </PageShell>
  );
}

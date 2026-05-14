import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { CTASection } from "@/components/site/CTASection";
import { useLang } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "Progress, rewards & challenges — FitCo" },
      { name: "description", content: "Streaks, XP, weekly missions, leaderboards and a coins wallet that unlocks partner perks." },
      { property: "og:title", content: "Progress, rewards & challenges — FitCo" },
      { property: "og:description", content: "Show up for yourself — and get rewarded." },
      { property: "og:url", content: "https://fitcoapp.com/rewards" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com/rewards" }],
  }),
  component: () => {
    const { t } = useLang();
    return (
      <PageShell>
        <PageHero eyebrow={t.progress.eyebrow} title={t.progress.title} description={t.progress.sub} />
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {t.progress.bullets.map((b, i) => (
                <div key={b} className={`rounded-3xl p-6 ${i % 2 === 0 ? "bg-card border border-border" : "card-ink"}`}>
                  <p className="font-display text-2xl font-bold">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <CTASection />
      </PageShell>
    );
  },
});

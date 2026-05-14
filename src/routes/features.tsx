import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { FeatureCard } from "@/components/site/FeatureCard";
import { CTASection } from "@/components/site/CTASection";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Apple, Camera, Dumbbell, Activity, BookOpen, Users, Trophy, Coins } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — FitCo" },
      { name: "description", content: "Nutrition, AI food scanner, personalized training, progress, community, challenges and rewards — all in FitCo." },
      { property: "og:title", content: "Features — FitCo" },
      { property: "og:description", content: "Everything FitCo offers in one place." },
      { property: "og:url", content: "https://fitcoapp.com/features" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com/features" }],
  }),
  component: () => {
    const { t } = useLang();
    const icons = [Apple, Camera, Dumbbell, Activity, BookOpen, Users, Trophy, Coins];
    return (
      <PageShell>
        <PageHero eyebrow={t.featuresGrid.heading.split(".")[0]} title={t.featuresGrid.heading} description={t.featuresGrid.sub} />
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.featuresGrid.items.map((f, i) => {
                const Icon = icons[i % icons.length];
                return <FeatureCard key={f.title} icon={<Icon className="h-5 w-5" />} title={f.title} body={f.body} />;
              })}
            </div>
          </div>
        </section>
        <CTASection />
      </PageShell>
    );
  },
});

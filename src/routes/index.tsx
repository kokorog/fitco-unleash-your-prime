import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Apple, Dumbbell, Users, TrendingUp, Camera, Trophy, Coins, Activity, BookOpen } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { FeatureCard } from "@/components/site/FeatureCard";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { CTASection } from "@/components/site/CTASection";
import { WaitlistForm } from "@/components/site/WaitlistForm";
import { NutritionMockup, TrainingMockup, CommunityMockup } from "@/components/site/AppMockup";
import { useLang } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FitCo — Fitness, Nutrition, Training & Community" },
      { name: "description", content: "FitCo helps you track meals with an AI food scanner, follow personalized workouts, join challenges and stay consistent with a community." },
      { property: "og:title", content: "FitCo — Fitness, Nutrition, Training & Community" },
      { property: "og:description", content: "Track nutrition, follow personalized workouts, join challenges and stay consistent." },
      { property: "og:url", content: "https://fitcoapp.com" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com" }],
  }),
  component: HomePage,
});

const icons = [Apple, Camera, Dumbbell, Activity, BookOpen, Users, Trophy, Coins];

function HomePage() {
  const { t } = useLang();
  return (
    <PageShell>
      {/* 1. HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.86_0.13_162/0.25),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pb-24 lg:pt-32">
          <div className="lg:col-span-7">
            <span className="pill animate-fade-up">{t.hero.eyebrow}</span>
            <h1 className="animate-fade-up mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl" style={{ animationDelay: "0.05s" }}>
              {t.hero.title}
            </h1>
            <p className="animate-fade-up mt-6 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: "0.1s" }}>
              {t.hero.sub}
            </p>
            <div className="animate-fade-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: "0.15s" }}>
              <Link to="/" hash="waitlist" className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-ink-foreground shadow-soft transition-all hover:shadow-elevated">
                {t.cta.waitlist} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to="/features" className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold hover:bg-secondary">
                {t.cta.learnMore}
              </Link>
            </div>
            <ul className="animate-fade-up mt-8 grid max-w-lg grid-cols-2 gap-2 text-sm text-muted-foreground" style={{ animationDelay: "0.2s" }}>
              {t.hero.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mt-16 lg:col-span-5 lg:mt-0">
            <div className="relative grid grid-cols-3 gap-2 sm:gap-3">
              <div className="col-span-2 animate-fade-up" style={{ animationDelay: "0.2s" }}><NutritionMockup /></div>
              <div className="-mt-8 animate-fade-up" style={{ animationDelay: "0.3s" }}><TrainingMockup /></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROMISES */}
      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="pill">{t.promises.heading.split(".")[0]}</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.promises.heading}</h2>
            <p className="mt-3 text-base text-muted-foreground">{t.promises.sub}</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {t.promises.items.map((p) => (
              <div key={p.title} className="card-cream p-6">
                <h3 className="font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURES GRID */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.featuresGrid.heading}</h2>
            <p className="mt-3 text-base text-muted-foreground">{t.featuresGrid.sub}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.featuresGrid.items.map((f, i) => {
              const Icon = icons[i % icons.length];
              return <FeatureCard key={f.title} icon={<Icon className="h-5 w-5" />} title={f.title} body={f.body} />;
            })}
          </div>
        </div>
      </section>

      {/* 4. NUTRITION DEEP-DIVE */}
      <DeepDive
        side="left"
        eyebrow={t.nutrition.eyebrow}
        title={t.nutrition.title}
        sub={t.nutrition.sub}
        bullets={t.nutrition.bullets}
        mockup={<NutritionMockup />}
      />

      {/* 5. TRAINING DEEP-DIVE */}
      <DeepDive
        side="right"
        eyebrow={t.training.eyebrow}
        title={t.training.title}
        sub={t.training.sub}
        bullets={t.training.bullets}
        mockup={<TrainingMockup />}
        dark
      />

      {/* 6. COMMUNITY DEEP-DIVE */}
      <DeepDive
        side="left"
        eyebrow={t.community.eyebrow}
        title={t.community.title}
        sub={t.community.sub}
        bullets={t.community.bullets}
        mockup={<CommunityMockup />}
      />

      {/* 7. PROGRESS / REWARDS / CHALLENGES */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="pill">{t.progress.eyebrow}</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.progress.title}</h2>
            <p className="mt-3 text-base text-muted-foreground">{t.progress.sub}</p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.progress.bullets.map((b, i) => (
              <div key={b} className={`rounded-3xl p-6 ${i % 2 === 0 ? "bg-card" : "card-ink"}`}>
                <p className="font-display text-2xl font-bold">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BUILT FOR REAL LIFE */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.realLife.heading}</h2>
            <p className="mt-3 text-base text-muted-foreground">{t.realLife.sub}</p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {t.realLife.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/80">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="border-t border-border bg-surface py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.faq.title}</h2>
            <p className="mt-3 text-base text-muted-foreground">{t.faq.sub}</p>
          </div>
          <div className="mt-10">
            <FAQAccordion items={t.faq.items.slice(0, 6)} />
          </div>
          <p className="mt-6 text-center text-sm">
            <Link to="/faq" className="text-primary underline-offset-4 hover:underline">→ {t.nav.faq}</Link>
          </p>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <CTASection />
    </PageShell>
  );
}

function DeepDive({ side, eyebrow, title, sub, bullets, mockup, dark }: { side: "left" | "right"; eyebrow: string; title: string; sub: string; bullets: readonly string[]; mockup: React.ReactNode; dark?: boolean }) {
  const textBlock = (
    <div>
      <span className="pill">{eyebrow}</span>
      <h2 className={`mt-4 text-3xl font-bold sm:text-4xl ${dark ? "text-ink-foreground" : ""}`}>{title}</h2>
      <p className={`mt-4 max-w-xl text-base ${dark ? "text-ink-foreground/70" : "text-muted-foreground"}`}>{sub}</p>
      <ul className={`mt-6 grid gap-2 sm:grid-cols-2 ${dark ? "text-ink-foreground/85" : ""}`}>
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {b}
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <section className={`relative overflow-hidden py-20 ${dark ? "bg-ink text-ink-foreground" : ""}`}>
      {dark && <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />}
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {side === "left" ? <>{textBlock}<div className="flex justify-center">{mockup}</div></> : <><div className="flex justify-center lg:order-1">{mockup}</div><div className="lg:order-2">{textBlock}</div></>}
      </div>
    </section>
  );
}

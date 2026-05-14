import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Apple, Dumbbell, Users, Camera, Trophy, Coins, Activity, BookOpen } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { FeatureCard } from "@/components/site/FeatureCard";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { CTASection } from "@/components/site/CTASection";
import { NutritionMockup, TrainingMockup, CommunityMockup } from "@/components/site/AppMockup";
import { Reveal, Parallax } from "@/components/site/Reveal";
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

  // Smooth-scroll to hash on first mount if present
  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (!hash) return;
    const id = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <PageShell>
      {/* 1. HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.86_0.13_162/0.25),transparent_55%)]" />
        <div aria-hidden className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float" />
        <div aria-hidden className="pointer-events-none absolute right-10 top-10 h-56 w-56 rounded-full bg-lemon/30 blur-3xl animate-float" style={{ animationDelay: "1.2s" }} />
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
              <a href="#waitlist" className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-ink-foreground shadow-soft transition-all hover:shadow-elevated">
                {t.cta.waitlist} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="#features" className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold hover:bg-secondary">
                {t.cta.learnMore}
              </a>
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
            <Parallax speed={0.08}>
              <div className="relative grid grid-cols-3 gap-2 sm:gap-3">
                <div className="col-span-2 animate-fade-up" style={{ animationDelay: "0.2s" }}><NutritionMockup /></div>
                <div className="-mt-8 animate-fade-up animate-float" style={{ animationDelay: "0.3s" }}><TrainingMockup /></div>
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      {/* 2. PROMISES */}
      <section id="promises" className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <span className="pill">{t.promises.heading.split(".")[0]}</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.promises.heading}</h2>
            <p className="mt-3 text-base text-muted-foreground">{t.promises.sub}</p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {t.promises.items.map((p, i) => (
              <Reveal key={p.title} delay={i * 90} className="card-cream p-6">
                <h3 className="font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURES GRID */}
      <section id="features" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <span className="pill">{t.nav.features}</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.featuresGrid.heading}</h2>
            <p className="mt-3 text-base text-muted-foreground">{t.featuresGrid.sub}</p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.featuresGrid.items.map((f, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal key={f.title} delay={(i % 4) * 80}>
                  <FeatureCard icon={<Icon className="h-5 w-5" />} title={f.title} body={f.body} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. NUTRITION DEEP-DIVE */}
      <DeepDive
        id="nutrition"
        side="left"
        eyebrow={t.nutrition.eyebrow}
        title={t.nutrition.title}
        sub={t.nutrition.sub}
        bullets={t.nutrition.bullets}
        mockup={<NutritionMockup />}
      />

      {/* 5. TRAINING DEEP-DIVE */}
      <DeepDive
        id="training"
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
        id="community"
        side="left"
        eyebrow={t.community.eyebrow}
        title={t.community.title}
        sub={t.community.sub}
        bullets={t.community.bullets}
        mockup={<CommunityMockup />}
      />

      {/* 7. PROGRESS / REWARDS / CHALLENGES */}
      <section id="rewards" className="scroll-mt-24 bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="pill">{t.progress.eyebrow}</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.progress.title}</h2>
            <p className="mt-3 text-base text-muted-foreground">{t.progress.sub}</p>
          </Reveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.progress.bullets.map((b, i) => (
              <Reveal key={b} delay={i * 70} className={`rounded-3xl p-6 ${i % 2 === 0 ? "bg-card" : "card-ink"}`}>
                <p className="font-display text-2xl font-bold">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BUILT FOR REAL LIFE */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.realLife.heading}</h2>
            <p className="mt-3 text-base text-muted-foreground">{t.realLife.sub}</p>
          </Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {t.realLife.tags.map((tag, i) => (
              <Reveal as="span" key={tag} delay={i * 40} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/80">
                {tag}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq" className="scroll-mt-24 border-t border-border bg-surface py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.faq.title}</h2>
            <p className="mt-3 text-base text-muted-foreground">{t.faq.sub}</p>
          </Reveal>
          <Reveal className="mt-10" delay={80}>
            <FAQAccordion items={t.faq.items} />
          </Reveal>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <CTASection />
    </PageShell>
  );
}

function DeepDive({ id, side, eyebrow, title, sub, bullets, mockup, dark }: { id?: string; side: "left" | "right"; eyebrow: string; title: string; sub: string; bullets: readonly string[]; mockup: React.ReactNode; dark?: boolean }) {
  const textBlock = (
    <Reveal>
      <span className="pill">{eyebrow}</span>
      <h2 className={`mt-4 text-3xl font-bold sm:text-4xl ${dark ? "text-ink-foreground" : ""}`}>{title}</h2>
      <p className={`mt-4 max-w-xl text-base ${dark ? "text-ink-foreground/70" : "text-muted-foreground"}`}>{sub}</p>
      <ul className={`mt-6 grid gap-2 sm:grid-cols-2 ${dark ? "text-ink-foreground/85" : ""}`}>
        {bullets.map((b, i) => (
          <li key={b} className="flex items-start gap-2 text-sm" style={{ transitionDelay: `${i * 60}ms` }}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {b}
          </li>
        ))}
      </ul>
    </Reveal>
  );
  const mockupBlock = (
    <Reveal delay={120} className="flex justify-center">
      <Parallax speed={0.05}>{mockup}</Parallax>
    </Reveal>
  );
  return (
    <section id={id} className={`scroll-mt-24 relative overflow-hidden py-20 ${dark ? "bg-ink text-ink-foreground" : ""}`}>
      {dark && <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />}
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {side === "left" ? <>{textBlock}{mockupBlock}</> : <><div className="lg:order-1">{mockupBlock}</div><div className="lg:order-2">{textBlock}</div></>}
      </div>
    </section>
  );
}

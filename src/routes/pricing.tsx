import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — FITCO" },
      { name: "description", content: "Simple, transparent pricing for FITCO. Start free, upgrade to Pro for AI coaching and premium programs." },
    ],
  }),
  component: PricingPage,
});

const tiers = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    desc: "Everything to get started.",
    features: ["Basic workouts", "Calorie & water tracking", "Community feed", "Weekly mission", "BMI calculator"],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "€9.99",
    period: "/month",
    desc: "For athletes who train with intention.",
    features: ["Everything in Starter", "AI workout & nutrition coach", "Premium programs library", "Smart analytics dashboard", "Form-check video upload", "Priority support"],
    cta: "Start 14-day trial",
    highlight: true,
  },
  {
    name: "Elite",
    price: "€24.99",
    period: "/month",
    desc: "1:1 coaching & elite features.",
    features: ["Everything in Pro", "Monthly 1:1 coach session", "Custom periodized plans", "Bloodwork integration", "Early access to features"],
    cta: "Go elite",
    highlight: false,
  },
];

function PricingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Pricing"
        title={<>Choose your <span className="gradient-text">plan.</span></>}
        description="Simple, transparent. Cancel anytime. EU VAT included."
      />
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-3xl border p-8 ${
                t.highlight
                  ? "border-primary/50 bg-card shadow-[0_0_60px_oklch(0.86_0.24_142/0.2)]"
                  : "border-border bg-card"
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most popular
                </div>
              )}
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.period}</span>
              </div>
              <Button
                asChild
                className={`mt-6 w-full ${t.highlight ? "bg-primary text-primary-foreground hover:bg-primary-glow" : ""}`}
                variant={t.highlight ? "default" : "outline"}
              >
                <Link to="/dashboard">{t.cta}</Link>
              </Button>
              <ul className="mt-8 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

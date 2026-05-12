import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Цени — FITCO" },
      { name: "description", content: "Прости и прозрачни цени. Безплатен старт, Pro и Elite планове." },
    ],
  }),
  component: PricingPage,
});

const TIERS = [
  { name: "Старт", price: "0 лв.", period: "завинаги", desc: "Започни без риск", features: ["Дневник за хранене", "Базови тренировки", "Общност", "Apple Health & Google Fit"] },
  { name: "Pro", price: "19.99 лв.", period: "/месец", desc: "Най-избиран", featured: true, features: ["Всичко от Старт", "AI треньор", "Премиум програми", "Smart анализи", "GPS маршрути"] },
  { name: "Elite", price: "39.99 лв.", period: "/месец", desc: "Личен подход", features: ["Всичко от Pro", "Личен коуч", "1:1 сесии", "Хранителни планове", "Приоритетна поддръжка"] },
];

function PricingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Цени"
        title="Прости и прозрачни."
        description="Безплатно завинаги. Премини към Pro или Elite, когато си готов. Без обвързване."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8">
        {TIERS.map((t, i) => (
          <div key={i} className={`relative rounded-2xl border p-8 ${t.featured ? "border-primary bg-card glow-soft" : "border-border bg-card"}`}>
            {t.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Най-популярен
              </span>
            )}
            <div className="text-sm uppercase tracking-wider text-muted-foreground">{t.name}</div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-bold">{t.price}</span>
              <span className="text-sm text-muted-foreground">{t.period}</span>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{t.desc}</div>
            <ul className="mt-6 space-y-3 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <Button asChild className={`mt-8 w-full ${t.featured ? "bg-primary text-primary-foreground hover:bg-primary-glow" : ""}`} variant={t.featured ? "default" : "outline"}>
              <Link to="/contact">Започни</Link>
            </Button>
          </div>
        ))}
      </section>
    </PageShell>
  );
}

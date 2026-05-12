import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Heart, Target, Globe, Zap } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "За нас — FITCO" },
      { name: "description", content: "FITCO е екип от треньори, инженери и спортисти, които вярват, че всеки заслужава достъп до премиум фитнес." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="За нас"
        title="Премиум фитнес. За всеки."
        description="FITCO се ражда през 2024 г. в София с една амбиция: да направи персоналния треньор достъпен за всички — чрез AI, общност и гениален дизайн."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Heart, title: "Здраве над всичко", desc: "Дългосрочни навици, не бързи решения." },
            { icon: Target, title: "Резултати, не шум", desc: "Само това, което реално работи." },
            { icon: Globe, title: "Глобална общност", desc: "Над 2.4M спортисти в 180 държави." },
            { icon: Zap, title: "AI с грижа", desc: "Технология, поставена в служба на човека." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

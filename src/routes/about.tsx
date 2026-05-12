import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — FITCO" },
      { name: "description", content: "FITCO is built by athletes for athletes. Learn about our mission, team, and values." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title={<>Built by athletes. <span className="gradient-text">For everyone.</span></>}
        description="We're on a mission to make world-class training accessible to anyone, anywhere."
      />
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Our story</h2>
            <p className="mt-4 text-muted-foreground">
              FITCO started in 2024 in a small Stockholm gym with a simple question:
              what if elite training, smart nutrition, and a community of athletes
              fit in your pocket — and felt as good to use as your favorite app?
            </p>
            <p className="mt-4 text-muted-foreground">
              Today, more than 2.4 million athletes across 180 countries train with FITCO every week.
              We're just getting started.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Our values</h2>
            <ul className="mt-4 space-y-4">
              {[
                ["Athlete-first", "Every feature is shipped only after our team trains with it."],
                ["Privacy by design", "GDPR-compliant. Your data is yours. Always."],
                ["Science over hype", "We work with sports scientists, RDs, and coaches."],
              ].map(([t, d]) => (
                <li key={t} className="rounded-xl border border-border bg-card p-5">
                  <div className="font-semibold">{t}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{d}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

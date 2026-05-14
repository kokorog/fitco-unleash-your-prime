import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { CTASection } from "@/components/site/CTASection";
import { useLang } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — FitCo" },
      { name: "description", content: "Answers about FitCo: pricing, AI food scanner accuracy, Bulgarian foods, community, data deletion and launch date." },
      { property: "og:title", content: "FAQ — FitCo" },
      { property: "og:description", content: "Everything you might want to know before joining the waitlist." },
      { property: "og:url", content: "https://fitcoapp.com/faq" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com/faq" }],
  }),
  component: () => {
    const { t } = useLang();
    return (
      <PageShell>
        <PageHero eyebrow={t.faq.title} title={t.faq.title} description={t.faq.sub} />
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <FAQAccordion items={t.faq.items} />
          </div>
        </section>
        <CTASection />
      </PageShell>
    );
  },
});

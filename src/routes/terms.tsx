import { createFileRoute } from "@tanstack/react-router";
import { LegalSection } from "@/components/site/LegalSection";
import { useLang } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — FitCo" },
      { name: "description", content: "Terms governing the use of FitCo." },
      { property: "og:url", content: "https://fitcoapp.com/terms" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { t } = useLang();
  return (
    <LegalSection
      contentKey="terms-of-service"
      fallbackTitle={t.legal.terms.title}
      fallbackIntro={t.legal.terms.intro}
      updatedLabel={t.legal.terms.updated}
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { LegalSection } from "@/components/site/LegalSection";
import { useLang } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — FitCo" },
      { name: "description", content: "How FitCo uses cookies." },
      { property: "og:url", content: "https://fitcoapp.com/cookies" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com/cookies" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  const { t } = useLang();
  return (
    <LegalSection
      contentKey="cookie-policy"
      fallbackTitle={t.legal.cookiePolicy.title}
      fallbackIntro={t.legal.cookiePolicy.intro}
      updatedLabel={t.legal.cookiePolicy.updated}
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { LegalSection } from "@/components/site/LegalSection";
import { useLang } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — FitCo" },
      { name: "description", content: "How FitCo collects, uses and protects your data." },
      { property: "og:url", content: "https://fitcoapp.com/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t } = useLang();
  return (
    <LegalSection
      contentKey="privacy-policy"
      fallbackTitle={t.legal.privacy.title}
      fallbackIntro={t.legal.privacy.intro}
      updatedLabel={t.legal.privacy.updated}
    />
  );
}

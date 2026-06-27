import { createFileRoute } from "@tanstack/react-router";
import { LegalSection } from "@/components/site/LegalSection";
import { useLang } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/gdpr-rights")({
  head: () => ({
    meta: [
      { title: "GDPR Rights — FitCo" },
      { name: "description", content: "Your rights under GDPR and how to exercise them with FitCo." },
      { property: "og:url", content: "https://fitcoapp.com/gdpr-rights" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com/gdpr-rights" }],
  }),
  component: GdprRightsPage,
});

function GdprRightsPage() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <LegalSection
      contentKey="gdpr-rights"
      fallbackTitle={en ? "GDPR Rights" : "GDPR права"}
      fallbackIntro={en ? "Your rights under GDPR and how to exercise them." : "Твоите GDPR права и как да ги упражниш."}
      updatedLabel={en ? "Last updated" : "Последна актуализация"}
    />
  );
}

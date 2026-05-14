import { createFileRoute } from "@tanstack/react-router";
import { DeepDivePage } from "@/components/site/DeepDivePage";
import { CommunityMockup } from "@/components/site/AppMockup";
import { useLang } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — FitCo" },
      { name: "description", content: "A feed, groups, DMs and challenges. The social layer is opt-in and moderation-first." },
      { property: "og:title", content: "Community — FitCo" },
      { property: "og:description", content: "Motivation that moves with you." },
      { property: "og:url", content: "https://fitcoapp.com/community" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com/community" }],
  }),
  component: () => {
    const { t } = useLang();
    return <DeepDivePage eyebrow={t.community.eyebrow} title={t.community.title} sub={t.community.sub} bullets={t.community.bullets} mockup={<CommunityMockup />} />;
  },
});

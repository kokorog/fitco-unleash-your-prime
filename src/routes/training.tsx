import { createFileRoute } from "@tanstack/react-router";
import { DeepDivePage } from "@/components/site/DeepDivePage";
import { TrainingMockup } from "@/components/site/AppMockup";
import { useLang } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Personalized training — FitCo" },
      { name: "description", content: "A personalized 7-day plan with demos and a fullscreen workout player. Home, gym or outdoor — beginner to advanced." },
      { property: "og:title", content: "Personalized training — FitCo" },
      { property: "og:description", content: "A weekly rhythm that fits your life." },
      { property: "og:url", content: "https://fitcoapp.com/training" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com/training" }],
  }),
  component: () => {
    const { t } = useLang();
    return <DeepDivePage eyebrow={t.training.eyebrow} title={t.training.title} sub={t.training.sub} bullets={t.training.bullets} mockup={<TrainingMockup />} />;
  },
});

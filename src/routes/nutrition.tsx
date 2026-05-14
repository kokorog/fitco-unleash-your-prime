import { createFileRoute } from "@tanstack/react-router";
import { DeepDivePage } from "@/components/site/DeepDivePage";
import { NutritionMockup } from "@/components/site/AppMockup";
import { useLang } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/nutrition")({
  head: () => ({
    meta: [
      { title: "Nutrition & AI food scanner — FitCo" },
      { name: "description", content: "Track calories, macros and water. AI food scanner from a photo. Bulgarian food database with ingredient-level adjustments." },
      { property: "og:title", content: "Nutrition & AI food scanner — FitCo" },
      { property: "og:description", content: "Eat better, without obsessing. Estimates, not medical advice." },
      { property: "og:url", content: "https://fitcoapp.com/nutrition" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com/nutrition" }],
  }),
  component: () => {
    const { t } = useLang();
    return <DeepDivePage eyebrow={t.nutrition.eyebrow} title={t.nutrition.title} sub={t.nutrition.sub} bullets={t.nutrition.bullets} mockup={<NutritionMockup />} />;
  },
});

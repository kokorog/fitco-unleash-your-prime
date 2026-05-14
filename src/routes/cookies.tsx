import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { useLang } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — FitCo" },
      { name: "description", content: "What cookies are and how FitCo uses essential, analytics and marketing cookies." },
      { property: "og:url", content: "https://fitcoapp.com/cookies" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com/cookies" }],
  }),
  component: () => {
    const { t, lang } = useLang();
    const en = lang === "en";
    return (
      <LegalPageLayout title={t.legal.cookiePolicy.title} updated={t.legal.cookiePolicy.updated} intro={t.legal.cookiePolicy.intro}>
        <S h={en ? "What are cookies?" : "Какво са бисквитки?"} p={en ? "Cookies are small text files placed on your device to remember choices and measure usage." : "Бисквитките са малки текстови файлове, които пазят избори и измерват използването."} />
        <S h={t.cookies.categories.essential.title} p={t.cookies.categories.essential.body} />
        <S h={t.cookies.categories.analytics.title} p={t.cookies.categories.analytics.body} />
        <S h={t.cookies.categories.marketing.title} p={t.cookies.categories.marketing.body} />
        <S h={en ? "Changing your preferences" : "Промяна на предпочитанията"} p={en ? "Use the cookie banner shown on your first visit, or clear local storage in your browser to see it again." : "Използвай банера при първо посещение или изтрий localStorage, за да го покажеш отново."} />
      </LegalPageLayout>
    );
  },
});

function S({ h, p }: { h: string; p: string }) {
  return (<div><h2 className="font-display text-lg font-bold">{h}</h2><p className="mt-2 text-muted-foreground">{p}</p></div>);
}

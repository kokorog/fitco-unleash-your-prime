import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { useLang } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — FitCo" },
      { name: "description", content: "How FitCo collects, uses and protects your data, and how you can control it." },
      { property: "og:url", content: "https://fitcoapp.com/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com/privacy" }],
  }),
  component: () => {
    const { t, lang } = useLang();
    const en = lang === "en";
    return (
      <LegalPageLayout title={t.legal.privacy.title} updated={t.legal.privacy.updated} intro={t.legal.privacy.intro}>
        <Section h={en ? "Account & profile data" : "Профил и акаунт"} p={en ? "We store your account email, profile fields (name, gender, height, weight, goal, activity level) and preferences so we can personalize the app." : "Съхраняваме имейл, профилни полета (име, пол, височина, тегло, цел, активност) и предпочитания, за да персонализираме приложението."} />
        <Section h={en ? "Nutrition & activity data" : "Хранене и активност"} p={en ? "Meals, water, workouts, steps and other activity entries you log are stored to power your dashboards, history and progress." : "Хранене, вода, тренировки, стъпки и друга активност се съхраняват за дневници, история и прогрес."} />
        <Section h={en ? "Progress photos" : "Снимки на прогрес"} p={en ? "If you upload progress photos, they are private to your account unless you explicitly share them." : "Ако качиш снимки на прогрес, те са лични до твоя акаунт, освен ако сам не ги споделиш."} />
        <Section h={en ? "Community posts & chats" : "Постове и чатове"} p={en ? "Posts, comments and chat messages are stored to enable the community features. You can delete your content at any time." : "Постове, коментари и чат съобщения се съхраняват за общността. Можеш да изтриеш съдържанието си по всяко време."} />
        <Section h={en ? "Support communication" : "Кореспонденция с поддръжка"} p={en ? "When you email support@fitcoapp.com we keep the message to help you and improve the service." : "Когато пишеш на support@fitcoapp.com пазим съобщението за поддръжка и подобрения."} />
        <Section h={en ? "Analytics & cookies" : "Аналитика и бисквитки"} p={en ? "We use essential cookies and, with your consent, analytics and marketing cookies. See the Cookie Policy for details." : "Използваме нужни бисквитки и — със съгласие — аналитични и маркетингови. Виж Политиката за бисквитки."} />
        <Section h={en ? "Data deletion" : "Изтриване на данни"} p={en ? "You can request data deletion anytime at support@fitcoapp.com." : "Можеш да поискаш изтриване по всяко време на support@fitcoapp.com."} />
        <Section h={en ? "Not medical advice" : "Не е медицински съвет"} p={en ? "FitCo is advisory and informational. It is not medical advice." : "FitCo е консултативен инструмент. Не е медицински съвет."} />
      </LegalPageLayout>
    );
  },
});

function Section({ h, p }: { h: string; p: string }) {
  return (<div><h2 className="font-display text-lg font-bold">{h}</h2><p className="mt-2 text-muted-foreground">{p}</p></div>);
}

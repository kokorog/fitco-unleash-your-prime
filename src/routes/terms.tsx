import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { useLang } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — FitCo" },
      { name: "description", content: "Terms governing the use of FitCo's website and mobile app." },
      { property: "og:url", content: "https://fitcoapp.com/terms" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com/terms" }],
  }),
  component: () => {
    const { t, lang } = useLang();
    const en = lang === "en";
    return (
      <LegalPageLayout title={t.legal.terms.title} updated={t.legal.terms.updated} intro={t.legal.terms.intro}>
        <S h={en ? "User responsibilities" : "Отговорности на потребителя"} p={en ? "Use FitCo lawfully. Keep your credentials safe. Provide accurate profile information." : "Използвай FitCo законосъобразно. Пази данните си. Подавай вярна информация."} />
        <S h={en ? "Health & fitness disclaimer" : "Здравен дисклеймър"} p={en ? "FitCo is not medical advice. Consult a doctor before significant changes to nutrition or training." : "FitCo не е медицински съвет. Консултирай се с лекар преди значими промени."} />
        <S h={en ? "Nutrition & calorie estimates" : "Калории и макроси"} p={en ? "All nutrition values are estimates — useful for tracking, not for medical decisions." : "Всички стойности са приблизителни — за следене, не за медицински решения."} />
        <S h={en ? "Community conduct" : "Поведение в общността"} p={en ? "Be respectful. No harassment, hate speech, spam or illegal content." : "Бъди уважителен. Без тормоз, реч на омраза, спам или незаконно съдържание."} />
        <S h={en ? "Prohibited content" : "Забранено съдържание"} p={en ? "Sexual content involving minors, threats, doxxing, scams and similar content are forbidden and lead to removal." : "Сексуално съдържание с непълнолетни, заплахи, doxxing, измами — забранени, водят до премахване."} />
        <S h={en ? "Moderation & reporting" : "Модерация и докладване"} p={en ? "Report content from any post or chat. Admins review reports and may remove content or restrict accounts." : "Можеш да докладваш от всеки пост/чат. Админи преглеждат и могат да премахнат съдържание."} />
        <S h={en ? "Account termination" : "Прекратяване на акаунт"} p={en ? "We may suspend accounts that violate these terms. You can delete your account anytime." : "Можем да спрем нарушаващи акаунти. Ти можеш да изтриеш своя по всяко време."} />
        <S h={en ? "Changes to the service" : "Промени в услугата"} p={en ? "We improve FitCo continuously and may change features. Material changes will be communicated." : "Развиваме FitCo постоянно и можем да променим функционалности."} />
        <S h={en ? "Contact" : "Контакт"} p="support@fitcoapp.com" />
      </LegalPageLayout>
    );
  },
});

function S({ h, p }: { h: string; p: string }) {
  return (<div><h2 className="font-display text-lg font-bold">{h}</h2><p className="mt-2 text-muted-foreground">{p}</p></div>);
}

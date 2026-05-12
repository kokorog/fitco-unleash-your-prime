import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Dumbbell, Apple, Users, Trophy, Bot, ShieldCheck, Calendar, Activity, Droplet } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Функции — FITCO" },
      { name: "description", content: "Всички функции на FITCO: тренировки, хранене, прогрес, общност и геймификация." },
    ],
  }),
  component: FeaturesPage,
});

const GROUPS = [
  {
    title: "Фитнес & тренировки",
    icon: Dumbbell,
    items: ["Персонализирани програми", "Във фитнес и у дома", "Сила, кардио, мобилност", "Календар и предизвикателства", "AI препоръки"],
  },
  {
    title: "Хранене",
    icon: Apple,
    items: ["Калории и макроси", "100k+ продукти", "Сканиране на храна", "Меню планове", "Хидратация и BMI"],
  },
  {
    title: "Прогрес",
    icon: Activity,
    items: ["Тегло и обиколки", "GPS маршрути", "Лични рекорди", "Сън и пулс", "Тенденции и прогнози"],
  },
  {
    title: "Общност",
    icon: Users,
    items: ["Социален feed", "Снимки и видео", "Групи и приятели", "Реакции и коментари", "Чатове"],
  },
  {
    title: "Геймификация",
    icon: Trophy,
    items: ["XP и нива", "Значки", "Седмични мисии", "Класации", "Награди"],
  },
  {
    title: "AI & анализи",
    icon: Bot,
    items: ["AI треньор 24/7", "Адаптивни планове", "Smart дашборд", "Препоръки за хранене", "Възстановяване"],
  },
  {
    title: "Календар",
    icon: Calendar,
    items: ["Седмичен ритъм", "Серии (streaks)", "Напомняния", "Записи на тренировки", "Журнал"],
  },
  {
    title: "Здраве",
    icon: Droplet,
    items: ["Сън", "Хидратация", "Прозорец за хранене 16:8", "Цел за дефицит", "Apple Health & Google Fit"],
  },
  {
    title: "Сигурност",
    icon: ShieldCheck,
    items: ["GDPR", "Криптиране", "Контрол на данните", "Експорт / изтриване", "ЕС хостинг"],
  },
];

function FeaturesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Функции"
        title="Една платформа. Всяка тренировка."
        description="От първата лицева опора до стотния маратон — FITCO расте с теб."
      />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-20 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        {GROUPS.map(({ title, icon: Icon, items }, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {items.map((it) => (
                <li key={it} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </PageShell>
  );
}

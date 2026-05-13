import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Често задавани въпроси — FITCO" },
      { name: "description", content: "Отговори на най-честите въпроси за FITCO — абонамент, поверителност, синхронизация и още." },
    ],
  }),
  component: FaqPage,
});

const SECTIONS = [
  {
    title: "Общи",
    items: [
      { q: "Какво е FITCO?", a: "FITCO е премиум фитнес платформа с AI треньор, дневник за хранене, прогрес и социална общност за спортисти на всички нива." },
      { q: "Безплатно ли е?", a: "Основните функции са безплатни завинаги. Pro и Elite предлагат AI треньор, премиум планове и персонален коуч." },
      { q: "На кои устройства работи?", a: "iOS 15+, Android 9+ и през уеб приложението на fitcoapp.com." },
    ],
  },
  {
    title: "Абонамент",
    items: [
      { q: "Как да отменя абонамент?", a: "От App Store / Google Play настройки или от профила си в приложението. Без обвързване, без скрити такси." },
      { q: "Имате ли пробен период?", a: "Да — 14 дни безплатен пробен период за Pro." },
      { q: "Получавам ли фактура?", a: "Да, изпращаме фактура автоматично на регистрирания имейл." },
    ],
  },
  {
    title: "Данни и поверителност",
    items: [
      { q: "Как защитавате данните ми?", a: "Криптиране в покой и при пренос (TLS 1.3, AES-256). Сървъри в ЕС и пълна GDPR съвместимост." },
      { q: "Мога ли да изтегля или изтрия данните си?", a: "Да — от Профил → Поверителност → Експорт / Изтриване, или с имейл до support@fitcoapp.com." },
      { q: "Споделяте ли данни с трети страни?", a: "Не продаваме лични данни. Използваме доверени партньори само за хостинг и аналитика, винаги под GDPR." },
    ],
  },
  {
    title: "Тренировки & хранене",
    items: [
      { q: "Кой създава тренировките?", a: "Сертифицирани треньори в комбинация с AI, който адаптира всеки план според възстановяването ти." },
      { q: "Има ли вегетариански / веган планове?", a: "Да — изборът на хранителен модел е в настройките на профила." },
      { q: "Синхронизирате ли с Apple Health и Google Fit?", a: "Да — двупосочна синхронизация на стъпки, тегло, сън и пулс." },
    ],
  },
];

function FaqPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="ЧЗВ"
        title="Често задавани въпроси"
        description="Не намираш отговор? Пиши ни на support@fitcoapp.com — отговаряме до 24 часа."
      />
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        {SECTIONS.map((s) => (
          <div key={s.title} className="mb-10">
            <h2 className="text-xs uppercase tracking-[0.2em] text-primary">{s.title}</h2>
            <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
              {s.items.map((it, i) => (
                <details key={i} className="group p-6">
                  <summary className="flex cursor-pointer items-center justify-between text-base font-medium">
                    {it.q}
                    <span className="ml-4 text-primary transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">{it.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
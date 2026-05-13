import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Политика за поверителност — FITCO" },
      { name: "description", content: "Как FITCO събира, използва и защитава твоите лични данни в съответствие с GDPR." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Поверителност" title="Политика за поверителност" description="В сила от 1 януари 2026 г." />
      <article className="prose-fitco mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <Block title="1. Кои сме ние">
          FITCO ООД („ние“, „нас“) е администратор на лични данни по смисъла на GDPR. Седалище: ул. Алабин 1, София 1000, България. Контакт: <a href="mailto:support@fitcoapp.com" className="text-primary">support@fitcoapp.com</a>.
        </Block>
        <Block title="2. Какви данни събираме">
          Профилни данни (име, имейл), здравни и фитнес данни (тегло, височина, тренировки, хранене), технически данни (IP, устройство, бисквитки). Никога не събираме повече, отколкото е нужно.
        </Block>
        <Block title="3. На какво основание">
          Изпълнение на договор (предоставяне на услугата), законен интерес (сигурност, анализ), съгласие (маркетинг, опционални интеграции).
        </Block>
        <Block title="4. Срок на съхранение">
          Съхраняваме данните за срока на активния акаунт + 12 месеца. След това се изтриват или анонимизират.
        </Block>
        <Block title="5. Твоите права">
          Достъп, корекция, изтриване, ограничаване, преносимост и възражение. Подай заявка от Профил → Поверителност или на <a href="mailto:support@fitcoapp.com" className="text-primary">support@fitcoapp.com</a>.
        </Block>
        <Block title="6. Сигурност">
          TLS 1.3 при пренос, AES-256 при съхранение, ЕС хостинг и редовни одити.
        </Block>
        <Block title="7. Споделяне">
          Не продаваме лични данни. Споделяме само с обработващи, обвързани с GDPR (хостинг, плащания, аналитика).
        </Block>
        <Block title="8. Промени">
          При важни промени ще те уведомим в приложението и по имейл поне 30 дни предварително.
        </Block>
      </article>
    </PageShell>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2">{children}</p>
    </section>
  );
}
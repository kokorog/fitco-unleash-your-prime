import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Контакти — FITCO" },
      { name: "description", content: "Свържи се с екипа на FITCO. Поддръжка: support@fitco.app." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Контакти"
        title="Тук сме за теб."
        description="Имаш въпрос, идея или партньорска оферта? Пиши ни — отговаряме до 24 часа."
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-4 lg:col-span-1">
          {[
            { icon: Mail, title: "Поддръжка", value: "support@fitco.app", href: "mailto:support@fitco.app" },
            { icon: Mail, title: "Общи запитвания", value: "info@fitcoapp.com", href: "mailto:info@fitcoapp.com" },
            { icon: MessageCircle, title: "Преса & партньорства", value: "press@fitco.app", href: "mailto:press@fitco.app" },
            { icon: Phone, title: "Телефон (пн–пт, 9–18)", value: "+359 2 444 5555", href: "tel:+35924445555" },
            { icon: MapPin, title: "Офис", value: "ул. Алабин 1, София 1000, България" },
          ].map(({ icon: Icon, title, value, href }, i) => (
            <a
              key={i}
              href={href ?? "#"}
              className="block rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
                  <div className="mt-1 font-medium">{value}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
        <form
          className="space-y-4 rounded-2xl border border-border bg-card p-6 lg:col-span-2"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "mailto:support@fitco.app";
          }}
        >
          <h2 className="text-2xl font-bold">Изпрати съобщение</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Име" type="text" />
            <Field label="Имейл" type="email" />
          </div>
          <Field label="Тема" type="text" />
          <div>
            <label className="text-sm font-medium">Съобщение</label>
            <textarea
              required
              rows={6}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <label className="flex items-start gap-2 text-sm text-muted-foreground">
            <input type="checkbox" required className="mt-1" />
            Съгласен/а съм с обработката на личните ми данни според Политиката за поверителност.
          </label>
          <Button type="submit" size="lg" className="bg-primary text-primary-foreground hover:bg-primary-glow">
            Изпрати
          </Button>
        </form>
      </section>
    </PageShell>
  );
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        required
        type={type}
        className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
      />
    </div>
  );
}
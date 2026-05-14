import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & support — FitCo" },
      { name: "description", content: "Reach the FitCo team for support, partnerships or press. Email support@fitcoapp.com." },
      { property: "og:title", content: "Contact & support — FitCo" },
      { property: "og:description", content: "We read every message." },
      { property: "og:url", content: "https://fitcoapp.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  return (
    <PageShell>
      <PageHero eyebrow={t.contact.title} title={t.contact.title} description={t.contact.sub} />
      <section className="py-16">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-display text-xl font-bold">{t.contact.emailLabel}</h2>
            <a href="mailto:support@fitcoapp.com" className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm hover:bg-secondary">
              <Mail className="h-4 w-4 text-primary" /> support@fitcoapp.com
            </a>
            <p className="mt-6 text-sm text-muted-foreground">{t.contact.formIntro}</p>
          </div>
          {sent ? (
            <div className="rounded-3xl border border-primary/30 bg-primary/10 p-6 text-sm">{t.contact.sent}</div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <label className="block text-xs text-muted-foreground">{t.waitlist.email}
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm" />
              </label>
              <label className="mt-3 block text-xs text-muted-foreground">{t.contact.message}
                <textarea required value={msg} onChange={(e) => setMsg(e.target.value)} rows={5} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm" />
              </label>
              <Button type="submit" className="mt-4 w-full rounded-full bg-ink text-ink-foreground hover:bg-ink/90 h-11">{t.contact.send}</Button>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  );
}

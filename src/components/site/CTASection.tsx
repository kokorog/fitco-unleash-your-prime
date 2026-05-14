import { useLang } from "@/lib/i18n/LanguageProvider";
import { WaitlistForm } from "./WaitlistForm";

export function CTASection() {
  const { t } = useLang();
  return (
    <section id="waitlist" className="relative overflow-hidden bg-ink py-20 text-ink-foreground sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <span className="pill text-[#9ffe9f] bg-primary/20">{t.cta.waitlist}</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{t.waitlist.heading}</h2>
          <p className="mt-4 max-w-md text-base text-ink-foreground/70">{t.waitlist.sub}</p>
        </div>
        <div className="text-foreground">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}

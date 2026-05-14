import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Mail, Instagram, Youtube } from "lucide-react";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{t.footer.tagline}</p>
            <p className="mt-4 text-xs text-muted-foreground">{t.footer.notMedical}</p>
            <div className="mt-6 flex gap-2">
              {[
                { href: "mailto:support@fitcoapp.com", Icon: Mail, label: "Email" },
                { href: "#", Icon: Instagram, label: "Instagram" },
                { href: "#", Icon: Youtube, label: "YouTube" },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <Col title={t.footer.product} links={[
            { to: "/features", label: t.nav.features },
            { to: "/nutrition", label: t.nav.nutrition },
            { to: "/training", label: t.nav.training },
            { to: "/community", label: t.nav.community },
            { to: "/rewards", label: t.nav.rewards },
          ]} />
          <Col title={t.footer.support} links={[
            { to: "/faq", label: t.nav.faq },
            { to: "/contact", label: t.nav.contact },
            { href: "mailto:support@fitcoapp.com", label: "support@fitcoapp.com" },
          ]} />
          <Col title={t.footer.legal} links={[
            { to: "/privacy", label: t.legal.privacy.title },
            { to: "/terms", label: t.legal.terms.title },
            { to: "/cookies", label: t.legal.cookiePolicy.title },
          ]} />
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} FitCo. {t.footer.rights}</p>
          <p>support@fitcoapp.com · fitcoapp.com</p>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links }: { title: string; links: Array<{ to?: string; href?: string; label: string }> }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            {l.to ? (
              <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">{l.label}</Link>
            ) : (
              <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">{l.label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

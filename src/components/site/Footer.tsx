import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { StoreButtons } from "./StoreButtons";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              FITCO е премиум платформа за тренировки, хранене и общност, задвижвана с AI. Тренирай по-умно. Живей по-силен.
            </p>
            <StoreButtons className="mt-6" />
            <div className="mt-6 flex gap-3">
              {[Instagram, Twitter, Youtube, Mail].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="Продукт" links={[
            { to: "/features", label: "Функции" },
            { to: "/pricing", label: "Цени" },
            { to: "/community", label: "Общност" },
            { to: "/about", label: "За нас" },
          ]} />
          <FooterCol title="Поддръжка" links={[
            { to: "/contact", label: "Контакти" },
            { to: "/faq", label: "Често задавани въпроси" },
            { to: "/contact", label: "support@fitco.app" },
          ]} />
          <FooterCol title="Право" links={[
            { to: "/privacy", label: "Политика за поверителност" },
            { to: "/terms", label: "Общи условия" },
            { to: "/cookies", label: "Политика за бисквитки" },
          ]} />
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} FITCO. Всички права запазени. GDPR & ЕС съвместимост.</p>
          <p>info@fitcoapp.com · support@fitco.app · fitcoapp.com</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-4 space-y-3">
        {links.map((l, i) => (
          <li key={i}>
            <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

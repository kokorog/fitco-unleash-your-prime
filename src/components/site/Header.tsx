import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n/LanguageProvider";

export function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { hash: "features", label: t.nav.features },
    { hash: "nutrition", label: t.nav.nutrition },
    { hash: "training", label: t.nav.training },
    { hash: "community", label: t.nav.community },
    { hash: "rewards", label: t.nav.rewards },
    { hash: "faq", label: t.nav.faq },
  ] as const;

  const location = useLocation();
  const navigate = useNavigate();
  const goTo = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== "/") {
      navigate({ to: "/", hash });
    } else {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${hash}`);
    }
  };

  const topMode = !scrolled;
  const navLinkClass = topMode
    ? "text-ink-foreground/70 hover:text-ink-foreground"
    : "text-muted-foreground hover:text-foreground";
  const ctaClass = topMode
    ? "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft"
    : "rounded-full bg-ink text-ink-foreground hover:bg-ink/90 shadow-soft";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass-strong" : "border-b border-white/10 bg-ink/70 text-ink-foreground backdrop-blur-xl"}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.hash}
              href={`/#${item.hash}`}
              onClick={goTo(item.hash)}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${navLinkClass}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher compact tone={topMode ? "dark" : "light"} />
          <Button asChild size="sm" className={ctaClass}>
            <Link to="/" hash="waitlist">
              {t.cta.joinShort}
            </Link>
          </Button>
        </div>
        <button
          aria-label="Menu"
          className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-white/10 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="glass-strong border-t border-border lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {nav.map((item) => (
              <a
                key={item.hash}
                href={`/#${item.hash}`}
                onClick={goTo(item.hash)}
                className="rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between gap-2">
              <LanguageSwitcher compact />
              <Button asChild className="rounded-full bg-ink text-ink-foreground hover:bg-ink/90">
                <Link to="/" hash="waitlist" onClick={() => setOpen(false)}>
                  {t.cta.joinShort}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

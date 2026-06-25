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

  const navLinkClass = "text-muted-foreground hover:bg-secondary/70 hover:text-foreground";
  const ctaClass =
    "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 transition-all duration-300">
      <div
        className={`pointer-events-auto mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full border px-4 transition-all duration-300 sm:px-5 lg:px-6 ${
          scrolled
            ? "border-border/80 bg-background/90 shadow-soft backdrop-blur-2xl"
            : "border-white/45 bg-background/58 shadow-[0_18px_50px_rgba(18,35,27,0.10)] backdrop-blur-2xl"
        }`}
      >
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.hash}
              href={`/#${item.hash}`}
              onClick={goTo(item.hash)}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${navLinkClass}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher compact tone="light" />
          <Button asChild size="sm" className={ctaClass}>
            <Link to="/" hash="waitlist">
              {t.cta.joinShort}
            </Link>
          </Button>
        </div>
        <button
          aria-label="Menu"
          className="grid h-11 w-11 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="pointer-events-auto mx-auto mt-2 max-w-7xl rounded-[1.75rem] border border-border bg-background/95 p-2 shadow-elevated backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.hash}
                href={`/#${item.hash}`}
                onClick={goTo(item.hash)}
                className="rounded-2xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between gap-2">
              <LanguageSwitcher compact />
              <Button
                asChild
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
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

import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/features", label: "Features" },
  { to: "/workouts", label: "Workouts" },
  { to: "/nutrition", label: "Nutrition" },
  { to: "/community", label: "Community" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong border-b" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/contact">Sign in</Link>
          </Button>
          <Button size="sm" asChild className="bg-primary text-primary-foreground hover:bg-primary-glow shadow-[0_0_20px_oklch(0.86_0.24_142/0.4)]">
            <Link to="/dashboard">Get started</Link>
          </Button>
        </div>
        <button
          aria-label="Toggle menu"
          className="rounded-md p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="glass-strong border-t lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/contact" onClick={() => setOpen(false)}>Sign in</Link>
              </Button>
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary-glow" asChild>
                <Link to="/dashboard" onClick={() => setOpen(false)}>Get started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
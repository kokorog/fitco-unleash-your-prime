import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Instagram, Twitter, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              FITCO is the AI-powered fitness platform for athletes, weekend warriors, and everyone in between. Train smarter. Live stronger.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Twitter, Youtube, Mail].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="Product" links={[
            { to: "/features", label: "Features" },
            { to: "/workouts", label: "Workouts" },
            { to: "/nutrition", label: "Nutrition" },
            { to: "/challenges", label: "Challenges" },
            { to: "/pricing", label: "Pricing" },
          ]} />
          <FooterCol title="Company" links={[
            { to: "/about", label: "About" },
            { to: "/blog", label: "Blog" },
            { to: "/community", label: "Community" },
            { to: "/contact", label: "Contact" },
          ]} />
          <FooterCol title="Legal" links={[
            { to: "/privacy", label: "Privacy Policy" },
            { to: "/terms", label: "Terms & Conditions" },
            { to: "/cookies", label: "Cookie Policy" },
            { to: "/data-request", label: "Data Requests" },
          ]} />
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} FITCO. All rights reserved. GDPR & EU compliant.</p>
          <p>info@fitcoapp.com · fitcoapp.com</p>
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
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const KEY = "fitco-cookie-consent-v1";

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setOpen(true);
    } catch {}
  }, []);
  if (!open) return null;
  const decide = (v: "all" | "essential") => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v, t: Date.now() }));
    } catch {}
    setOpen(false);
  };
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl border border-border glass-strong p-4 shadow-elevated sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">
          Използваме бисквитки, за да подобрим твоето изживяване и да анализираме трафика.{" "}
          <Link to="/cookies" className="text-primary underline-offset-4 hover:underline">
            Политика за бисквитки
          </Link>
          .
        </p>
        <div className="flex gap-2 sm:ml-auto">
          <Button variant="outline" size="sm" onClick={() => decide("essential")}>
            Само нужните
          </Button>
          <Button
            size="sm"
            onClick={() => decide("all")}
            className="bg-primary text-primary-foreground hover:bg-primary-glow"
          >
            Приемам всички
          </Button>
        </div>
      </div>
    </div>
  );
}
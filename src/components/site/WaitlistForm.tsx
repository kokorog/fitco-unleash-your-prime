import { useState } from "react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { submitWaitlistSignup, type WaitlistGoal } from "@/lib/waitlist";

const GOAL_MAP: Record<"lose" | "maintain" | "muscle" | "endurance", WaitlistGoal> = {
  lose: "LOSE_WEIGHT",
  maintain: "MAINTAIN",
  muscle: "GAIN_MUSCLE",
  endurance: "ENDURANCE",
};

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState<"lose" | "maintain" | "muscle" | "endurance">("maintain");
  const [pref, setPref] = useState<"en" | "bg">(lang);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(t.waitlist.errorEmail); return; }
    if (!consent) { setError(t.waitlist.errorConsent); return; }
    setStatus("loading");
    try {
      await submitWaitlistSignup({
        email,
        name: name || undefined,
        goal: GOAL_MAP[goal],
        language: pref.toUpperCase() as "BG" | "EN",
        marketingConsent: consent,
        privacyAccepted: consent,
      });
      setStatus("success");
    } catch {
      setError(t.waitlist.errorSubmit);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-primary/30 bg-primary/10 p-6 text-center">
        <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-5 w-5" /></div>
        <p className="mt-3 text-sm font-medium">{t.waitlist.success}</p>
        <p className="mt-1 text-xs text-muted-foreground">{t.waitlist.successLong}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`rounded-3xl border border-border bg-card p-5 shadow-soft ${compact ? "" : "sm:p-7"}`}>
      <div className="grid gap-3 sm:grid-cols-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.waitlist.name}
          className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder={t.waitlist.email}
          aria-label={t.waitlist.email}
          className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="text-xs text-muted-foreground">
          <span className="mb-1 block">{t.waitlist.goal}</span>
          <select value={goal} onChange={(e) => setGoal(e.target.value as typeof goal)}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm">
            <option value="lose">{t.waitlist.goals.lose}</option>
            <option value="maintain">{t.waitlist.goals.maintain}</option>
            <option value="muscle">{t.waitlist.goals.muscle}</option>
            <option value="endurance">{t.waitlist.goals.endurance}</option>
          </select>
        </label>
        <label className="text-xs text-muted-foreground">
          <span className="mb-1 block">{t.waitlist.langPref}</span>
          <select value={pref} onChange={(e) => setPref(e.target.value as "en" | "bg")}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm">
            <option value="en">English</option>
            <option value="bg">Български</option>
          </select>
        </label>
      </div>
      <label className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-border accent-primary" />
        <span>{t.waitlist.consent}</span>
      </label>
      {error && <p role="alert" className="mt-3 text-xs text-destructive">{error}</p>}
      <Button type="submit" disabled={status === "loading"} className="mt-4 w-full rounded-full bg-ink text-ink-foreground hover:bg-ink/90 h-11">
        {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> {t.waitlist.submitting}</> : t.waitlist.submit}
      </Button>
    </form>
  );
}

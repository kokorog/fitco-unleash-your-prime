import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n/LanguageProvider";

const KEY = "fitco-cookie-consent-v2";
type Prefs = { essential: true; analytics: boolean; marketing: boolean; t: number };

export function CookieConsent() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) setOpen(true);
      else {
        const p = JSON.parse(raw) as Prefs;
        setAnalytics(!!p.analytics);
        setMarketing(!!p.marketing);
      }
    } catch { setOpen(true); }
  }, []);

  const save = (prefs: Omit<Prefs, "t" | "essential">) => {
    try { localStorage.setItem(KEY, JSON.stringify({ essential: true, ...prefs, t: Date.now() })); } catch {}
    setOpen(false);
  };

  if (!open) return null;
  return (
    <div role="dialog" aria-label={t.cookies.title} className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-5 shadow-elevated sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="flex-1">
            <h3 className="text-sm font-semibold">{t.cookies.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.cookies.body}{" "}
              <Link to="/cookies" className="text-primary underline-offset-4 hover:underline">{t.legal.cookiePolicy.title}</Link>.
            </p>
          </div>
        </div>
        {manage && (
          <div className="mt-4 space-y-3 rounded-2xl bg-secondary/60 p-4">
            <Toggle label={t.cookies.categories.essential.title} body={t.cookies.categories.essential.body} checked disabled />
            <Toggle label={t.cookies.categories.analytics.title} body={t.cookies.categories.analytics.body} checked={analytics} onChange={setAnalytics} />
            <Toggle label={t.cookies.categories.marketing.title} body={t.cookies.categories.marketing.body} checked={marketing} onChange={setMarketing} />
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-2 sm:justify-end">
          {!manage && (
            <Button variant="ghost" size="sm" onClick={() => setManage(true)}>{t.cookies.manage}</Button>
          )}
          <Button variant="outline" size="sm" onClick={() => save({ analytics: false, marketing: false })}>{t.cookies.reject}</Button>
          {manage ? (
            <Button size="sm" onClick={() => save({ analytics, marketing })} className="bg-ink text-ink-foreground hover:bg-ink/90">{t.cookies.save}</Button>
          ) : (
            <Button size="sm" onClick={() => save({ analytics: true, marketing: true })} className="bg-ink text-ink-foreground hover:bg-ink/90">{t.cookies.accept}</Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Toggle({ label, body, checked, onChange, disabled }: { label: string; body: string; checked: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  return (
    <label className="flex items-start gap-3">
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-border accent-primary" />
      <span className="flex-1">
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-xs text-muted-foreground">{body}</span>
      </span>
    </label>
  );
}

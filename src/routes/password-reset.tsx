import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, Check, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/password-reset")({
  head: () => ({
    meta: [
      { title: "Reset password — FitCo" },
      { name: "description", content: "Choose a new password for your FitCo account." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PasswordResetPage,
});

function PasswordResetPage() {
  const { t } = useLang();
  const c = t.passwordReset;

  const token = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("token")?.trim() ?? "";
  }, []);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "invalid" | "error">(
    () => (typeof window !== "undefined" && !new URLSearchParams(window.location.search).get("token") ? "invalid" : "idle"),
  );
  const [error, setError] = useState<string | null>(null);

  // Clear sensitive state when leaving / on success.
  useEffect(() => {
    if (status === "success") {
      setPassword("");
      setConfirm("");
    }
  }, [status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!token) { setStatus("invalid"); return; }
    if (password.length < 8) { setError(c.errorMin); return; }
    if (password !== confirm) { setError(c.errorMatch); return; }

    setStatus("loading");
    try {
      const res = await fetch("/api/public/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const payload = await res.json().catch(() => null);
      if (res.ok) {
        setStatus("success");
        return;
      }
      if (res.status === 400 || res.status === 401 || res.status === 404 || res.status === 410) {
        setStatus("invalid");
        return;
      }
      setError((payload && typeof payload.message === "string" && payload.message) || c.errorGeneric);
      setStatus("error");
    } catch {
      setError(c.errorGeneric);
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:py-20">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 text-center">
          <Link to="/" className="font-display text-xl font-bold tracking-tight">FitCo</Link>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          {status === "success" ? (
            <SuccessState title={c.successTitle} body={c.successBody} openApp={c.openApp} backHome={c.backHome} />
          ) : status === "invalid" ? (
            <InvalidState title={c.invalidTitle} body={c.invalidBody} backHome={c.backHome} />
          ) : (
            <>
              <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{c.title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{c.subtitle}</p>

              <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
                <label className="block text-xs font-medium text-muted-foreground">
                  <span className="mb-1 block">{c.newPassword}</span>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      minLength={8}
                      required
                      aria-label={c.newPassword}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2.5 pr-10 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((s) => !s)}
                      aria-label={showPw ? "Hide password" : "Show password"}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>

                <label className="block text-xs font-medium text-muted-foreground">
                  <span className="mb-1 block">{c.confirmPassword}</span>
                  <input
                    type={showPw ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                    minLength={8}
                    required
                    aria-label={c.confirmPassword}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>

                {error && (
                  <p role="alert" className="flex items-start gap-2 text-xs text-destructive">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{error}</span>
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-11 w-full rounded-full bg-ink text-ink-foreground hover:bg-ink/90"
                >
                  {status === "loading" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> {c.submitting}</>
                  ) : (
                    c.submit
                  )}
                </Button>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {c.help}{" "}
          <a href="mailto:support@fitcoapp.com" className="font-medium text-foreground underline-offset-4 hover:underline">
            support@fitcoapp.com
          </a>
        </p>
      </div>
    </main>
  );
}

function SuccessState({ title, body, openApp, backHome }: { title: string; body: string; openApp: string; backHome: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
        <Check className="h-6 w-6" />
      </div>
      <h1 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <a
          href="fitco://login"
          className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium text-ink-foreground hover:bg-ink/90"
        >
          {openApp}
        </a>
        <Link
          to="/"
          className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground hover:bg-muted"
        >
          {backHome}
        </Link>
      </div>
    </div>
  );
}

function InvalidState({ title, body, backHome }: { title: string; body: string; backHome: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h1 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium text-ink-foreground hover:bg-ink/90"
        >
          {backHome}
        </Link>
      </div>
    </div>
  );
}
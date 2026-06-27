import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  KeyRound,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero, PageShell } from "@/components/site/PageShell";

type DeletionMode = "account" | "data";
type AuthState =
  | { status: "signed-out" }
  | { status: "two-factor"; challengeToken: string; emailHint?: string; password: string }
  | { status: "signed-in"; accessToken: string; password: string; email: string }
  | { status: "deleted"; deletedAt: string };

type SubmitState = "idle" | "loading";

const DATA_DELETED = [
  "Account identity, profile, preferences, authentication sessions and push/device tokens.",
  "Nutrition diary, custom foods, food scanner submissions, water logs and nutrition targets.",
  "Workout plans, exercise sessions, route sessions, ratings, notes and movement history.",
  "Progress data such as weight, measurements, photos, journals, streaks, fasting, sleep and cycle tracking entries.",
  "Community profile data, posts, comments, reactions, reposts, chats, reports and uploaded media references.",
  "FitCoins wallet records, rewards, badges, challenges and subscription state tied to the account.",
  "Analytics events and diagnostics that are directly linked to the account.",
];

const DATA_RETENTION = [
  "Security, fraud-prevention, billing, moderation or legal records may be retained only when required or reasonably necessary.",
  "Operational backups and server logs can take up to 30 days to expire from our backup systems.",
  "Where we must keep limited records, we detach or minimize them where possible so they are no longer used as an active FitCo profile.",
];

const REASONS = [
  "I no longer use FitCo",
  "I want to reset and start over",
  "Privacy or data concern",
  "The app is not useful for me",
  "Too many notifications or ads",
  "Other",
];

export function AccountDeletionPage({ mode = "account" }: { mode?: DeletionMode }) {
  const [auth, setAuth] = useState<AuthState>({ status: "signed-out" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [reason, setReason] = useState(REASONS[0]);
  const [details, setDetails] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [understandsPermanent, setUnderstandsPermanent] = useState(false);
  const [deleteAllData, setDeleteAllData] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);

  const isAccountMode = mode === "account";
  const title = isAccountMode ? "Delete your FitCo account" : "Delete FitCo data";
  const description = isAccountMode
    ? "Sign in, confirm the request and permanently delete your FitCo account and associated server data."
    : "Request deletion of specific FitCo data, or continue to permanently delete your whole account.";

  const canDelete = useMemo(() => {
    return (
      auth.status === "signed-in" &&
      understandsPermanent &&
      deleteAllData &&
      confirmText.trim().toUpperCase() === "DELETE"
    );
  }, [auth.status, confirmText, deleteAllData, understandsPermanent]);

  useEffect(() => {
    if (auth.status === "deleted") {
      setPassword("");
      setTwoFactorCode("");
      setConfirmText("");
    }
  }, [auth.status]);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Enter the email and password for your FitCo account.");
      return;
    }

    setSubmitState("loading");
    try {
      const response = await fetch("/api/public/account-delete-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(readMessage(payload) || "Sign-in failed. Check your email and password.");
      }

      if (payload?.requires2fa && typeof payload.challengeToken === "string") {
        setAuth({
          status: "two-factor",
          challengeToken: payload.challengeToken,
          emailHint: typeof payload.emailHint === "string" ? payload.emailHint : undefined,
          password,
        });
        return;
      }

      const accessToken = payload?.tokens?.accessToken;
      if (typeof accessToken !== "string") {
        throw new Error("FitCo did not return a valid session. Please try again.");
      }

      setAuth({ status: "signed-in", accessToken, password, email: email.trim() });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed. Please try again.");
    } finally {
      setSubmitState("idle");
    }
  }

  async function verifyTwoFactor(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (auth.status !== "two-factor") return;
    if (!/^\d{4}$/.test(twoFactorCode.trim())) {
      setError("Enter the 4-digit verification code sent to your email.");
      return;
    }

    setSubmitState("loading");
    try {
      const response = await fetch("/api/public/account-delete-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeToken: auth.challengeToken, code: twoFactorCode.trim() }),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(readMessage(payload) || "Verification failed. Please try again.");
      }

      const accessToken = payload?.tokens?.accessToken;
      if (typeof accessToken !== "string") {
        throw new Error("FitCo did not return a valid session. Please try again.");
      }

      setAuth({ status: "signed-in", accessToken, password: auth.password, email: email.trim() });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed. Please try again.");
    } finally {
      setSubmitState("idle");
    }
  }

  async function deleteAccount(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (auth.status !== "signed-in" || !canDelete) {
      setError("Complete every confirmation step before deleting the account.");
      return;
    }

    setSubmitState("loading");
    try {
      const response = await fetch("/api/public/account-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: auth.accessToken,
          password: auth.password,
          reason,
          details,
          confirmation: "DELETE",
          deleteAllData: true,
        }),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(readMessage(payload) || "We could not delete the account right now.");
      }

      setAuth({
        status: "deleted",
        deletedAt: typeof payload?.deletedAt === "string" ? payload.deletedAt : new Date().toISOString(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not delete the account right now.");
    } finally {
      setSubmitState("idle");
    }
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Account and data deletion"
        title={title}
        description={description}
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8">
        <div className="space-y-8">
          <ComplianceCard />
          <DataScopeCard />
          <PartialDataCard />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            {auth.status === "deleted" ? (
              <SuccessState deletedAt={auth.deletedAt} />
            ) : auth.status === "two-factor" ? (
              <TwoFactorForm
                emailHint={auth.emailHint}
                code={twoFactorCode}
                setCode={setTwoFactorCode}
                submitState={submitState}
                onSubmit={verifyTwoFactor}
              />
            ) : auth.status === "signed-in" ? (
              <DeletionForm
                email={auth.email}
                reason={reason}
                setReason={setReason}
                details={details}
                setDetails={setDetails}
                understandsPermanent={understandsPermanent}
                setUnderstandsPermanent={setUnderstandsPermanent}
                deleteAllData={deleteAllData}
                setDeleteAllData={setDeleteAllData}
                confirmText={confirmText}
                setConfirmText={setConfirmText}
                canDelete={canDelete}
                submitState={submitState}
                onSubmit={deleteAccount}
              />
            ) : (
              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                submitState={submitState}
                onSubmit={login}
              />
            )}

            {error && (
              <p role="alert" className="mt-4 flex items-start gap-2 rounded-2xl bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>
        </aside>
      </section>
    </PageShell>
  );
}

function ComplianceCard() {
  return (
    <InfoCard
      icon={<ShieldCheck className="h-5 w-5" />}
      eyebrow="For Play Store users"
      title="This page is the official FitCo deletion path."
    >
      <p>
        Use this page to request deletion of your FitCo account and associated data. The page belongs to FitCo and is
        available publicly at <strong>fitcoapp.com/delete-account</strong>.
      </p>
      <ol className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
        <li className="rounded-2xl border border-border bg-background p-4">
          <strong className="block text-foreground">1. Sign in</strong>
          Use the same email and password you use in FitCo.
        </li>
        <li className="rounded-2xl border border-border bg-background p-4">
          <strong className="block text-foreground">2. Review</strong>
          Read what will be deleted and choose an optional reason.
        </li>
        <li className="rounded-2xl border border-border bg-background p-4">
          <strong className="block text-foreground">3. Confirm</strong>
          Type DELETE and submit the permanent deletion request.
        </li>
      </ol>
    </InfoCard>
  );
}

function DataScopeCard() {
  return (
    <InfoCard icon={<Trash2 className="h-5 w-5" />} eyebrow="What is deleted" title="Account deletion removes active FitCo data.">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-lg font-bold">Deleted or disconnected</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {DATA_DELETED.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg font-bold">Limited retention</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {DATA_RETENTION.map((item) => (
              <li key={item} className="flex gap-2">
                <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </InfoCard>
  );
}

function PartialDataCard() {
  return (
    <InfoCard icon={<FileText className="h-5 w-5" />} eyebrow="Partial requests" title="Need only some data deleted?">
      <p>
        If you want to delete only specific data without closing your account, email us from your FitCo account email at{" "}
        <a className="font-semibold text-foreground underline-offset-4 hover:underline" href="mailto:privacy@fitcoapp.com">
          privacy@fitcoapp.com
        </a>
        . Include what you want removed, such as nutrition logs, community posts, route history, progress photos or
        uploaded media. We may ask you to verify ownership before processing the request.
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        You can also use <Link to="/delete-data" className="font-semibold text-foreground underline-offset-4 hover:underline">fitcoapp.com/delete-data</Link> as
        the data deletion URL for store listings.
      </p>
    </InfoCard>
  );
}

function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  submitState,
  onSubmit,
}: {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  submitState: SubmitState;
  onSubmit: (event: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <p className="pill">Secure sign-in</p>
        <h2 className="mt-4 font-display text-2xl font-bold">Start account deletion</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          For safety, sign in before we show the final deletion confirmation.
        </p>
      </div>

      <Field label="FitCo email">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            className="h-12 w-full rounded-2xl border border-border bg-background px-10 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </Field>

      <Field label="Password">
        <div className="relative">
          <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            className="h-12 w-full rounded-2xl border border-border bg-background px-10 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </Field>

      <Button type="submit" disabled={submitState === "loading"} className="h-12 w-full rounded-full bg-ink text-ink-foreground hover:bg-ink/90">
        {submitState === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in</> : "Continue"}
      </Button>

      <p className="text-xs leading-relaxed text-muted-foreground">
        If you signed up only with Google or Apple and cannot use password sign-in here, email{" "}
        <a className="font-semibold text-foreground underline-offset-4 hover:underline" href="mailto:privacy@fitcoapp.com">
          privacy@fitcoapp.com
        </a>{" "}
        from the account email and we will verify the request manually.
      </p>
    </form>
  );
}

function TwoFactorForm({
  emailHint,
  code,
  setCode,
  submitState,
  onSubmit,
}: {
  emailHint?: string;
  code: string;
  setCode: (value: string) => void;
  submitState: SubmitState;
  onSubmit: (event: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <p className="pill">2FA required</p>
        <h2 className="mt-4 font-display text-2xl font-bold">Enter your security code</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We sent a 4-digit code{emailHint ? ` to ${emailHint}` : ""}. Enter it to continue.
        </p>
      </div>
      <Field label="Verification code">
        <input
          value={code}
          onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 4))}
          inputMode="numeric"
          autoComplete="one-time-code"
          className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-center font-mono text-xl tracking-[0.4em] outline-none focus:ring-2 focus:ring-ring"
        />
      </Field>
      <Button type="submit" disabled={submitState === "loading"} className="h-12 w-full rounded-full bg-ink text-ink-foreground hover:bg-ink/90">
        {submitState === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Verifying</> : "Verify and continue"}
      </Button>
    </form>
  );
}

function DeletionForm({
  email,
  reason,
  setReason,
  details,
  setDetails,
  understandsPermanent,
  setUnderstandsPermanent,
  deleteAllData,
  setDeleteAllData,
  confirmText,
  setConfirmText,
  canDelete,
  submitState,
  onSubmit,
}: {
  email: string;
  reason: string;
  setReason: (value: string) => void;
  details: string;
  setDetails: (value: string) => void;
  understandsPermanent: boolean;
  setUnderstandsPermanent: (value: boolean) => void;
  deleteAllData: boolean;
  setDeleteAllData: (value: boolean) => void;
  confirmText: string;
  setConfirmText: (value: string) => void;
  canDelete: boolean;
  submitState: SubmitState;
  onSubmit: (event: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <p className="pill">Signed in</p>
        <h2 className="mt-4 font-display text-2xl font-bold">Final confirmation</h2>
        <p className="mt-2 text-sm text-muted-foreground">Account: <strong className="text-foreground">{email}</strong></p>
      </div>

      <Field label="Why are you deleting your account?">
        <select
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          {REASONS.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </Field>

      <Field label="Optional details">
        <textarea
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          rows={3}
          maxLength={800}
          placeholder="Anything you want us to know before deleting the account."
          className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </Field>

      <ConfirmBox checked={understandsPermanent} onChange={setUnderstandsPermanent}>
        I understand this permanently deletes my FitCo account and cannot be undone.
      </ConfirmBox>
      <ConfirmBox checked={deleteAllData} onChange={setDeleteAllData}>
        Delete my account and associated FitCo server data.
      </ConfirmBox>

      <Field label="Type DELETE to confirm">
        <input
          value={confirmText}
          onChange={(event) => setConfirmText(event.target.value)}
          autoComplete="off"
          className="h-12 w-full rounded-2xl border border-border bg-background px-4 font-mono text-sm uppercase tracking-wider outline-none focus:ring-2 focus:ring-ring"
        />
      </Field>

      <Button
        type="submit"
        disabled={!canDelete || submitState === "loading"}
        className="h-12 w-full rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
      >
        {submitState === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Deleting</> : "Delete my FitCo account"}
      </Button>
    </form>
  );
}

function SuccessState({ deletedAt }: { deletedAt: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h2 className="mt-4 font-display text-2xl font-bold">Deletion confirmed</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Your FitCo account deletion was submitted successfully on {new Date(deletedAt).toISOString().slice(0, 10)}.
      </p>
      <Link to="/" className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium text-ink-foreground hover:bg-ink/90">
        Back to FitCo
      </Link>
    </div>
  );
}

function InfoCard({
  icon,
  eyebrow,
  title,
  children,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/20 text-foreground">{icon}</div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">{title}</h2>
        </div>
      </div>
      <div className="mt-5 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </article>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-foreground">
      <span className="mb-2 block">{label}</span>
      {children}
    </label>
  );
}

function ConfirmBox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-background p-4 text-sm text-muted-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 rounded border-border accent-primary"
      />
      <span>{children}</span>
    </label>
  );
}

function readMessage(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const value = (payload as { message?: unknown; error?: unknown }).message ?? (payload as { error?: unknown }).error;
  if (typeof value === "string") return value;
  if (Array.isArray(value) && value.every((item) => typeof item === "string")) return value.join(" ");
  return null;
}

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
import { useLang } from "@/lib/i18n/LanguageProvider";

type DeletionMode = "account" | "data";
type AuthState =
  | { status: "signed-out" }
  | { status: "two-factor"; challengeToken: string; emailHint?: string; password: string }
  | { status: "signed-in"; accessToken: string; password: string; email: string }
  | { status: "deleted"; deletedAt: string };

type SubmitState = "idle" | "loading";

const COPY = {
  en: {
    hero: {
      eyebrow: "Account and data deletion",
      accountTitle: "Delete your FitCo account",
      dataTitle: "Delete FitCo data",
      accountDescription:
        "Sign in, review what will be removed and confirm permanent deletion of your FitCo account and associated server data.",
      dataDescription:
        "Request deletion of specific FitCo data, or continue to permanently delete your whole account.",
    },
    errors: {
      missingCredentials: "Enter the email and password for your FitCo account.",
      signInFailed: "Sign-in failed. Check your email and password.",
      invalidSession: "FitCo did not return a valid session. Please try again.",
      genericSignIn: "Sign-in failed. Please try again.",
      invalidCode: "Enter the 4-digit verification code sent to your email.",
      verificationFailed: "Verification failed. Please try again.",
      incompleteConfirm: "Complete every confirmation step before deleting the account.",
      deleteFailed: "We could not delete the account right now.",
    },
    compliance: {
      eyebrow: "For Play Store users",
      title: "This page is the official FitCo deletion path.",
      body:
        "Use this page to request deletion of your FitCo account and associated data. The page belongs to FitCo and is available publicly at",
      steps: [
        { title: "1. Sign in", body: "Use the same email and password you use in FitCo." },
        { title: "2. Review", body: "Read what will be deleted and choose an optional reason." },
        { title: "3. Confirm", body: "Type DELETE and submit the permanent deletion request." },
      ],
    },
    dataScope: {
      eyebrow: "What is deleted",
      title: "Account deletion removes active FitCo data.",
      deletedTitle: "Deleted or disconnected",
      retainedTitle: "Limited retention",
      deleted: [
        "Account identity, profile, preferences, authentication sessions and push/device tokens.",
        "Nutrition diary, custom foods, food scanner submissions, water logs and nutrition targets.",
        "Workout plans, exercise sessions, route sessions, ratings, notes and movement history.",
        "Progress data such as weight, measurements, photos, journals, streaks, fasting, sleep and cycle tracking entries.",
        "Community profile data, posts, comments, reactions, reposts, chats, reports and uploaded media references.",
        "FitCoins wallet records, rewards, badges, challenges and subscription state tied to the account.",
        "Analytics events and diagnostics that are directly linked to the account.",
      ],
      retained: [
        "Security, fraud-prevention, billing, moderation or legal records may be retained only when required or reasonably necessary.",
        "Operational backups and server logs can take up to 30 days to expire from our backup systems.",
        "Where we must keep limited records, we detach or minimize them where possible so they are no longer used as an active FitCo profile.",
      ],
    },
    partial: {
      eyebrow: "Partial requests",
      title: "Need only some data deleted?",
      beforeEmail:
        "If you want to delete only specific data without closing your account, email us from your FitCo account email at",
      afterEmail:
        "Include what you want removed, such as nutrition logs, community posts, route history, progress photos or uploaded media. We may ask you to verify ownership before processing the request.",
    },
    login: {
      eyebrow: "Secure sign-in",
      title: "Start account deletion",
      description: "For safety, sign in before we show the final deletion confirmation.",
      email: "FitCo email",
      password: "Password",
      loading: "Signing in",
      submit: "Continue",
      socialBefore: "If you signed up only with Google or Apple and cannot use password sign-in here, email",
      socialAfter: "from the account email and we will verify the request manually.",
    },
    twoFactor: {
      eyebrow: "2FA required",
      title: "Enter your security code",
      description: (emailHint?: string) =>
        `We sent a 4-digit code${emailHint ? ` to ${emailHint}` : ""}. Enter it to continue.`,
      code: "Verification code",
      loading: "Verifying",
      submit: "Verify and continue",
    },
    deletion: {
      eyebrow: "Signed in",
      title: "Final confirmation",
      account: "Account:",
      reason: "Why are you deleting your account?",
      details: "Optional details",
      detailsPlaceholder: "Anything you want us to know before deleting the account.",
      understand: "I understand this permanently deletes my FitCo account and cannot be undone.",
      deleteAll: "Delete my account and associated FitCo server data.",
      confirm: "Type DELETE to confirm",
      loading: "Deleting",
      submit: "Delete my FitCo account",
    },
    success: {
      title: "Deletion confirmed",
      message: (date: string) => `Your FitCo account deletion was submitted successfully on ${date}.`,
      back: "Back to FitCo",
    },
    reasons: [
      { value: "no_longer_use", label: "I no longer use FitCo" },
      { value: "reset", label: "I want to reset and start over" },
      { value: "privacy", label: "Privacy or data concern" },
      { value: "not_useful", label: "The app is not useful for me" },
      { value: "notifications_ads", label: "Too many notifications or ads" },
      { value: "other", label: "Other" },
    ],
  },
  bg: {
    hero: {
      eyebrow: "Изтриване на акаунт и данни",
      accountTitle: "Изтриване на FitCo акаунт",
      dataTitle: "Изтриване на данни във FitCo",
      accountDescription:
        "Влез, прегледай какво ще бъде премахнато и потвърди окончателното изтриване на акаунта и свързаните с него данни от сървърите ни.",
      dataDescription:
        "Можеш да поискаш изтриване на конкретни FitCo данни или да продължиш към окончателно изтриване на целия акаунт.",
    },
    errors: {
      missingCredentials: "Въведи имейла и паролата за твоя FitCo акаунт.",
      signInFailed: "Входът не успя. Провери имейла и паролата.",
      invalidSession: "FitCo не върна валидна сесия. Опитай отново.",
      genericSignIn: "Входът не успя. Опитай отново.",
      invalidCode: "Въведи 4-цифрения код за потвърждение, изпратен на имейла ти.",
      verificationFailed: "Потвърждението не успя. Опитай отново.",
      incompleteConfirm: "Завърши всички стъпки за потвърждение преди изтриването.",
      deleteFailed: "В момента не успяхме да изтрием акаунта.",
    },
    compliance: {
      eyebrow: "За потребители от Play Store",
      title: "Това е официалната страница на FitCo за изтриване.",
      body:
        "Използвай тази страница, за да поискаш изтриване на своя FitCo акаунт и свързаните с него данни. Страницата принадлежи на FitCo и е публично достъпна на",
      steps: [
        { title: "1. Вход", body: "Използвай същия имейл и парола, с които влизаш във FitCo." },
        { title: "2. Преглед", body: "Виж какво ще бъде изтрито и избери причина, ако желаеш." },
        { title: "3. Потвърждение", body: "Въведи DELETE и изпрати заявката за окончателно изтриване." },
      ],
    },
    dataScope: {
      eyebrow: "Какво се изтрива",
      title: "Изтриването на акаунт премахва активните FitCo данни.",
      deletedTitle: "Изтриват се или се отделят",
      retainedTitle: "Ограничено запазване",
      deleted: [
        "Идентичност на акаунта, профил, предпочитания, активни сесии и push/device токени.",
        "Хранителен дневник, персонални храни, изпратени данни от food scanner, вода и хранителни цели.",
        "Тренировъчни планове, тренировъчни сесии, маршрути, оценки, бележки и история на движение.",
        "Прогрес като тегло, мерки, снимки, дневници, поредици, гладуване, сън и cycle tracking записи.",
        "Community профил, публикации, коментари, реакции, reposts, чатове, сигнали и връзки към качени медии.",
        "FitCoins портфейл, награди, badges, предизвикателства и subscription статус, свързани с акаунта.",
        "Аналитични събития и диагностика, които са директно свързани с акаунта.",
      ],
      retained: [
        "Записи за сигурност, предотвратяване на злоупотреби, плащания, модерация или законови изисквания може да се запазят само когато е необходимо.",
        "Оперативните backup-и и server logs може да отнемат до 30 дни, за да бъдат изчистени от backup системите.",
        "Когато трябва да запазим ограничени записи, ги отделяме или минимизираме, така че да не се използват като активен FitCo профил.",
      ],
    },
    partial: {
      eyebrow: "Частично изтриване",
      title: "Искаш да изтриеш само част от данните?",
      beforeEmail:
        "Ако искаш да изтриеш конкретни данни, без да затваряш акаунта си, пиши ни от имейла на твоя FitCo акаунт на",
      afterEmail:
        "Посочи какво искаш да бъде премахнато, например хранителни записи, community публикации, история на маршрути, снимки на прогрес или качени медии. Може да поискаме потвърждение на собствеността преди обработка на заявката.",
    },
    login: {
      eyebrow: "Сигурен вход",
      title: "Започни изтриване на акаунт",
      description: "За сигурност първо влез, преди да покажем финалното потвърждение.",
      email: "FitCo имейл",
      password: "Парола",
      loading: "Влизане",
      submit: "Продължи",
      socialBefore: "Ако си се регистрирал само с Google или Apple и не можеш да влезеш с парола тук, пиши на",
      socialAfter: "от имейла на акаунта и ще потвърдим заявката ръчно.",
    },
    twoFactor: {
      eyebrow: "Изисква се 2FA",
      title: "Въведи кода за сигурност",
      description: (emailHint?: string) =>
        `Изпратихме 4-цифрен код${emailHint ? ` до ${emailHint}` : ""}. Въведи го, за да продължиш.`,
      code: "Код за потвърждение",
      loading: "Проверка",
      submit: "Потвърди и продължи",
    },
    deletion: {
      eyebrow: "Влязъл си",
      title: "Последно потвърждение",
      account: "Акаунт:",
      reason: "Защо изтриваш акаунта?",
      details: "Допълнителни детайли",
      detailsPlaceholder: "Ако искаш, кажи ни нещо преди изтриването.",
      understand: "Разбирам, че това изтрива окончателно FitCo акаунта ми и не може да бъде отменено.",
      deleteAll: "Изтрий акаунта ми и свързаните с него FitCo данни от сървърите.",
      confirm: "Въведи DELETE за потвърждение",
      loading: "Изтриване",
      submit: "Изтрий FitCo акаунта ми",
    },
    success: {
      title: "Изтриването е потвърдено",
      message: (date: string) => `Заявката за изтриване на FitCo акаунта беше изпратена успешно на ${date}.`,
      back: "Обратно към FitCo",
    },
    reasons: [
      { value: "no_longer_use", label: "Вече не използвам FitCo" },
      { value: "reset", label: "Искам да започна отначало" },
      { value: "privacy", label: "Притеснение за поверителност или данни" },
      { value: "not_useful", label: "Приложението не ми е полезно" },
      { value: "notifications_ads", label: "Твърде много известия или реклами" },
      { value: "other", label: "Друго" },
    ],
  },
};

type AccountDeletionCopy = (typeof COPY)["en"];

export function AccountDeletionPage({ mode = "account" }: { mode?: DeletionMode }) {
  const { lang } = useLang();
  const copy = COPY[lang === "en" ? "en" : "bg"];
  const [auth, setAuth] = useState<AuthState>({ status: "signed-out" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [reason, setReason] = useState(copy.reasons[0].value);
  const [details, setDetails] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [understandsPermanent, setUnderstandsPermanent] = useState(false);
  const [deleteAllData, setDeleteAllData] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);

  const isAccountMode = mode === "account";
  const title = isAccountMode ? copy.hero.accountTitle : copy.hero.dataTitle;
  const description = isAccountMode ? copy.hero.accountDescription : copy.hero.dataDescription;

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
      setError(copy.errors.missingCredentials);
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
        throw new Error(readMessage(payload) || copy.errors.signInFailed);
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
        throw new Error(copy.errors.invalidSession);
      }

      setAuth({ status: "signed-in", accessToken, password, email: email.trim() });
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.errors.genericSignIn);
    } finally {
      setSubmitState("idle");
    }
  }

  async function verifyTwoFactor(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (auth.status !== "two-factor") return;
    if (!/^\d{4}$/.test(twoFactorCode.trim())) {
      setError(copy.errors.invalidCode);
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
        throw new Error(readMessage(payload) || copy.errors.verificationFailed);
      }

      const accessToken = payload?.tokens?.accessToken;
      if (typeof accessToken !== "string") {
        throw new Error(copy.errors.invalidSession);
      }

      setAuth({ status: "signed-in", accessToken, password: auth.password, email: email.trim() });
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.errors.verificationFailed);
    } finally {
      setSubmitState("idle");
    }
  }

  async function deleteAccount(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (auth.status !== "signed-in" || !canDelete) {
      setError(copy.errors.incompleteConfirm);
      return;
    }

    setSubmitState("loading");
    try {
      const reasonLabel = copy.reasons.find((item) => item.value === reason)?.label ?? reason;
      const response = await fetch("/api/public/account-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: auth.accessToken,
          password: auth.password,
          reason: reasonLabel,
          details,
          confirmation: "DELETE",
          deleteAllData: true,
        }),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(readMessage(payload) || copy.errors.deleteFailed);
      }

      setAuth({
        status: "deleted",
        deletedAt: typeof payload?.deletedAt === "string" ? payload.deletedAt : new Date().toISOString(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.errors.deleteFailed);
    } finally {
      setSubmitState("idle");
    }
  }

  return (
    <PageShell>
      <PageHero
        eyebrow={copy.hero.eyebrow}
        title={title}
        description={description}
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8">
        <div className="space-y-8">
          <ComplianceCard copy={copy} />
          <DataScopeCard copy={copy} />
          <PartialDataCard copy={copy} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            {auth.status === "deleted" ? (
              <SuccessState copy={copy} deletedAt={auth.deletedAt} />
            ) : auth.status === "two-factor" ? (
              <TwoFactorForm
                copy={copy}
                emailHint={auth.emailHint}
                code={twoFactorCode}
                setCode={setTwoFactorCode}
                submitState={submitState}
                onSubmit={verifyTwoFactor}
              />
            ) : auth.status === "signed-in" ? (
              <DeletionForm
                copy={copy}
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
                copy={copy}
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

function ComplianceCard({ copy }: { copy: AccountDeletionCopy }) {
  return (
    <InfoCard
      icon={<ShieldCheck className="h-5 w-5" />}
      eyebrow={copy.compliance.eyebrow}
      title={copy.compliance.title}
    >
      <p>
        {copy.compliance.body} <strong>fitcoapp.com/delete-account</strong>.
      </p>
      <ol className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
        {copy.compliance.steps.map((step) => (
          <li key={step.title} className="rounded-2xl border border-border bg-background p-4">
            <strong className="block text-foreground">{step.title}</strong>
            {step.body}
          </li>
        ))}
      </ol>
    </InfoCard>
  );
}

function DataScopeCard({ copy }: { copy: AccountDeletionCopy }) {
  return (
    <InfoCard icon={<Trash2 className="h-5 w-5" />} eyebrow={copy.dataScope.eyebrow} title={copy.dataScope.title}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-lg font-bold">{copy.dataScope.deletedTitle}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {copy.dataScope.deleted.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg font-bold">{copy.dataScope.retainedTitle}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {copy.dataScope.retained.map((item) => (
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

function PartialDataCard({ copy }: { copy: AccountDeletionCopy }) {
  return (
    <InfoCard icon={<FileText className="h-5 w-5" />} eyebrow={copy.partial.eyebrow} title={copy.partial.title}>
      <p>
        {copy.partial.beforeEmail}{" "}
        <a className="font-semibold text-foreground underline-offset-4 hover:underline" href="mailto:privacy@fitcoapp.com">
          privacy@fitcoapp.com
        </a>
        . {copy.partial.afterEmail}
      </p>
    </InfoCard>
  );
}

function LoginForm({
  copy,
  email,
  setEmail,
  password,
  setPassword,
  submitState,
  onSubmit,
}: {
  copy: AccountDeletionCopy;
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
        <p className="pill">{copy.login.eyebrow}</p>
        <h2 className="mt-4 font-display text-2xl font-bold">{copy.login.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {copy.login.description}
        </p>
      </div>

      <Field label={copy.login.email}>
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

      <Field label={copy.login.password}>
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
        {submitState === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> {copy.login.loading}</> : copy.login.submit}
      </Button>

      <p className="text-xs leading-relaxed text-muted-foreground">
        {copy.login.socialBefore}{" "}
        <a className="font-semibold text-foreground underline-offset-4 hover:underline" href="mailto:privacy@fitcoapp.com">
          privacy@fitcoapp.com
        </a>{" "}
        {copy.login.socialAfter}
      </p>
    </form>
  );
}

function TwoFactorForm({
  copy,
  emailHint,
  code,
  setCode,
  submitState,
  onSubmit,
}: {
  copy: AccountDeletionCopy;
  emailHint?: string;
  code: string;
  setCode: (value: string) => void;
  submitState: SubmitState;
  onSubmit: (event: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <p className="pill">{copy.twoFactor.eyebrow}</p>
        <h2 className="mt-4 font-display text-2xl font-bold">{copy.twoFactor.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {copy.twoFactor.description(emailHint)}
        </p>
      </div>
      <Field label={copy.twoFactor.code}>
        <input
          value={code}
          onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 4))}
          inputMode="numeric"
          autoComplete="one-time-code"
          className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-center font-mono text-xl tracking-[0.4em] outline-none focus:ring-2 focus:ring-ring"
        />
      </Field>
      <Button type="submit" disabled={submitState === "loading"} className="h-12 w-full rounded-full bg-ink text-ink-foreground hover:bg-ink/90">
        {submitState === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> {copy.twoFactor.loading}</> : copy.twoFactor.submit}
      </Button>
    </form>
  );
}

function DeletionForm({
  copy,
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
  copy: AccountDeletionCopy;
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
        <p className="pill">{copy.deletion.eyebrow}</p>
        <h2 className="mt-4 font-display text-2xl font-bold">{copy.deletion.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{copy.deletion.account} <strong className="text-foreground">{email}</strong></p>
      </div>

      <Field label={copy.deletion.reason}>
        <select
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          {copy.reasons.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </Field>

      <Field label={copy.deletion.details}>
        <textarea
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          rows={3}
          maxLength={800}
          placeholder={copy.deletion.detailsPlaceholder}
          className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </Field>

      <ConfirmBox checked={understandsPermanent} onChange={setUnderstandsPermanent}>
        {copy.deletion.understand}
      </ConfirmBox>
      <ConfirmBox checked={deleteAllData} onChange={setDeleteAllData}>
        {copy.deletion.deleteAll}
      </ConfirmBox>

      <Field label={copy.deletion.confirm}>
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
        {submitState === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> {copy.deletion.loading}</> : copy.deletion.submit}
      </Button>
    </form>
  );
}

function SuccessState({ copy, deletedAt }: { copy: AccountDeletionCopy; deletedAt: string }) {
  const deletedDate = new Date(deletedAt).toISOString().slice(0, 10);

  return (
    <div className="text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h2 className="mt-4 font-display text-2xl font-bold">{copy.success.title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {copy.success.message(deletedDate)}
      </p>
      <Link to="/" className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium text-ink-foreground hover:bg-ink/90">
        {copy.success.back}
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

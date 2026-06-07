import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Apple, BadgeCheck, MapPin, MessageCircle, Heart, ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Logo } from "@/components/site/Logo";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { fetchCommunityPost, type CommunityPostResult } from "@/lib/community-post.functions";

// When set, store buttons become real links. Leave empty to render "Coming soon".
const APP_STORE_URL = "";
const PLAY_STORE_URL = "";
const DEFAULT_OG_IMAGE = "https://fitcoapp.com/og-default.jpg";

const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["community-post", postId],
    queryFn: () => fetchCommunityPost({ data: { postId } }),
    staleTime: 60_000,
    retry: false,
  });

export const Route = createFileRoute("/community/$postId")({
  loader: ({ params, context }) =>
    context.queryClient.ensureQueryData(postQueryOptions(params.postId)),
  head: ({ params, loaderData }) => {
    const data = loaderData as CommunityPostResult | undefined;
    const url = `https://fitcoapp.com/community/${params.postId}`;
    if (!data || data.status !== "ok") {
      return {
        meta: [
          { title: "FitCo Community" },
          { name: "description", content: "A shared post from the FitCo community." },
          { property: "og:title", content: "FitCo Community" },
          { property: "og:description", content: "A shared post from the FitCo community." },
          { property: "og:url", content: url },
          { property: "og:image", content: DEFAULT_OG_IMAGE },
          { name: "twitter:card", content: "summary_large_image" },
        ],
        links: [{ rel: "canonical", href: url }],
      };
    }
    const p = data.post;
    const title = `${p.author.fullName} on FitCo`;
    const desc = (p.caption ?? "Shared from the FitCo community.").replace(/\s+/g, " ").slice(0, 200);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:image", content: p.imageUrl ?? DEFAULT_OG_IMAGE },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: p.imageUrl ?? DEFAULT_OG_IMAGE },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CommunityPostPage,
  pendingComponent: () => (
    <PageFrame>
      <PostCardSkeleton />
    </PageFrame>
  ),
});

function CommunityPostPage() {
  const { postId } = Route.useParams();
  const { data } = useSuspenseQuery(postQueryOptions(postId));
  const { lang } = useLang();
  const en = lang === "en";
  const deepLink = `fitco://community/${postId}`;

  // Best-effort: try to open the app on mobile. Never blocks the preview.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (data.status !== "ok") return;
    const ua = navigator.userAgent || "";
    const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
    if (!isMobile) return;
    // Avoid re-triggering when navigating back to the page.
    const flagKey = `fitco-deeplink-${postId}`;
    try {
      if (sessionStorage.getItem(flagKey)) return;
      sessionStorage.setItem(flagKey, "1");
    } catch {}

    let bailed = false;
    const onHide = () => { bailed = true; };
    window.addEventListener("pagehide", onHide);
    window.addEventListener("blur", onHide);

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = deepLink;
    document.body.appendChild(iframe);

    const t = window.setTimeout(() => {
      if (!bailed) {
        // App likely not installed — keep preview visible. Nothing to do.
      }
      try { document.body.removeChild(iframe); } catch {}
    }, 1500);

    return () => {
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("blur", onHide);
      window.clearTimeout(t);
      try { document.body.removeChild(iframe); } catch {}
    };
  }, [postId, deepLink, data.status]);

  return (
    <PageFrame>
      {data.status === "ok" ? (
        <>
          <PostCard post={data.post} en={en} />
          <ActionsBlock deepLink={deepLink} en={en} />
        </>
      ) : (
        <UnavailableState en={en} />
      )}
    </PageFrame>
  );
}

function PageFrame({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-card/50 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo />
          <LanguageSwitcher compact />
        </div>
      </header>

      <main className="mx-auto w-full max-w-xl px-4 py-8 sm:py-12">
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {en ? "Shared from FitCo Community" : "Споделено от общността на FitCo"}
        </p>
        {children}
      </main>
    </div>
  );
}

function PostCard({ post, en }: { post: import("@/lib/community-post.functions").CommunityPost; en: boolean }) {
  const initials = useMemo(() => {
    const parts = post.author.fullName.trim().split(/\s+/);
    return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "·";
  }, [post.author.fullName]);

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <header className="flex items-center gap-3 px-5 pt-5">
        {post.author.avatarUrl ? (
          <img
            src={post.author.avatarUrl}
            alt={post.author.fullName}
            className="h-11 w-11 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
            {initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <p className="truncate font-semibold text-foreground">{post.author.fullName}</p>
            {post.author.isVerified && (
              <BadgeCheck className="h-4 w-4 shrink-0 text-primary" aria-label={en ? "Verified" : "Потвърден"} />
            )}
          </div>
          <p className="truncate text-xs text-muted-foreground">{post.author.handle}</p>
        </div>
      </header>

      {post.locationName && (
        <div className="mt-3 flex items-center gap-1.5 px-5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            {post.locationName}
            {post.locationSubtitle ? ` · ${post.locationSubtitle}` : ""}
          </span>
        </div>
      )}

      {post.caption && (
        <p className="whitespace-pre-wrap px-5 pt-4 text-[15px] leading-relaxed text-foreground">
          {post.caption}
        </p>
      )}

      {post.imageUrl && (
        <div className="mt-4 overflow-hidden bg-muted">
          <img
            src={post.imageUrl}
            alt={post.caption ?? (en ? "FitCo community post" : "Пост от общността на FitCo")}
            loading="lazy"
            className="block max-h-[480px] w-full object-cover"
          />
        </div>
      )}

      <footer className="flex items-center gap-4 px-5 py-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Heart className="h-3.5 w-3.5" />
          {post.counts.reactions} {en ? "reactions" : "реакции"}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle className="h-3.5 w-3.5" />
          {post.counts.comments} {en ? "comments" : "коментара"}
        </span>
      </footer>
    </article>
  );
}

function PostCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <div className="flex items-center gap-3 px-5 pt-5">
        <div className="h-11 w-11 animate-pulse rounded-full bg-border/60" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-32 animate-pulse rounded bg-border/60" />
          <div className="h-2.5 w-20 animate-pulse rounded bg-border/40" />
        </div>
      </div>
      <div className="space-y-2 px-5 pt-5">
        <div className="h-3 w-full animate-pulse rounded bg-border/40" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-border/40" />
      </div>
      <div className="mt-4 h-72 w-full animate-pulse bg-border/40" />
      <div className="px-5 py-4">
        <div className="h-3 w-40 animate-pulse rounded bg-border/40" />
      </div>
    </div>
  );
}

function ActionsBlock({ deepLink, en }: { deepLink: string; en: boolean }) {
  const openApp = () => {
    if (typeof window !== "undefined") window.location.href = deepLink;
  };

  return (
    <section className="mt-8 space-y-6">
      <button
        type="button"
        onClick={openApp}
        className="block w-full rounded-full bg-ink px-6 py-3.5 text-center text-sm font-semibold text-ink-foreground shadow-soft transition-colors hover:bg-ink/90"
      >
        {en ? "Open in FitCo app" : "Отвори във FitCo"}
      </button>

      <div>
        <h2 className="mb-3 text-center font-display text-lg font-bold tracking-tight">
          {en ? "Get the FitCo app" : "Свали FitCo"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <StoreBadge platform="ios" url={APP_STORE_URL} en={en} />
          <StoreBadge platform="android" url={PLAY_STORE_URL} en={en} />
        </div>
      </div>

      <div className="pt-2 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {en ? "Browse FitCo" : "Разгледай FitCo"}
        </Link>
      </div>
    </section>
  );
}

function StoreBadge({ platform, url, en }: { platform: "ios" | "android"; url: string; en: boolean }) {
  const isComingSoon = !url;
  const label = platform === "ios" ? "App Store" : "Google Play";
  const eyebrow = platform === "ios" ? (en ? "Download on the" : "Изтегли от") : (en ? "Get it on" : "Свали от");
  const comingSoon = en ? "Coming soon" : "Очаквайте скоро";

  const inner = (
    <>
      {platform === "ios" ? (
        <Apple className="h-7 w-7 shrink-0" aria-hidden />
      ) : (
        <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden>
          <path fill="oklch(0.46 0.13 158)" d="M3.6 2.3 14.5 12 3.6 21.7c-.4-.3-.6-.8-.6-1.3V3.6c0-.5.2-1 .6-1.3z" />
          <path fill="oklch(0.92 0.22 145)" d="M16.6 14.1 18.9 12l-2.3-2.1L14.5 12z" />
          <path fill="currentColor" opacity=".85" d="M3.6 2.3c.3-.2.7-.3 1-.3.3 0 .6.1.9.2L17 9 14.5 12z" />
          <path fill="currentColor" opacity=".55" d="M3.6 21.7 14.5 12 17 15l-11.5 6.8c-.3.1-.6.2-.9.2-.3 0-.7-.1-1-.3z" />
        </svg>
      )}
      <div className="text-left leading-tight">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{eyebrow}</div>
        <div className="text-base font-semibold">{label}</div>
      </div>
      {isComingSoon && (
        <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {comingSoon}
        </span>
      )}
    </>
  );

  const className =
    "flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 transition-colors " +
    (isComingSoon ? "cursor-not-allowed opacity-70" : "hover:border-primary/60 hover:shadow-soft");

  if (isComingSoon) {
    return (
      <div aria-disabled className={className} role="group" aria-label={`${label} — ${comingSoon}`}>
        {inner}
      </div>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className} aria-label={`${eyebrow} ${label}`}>
      {inner}
    </a>
  );
}

function UnavailableState({ en }: { en: boolean }) {
  const router = useRouter();
  return (
    <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
      <h1 className="font-display text-2xl font-bold tracking-tight">
        {en ? "This post is no longer available" : "Този пост вече не е наличен"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {en
          ? "It may have been deleted or hidden by the author."
          : "Възможно е да е изтрит или скрит от автора."}
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link
          to="/"
          className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium text-ink-foreground hover:bg-ink/90"
        >
          {en ? "Browse FitCo" : "Разгледай FitCo"}
        </Link>
        <button
          type="button"
          onClick={() => router.invalidate()}
          className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground hover:bg-muted"
        >
          {en ? "Try again" : "Опитай пак"}
        </button>
      </div>
      <ActionsBlock deepLink="fitco://" en={en} />
    </div>
  );
}
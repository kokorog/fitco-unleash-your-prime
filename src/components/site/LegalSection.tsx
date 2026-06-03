import { PageShell, PageHero } from "@/components/site/PageShell";
import { ContentBody } from "@/components/site/ContentBody";
import { useContentByKey } from "@/lib/web-content";
import { useLang } from "@/lib/i18n/LanguageProvider";

interface LegalSectionProps {
  contentKey: "terms-of-service" | "privacy-policy" | "gdpr-rights" | "cookie-policy";
  fallbackTitle: string;
  fallbackIntro: string;
  updatedLabel: string;
}

export function LegalSection({ contentKey, fallbackTitle, fallbackIntro, updatedLabel }: LegalSectionProps) {
  const { lang, t } = useLang();
  const { data, isLoading, isError } = useContentByKey(contentKey, lang);

  const title = data?.title?.trim() || fallbackTitle;
  const intro = data?.subtitle?.trim() || data?.excerpt?.trim() || fallbackIntro;
  const updatedAt = data?.updatedAt || data?.publishedAt;
  const updatedDate = updatedAt ? new Date(updatedAt).toISOString().slice(0, 10) : null;

  return (
    <PageShell>
      <PageHero title={title} description={intro} />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {updatedDate && (
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {updatedLabel}: {updatedDate}
          </p>
        )}
        <div className="mt-8 text-sm leading-relaxed text-foreground/90">
          {isLoading ? (
            <SkeletonLines />
          ) : isError || !data?.body?.trim() ? (
            <FallbackMessage lang={lang} title={fallbackTitle} />
          ) : (
            <ContentBody body={data.body} />
          )}
        </div>
      </article>
    </PageShell>
  );
}

function SkeletonLines() {
  return (
    <div className="space-y-3" aria-busy="true" aria-live="polite">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-3 animate-pulse rounded bg-border/60" style={{ width: `${60 + ((i * 7) % 35)}%` }} />
      ))}
    </div>
  );
}

function FallbackMessage({ lang, title }: { lang: "en" | "bg"; title: string }) {
  const en = lang === "en";
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="font-medium">
        {en ? `${title} is being updated.` : `${title} се обновява в момента.`}
      </p>
      <p className="mt-2 text-muted-foreground">
        {en
          ? "This document is managed by FitCo and will appear here once published. For questions email "
          : "Документът се управлява от FitCo и ще се появи тук, след като е публикуван. За въпроси пиши на "}
        <a className="text-primary hover:underline" href="mailto:support@fitcoapp.com">support@fitcoapp.com</a>.
      </p>
    </div>
  );
}
import { Star } from "lucide-react";
import { useContentList, metaString, metaNumber } from "@/lib/web-content";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/site/Reveal";

export function ReviewsSection() {
  const { lang } = useLang();
  const { data: items, isLoading, isError } = useContentList("REVIEW", lang);
  const en = lang === "en";

  // If no published reviews and no error, hide the section entirely to keep the page clean.
  if (!isLoading && (isError || !items || items.length === 0)) return null;

  return (
    <section id="reviews" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="pill">{en ? "Reviews" : "Отзиви"}</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            {en ? "What early users say" : "Какво казват ранните потребители"}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-48 animate-pulse rounded-3xl bg-border/40" />
              ))
            : items!.map((item, i) => {
                const headline = item.title || "";
                const text = item.body || item.excerpt || "";
                const name = metaString(item, "reviewerName") || metaString(item, "name");
                const role = metaString(item, "role");
                const avatar = metaString(item, "avatarUrl") || metaString(item, "avatar");
                const rating = Math.max(
                  0,
                  Math.min(5, Math.round(metaNumber(item, "rating") ?? 0)),
                );
                return (
                  <Reveal
                    key={item.id ?? i}
                    delay={i * 70}
                    className="card-cream flex flex-col gap-4 p-6"
                  >
                    {rating > 0 && (
                      <div className="flex gap-0.5" aria-label={`${rating} / 5`}>
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`h-4 w-4 ${idx < rating ? "fill-primary text-primary" : "text-muted-foreground/40"}`}
                          />
                        ))}
                      </div>
                    )}
                    {headline && (
                      <p className="font-display text-lg font-bold leading-snug">{headline}</p>
                    )}
                    {text && <p className="text-sm text-foreground/80">{text}</p>}
                    {(name || role || avatar) && (
                      <div className="mt-auto flex items-center gap-3 pt-2">
                        {avatar ? (
                          <img
                            src={avatar}
                            alt={name ?? ""}
                            className="h-9 w-9 rounded-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                            {(name ?? "?").slice(0, 1).toUpperCase()}
                          </div>
                        )}
                        <div className="text-xs">
                          {name && <p className="font-semibold text-foreground">{name}</p>}
                          {role && <p className="text-muted-foreground">{role}</p>}
                        </div>
                      </div>
                    )}
                  </Reveal>
                );
              })}
        </div>
      </div>
    </section>
  );
}

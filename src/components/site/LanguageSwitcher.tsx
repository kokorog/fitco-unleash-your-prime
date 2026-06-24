import { useLang } from "@/lib/i18n/LanguageProvider";

export function LanguageSwitcher({
  compact = false,
  tone = "light",
}: {
  compact?: boolean;
  tone?: "light" | "dark";
}) {
  const { lang, setLang } = useLang();
  const dark = tone === "dark";
  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center rounded-full border p-0.5 text-xs font-medium ${compact ? "" : "shadow-soft"} ${dark ? "border-white/15 bg-white/10" : "border-border bg-card"}`}
    >
      {(["en", "bg"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1 transition-colors ${
            lang === l
              ? dark
                ? "bg-ink-foreground text-ink"
                : "bg-ink text-ink-foreground"
              : dark
                ? "text-ink-foreground/65 hover:text-ink-foreground"
                : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

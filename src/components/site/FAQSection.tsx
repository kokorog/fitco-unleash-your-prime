import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useContentList, metaString } from "@/lib/web-content";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/site/Reveal";

export function FAQSection() {
  const { lang, t } = useLang();
  const { data: items, isLoading, isError } = useContentList("FAQ", lang);

  const en = lang === "en";
  const emptyMsg = en
    ? "FAQs will appear here once published."
    : "Често задаваните въпроси ще се появят тук, след като са публикувани.";

  return (
    <section id="faq" className="scroll-mt-24 border-t border-border bg-surface py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{t.faq.title}</h2>
          <p className="mt-3 text-base text-muted-foreground">{t.faq.sub}</p>
        </Reveal>
        <Reveal className="mt-10" delay={80}>
          {isLoading ? (
            <div className="space-y-3" aria-busy="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-12 animate-pulse rounded-lg bg-border/40" />
              ))}
            </div>
          ) : isError || !items || items.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">{emptyMsg}</p>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {items.map((item, i) => {
                const q = metaString(item, "question") || item.title || "";
                const a = metaString(item, "answer") || item.body || item.excerpt || "";
                if (!q || !a) return null;
                return (
                  <AccordionItem key={item.id ?? i} value={`q-${item.id ?? i}`} className="border-border">
                    <AccordionTrigger className="text-left text-base font-medium">{q}</AccordionTrigger>
                    <AccordionContent className="whitespace-pre-line text-sm text-muted-foreground">{a}</AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </Reveal>
      </div>
    </section>
  );
}
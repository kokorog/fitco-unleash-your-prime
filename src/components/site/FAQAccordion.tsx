import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQAccordion({ items }: { items: ReadonlyArray<{ q: string; a: string }> }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((it, i) => (
        <AccordionItem key={i} value={`q-${i}`} className="border-border">
          <AccordionTrigger className="text-left text-base font-medium">{it.q}</AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">{it.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

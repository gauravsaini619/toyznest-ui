import type { FaqItem } from "@/lib/types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function ProductFaq({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section className="section-padding bg-white">
      <div className="content-shell reading-column mx-auto">
        <h2 className="tn-display-xl mb-10 text-center text-ink normal-case">FAQs</h2>
        <Accordion type="single" collapsible defaultValue={faqs[0]?.question}>
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="py-4 text-base font-bold text-ink">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="tn-body text-ink-muted">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

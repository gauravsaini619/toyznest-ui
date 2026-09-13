import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQs",
};

const FAQS = [
  {
    question: "How do you decide what's on the site?",
    answer:
      "Every toy is reviewed by a panel of parents and occupational therapists for genuine stage-fit and safety before it's listed — not just picked because it sells.",
  },
  {
    question: "Are all toys BIS certified?",
    answer:
      "Yes, every listing is BIS and CE certified, with materials lab-tested for lead, phthalates and BPA.",
  },
  {
    question: "What are your delivery options?",
    answer:
      "Same-day in Delhi/NCR on orders placed before 2 PM; 2–4 working days pan-India. Free above ₹1,200.",
  },
  {
    question: "Can I pay cash on delivery?",
    answer:
      "Yes, COD is available on most pincodes with a ₹10 handling fee. Prepaid orders (UPI, cards, netbanking) don't carry this fee.",
  },
  {
    question: "What's your return policy?",
    answer:
      "7 days from delivery, unused and in original packaging. We collect the return from your door — no courier drop-off needed.",
  },
  {
    question: "How do I track my order?",
    answer:
      "From My account → Orders, or via the tracking link sent by email and SMS once your order ships.",
  },
  {
    question: "Do you offer gift wrapping?",
    answer:
      "Yes, free gift wrap on every kit, and a gift note option at checkout.",
  },
  {
    question: "Do you deliver outside India?",
    answer:
      "Not yet — we currently ship within India only.",
  },
];

export default function FaqsPage() {
  return (
    <>
      <PageHeader title="FAQs" breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]} />
      <div className="content-shell reading-column pb-16">
        <Accordion type="single" collapsible>
          {FAQS.map((faq) => (
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
    </>
  );
}

import { Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const ITEMS = [
  {
    title: "Thoughtfully Picked",
    description: "We choose toys worth bringing home.",
  },
  {
    title: "Safe to Play",
    description: "Age-appropriate toys from trusted makers.",
  },
  {
    title: "Play with Purpose",
    description: "Fun that encourages curiosity, creativity and growth.",
  },
  {
    title: "Easy Shopping",
    description: "Fast delivery and hassle-free returns.",
  },
];

export function TrustRow() {
  return (
    <section className="section-padding bg-cream">
      <div className="content-shell">
        <SectionHeading title="why parents choose toyznest" className="mb-10" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ title, description }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-emerald text-white">
                <Check className="size-3.5" aria-hidden />
              </span>
              <div>
                <p className="tn-product-name text-base text-navy normal-case">{title}</p>
                <p className="tn-body mt-1 text-ink-muted">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ShieldCheck, Users, Repeat, Heart } from "lucide-react";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Safety, non-negotiable",
    description:
      "Every toy is BIS/CE certified, non-toxic tested, and reviewed by our panel before it's listed.",
  },
  {
    icon: Users,
    title: "Curated by real parents",
    description:
      "Our picks come from a small team of parents and occupational therapists, not a sourcing algorithm.",
  },
  {
    icon: Repeat,
    title: "Built to be handed down",
    description:
      "We favour solid materials over trend-chasing plastic — toys that survive a second and third kid.",
  },
  {
    icon: Heart,
    title: "Stage over age",
    description:
      "Every recommendation is matched to a developmental stage, not just a number printed on a box.",
  },
];

export function ValuesGrid() {
  return (
    <section id="panel" className="section-padding bg-cream">
      <div className="content-shell">
        <p className="tn-label mb-3 text-accent-red">What we believe</p>
        <h2 className="tn-display-l mb-10 max-w-xl text-navy">
          four rules we don&apos;t compromise on
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="border-t-2 border-navy/15 pt-5">
              <Icon className="size-6 text-accent-red" aria-hidden />
              <h3 className="tn-product-name mt-3 text-lg text-navy normal-case">
                {title}
              </h3>
              <p className="tn-body mt-2 text-ink-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

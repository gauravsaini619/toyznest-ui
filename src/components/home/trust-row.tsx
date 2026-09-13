import { ShieldCheck, Sparkles, Target } from "lucide-react";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "Safety first",
    description: "Every toy is BIS/CE certified and non-toxic tested.",
  },
  {
    icon: Sparkles,
    title: "Hand-curated",
    description: "Picked by parents and occupational therapists, not algorithms.",
  },
  {
    icon: Target,
    title: "Matched to stage",
    description: "Recommendations track development, not just birthdays.",
  },
];

export function TrustRow() {
  return (
    <section className="section-padding bg-cream">
      <div className="content-shell flex flex-col flex-wrap gap-10 sm:flex-row sm:justify-between">
        {ITEMS.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex max-w-sm items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-emerald text-white">
              <Icon className="size-5" aria-hidden />
            </span>
            <div>
              <p className="tn-product-name text-base text-navy normal-case">
                {title}
              </p>
              <p className="tn-body mt-1 text-ink-muted">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

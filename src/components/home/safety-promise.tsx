import { Shield, Leaf, Truck, RotateCcw } from "lucide-react";
import { FOOTER_PROMISE_ITEMS } from "@/lib/data/nav";
import { SectionHeading } from "@/components/shared/section-heading";

const PROMISE_ICONS = { shield: Shield, leaf: Leaf, truck: Truck, returns: RotateCcw };

/** Reuses the same promise copy as the footer's bar — the certifications don't change, only where they're shown. */
export function SafetyPromise() {
  return (
    <section className="section-padding bg-white">
      <div className="content-shell">
        <SectionHeading title="our safety promise" className="mb-10" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FOOTER_PROMISE_ITEMS.map((item) => {
            const Icon = PROMISE_ICONS[item.icon];
            return (
              <div
                key={item.title}
                className="flex items-center gap-3 border border-hairline bg-cream p-5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="tn-product-name text-sm text-navy normal-case">{item.title}</p>
                  <p className="tn-meta mt-0.5">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

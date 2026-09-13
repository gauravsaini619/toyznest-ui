import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/testimonials";
import { SectionHeading } from "@/components/shared/section-heading";

export function Testimonials() {
  return (
    <section className="section-padding bg-navy">
      <div className="content-shell">
        <SectionHeading
          title="loved by families across delhi/ncr"
          onNavy
          className="mb-10"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <figure key={t.id} className="flex flex-col gap-4 border border-white/15 p-6">
              <div className="flex gap-0.5 text-star" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="tn-body text-white/90 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto">
                <p className="tn-product-name text-base text-white normal-case">
                  {t.author}
                </p>
                <p className="tn-meta text-white/60">
                  {t.location} · {t.childAge}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

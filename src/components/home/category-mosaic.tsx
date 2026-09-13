import Link from "next/link";
import { CATEGORIES } from "@/lib/data/categories";
import { SURFACE_BG, SURFACE_INK } from "@/lib/surface";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { SectionHeading } from "@/components/shared/section-heading";

/**
 * Every span uses an explicit aspect-ratio rather than CSS Grid row-span +
 * auto height — row-span combined with an unconstrained row track collapses
 * to the shortest content in the row (just the label), not the intended
 * tile height. Aspect-ratio sidesteps that entirely.
 */
const SPAN_CLASS: Record<string, string> = {
  hero: "col-span-6 sm:col-span-3 lg:col-span-4 aspect-[16/9]",
  tall: "col-span-6 sm:col-span-3 lg:col-span-2 aspect-[4/3] lg:aspect-[3/4]",
  medium: "col-span-3 sm:col-span-2 lg:col-span-2 aspect-[4/3]",
  wide: "col-span-6 aspect-[16/9] lg:aspect-[21/9]",
};

export function CategoryMosaic() {
  return (
    <section className="section-padding bg-cream">
      <div className="content-shell">
        <SectionHeading
          title="find their favourite"
          viewAllHref="/collection"
          className="mb-10"
        />
        <div className="grid grid-cols-6 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className={`group relative block overflow-hidden ${SPAN_CLASS[category.span]} ${SURFACE_BG[category.surface]}`}
            >
              <PlaceholderMedia
                label={category.placeholderLabel}
                className="bg-black/10 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end p-5">
                <span
                  className={`tn-product-name text-lg ${SURFACE_INK[category.surface]}`}
                >
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

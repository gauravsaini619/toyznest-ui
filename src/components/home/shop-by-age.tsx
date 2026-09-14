import Link from "next/link";
import { AGE_BANDS } from "@/lib/data/age-bands";
import { SURFACE_BG, SURFACE_INK, SURFACE_MUTED_INK } from "@/lib/surface";
import type { AccentSurface } from "@/lib/types";
import { SectionHeading } from "@/components/shared/section-heading";

const SURFACE_ROTATION: AccentSurface[] = [
  "navy",
  "cobalt",
  "emerald",
  "yellow",
  "violet",
  "magenta",
  "red",
];

/**
 * One of the most important homepage sections (Design brief): a full-width
 * card per age band, from newborn through "10+" — the top band exists to
 * signal, on its own, that Toyznest isn't only a baby/toddler shop.
 */
export function ShopByAge() {
  return (
    <section className="section-padding bg-cream">
      <div className="content-shell">
        <SectionHeading
          title="find their perfect fit"
          subtitle="Great play starts with the right age."
          className="mb-10"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {AGE_BANDS.map((band, i) => {
            const surface = SURFACE_ROTATION[i % SURFACE_ROTATION.length];
            return (
              <Link
                key={band.id}
                href={`/collection?age=${band.id}`}
                className={`group flex aspect-[3/4] flex-col justify-between p-4 transition-transform hover:-translate-y-1 ${SURFACE_BG[surface]}`}
              >
                <span className={`tn-display-m ${SURFACE_INK[surface]}`}>
                  {band.shortLabel}
                </span>
                <div>
                  <p className={`tn-product-name text-sm normal-case ${SURFACE_INK[surface]}`}>
                    {band.stageName}
                  </p>
                  <p className={`text-xs ${SURFACE_MUTED_INK[surface]}`}>{band.rangeLabel}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

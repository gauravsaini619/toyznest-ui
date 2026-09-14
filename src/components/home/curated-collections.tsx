import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CURATED_COLLECTIONS } from "@/lib/data/curated-collections";
import { SURFACE_BG, SURFACE_INK, SURFACE_MUTED_INK } from "@/lib/surface";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { SectionHeading } from "@/components/shared/section-heading";

export function CuratedCollections() {
  return (
    <section className="section-padding bg-white">
      <div className="content-shell">
        <SectionHeading
          title="curated collections"
          subtitle="Picked for the moment."
          className="mb-10"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {CURATED_COLLECTIONS.map((collection) => (
            <Link
              key={collection.title}
              href={collection.href}
              className={`group relative block aspect-[16/10] overflow-hidden ${SURFACE_BG[collection.surface]}`}
            >
              <PlaceholderMedia
                label={collection.placeholderLabel}
                className="bg-black/10 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className={`tn-display-m normal-case ${SURFACE_INK[collection.surface]}`}>
                  {collection.title}
                </span>
                <span className={`mt-1 text-sm ${SURFACE_MUTED_INK[collection.surface]}`}>
                  {collection.description}
                </span>
                <span
                  className={`tn-label mt-4 inline-flex w-fit items-center gap-1.5 ${SURFACE_INK[collection.surface]}`}
                >
                  {collection.ctaLabel}
                  <ArrowRight className="size-3.5" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

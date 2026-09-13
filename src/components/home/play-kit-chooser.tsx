import Link from "next/link";
import { PLAY_KITS } from "@/lib/data/play-kits";
import { SURFACE_BG, SURFACE_INK, SURFACE_MUTED_INK } from "@/lib/surface";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { SectionHeading } from "@/components/shared/section-heading";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function PlayKitChooser() {
  return (
    <section className="section-padding bg-sand">
      <div className="content-shell">
        <SectionHeading
          title="not sure where to start? pick a kit"
          className="mb-10"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLAY_KITS.map((kit) => (
            <div
              key={kit.id}
              className={`flex flex-col ${SURFACE_BG[kit.surface]}`}
            >
              <div className="aspect-square w-full">
                <PlaceholderMedia label={kit.placeholderLabel} className="bg-black/10" />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className={`tn-product-name text-lg ${SURFACE_INK[kit.surface]}`}>
                  {kit.name}
                </p>
                <p className={`tn-body text-sm ${SURFACE_MUTED_INK[kit.surface]}`}>
                  {kit.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className={`tn-price text-lg ${SURFACE_INK[kit.surface]}`}>
                    {formatINR(kit.priceInPaise)}
                  </span>
                  <span className={`tn-meta ${SURFACE_MUTED_INK[kit.surface]}`}>
                    {kit.itemCount} toys
                  </span>
                </div>
                <Button
                  variant="onNavy"
                  size="sm"
                  className="mt-2 w-full bg-white text-navy hover:bg-cream"
                  asChild
                >
                  <Link href={`/collection?kit=${kit.id}`}>
                    Explore kit
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

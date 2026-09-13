import type { Metadata } from "next";
import Link from "next/link";
import { Gift } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { PLAY_KITS } from "@/lib/data/play-kits";
import { SURFACE_BG, SURFACE_INK, SURFACE_MUTED_INK } from "@/lib/surface";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Gifting",
};

const OCCASIONS = [
  { label: "Birthday gifts", href: "/collection?sort=bestsellers" },
  { label: "New baby gifts", href: "/collection?age=0-6m" },
  { label: "Gifts under ₹999", href: "/collection?sort=price-asc" },
];

export default function GiftingPage() {
  return (
    <>
      <PageHeader title="Gifting" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gifting" }]} />

      <div className="content-shell pb-4">
        <p className="tn-body-l max-w-lg text-ink-muted">
          Free gift wrap on every order, plus an optional gift note at
          checkout. Not sure what to pick? Start with an occasion below.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {OCCASIONS.map((occasion) => (
            <Link
              key={occasion.label}
              href={occasion.href}
              className="flex items-center gap-2 border border-navy px-4 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              <Gift className="size-4" aria-hidden />
              {occasion.label}
            </Link>
          ))}
        </div>
      </div>

      <section className="section-padding">
        <div className="content-shell">
          <h2 className="tn-display-l mb-8 text-navy">gift kits</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PLAY_KITS.map((kit) => (
              <div key={kit.id} className={`flex flex-col ${SURFACE_BG[kit.surface]}`}>
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
                    <Link href={`/collection?kit=${kit.id}`}>Explore kit</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

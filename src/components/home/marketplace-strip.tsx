import Image from "next/image";
import { MARKETPLACES } from "@/lib/data/testimonials";

export function MarketplaceStrip() {
  return (
    <section className="bg-cream py-10">
      <div className="content-shell flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <p className="tn-label shrink-0 text-ink-muted">Also available on</p>
        <div className="grid w-full grid-cols-2 items-stretch gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {MARKETPLACES.map((m) =>
            m.logoSrc ? (
              <a
                key={m.id}
                href={m.href}
                aria-label={m.name}
                className="flex h-14 items-center justify-center overflow-hidden border border-hairline transition-colors hover:border-navy"
              >
                <Image
                  src={m.logoSrc}
                  alt={m.name}
                  width={120}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </a>
            ) : (
              <a
                key={m.id}
                href={m.href}
                className="flex h-14 items-center justify-center border border-hairline px-2 text-center text-sm font-bold text-ink-muted transition-colors hover:border-navy hover:text-navy"
              >
                {m.name}
              </a>
            )
          )}
        </div>
      </div>
    </section>
  );
}

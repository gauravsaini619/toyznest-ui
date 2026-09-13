import { Play } from "lucide-react";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";

export function WarehouseVideo() {
  return (
    <section className="section-padding bg-sand">
      <div className="content-shell grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="reading-column order-2 lg:order-1">
          <h2 className="tn-display-l mb-4 text-navy">
            every order, packed by hand
          </h2>
          <p className="tn-body-l text-ink-muted">
            A look inside our Delhi/NCR warehouse — where every toy is
            inspected, gift-wrapped on request, and packed the same day it
            ships.
          </p>
        </div>
        <button
          type="button"
          aria-label="Play warehouse video"
          className="group relative order-1 aspect-video w-full overflow-hidden lg:order-2"
        >
          <PlaceholderMedia label="warehouse packing floor · 16:9" />
          <span className="absolute inset-0 flex items-center justify-center bg-navy/20 transition-colors group-hover:bg-navy/30">
            <span className="flex size-16 items-center justify-center rounded-full bg-white text-navy shadow-hover transition-transform group-hover:scale-105">
              <Play className="size-6 translate-x-0.5 fill-current" aria-hidden />
            </span>
          </span>
        </button>
      </div>
    </section>
  );
}

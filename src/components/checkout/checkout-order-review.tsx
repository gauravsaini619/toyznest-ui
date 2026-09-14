import { ClipboardList } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatINR } from "@/lib/format";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";

export function CheckoutOrderReview({
  lines,
}: {
  lines: { product: Product; quantity: number }[];
}) {
  return (
    <section className="border border-hairline bg-white p-6">
      <h2 className="tn-label mb-4 flex items-center gap-2 text-ink-muted">
        <ClipboardList className="size-4" aria-hidden />
        Order review
      </h2>
      <div className="flex flex-col gap-4">
        {lines.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center gap-4">
            <div className="size-16 shrink-0 overflow-hidden">
              <PlaceholderMedia label={product.placeholderLabel} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-ink">{product.name}</p>
              <p className="tn-meta">Qty {quantity}</p>
            </div>
            <span className="text-sm font-bold text-ink">
              {formatINR((product.priceInPaise ?? 0) * quantity)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

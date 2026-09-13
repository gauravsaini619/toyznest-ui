import type { Order } from "@/lib/types";
import { formatINR } from "@/lib/format";
import { formatOrderDate } from "@/lib/data/orders";
import { SURFACE_BG } from "@/lib/surface";
import { OrderStatusBadge } from "@/components/account/order-status-badge";
import { Button } from "@/components/ui/button";

export function OrderCard({ order }: { order: Order }) {
  const isCancelled = order.status === "cancelled";

  return (
    <article className="border border-hairline bg-white">
      <div className="flex flex-wrap items-center gap-4 p-5 sm:px-6">
        <span className="tn-product-name text-lg text-navy normal-case">
          {order.orderNumber}
        </span>
        <span className="tn-meta">{formatOrderDate(order.placedAt)}</span>
        <OrderStatusBadge status={order.status} />
        <span className="tn-price ml-auto text-lg text-navy">
          {formatINR(order.totalInPaise)}
        </span>
      </div>

      <div className="border-t border-hairline" />

      <div className="flex flex-wrap items-center gap-5 p-5 sm:px-6">
        <div className="flex shrink-0 -space-x-1">
          {order.items.map((item, i) => (
            <span
              key={i}
              aria-hidden
              className={`size-14 border-2 border-white ${SURFACE_BG[item.surface]} ${
                isCancelled ? "grayscale opacity-50" : ""
              }`}
            />
          ))}
        </div>

        <p className="tn-body flex-1 text-ink">
          {order.items.map((item) => item.name).join(", ")}
        </p>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Button variant="secondary" size="sm">
            {order.secondaryAction}
          </Button>
          <Button variant="primary" size="sm">
            Buy again
          </Button>
        </div>
      </div>
    </article>
  );
}

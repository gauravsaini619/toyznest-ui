import type { OrderStatus } from "@/lib/types";

const STATUS_CONFIG: Record<OrderStatus, { label: string; className: string }> = {
  out_for_delivery: {
    label: "Out for delivery",
    className: "bg-navy text-white",
  },
  delivered: {
    label: "Delivered",
    className: "bg-success/10 text-success",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-sand text-ink-muted",
  },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`tn-label px-3 py-1.5 ${config.className}`}>
      {config.label}
    </span>
  );
}

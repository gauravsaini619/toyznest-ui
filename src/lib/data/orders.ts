import type { Order } from "@/lib/types";

/**
 * Mock order history for the account area. Shaped to match the `orders`
 * table in `convex/schema.ts` — swap for `fetchQuery(api.orders.forUser)`
 * once auth + Convex are wired up.
 */
export const MOCK_ORDERS: Order[] = [
  {
    id: "o1",
    orderNumber: "#TN-2419",
    placedAt: "2026-09-14",
    status: "out_for_delivery",
    totalInPaise: 164800,
    items: [
      { name: "Wooden stacking rings", surface: "navy" },
      { name: "Sensory ball set", surface: "violet" },
    ],
    secondaryAction: "Track order",
  },
  {
    id: "o2",
    orderNumber: "#TN-2288",
    placedAt: "2026-08-27",
    status: "delivered",
    totalInPaise: 209700,
    items: [
      { name: "Shape sorter cube", surface: "emerald" },
      { name: "First cloth books", surface: "red" },
      { name: "Teether set", surface: "cobalt" },
    ],
    secondaryAction: "Write a review",
  },
  {
    id: "o3",
    orderNumber: "#TN-2104",
    placedAt: "2026-08-02",
    status: "delivered",
    totalInPaise: 89900,
    items: [{ name: "Montessori busy board", surface: "magenta" }],
    secondaryAction: "Return or exchange",
  },
  {
    id: "o4",
    orderNumber: "#TN-1970",
    placedAt: "2026-07-19",
    status: "cancelled",
    totalInPaise: 129900,
    items: [{ name: "Pull-along duck — cancelled by you", surface: "navy" }],
    secondaryAction: "View invoice",
  },
];

export function formatOrderDate(iso: string): string {
  const date = new Date(iso + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

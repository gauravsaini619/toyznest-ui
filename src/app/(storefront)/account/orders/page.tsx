import type { Metadata } from "next";
import { OrderCard } from "@/components/account/order-card";
import { MOCK_ORDERS } from "@/lib/data/orders";

export const metadata: Metadata = {
  title: "Orders",
};

export default function OrdersPage() {
  return (
    <div>
      <h2 className="tn-display-m mb-6 text-navy">orders</h2>
      <div className="flex flex-col gap-4">
        {MOCK_ORDERS.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OrderCard } from "@/components/account/order-card";
import { MOCK_ORDERS } from "@/lib/data/orders";

export const metadata: Metadata = {
  title: "My account",
};

export default function AccountOverviewPage() {
  const recentOrders = MOCK_ORDERS.slice(0, 2);

  return (
    <div className="flex flex-col gap-10">
      <section>
        <div className="mb-5 flex items-end justify-between">
          <h2 className="tn-display-m text-navy">recent orders</h2>
          <Link
            href="/account/orders"
            className="tn-label inline-flex items-center gap-1.5 text-navy hover:underline"
          >
            View all
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {recentOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { CheckoutContent } from "@/components/checkout/checkout-content";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ buyNow?: string; qty?: string }>;
}) {
  const { buyNow, qty } = await searchParams;

  return (
    <>
      <PageHeader
        title="Checkout"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />
      <CheckoutContent
        buyNowProductId={buyNow}
        buyNowQuantity={qty ? Math.max(1, parseInt(qty, 10) || 1) : 1}
      />
    </>
  );
}

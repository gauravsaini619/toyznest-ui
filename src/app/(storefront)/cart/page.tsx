import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { CartContent } from "@/components/cart/cart-content";

export const metadata: Metadata = {
  title: "Your cart",
};

export default function CartPage() {
  return (
    <>
      <PageHeader title="Your cart" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <CartContent />
    </>
  );
}

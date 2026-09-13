import type { Metadata } from "next";
import { CheckoutAddress } from "@/components/checkout/checkout-address";

export const metadata: Metadata = {
  title: "Addresses",
};

export default function AddressesPage() {
  return (
    <div>
      <h2 className="tn-display-m mb-6 text-navy">addresses</h2>
      <div className="max-w-lg">
        <CheckoutAddress />
      </div>
    </div>
  );
}

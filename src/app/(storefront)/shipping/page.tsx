import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/shared/info-page";

export const metadata: Metadata = {
  title: "Shipping & delivery",
};

export default function ShippingPage() {
  return (
    <InfoPage title="Shipping & delivery">
      <InfoSection heading="Delhi/NCR — same-day">
        <p>
          Orders placed before 2 PM on any pincode within Delhi/NCR are
          delivered the same day. Free on orders above ₹1,200; a small
          delivery fee applies below that.
        </p>
      </InfoSection>

      <InfoSection heading="Rest of India — 2–4 days">
        <p>
          We ship pan-India. Most pincodes see delivery within 2–4 working
          days of dispatch. Enter your pincode on any product page to check
          the estimate for your area before you order.
        </p>
      </InfoSection>

      <InfoSection heading="Order tracking">
        <p>
          Once your order ships, you&apos;ll get a tracking link by email and
          SMS. You can also check status any time from{" "}
          <a href="/account/orders" className="text-navy underline">
            My account → Orders
          </a>
          .
        </p>
      </InfoSection>

      <InfoSection heading="Cash on delivery">
        <p>
          COD is available on most pincodes, with a ₹10 handling fee added at
          checkout. Prepaid orders (UPI, cards, netbanking) never carry this
          fee.
        </p>
      </InfoSection>
    </InfoPage>
  );
}

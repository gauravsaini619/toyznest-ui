import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/shared/info-page";

export const metadata: Metadata = {
  title: "Returns & refunds",
};

export default function ReturnsPage() {
  return (
    <InfoPage title="Returns & refunds">
      <InfoSection heading="7-day returns">
        <p>
          If a toy doesn&apos;t land well, you can return it within 7 days of
          delivery — unused and in its original packaging. Head to{" "}
          <a href="/account/orders" className="text-navy underline">
            My account → Orders
          </a>{" "}
          and select &ldquo;Return or exchange&rdquo; on the order.
        </p>
      </InfoSection>

      <InfoSection heading="Pickup, not drop-off">
        <p>
          We collect the return from your door — no need to visit a courier
          office. A pickup is usually scheduled within 2 days of your
          request.
        </p>
      </InfoSection>

      <InfoSection heading="Refund timelines">
        <p>
          Once we&apos;ve received and inspected the return, refunds are
          issued to your original payment method within 5–7 working days.
          COD orders are refunded via bank transfer or store credit.
        </p>
      </InfoSection>

      <InfoSection heading="What can't be returned">
        <p>
          Personalised items and toys that arrive used or without original
          packaging can&apos;t be accepted back. If a toy arrived damaged or
          defective, that&apos;s always covered — email{" "}
          <a href="mailto:care@toyznest.in" className="text-navy underline">
            care@toyznest.in
          </a>{" "}
          with photos and your order number.
        </p>
      </InfoSection>
    </InfoPage>
  );
}

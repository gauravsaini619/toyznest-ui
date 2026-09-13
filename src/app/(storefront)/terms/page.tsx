import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/shared/info-page";

export const metadata: Metadata = {
  title: "Terms of service",
};

export default function TermsPage() {
  return (
    <InfoPage title="Terms of service" breadcrumbLabel="Terms">
      <p className="tn-meta">Last updated: September 2026</p>

      <InfoSection heading="Orders & pricing">
        <p>
          All prices are listed in Indian Rupees and inclusive of applicable
          taxes. We reserve the right to correct pricing errors and to
          cancel an order placed at an incorrect price, with a full refund.
        </p>
      </InfoSection>

      <InfoSection heading="Payments">
        <p>
          We accept UPI, major cards, netbanking, and cash on delivery
          (subject to a ₹10 handling fee) on eligible pincodes.
        </p>
      </InfoSection>

      <InfoSection heading="Shipping & returns">
        <p>
          See our{" "}
          <a href="/shipping" className="text-navy underline">
            Shipping &amp; delivery
          </a>{" "}
          and{" "}
          <a href="/returns" className="text-navy underline">
            Returns &amp; refunds
          </a>{" "}
          pages for full policy details, which form part of these terms.
        </p>
      </InfoSection>

      <InfoSection heading="Account use">
        <p>
          You&apos;re responsible for keeping your account credentials secure. We
          may suspend accounts used for fraudulent orders or abuse of our
          return policy.
        </p>
      </InfoSection>

      <InfoSection heading="Contact">
        <p>
          Toyznest Retail Pvt. Ltd., B-42, Sector 63, Ghaziabad, Uttar
          Pradesh – 201301. Email{" "}
          <a href="mailto:care@toyznest.in" className="text-navy underline">
            care@toyznest.in
          </a>{" "}
          with any questions about these terms.
        </p>
      </InfoSection>
    </InfoPage>
  );
}

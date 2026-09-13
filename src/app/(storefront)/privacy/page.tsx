import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/shared/info-page";

export const metadata: Metadata = {
  title: "Privacy policy",
};

export default function PrivacyPage() {
  return (
    <InfoPage title="Privacy policy" breadcrumbLabel="Privacy">
      <p className="tn-meta">Last updated: September 2026</p>

      <InfoSection heading="What we collect">
        <p>
          When you shop with us, we collect what&apos;s needed to fulfil your
          order: name, phone number, email, delivery address, and order
          history. If you take our quiz or sign up for emails, we also store
          your child&apos;s birth month/year to personalise recommendations —
          this field is always optional.
        </p>
      </InfoSection>

      <InfoSection heading="How we use it">
        <ul className="list-disc pl-5">
          <li>To process and deliver your orders</li>
          <li>To send order updates, and — only if you opt in — activity ideas and offers</li>
          <li>To improve stage-based product recommendations</li>
        </ul>
        <p>We do not sell your personal data to third parties.</p>
      </InfoSection>

      <InfoSection heading="Who we share it with">
        <p>
          Only the delivery partners and payment processors needed to
          complete your order. Each is bound to use your data solely for
          that purpose.
        </p>
      </InfoSection>

      <InfoSection heading="Your rights">
        <p>
          You can request a copy of your data, ask us to correct it, or
          delete your account entirely by emailing{" "}
          <a href="mailto:care@toyznest.in" className="text-navy underline">
            care@toyznest.in
          </a>
          .
        </p>
      </InfoSection>
    </InfoPage>
  );
}

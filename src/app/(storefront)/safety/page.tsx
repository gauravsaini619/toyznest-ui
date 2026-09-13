import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/shared/info-page";

export const metadata: Metadata = {
  title: "Safety promise",
};

export default function SafetyPage() {
  return (
    <InfoPage title="Safety promise">
      <InfoSection heading="Certified, not just claimed">
        <p>
          Every toy listed on Toyznest is BIS (Bureau of Indian Standards)
          certified and CE tested before it goes live. We don&apos;t take a
          supplier&apos;s word for it — certificates are verified and kept on
          file for every SKU.
        </p>
      </InfoSection>

      <InfoSection heading="What we test for">
        <ul className="list-disc pl-5">
          <li>Lead, phthalates and BPA in every material that can be mouthed</li>
          <li>Small-part and choking-hazard sizing, matched to the stated age</li>
          <li>Edge and joint safety on all wooden and rubberwood toys</li>
          <li>Paint and dye — water-based and non-toxic only, no exceptions</li>
        </ul>
      </InfoSection>

      <InfoSection heading="Our panel">
        <p>
          Before a toy is listed, it&apos;s reviewed by our panel of parents
          and occupational therapists for genuine stage-fit — not just
          whether it&apos;s safe, but whether it actually does what the
          listing claims for that developmental stage.
        </p>
      </InfoSection>

      <InfoSection heading="If something's wrong">
        <p>
          If a toy ever arrives damaged or you have a safety concern, email{" "}
          <a href="mailto:care@toyznest.in" className="text-navy underline">
            care@toyznest.in
          </a>{" "}
          with your order number — we investigate every report and pull the
          listing if needed.
        </p>
      </InfoSection>
    </InfoPage>
  );
}

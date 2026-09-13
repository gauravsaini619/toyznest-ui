import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/shared/info-page";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Bulk & corporate orders",
};

export default function BulkOrdersPage() {
  return (
    <InfoPage title="Bulk & corporate orders">
      <InfoSection heading="For schools, clinics and gifting programs">
        <p>
          We work with preschools, pediatric clinics, and companies putting
          together new-parent or festival gift boxes. Volume pricing kicks
          in above 20 units, with custom packaging and gift notes available
          on larger orders.
        </p>
      </InfoSection>

      <InfoSection heading="How it works">
        <ul className="list-disc pl-5">
          <li>Tell us the age range, budget and quantity you have in mind</li>
          <li>We put together a shortlist and a quote within 2 working days</li>
          <li>One invoice, one delivery window, GST invoicing included</li>
        </ul>
      </InfoSection>

      <InfoSection heading="Get in touch">
        <p>
          Email{" "}
          <a href="mailto:care@toyznest.in" className="text-navy underline">
            care@toyznest.in
          </a>{" "}
          with &ldquo;Bulk order&rdquo; in the subject line, or call 0120 4567
          890 — a real person picks up.
        </p>
        <Button className="mt-2 w-fit" asChild>
          <a href="mailto:care@toyznest.in">Email us</a>
        </Button>
      </InfoSection>
    </InfoPage>
  );
}

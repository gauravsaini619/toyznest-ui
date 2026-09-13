import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/shared/info-page";

export const metadata: Metadata = {
  title: "Cookie policy",
};

export default function CookiesPage() {
  return (
    <InfoPage title="Cookie policy" breadcrumbLabel="Cookies">
      <p className="tn-meta">Last updated: September 2026</p>

      <InfoSection heading="What cookies do here">
        <p>
          We use cookies and similar browser storage to keep your cart and
          wishlist saved between visits, remember your session, and
          understand which pages are actually useful so we can improve
          them.
        </p>
      </InfoSection>

      <InfoSection heading="Types we use">
        <ul className="list-disc pl-5">
          <li>
            <span className="font-semibold text-ink">Essential</span> — cart,
            wishlist and session state. The site doesn&apos;t work properly
            without these.
          </li>
          <li>
            <span className="font-semibold text-ink">Analytics</span> — page
            views and clicks, used in aggregate, never tied to your name.
          </li>
        </ul>
      </InfoSection>

      <InfoSection heading="Managing cookies">
        <p>
          Most browsers let you block or clear cookies in settings. Blocking
          essential cookies will mean your cart and wishlist won&apos;t
          persist between visits.
        </p>
      </InfoSection>
    </InfoPage>
  );
}

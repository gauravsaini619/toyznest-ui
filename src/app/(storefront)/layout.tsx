import { TopTicker } from "@/components/layout/top-ticker";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/**
 * Shared chrome for customer-facing storefront pages (home, account, and
 * future pages like collection/cart/checkout). Routes that shouldn't show
 * the ticker/header/footer — an auth flow, say — live outside this group.
 */
export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopTicker />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

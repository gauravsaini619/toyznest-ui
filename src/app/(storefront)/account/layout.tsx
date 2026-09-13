import { AccountHero } from "@/components/account/account-hero";
import { AccountSidebar } from "@/components/account/account-sidebar";
import { MOCK_ACCOUNT } from "@/lib/data/account";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AccountHero profile={MOCK_ACCOUNT} />
      <div className="content-shell flex flex-col gap-8 py-10 lg:flex-row lg:gap-10 lg:py-14">
        <AccountSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </>
  );
}

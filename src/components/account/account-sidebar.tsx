"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  User,
  Package,
  Heart,
  MapPin,
  Settings,
} from "lucide-react";
import { MOCK_ACCOUNT } from "@/lib/data/account";
import { useWishlist } from "@/lib/wishlist-context";

export function AccountSidebar() {
  const pathname = usePathname();
  const { count: wishlistCount } = useWishlist();

  const navItems = [
    { label: "Overview", href: "/account", icon: LayoutGrid },
    {
      label: "Play profiles",
      href: "/account/play-profiles",
      icon: User,
      count: MOCK_ACCOUNT.stats.playProfiles,
    },
    {
      label: "Orders",
      href: "/account/orders",
      icon: Package,
      count: MOCK_ACCOUNT.stats.orders,
    },
    {
      label: "Wishlist",
      href: "/account/wishlist",
      icon: Heart,
      count: wishlistCount,
    },
    { label: "Addresses", href: "/account/addresses", icon: MapPin },
    { label: "Settings", href: "/account/settings", icon: Settings },
  ];

  return (
    <aside className="lg:w-72 lg:shrink-0">
      <nav aria-label="Account" className="flex flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 px-4 py-3 text-[15px] font-semibold transition-colors ${
                active
                  ? "bg-navy text-white"
                  : "text-navy hover:bg-white"
              }`}
            >
              <Icon className="size-5 shrink-0" aria-hidden />
              <span className="flex-1">{item.label}</span>
              {item.count !== undefined && (
                <span
                  className={`text-xs font-bold px-2 py-0.5 ${
                    active ? "bg-white text-navy" : "bg-sand text-ink-muted"
                  }`}
                >
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 border-l-4 border-success bg-success/10 p-5">
        <p className="tn-product-name text-base text-navy normal-case">
          ₹200 off your next order
        </p>
        <p className="tn-body mt-1.5 text-ink-muted">
          Refer a parent friend — they get 10% off, you get ₹200.
        </p>
        <button
          type="button"
          className="text-sm font-bold text-navy underline underline-offset-2 mt-3 inline-block"
        >
          Share your code
        </button>
      </div>
    </aside>
  );
}

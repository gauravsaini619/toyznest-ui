"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, User, Heart, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { PRIMARY_NAV, MEGA_MENUS } from "@/lib/data/nav";
import { AGE_BANDS } from "@/lib/data/age-bands";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useAuth } from "@/lib/auth-context";
import { toTitleCase } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** "Shop" gets the full-bleed multi-column mega panel; every other menu-bearing label is a single-column list, better suited to the compact Radix dropdown. */
const MEGA_PANEL_LABEL = "Shop";

function firstName(fullName: string): string {
  return toTitleCase(fullName.trim().split(/\s+/)[0] ?? "");
}

export function SiteHeader() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { itemCount: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { isLoggedIn, profile, openLogin } = useAuth();

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/collection?q=${encodeURIComponent(trimmed)}` : "/collection");
  }

  function openMegaPanel() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }

  function scheduleCloseMegaPanel() {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-white">
      <div className="content-shell flex h-16 items-center gap-4 lg:h-20">
        <Logo heightClassName="h-7 lg:h-8" />

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-8 lg:flex"
        >
          {PRIMARY_NAV.map((item) => {
            const menu = MEGA_MENUS[item.label];

            if (item.label === MEGA_PANEL_LABEL && menu) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-1 text-[15px] font-semibold text-ink transition-colors hover:text-navy"
                  onMouseEnter={openMegaPanel}
                  onFocus={openMegaPanel}
                  onMouseLeave={scheduleCloseMegaPanel}
                >
                  {item.label}
                  <ChevronDown className="size-3.5" aria-hidden />
                </Link>
              );
            }

            if (menu) {
              return (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 text-[15px] font-semibold text-ink transition-colors hover:text-navy">
                      {item.label}
                      <ChevronDown className="size-3.5" aria-hidden />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="min-w-56">
                    {menu.columns[0].links.map((link) => (
                      <DropdownMenuItem key={link.label} asChild>
                        <Link href={link.href}>{link.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className="text-[15px] font-semibold text-ink transition-colors hover:text-navy"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-6 lg:gap-5">
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden md:block md:w-56 lg:w-72 xl:w-96"
          >
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-ink-muted"
              aria-hidden
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search toys, ages, interests…"
              aria-label="Search toys, ages, interests…"
              className="h-11 rounded-full border-none bg-sand pl-11 focus-visible:ring-2 focus-visible:ring-navy/15"
            />
          </form>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Search"
            className="md:hidden"
            onClick={() => setSearchOpen((open) => !open)}
          >
            <Search className="size-5" />
          </Button>

          <Link
            href="/account"
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                openLogin();
              }
            }}
            className="flex flex-col items-center gap-0.5 text-ink transition-colors hover:text-navy"
          >
            <User className="size-5" aria-hidden />
            <span className="hidden text-[11px] font-semibold sm:block">
              {isLoggedIn && profile ? firstName(profile.name) : "Profile"}
            </span>
          </Link>

          <Link
            href="/account/wishlist"
            aria-label={`Wishlist, ${wishlistCount} items`}
            className="flex flex-col items-center gap-0.5 text-ink transition-colors hover:text-navy"
          >
            <span className="relative">
              <Heart className="size-5" aria-hidden />
              {wishlistCount > 0 && (
                <span
                  aria-hidden
                  className="absolute -top-1.5 -right-2 flex size-4 items-center justify-center rounded-full bg-accent-red text-[10px] font-bold text-white"
                >
                  {wishlistCount}
                </span>
              )}
            </span>
            <span className="hidden text-[11px] font-semibold sm:block">Wishlist</span>
          </Link>

          <Link
            href="/cart"
            aria-label={`Bag, ${cartCount} items`}
            className="flex flex-col items-center gap-0.5 text-ink transition-colors hover:text-navy"
          >
            <span className="relative">
              <ShoppingBag className="size-5" aria-hidden />
              {cartCount > 0 && (
                <span
                  aria-hidden
                  className="absolute -top-1.5 -right-2 flex size-4 items-center justify-center rounded-full bg-accent-red text-[10px] font-bold text-white"
                >
                  {cartCount}
                </span>
              )}
            </span>
            <span className="hidden text-[11px] font-semibold sm:block">Bag</span>
          </Link>

          {searchOpen && (
            <form
              onSubmit={handleSearchSubmit}
              className="absolute inset-x-0 top-full border-b border-hairline bg-white p-3 md:hidden"
            >
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted"
                  aria-hidden
                />
                <Input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search toys, ages, interests…"
                  aria-label="Search toys, ages, interests…"
                  className="h-11 rounded-full border-none bg-sand pl-11"
                />
              </div>
            </form>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="lg:hidden"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-5/6 max-w-xs">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col px-4 pb-6">
                <form
                  onSubmit={handleSearchSubmit}
                  className="mb-4 flex items-center gap-2"
                >
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search toys, ages, skills…"
                    aria-label="Search"
                    className="h-11"
                  />
                  <Button type="submit" variant="secondary" size="icon" aria-label="Search">
                    <Search className="size-4" />
                  </Button>
                </form>
                {PRIMARY_NAV.map((item) => (
                  <SheetClose key={item.label} asChild>
                    <Link
                      href={item.href}
                      className="border-b border-hairline py-3.5 text-[15px] font-semibold text-ink"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <p className="tn-label mt-6 mb-3 text-ink-muted">
                  Shop by age
                </p>
                <div className="flex flex-wrap gap-2">
                  {AGE_BANDS.map((band) => (
                    <SheetClose key={band.id} asChild>
                      <Link
                        href={`/collection?age=${band.id}`}
                        className="rounded-full border border-navy px-3.5 py-1.5 text-sm font-semibold text-navy"
                      >
                        {band.rangeLabel}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {megaOpen && MEGA_MENUS[MEGA_PANEL_LABEL] && (
        <div
          className="absolute inset-x-0 top-full hidden border-t border-hairline bg-white shadow-lg lg:block"
          onMouseEnter={openMegaPanel}
          onMouseLeave={scheduleCloseMegaPanel}
        >
          <div className="content-shell grid grid-cols-3 gap-10 py-8">
            {MEGA_MENUS[MEGA_PANEL_LABEL].columns.map((column) => (
              <div key={column.heading}>
                <p className="tn-label mb-3 text-ink-muted">{column.heading}</p>
                <ul className="flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={() => setMegaOpen(false)}
                        className="text-sm font-semibold text-ink transition-colors hover:text-navy"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, User, Heart, ShoppingBag, Menu, ChevronDown, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { PRIMARY_NAV } from "@/lib/data/nav";
import { AGE_BANDS } from "@/lib/data/age-bands";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
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

const GIFT_OCCASIONS = [
  { label: "Birthday gifts", href: "/gifting?occasion=birthday" },
  { label: "New baby gifts", href: "/gifting?occasion=new-baby" },
  { label: "Gifts under ₹999", href: "/gifting?occasion=under-999" },
];

export function SiteHeader() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { itemCount: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/collection?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-white">
      <div className="content-shell flex h-16 items-center gap-4 lg:h-20">
        <Logo heightClassName="h-7 lg:h-8" />

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-8 lg:flex"
        >
          {PRIMARY_NAV.map((item) =>
            item.label === "Shop by age" ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-[15px] font-semibold text-ink transition-colors hover:text-navy">
                    {item.label}
                    <ChevronDown className="size-3.5" aria-hidden />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="min-w-48">
                  {AGE_BANDS.map((band) => (
                    <DropdownMenuItem key={band.id} asChild>
                      <Link href={`/collection?age=${band.id}`}>
                        {band.rangeLabel} · {band.stageName}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : item.label === "Gifting" ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-[15px] font-semibold text-ink transition-colors hover:text-navy">
                    {item.label}
                    <ChevronDown className="size-3.5" aria-hidden />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="min-w-48">
                  {GIFT_OCCASIONS.map((occasion) => (
                    <DropdownMenuItem key={occasion.label} asChild>
                      <Link href={occasion.href}>{occasion.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-[15px] font-semibold text-ink transition-colors hover:text-navy"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <div className="hidden items-center sm:flex">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <Input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search toys, ages, skills…"
                  className="h-10 w-52 lg:w-64"
                  aria-label="Search"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="iconSm"
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="size-4" />
                </Button>
              </form>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Open search"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="size-5" />
              </Button>
            )}
          </div>

          <Button variant="ghost" size="icon" aria-label="Account" asChild>
            <Link href="/account">
              <User className="size-5" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label={`Wishlist, ${wishlistCount} items`}
            className="relative"
            asChild
          >
            <Link href="/account/wishlist">
              <Heart className="size-5" />
              {wishlistCount > 0 && (
                <span
                  aria-hidden
                  className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white"
                >
                  {wishlistCount}
                </span>
              )}
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label={`Cart, ${cartCount} items`}
            className="relative"
            asChild
          >
            <Link href="/cart">
              <ShoppingBag className="size-5" />
              {cartCount > 0 && (
                <span
                  aria-hidden
                  className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white"
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>

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
    </header>
  );
}

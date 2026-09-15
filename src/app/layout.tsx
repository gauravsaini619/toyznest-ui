import type { Metadata } from "next";
import { Outfit, Mulish } from "next/font/google";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { AddressBookProvider } from "@/lib/addresses-context";
import { ContactProvider } from "@/lib/contact-context";
import { LoginModal } from "@/components/shared/login-modal";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.toyznest.in"),
  title: {
    default: "Toyznest — Thoughtfully picked toys for curious little minds",
    template: "%s · Toyznest",
  },
  description:
    "Developmental toys for 0–6 year olds, curated by stage and skill. Free same-day delivery in Delhi/NCR on orders above ₹1,200.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${mulish.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream font-sans text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <ConvexClientProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <AddressBookProvider>
                  <ContactProvider>
                    {children}
                    <LoginModal />
                  </ContactProvider>
                </AddressBookProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

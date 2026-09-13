import type { Metadata } from "next";
import { WishlistGrid } from "@/components/account/wishlist-grid";

export const metadata: Metadata = {
  title: "Wishlist",
};

export default function WishlistPage() {
  return (
    <div>
      <h2 className="tn-display-m mb-6 text-navy">wishlist</h2>
      <WishlistGrid />
    </div>
  );
}

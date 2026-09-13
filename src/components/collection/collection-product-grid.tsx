import type { Product } from "@/lib/types";
import { CollectionProductCard } from "@/components/collection/collection-product-card";

export function CollectionProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {products.map((product) => (
        <CollectionProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

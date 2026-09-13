import { Star } from "lucide-react";
import type { Product, ProductReview } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5 text-star" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < count ? "fill-current" : "fill-none"}`} />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: ProductReview }) {
  return (
    <article className="flex flex-col gap-3 border border-hairline p-6">
      <Stars />
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sand text-xs font-bold text-ink-muted">
          {review.initials}
        </span>
        <p className="text-sm font-bold text-ink">{review.name}</p>
        {review.verified && <Badge variant="verified">Verified</Badge>}
      </div>
      <div>
        <p className="text-sm font-bold text-ink">{review.title}</p>
        <p className="tn-body mt-1 text-ink-muted">{review.body}</p>
      </div>
    </article>
  );
}

export function ProductReviews({
  product,
  distribution,
  reviews,
}: {
  product: Product;
  distribution: [number, number, number, number, number];
  reviews: ProductReview[];
}) {
  const maxCount = Math.max(...distribution, 1);

  return (
    <section className="section-padding bg-cream">
      <div className="content-shell">
        <div className="border border-hairline bg-white p-8 lg:p-10">
          <h2 className="tn-display-xl mb-8 text-ink normal-case">Customer Reviews</h2>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="shrink-0 text-center lg:border-r lg:border-hairline lg:pr-10 lg:text-left">
              <div className="flex items-center justify-center gap-2 lg:justify-start">
                <Stars />
                <span className="text-lg font-bold text-ink">{product.rating} out of 5</span>
              </div>
              <p className="tn-meta mt-1">Based on {product.reviewCount} reviews</p>
            </div>

            <div className="flex flex-1 flex-col gap-1.5">
              {distribution.map((count, i) => {
                const stars = 5 - i;
                return (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="w-14 shrink-0 text-sm text-ink-muted">
                      {stars} star{stars !== 1 ? "s" : ""}
                    </span>
                    <div className="h-2 flex-1 bg-sand">
                      <div
                        className="h-full bg-success"
                        style={{ width: `${(count / maxCount) * 100}%` }}
                      />
                    </div>
                    <span className="w-8 shrink-0 text-right text-sm text-ink-muted">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>

            <Button
              variant="onNavy"
              className="shrink-0 rounded-full bg-accent-emerald text-white hover:bg-accent-emerald/90"
            >
              Write a review
            </Button>
          </div>

          <div className="mt-8 border-t border-hairline pt-4">
            <button
              type="button"
              className="text-sm font-semibold text-ink-muted hover:text-ink"
            >
              Sort: Highest rating ⌄
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

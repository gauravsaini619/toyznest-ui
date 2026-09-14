"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, List } from "lucide-react";
import type { AgeBandId, CategorySlug, Product, SkillTag } from "@/lib/types";
import { PRODUCTS } from "@/lib/data/products";
import { DRAFT_PRODUCTS } from "@/lib/data/draft-products";
import { CATEGORIES } from "@/lib/data/categories";
import { AGE_BANDS } from "@/lib/data/age-bands";
import { discountPercent } from "@/lib/format";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import {
  FilterBar,
  type SortOption,
  type PriceBucket,
} from "@/components/collection/filter-bar";
import { CollectionProductGrid } from "@/components/collection/collection-product-grid";
import { CollectionProductRow } from "@/components/collection/collection-product-row";
import { EmptyState } from "@/components/shared/empty-state";
import { SignupCapture } from "@/components/shared/signup-capture";
import { SearchX } from "lucide-react";

const KIT_AGE_SHORTCUT: Record<string, AgeBandId> = {
  k1: "0-1y",
  k2: "1-2y",
  k3: "3-5y",
  k4: "5-7y",
};

function priceMatchesBucket(priceInPaise: number, bucket: PriceBucket): boolean {
  switch (bucket) {
    case "under-499":
      return priceInPaise <= 49900;
    case "under-999":
      return priceInPaise <= 99900;
    case "500-999":
      return priceInPaise >= 50000 && priceInPaise <= 99900;
    case "1000-plus":
      return priceInPaise >= 100000;
  }
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const arr = [...products];
  switch (sort) {
    case "bestsellers":
      return arr.sort(
        (a, b) => Number(b.badge === "BESTSELLER") - Number(a.badge === "BESTSELLER")
      );
    case "new":
      return arr.sort((a, b) => Number(b.badge === "NEW") - Number(a.badge === "NEW"));
    case "sale":
      return arr
        .filter((p) => p.compareAtPriceInPaise && p.priceInPaise != null)
        .sort(
          (a, b) =>
            (discountPercent(b.priceInPaise!, b.compareAtPriceInPaise) ?? 0) -
            (discountPercent(a.priceInPaise!, a.compareAtPriceInPaise) ?? 0)
        );
    case "price-asc":
      // Unpriced (draft) products sort to the end regardless of direction.
      return arr.sort((a, b) => (a.priceInPaise ?? Infinity) - (b.priceInPaise ?? Infinity));
    case "price-desc":
      return arr.sort((a, b) => (b.priceInPaise ?? -Infinity) - (a.priceInPaise ?? -Infinity));
    default:
      return arr;
  }
}

export function CollectionContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");

  const age = searchParams.get("age") as AgeBandId | null;
  const category = searchParams.get("category") as CategorySlug | null;
  const skill = searchParams.get("skill") as SkillTag | null;
  const priceBucket = searchParams.get("price") as PriceBucket | null;
  const sort = (searchParams.get("sort") as SortOption) || "featured";
  const q = searchParams.get("q");
  const kit = searchParams.get("kit");

  const effectiveAge = age ?? (kit ? KIT_AGE_SHORTCUT[kit] : null);

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (!value) params.delete(key);
      else params.set(key, value);
    }
    if ("age" in updates) params.delete("kit");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const normalizedQuery = q?.trim().toLowerCase() ?? "";

  let results = [...PRODUCTS, ...DRAFT_PRODUCTS].filter((p) => {
    if (effectiveAge && p.ageBand !== effectiveAge) return false;
    if (category && p.categorySlug !== category) return false;
    if (skill && !p.skills.includes(skill)) return false;
    if (priceBucket && (p.priceInPaise == null || !priceMatchesBucket(p.priceInPaise, priceBucket)))
      return false;
    if (normalizedQuery) {
      // Comma-separated terms match as OR (e.g. "car,truck,train" from a
      // homepage interest tile); a plain single-word search behaves exactly
      // like a substring match, same as before.
      const terms = normalizedQuery.split(",").map((t) => t.trim()).filter(Boolean);
      const categoryName = CATEGORIES.find((c) => c.slug === p.categorySlug)?.name ?? "";
      const haystack = [p.name, categoryName, ...p.skills].join(" ").toLowerCase();
      if (terms.length > 0 && !terms.some((t) => haystack.includes(t))) return false;
    }
    return true;
  });
  results = sortProducts(results, sort);

  const categoryName = category ? CATEGORIES.find((c) => c.slug === category)?.name : null;
  const ageName = effectiveAge
    ? AGE_BANDS.find((b) => b.id === effectiveAge)?.stageName
    : null;
  const title = q
    ? `Results for "${q}"`
    : categoryName
      ? categoryName
      : ageName
        ? `${ageName} toys`
        : "All developmental toys";

  return (
    <>
      <div className="content-shell pb-16">
        <div className="pt-6 pb-4">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "All toys" }]} />
        </div>

      <div className="flex flex-wrap items-end justify-between gap-4 pb-6">
        <div>
          <h1 className="tn-display-l text-navy normal-case">{title}</h1>
          <p className="tn-meta mt-1">
            Showing {results.length} toy{results.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex shrink-0 gap-1" role="group" aria-label="View">
          <button
            type="button"
            onClick={() => setView("grid")}
            aria-pressed={view === "grid"}
            aria-label="Grid view"
            className={`flex size-10 items-center justify-center border transition-colors ${
              view === "grid" ? "border-navy bg-navy text-white" : "border-hairline text-ink-muted hover:border-navy"
            }`}
          >
            <LayoutGrid className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            aria-label="List view"
            className={`flex size-10 items-center justify-center border transition-colors ${
              view === "list" ? "border-navy bg-navy text-white" : "border-hairline text-ink-muted hover:border-navy"
            }`}
          >
            <List className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <FilterBar
          skill={skill}
          onSetSkill={(newSkill) => updateParams({ skill: newSkill })}
          priceBucket={priceBucket}
          onSetPriceBucket={(bucket) => updateParams({ price: bucket })}
          sort={sort}
          onSetSort={(newSort) => updateParams({ sort: newSort === "featured" ? null : newSort })}
        />
      </div>

      {results.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No toys match these filters"
          description="Try widening the price range or clearing a skill."
          actionLabel="Clear filters"
          onAction={() => router.push(pathname, { scroll: false })}
        />
      ) : view === "grid" ? (
        <CollectionProductGrid products={results} />
      ) : (
        <div className="flex flex-col gap-4">
          {results.map((product) => (
            <CollectionProductRow key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
    <SignupCapture />
    </>
  );
}

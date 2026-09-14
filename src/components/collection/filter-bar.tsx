"use client";

import type { SkillTag } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const SKILLS: SkillTag[] = [
  "Fine motor",
  "Gross motor",
  "Cognitive",
  "Sensory",
  "Language",
  "Social-emotional",
  "Creativity",
];

export type SortOption =
  | "featured"
  | "bestsellers"
  | "new"
  | "sale"
  | "price-asc"
  | "price-desc";

const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured",
  bestsellers: "Bestsellers",
  new: "Newest",
  sale: "On sale",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
};

export type PriceBucket = "under-499" | "under-999" | "500-999" | "1000-plus";

export const PRICE_BUCKETS: { id: PriceBucket; label: string }[] = [
  { id: "under-499", label: "Under ₹499" },
  { id: "under-999", label: "Under ₹999" },
  { id: "500-999", label: "₹500–₹999" },
  { id: "1000-plus", label: "₹1,000+" },
];

export function FilterBar({
  skill,
  onSetSkill,
  priceBucket,
  onSetPriceBucket,
  sort,
  onSetSort,
}: {
  skill: SkillTag | null;
  onSetSkill: (skill: SkillTag | null) => void;
  priceBucket: PriceBucket | null;
  onSetPriceBucket: (bucket: PriceBucket | null) => void;
  sort: SortOption;
  onSetSort: (sort: SortOption) => void;
}) {
  return (
    <div className="rounded-[12px] border border-hairline bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="tn-label shrink-0 text-ink-muted">Skill</span>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => onSetSkill(null)}>
              <Badge variant={skill === null ? "filterActive" : "filter"}>All skills</Badge>
            </button>
            {SKILLS.map((s) => (
              <button key={s} type="button" onClick={() => onSetSkill(s)}>
                <Badge variant={skill === s ? "filterActive" : "filter"}>{s}</Badge>
              </button>
            ))}
          </div>
        </div>

        <select
          value={sort}
          onChange={(e) => onSetSort(e.target.value as SortOption)}
          aria-label="Sort"
          className="h-10 shrink-0 rounded-full border border-field-border bg-white px-4 text-sm font-semibold text-ink"
        >
          {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
            <option key={option} value={option}>
              Sort: {SORT_LABELS[option]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-hairline pt-4">
        <span className="tn-label shrink-0 text-ink-muted">Price</span>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => onSetPriceBucket(null)}>
            <Badge variant={priceBucket === null ? "filterActive" : "filter"}>All</Badge>
          </button>
          {PRICE_BUCKETS.map((bucket) => (
            <button key={bucket.id} type="button" onClick={() => onSetPriceBucket(bucket.id)}>
              <Badge variant={priceBucket === bucket.id ? "filterActive" : "filter"}>
                {bucket.label}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

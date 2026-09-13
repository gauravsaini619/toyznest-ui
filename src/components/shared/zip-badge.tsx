import { Zap } from "lucide-react";
import { cn } from "cn";

/**
 * "Toyznest Zip" — same-day Delhi/NCR delivery signal shown on product
 * cards. `variant="onColor"` (default) is for cards with a saturated
 * surface behind it; `variant="onLight"` is for white/cream backgrounds
 * (e.g. the list-view row).
 */
export function ZipBadge({
  variant = "onColor",
  className,
}: {
  variant?: "onColor" | "onLight";
  className?: string;
}) {
  return (
    <span
      title="Toyznest Zip — delivered today in Delhi/NCR"
      className={cn(
        "inline-flex w-fit items-center gap-1.5 border px-2 py-1 text-xs font-bold",
        variant === "onColor"
          ? "border-white/30 bg-white/15 text-white"
          : "border-hairline bg-sand text-navy",
        className
      )}
    >
      <Zap className="size-3 shrink-0 fill-accent-yellow text-accent-yellow" aria-hidden />
      Zip
      <span className={variant === "onColor" ? "font-normal text-white/70" : "font-normal text-ink-muted"}>
        · delivered today
      </span>
    </span>
  );
}

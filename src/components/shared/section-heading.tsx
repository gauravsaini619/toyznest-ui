import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";

export function SectionHeading({
  eyebrow,
  title,
  viewAllHref,
  onNavy = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  viewAllHref?: string;
  onNavy?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-6",
        className
      )}
    >
      <div>
        {eyebrow && (
          <p
            className={cn(
              "tn-label mb-2",
              onNavy ? "text-accent-yellow" : "text-accent-red"
            )}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            "tn-display-l",
            onNavy ? "text-white" : "text-navy"
          )}
        >
          {title}
        </h2>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className={cn(
            "tn-label inline-flex shrink-0 items-center gap-1.5 rounded-full border px-5 py-2.5 transition-colors",
            onNavy
              ? "border-white/70 text-white hover:bg-white/10"
              : "border-navy text-navy hover:bg-navy hover:text-white"
          )}
        >
          View all
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      )}
    </div>
  );
}

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({
  items,
  onNavy = false,
}: {
  items: { label: string; href?: string }[];
  onNavy?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 text-sm">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {item.href ? (
              <Link
                href={item.href}
                className={
                  onNavy
                    ? "text-white/70 transition-colors hover:text-white"
                    : "text-ink-muted transition-colors hover:text-navy"
                }
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className={onNavy ? "text-white/70" : "text-ink-muted"}
              >
                {item.label}
              </span>
            )}
            {i < items.length - 1 && (
              <ChevronRight
                className={`size-3.5 ${onNavy ? "text-white/40" : "text-ink-muted/50"}`}
                aria-hidden
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

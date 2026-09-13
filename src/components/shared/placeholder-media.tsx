import { cn } from "cn";

/**
 * Imagery placeholder (Design System 07 · Imagery & iconography → Placeholders).
 * "Until real photography lands, every image area is a drop slot on #F5EDE0
 * with a monospace label naming exactly what belongs there. Placeholders
 * never fake a product with an illustration."
 */
export function PlaceholderMedia({
  label,
  className,
  aspect,
}: {
  label: string;
  className?: string;
  /** e.g. "4 / 3", "1 / 1", "16 / 9" — defaults to filling the parent. */
  aspect?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex h-full w-full items-center justify-center bg-sand px-4 text-center",
        className
      )}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      <span className="font-mono text-[11px] tracking-tight text-ink-muted/70">
        {label}
      </span>
    </div>
  );
}

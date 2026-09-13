import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Design System 05 · Components → Empty state. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 border border-hairline bg-white px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center bg-sand">
        <Icon className="size-5 text-ink-muted" aria-hidden />
      </span>
      <div>
        <p className="tn-product-name text-lg text-navy normal-case">{title}</p>
        <p className="tn-body mt-1.5 text-ink-muted">{description}</p>
      </div>
      {actionLabel && (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

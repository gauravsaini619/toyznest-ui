import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

/**
 * Badges, chips & tags (Design System 05).
 * Product badges are square (yellow on navy cards); filter/skill chips are pills.
 */
const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border border-transparent px-2.5 tn-label whitespace-nowrap transition-all",
  {
    variants: {
      variant: {
        product: "rounded-none bg-accent-yellow text-navy",
        verified: "rounded-full bg-accent-emerald text-white gap-1",
        skill: "rounded-full border-white/60 bg-transparent text-white",
        skillOnLight: "rounded-full border-hairline bg-white text-ink-muted",
        filter: "rounded-full border-navy bg-white text-navy",
        filterActive: "rounded-full border-navy bg-navy text-white",
        safe: "rounded-full bg-white/95 text-navy gap-1",
      },
    },
    defaultVariants: {
      variant: "product",
    },
  }
)

function Badge({
  className,
  variant = "product",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

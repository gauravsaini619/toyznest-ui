import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

/**
 * Toyznest buttons (Design System 05 · Components → Buttons).
 * Square corners, 44px minimum touch target, one "primary" per view.
 * "pill" is reserved for VIEW ALL / filter-chip style CTAs, never commerce actions.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-none text-[15px] font-bold whitespace-nowrap transition-all outline-none select-none cursor-pointer active:translate-y-px focus-visible:ring-3 focus-visible:ring-navy/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-sand disabled:text-ink-muted/70 disabled:border-hairline [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "border border-navy bg-navy text-white hover:bg-navy-deep hover:border-navy-deep",
        secondary:
          "border border-navy bg-white text-navy hover:bg-sand",
        onNavy:
          "border border-transparent bg-white text-navy hover:bg-cream",
        outlineOnNavy:
          "border border-white/70 bg-transparent text-white hover:bg-white/10",
        ghost:
          "border border-transparent bg-transparent text-navy hover:bg-sand",
        link: "border border-transparent bg-transparent text-navy underline underline-offset-4 hover:no-underline p-0! h-auto! font-bold",
        destructive:
          "border border-accent-red bg-accent-red text-white hover:bg-accent-red/90",
        pill: "rounded-full border border-navy bg-white text-navy tn-label px-5 hover:bg-navy hover:text-white",
        pillSolid:
          "rounded-full border border-transparent bg-navy text-white tn-label px-5 hover:bg-navy-deep",
      },
      size: {
        default: "h-11 px-6",
        commerce: "h-13 px-8 text-base",
        sm: "h-9 px-4 text-sm",
        icon: "size-11",
        iconSm: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

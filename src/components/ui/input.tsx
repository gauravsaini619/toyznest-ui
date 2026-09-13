import * as React from "react"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-none border border-field-border bg-white px-4 py-2 font-sans text-[15px] text-ink transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-ink-muted focus-visible:border-navy focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-sand disabled:opacity-70 aria-invalid:border-accent-red",
        className
      )}
      {...props}
    />
  )
}

export { Input }

"use client";

import { useRouter } from "next/navigation";
import type { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export function BuyNowButton({
  productId,
  quantity = 1,
  variant,
  size,
  className,
  children = "Buy now",
}: {
  productId: string;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
} & VariantProps<typeof buttonVariants>) {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={(e) => {
        e.preventDefault();
        router.push(`/checkout?buyNow=${productId}&qty=${quantity}`);
      }}
    >
      {children}
    </Button>
  );
}

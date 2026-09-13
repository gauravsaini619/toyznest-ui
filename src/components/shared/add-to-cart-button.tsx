"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { cn } from "cn";

export function AddToCartButton({
  productId,
  quantity = 1,
  variant,
  size,
  className,
  children = "Add to cart",
}: {
  productId: string;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
} & VariantProps<typeof buttonVariants>) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    addItem(productId, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn(className)}
    >
      {justAdded ? (
        <>
          <Check className="size-4" aria-hidden />
          Added
        </>
      ) : (
        children
      )}
    </Button>
  );
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS } from "@/lib/data/products";

const STORAGE_KEY = "toysnest-cart";

export interface CartLine {
  productId: string;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotalInPaise: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Client-only cart state, persisted to localStorage. Shaped to match the
 * `cartItems` table in `convex/schema.ts` (productId + quantity) — swap
 * the localStorage read/write for `useQuery`/`useMutation` once a signed-in
 * session exists and this can live server-side instead.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage (a browser-only API unavailable
    // during SSR) — the standard exception to "don't setState in effects".
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore — private mode or corrupted data
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore — storage full or unavailable
    }
  }, [lines, hydrated]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...prev, { productId, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((prev) => {
      if (quantity <= 0) return prev.filter((l) => l.productId !== productId);
      return prev.map((l) => (l.productId === productId ? { ...l, quantity } : l));
    });
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { itemCount, subtotalInPaise } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const line of lines) {
      const product = PRODUCTS.find((p) => p.id === line.productId);
      if (!product) continue;
      count += line.quantity;
      subtotal += product.priceInPaise * line.quantity;
    }
    return { itemCount: count, subtotalInPaise: subtotal };
  }, [lines]);

  const value = useMemo<CartContextValue>(
    () => ({ lines, itemCount, subtotalInPaise, addItem, removeItem, setQuantity, clear }),
    [lines, itemCount, subtotalInPaise, addItem, removeItem, setQuantity, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

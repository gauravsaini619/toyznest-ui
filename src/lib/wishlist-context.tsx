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

const STORAGE_KEY = "toysnest-wishlist";

interface WishlistContextValue {
  ids: string[];
  count: number;
  has: (productId: string) => boolean;
  toggle: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

/**
 * Client-only wishlist state, persisted to localStorage. Shaped to match
 * the `wishlistItems` table in `convex/schema.ts` — swap for
 * `useQuery`/`useMutation` once there's a signed-in session.
 */
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage (a browser-only API unavailable
    // during SSR) — the standard exception to "don't setState in effects".
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setIds(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // ignore
    }
  }, [ids, hydrated]);

  const toggle = useCallback((productId: string) => {
    setIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const has = useCallback((productId: string) => ids.includes(productId), [ids]);

  const value = useMemo<WishlistContextValue>(
    () => ({ ids, count: ids.length, has, toggle }),
    [ids, has, toggle]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}

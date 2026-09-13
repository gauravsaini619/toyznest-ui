"use client";

import { ReactNode, useMemo } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

/**
 * Wraps the app in ConvexProvider only when a deployment URL is configured.
 * Until `npx convex dev` has been run (see `convex/README.md`), this
 * renders children untouched so the homepage keeps working off static data.
 */
export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  const client = useMemo(
    () => (convexUrl ? new ConvexReactClient(convexUrl) : null),
    [convexUrl]
  );

  if (!client) return <>{children}</>;

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}

# Convex backend (not yet deployed)

`schema.ts` defines the tables the storefront will read from once a Convex
deployment exists. To activate it:

```bash
npx convex dev
```

This will prompt you to log in / create a project and writes
`NEXT_PUBLIC_CONVEX_URL` to `.env.local` (see `.env.local.example`).

Then add query/mutation functions here, e.g. `convex/products.ts`:

```ts
import { query } from "./_generated/server";

export const bestsellers = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("products")
      .withIndex("by_badge", (q) => q.eq("badge", "BESTSELLER"))
      .take(4);
  },
});
```

and swap the corresponding `get*()` helper in `src/lib/data/*.ts` for a
`fetchQuery`/`useQuery` call against `api.products.bestsellers`.

`src/components/providers/convex-client-provider.tsx` already wraps the app
in `ConvexProvider` whenever `NEXT_PUBLIC_CONVEX_URL` is set, and is a no-op
otherwise — so nothing else needs to change when the deployment goes live.

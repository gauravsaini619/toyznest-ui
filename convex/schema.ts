import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Backend schema for the Toyznest storefront.
 *
 * Not deployed yet — `npx convex dev` has not been run against this
 * project, so there is no live deployment or NEXT_PUBLIC_CONVEX_URL. The
 * homepage currently reads static data from `src/lib/data/*.ts`, shaped to
 * match these tables. Once a deployment exists, replace those `get*()`
 * helpers with `fetchQuery(api.products.bestsellers, {})` (server
 * components) or `useQuery(api.products.bestsellers)` (client components).
 */
export default defineSchema({
  ageBands: defineTable({
    shortLabel: v.string(),
    rangeLabel: v.string(),
    stageName: v.string(),
    sortOrder: v.number(),
  }),

  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    surface: v.string(),
    span: v.union(
      v.literal("hero"),
      v.literal("tall"),
      v.literal("medium"),
      v.literal("wide")
    ),
    imageStorageId: v.optional(v.id("_storage")),
    sortOrder: v.number(),
  }).index("by_slug", ["slug"]),

  products: defineTable({
    slug: v.string(),
    name: v.string(),
    ageBandId: v.id("ageBands"),
    skills: v.array(v.string()),
    priceInPaise: v.number(),
    compareAtPriceInPaise: v.optional(v.number()),
    surface: v.string(),
    badge: v.optional(
      v.union(v.literal("BESTSELLER"), v.literal("50% OFF"), v.literal("NEW"))
    ),
    rating: v.number(),
    reviewCount: v.number(),
    inventoryCount: v.number(),
    imageStorageIds: v.array(v.id("_storage")),
  })
    .index("by_slug", ["slug"])
    .index("by_ageBand", ["ageBandId"])
    .index("by_badge", ["badge"]),

  productReviews: defineTable({
    productId: v.id("products"),
    author: v.string(),
    quote: v.string(),
    rating: v.number(),
    verified: v.boolean(),
  }).index("by_product", ["productId"]),

  users: defineTable({
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    authSubject: v.string(),
  }).index("by_authSubject", ["authSubject"]),

  cartItems: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    quantity: v.number(),
  }).index("by_user", ["userId"]),

  wishlistItems: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
  }).index("by_user", ["userId"]),

  orders: defineTable({
    userId: v.id("users"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
    totalInPaise: v.number(),
    paymentMethod: v.union(v.literal("prepaid"), v.literal("cod")),
    placedAt: v.number(),
  }).index("by_user", ["userId"]),

  signups: defineTable({
    email: v.string(),
    childBirthMonth: v.optional(v.number()),
    childBirthYear: v.optional(v.number()),
    source: v.string(),
  }).index("by_email", ["email"]),
});

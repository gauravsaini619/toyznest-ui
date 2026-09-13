import type { Category } from "@/lib/types";

/**
 * Category mosaic (Design System 06 · Patterns → Category mosaic):
 * mixed spans on a 6-column grid — one 4-col hero tile, a tall 2-col, three
 * mediums, one full-width.
 */
export const CATEGORIES: Category[] = [
  {
    id: "c1",
    slug: "wooden-toys",
    name: "wooden toys",
    href: "/collection?category=wooden-toys",
    surface: "navy",
    span: "hero",
    placeholderLabel: "wooden toys shelf · 4:3",
  },
  {
    id: "c2",
    slug: "baby-sensory",
    name: "baby & sensory",
    href: "/collection?category=baby-sensory",
    surface: "violet",
    span: "tall",
    placeholderLabel: "baby playing · 3:4",
  },
  {
    id: "c3",
    slug: "building-stem",
    name: "building & stem",
    href: "/collection?category=building-stem",
    surface: "cobalt",
    span: "medium",
    placeholderLabel: "building blocks · 4:3",
  },
  {
    id: "c4",
    slug: "pretend-play",
    name: "pretend play",
    href: "/collection?category=pretend-play",
    surface: "magenta",
    span: "medium",
    placeholderLabel: "pretend play · 4:3",
  },
  {
    id: "c5",
    slug: "outdoor-active",
    name: "outdoor & active",
    href: "/collection?category=outdoor-active",
    surface: "emerald",
    span: "medium",
    placeholderLabel: "outdoor play · 4:3",
  },
  {
    id: "c6",
    slug: "books-puzzles",
    name: "books & puzzles",
    href: "/collection?category=books-puzzles",
    surface: "yellow",
    span: "wide",
    placeholderLabel: "books and puzzles · 21:9",
  },
];

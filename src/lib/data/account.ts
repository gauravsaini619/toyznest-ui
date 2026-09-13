/**
 * Mock signed-in user for the account page. Once auth is wired up, this
 * becomes a Convex query against `users` (see `convex/schema.ts`) keyed off
 * the session — the shape here matches that table plus a few loyalty
 * fields worth adding to the schema when that work starts.
 */
export interface AccountProfile {
  name: string;
  initials: string;
  phone: string;
  email: string;
  memberSince: string;
  tier: string;
  playPoints: number;
  stats: {
    orders: number;
    playProfiles: number;
    lifetimeSpendInPaise: number;
    savedToys: number;
  };
}

export const MOCK_ACCOUNT: AccountProfile = {
  name: "priya nair",
  initials: "PN",
  phone: "+91 98765 43210",
  email: "priya.nair@gmail.com",
  memberSince: "Mar 2025",
  tier: "Nest Club · Gold",
  playPoints: 1160,
  stats: {
    orders: 14,
    playProfiles: 2,
    lifetimeSpendInPaise: 1842000,
    savedToys: 6,
  },
};

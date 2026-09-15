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
import { MOCK_ACCOUNT } from "@/lib/data/account";

const STORAGE_KEY = "toysnest-auth";

/** The one "existing" demo account — any other phone number is treated as a first-time signup. */
const KNOWN_PHONE_DIGITS = MOCK_ACCOUNT.phone.replace(/\D/g, "").slice(-10);

export interface AuthProfile {
  phone: string;
  name: string;
  email: string;
  childAgeBand?: string;
}

interface AuthContextValue {
  profile: AuthProfile | null;
  isLoggedIn: boolean;
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  login: (profile: AuthProfile) => void;
  logout: () => void;
  isKnownPhone: (digits: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Client-only auth state, persisted to localStorage — same pattern as
 * `CartProvider`/`WishlistProvider`. Phone+OTP login is simulated (no SMS
 * gateway wired up yet); swap `login-modal.tsx`'s OTP generation for a real
 * Convex action (e.g. `api.auth.sendOtp` / `api.auth.verifyOtp`) once one
 * exists.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage (a browser-only API unavailable
    // during SSR) — the standard exception to "don't setState in effects".
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setProfile(JSON.parse(raw));
    } catch {
      // ignore — private mode or corrupted data
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (profile) localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore — storage full or unavailable
    }
  }, [profile, hydrated]);

  const login = useCallback((p: AuthProfile) => {
    // Intentionally does not close the modal — `LoginModal` shows a
    // "success" step first and closes itself via `closeLogin()`.
    setProfile(p);
  }, []);

  const logout = useCallback(() => setProfile(null), []);
  const openLogin = useCallback(() => setIsLoginOpen(true), []);
  const closeLogin = useCallback(() => setIsLoginOpen(false), []);
  const isKnownPhone = useCallback((digits: string) => digits === KNOWN_PHONE_DIGITS, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      profile,
      isLoggedIn: !!profile,
      isLoginOpen,
      openLogin,
      closeLogin,
      login,
      logout,
      isKnownPhone,
    }),
    [profile, isLoginOpen, openLogin, closeLogin, login, logout, isKnownPhone]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

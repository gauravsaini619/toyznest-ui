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

const STORAGE_KEY = "toysnest-contact";

export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
}

interface ContactContextValue {
  contact: ContactInfo;
  updateContact: (contact: ContactInfo) => void;
}

const ContactContext = createContext<ContactContextValue | null>(null);

const DEFAULT_CONTACT: ContactInfo = {
  name: MOCK_ACCOUNT.name,
  phone: MOCK_ACCOUNT.phone,
  email: MOCK_ACCOUNT.email,
};

/**
 * Client-only contact record, persisted to localStorage. Shaped for an
 * easy swap to a Convex-backed `users` field once real accounts exist.
 */
export function ContactProvider({ children }: { children: ReactNode }) {
  const [contact, setContact] = useState<ContactInfo>(DEFAULT_CONTACT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setContact(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contact));
    } catch {
      // ignore
    }
  }, [contact, hydrated]);

  const updateContact = useCallback((next: ContactInfo) => setContact(next), []);

  const value = useMemo<ContactContextValue>(
    () => ({ contact, updateContact }),
    [contact, updateContact]
  );

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
}

export function useContact(): ContactContextValue {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used within a ContactProvider");
  return ctx;
}

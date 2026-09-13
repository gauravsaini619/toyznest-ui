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
import { MOCK_ADDRESS, type SavedAddress } from "@/lib/data/addresses";

const STORAGE_KEY = "toysnest-addresses";
const SELECTED_KEY = "toysnest-selected-address";

export type AddressInput = Omit<SavedAddress, "id" | "isDefault">;

interface AddressBookContextValue {
  addresses: SavedAddress[];
  selectedId: string | null;
  selectedAddress: SavedAddress | null;
  selectAddress: (id: string) => void;
  addAddress: (input: AddressInput, makeDefault?: boolean) => string;
  updateAddress: (id: string, input: AddressInput) => void;
  setDefault: (id: string) => void;
}

const AddressBookContext = createContext<AddressBookContextValue | null>(null);

function makeId() {
  return `addr_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Client-only address book, persisted to localStorage and seeded with the
 * mock default address on first load. Shaped for an easy swap to a
 * Convex-backed `addresses` table once real accounts exist.
 */
export function AddressBookProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<SavedAddress[]>([MOCK_ADDRESS]);
  const [selectedId, setSelectedId] = useState<string | null>(MOCK_ADDRESS.id);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setAddresses(JSON.parse(raw));
      const selectedRaw = localStorage.getItem(SELECTED_KEY);
      if (selectedRaw) setSelectedId(selectedRaw);
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
    } catch {
      // ignore
    }
  }, [addresses, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (selectedId) localStorage.setItem(SELECTED_KEY, selectedId);
    } catch {
      // ignore
    }
  }, [selectedId, hydrated]);

  const selectAddress = useCallback((id: string) => setSelectedId(id), []);

  const addAddress = useCallback((input: AddressInput, makeDefault = false) => {
    const id = makeId();
    setAddresses((prev) => {
      const next = [
        ...prev.map((a) => (makeDefault ? { ...a, isDefault: false } : a)),
        { ...input, id, isDefault: makeDefault || prev.length === 0 },
      ];
      return next;
    });
    setSelectedId(id);
    return id;
  }, []);

  const updateAddress = useCallback((id: string, input: AddressInput) => {
    setAddresses((prev) => prev.map((a) => (a.id === id ? { ...a, ...input } : a)));
  }, []);

  const setDefault = useCallback((id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  }, []);

  const selectedAddress = useMemo(
    () => addresses.find((a) => a.id === selectedId) ?? addresses[0] ?? null,
    [addresses, selectedId]
  );

  const value = useMemo<AddressBookContextValue>(
    () => ({
      addresses,
      selectedId,
      selectedAddress,
      selectAddress,
      addAddress,
      updateAddress,
      setDefault,
    }),
    [addresses, selectedId, selectedAddress, selectAddress, addAddress, updateAddress, setDefault]
  );

  return (
    <AddressBookContext.Provider value={value}>{children}</AddressBookContext.Provider>
  );
}

export function useAddressBook(): AddressBookContextValue {
  const ctx = useContext(AddressBookContext);
  if (!ctx) throw new Error("useAddressBook must be used within an AddressBookProvider");
  return ctx;
}

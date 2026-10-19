"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CONSENT_STORAGE_KEY } from "@/lib/site";

export type ConsentCategory = "necessary" | "functional" | "analytics" | "marketing";

export type ConsentState = {
  decided: boolean;
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string | null;
  acceptAll: () => void;
  rejectOptional: () => void;
  setCategory: (c: Exclude<ConsentCategory, "necessary">, value: boolean) => void;
  savePreferences: (p: { functional: boolean; analytics: boolean; marketing: boolean }) => void;
  reset: () => void;
};

/**
 * STEP 11 cookie consent. Persisted to localStorage under exactly
 * `nazareth_hub_consent`. Necessary is always on, per the Kenya Data
 * Protection Act 2019 principle of purpose limitation.
 */
export const useConsent = create<ConsentState>()(
  persist(
    (set) => ({
      decided: false,
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      updatedAt: null,
      acceptAll: () =>
        set({
          decided: true,
          functional: true,
          analytics: true,
          marketing: true,
          updatedAt: new Date().toISOString(),
        }),
      rejectOptional: () =>
        set({
          decided: true,
          functional: false,
          analytics: false,
          marketing: false,
          updatedAt: new Date().toISOString(),
        }),
      setCategory: (c, value) => set({ [c]: value } as Partial<ConsentState>),
      savePreferences: (p) =>
        set({ decided: true, ...p, updatedAt: new Date().toISOString() }),
      reset: () =>
        set({
          decided: false,
          functional: false,
          analytics: false,
          marketing: false,
          updatedAt: null,
        }),
    }),
    {
      name: CONSENT_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        decided: s.decided,
        necessary: s.necessary,
        functional: s.functional,
        analytics: s.analytics,
        marketing: s.marketing,
        updatedAt: s.updatedAt,
      }),
    }
  )
);

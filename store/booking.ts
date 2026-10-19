"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type LastBooking = {
  ref: string;
  spaceType: string;
  detail: string;
  date?: string;
  endDate?: string;
  time?: string;
  total: number | null;
  currency: "KES";
  name: string;
  email: string;
  createdAt: string;
  payload?: Record<string, unknown>;
};

type BookingStore = {
  last: LastBooking | null;
  tab: "desk" | "meeting-room" | "office";
  setTab: (t: BookingStore["tab"]) => void;
  setLast: (b: LastBooking) => void;
  clear: () => void;
};

/** Keeps the most recent booking for /booking-confirmation across the redirect. */
export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      last: null,
      tab: "desk",
      setTab: (tab) => set({ tab }),
      setLast: (last) => set({ last }),
      clear: () => set({ last: null }),
    }),
    {
      name: "nazareth_hub_last_booking",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

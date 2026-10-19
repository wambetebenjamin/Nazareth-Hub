"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Armchair, Clock3, DoorClosed } from "lucide-react";
import { DeskForm } from "./DeskForm";
import { MeetingRoomForm } from "./MeetingRoomForm";
import { OfficeForm } from "./OfficeForm";
import { useBookingStore } from "@/store/booking";

const TABS = [
  { key: "desk", label: "Hot Desk", icon: Armchair, blurb: "Book by the day or the week. Desks from KES 1,500." },
  { key: "meeting-room", label: "Meeting Room", icon: Clock3, blurb: "Three rooms, booked by the hour from KES 2,500." },
  { key: "office", label: "Private Office Enquiry", icon: DoorClosed, blurb: "Tell us about your team and we will prepare a suite." },
] as const;

/** STEP 7 tab selector. STEP 16 effect 5: AnimatePresence tab transitions. */
export function BookingTabs() {
  const tab = useBookingStore((s) => s.tab);
  const setTab = useBookingStore((s) => s.setTab);

  return (
    <div>
      <div role="tablist" aria-label="Booking type" className="grid gap-3 sm:grid-cols-3">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              id={`tab-${t.key}`}
              aria-selected={active}
              aria-controls={`panel-${t.key}`}
              type="button"
              onClick={() => setTab(t.key)}
              className={`rounded-lg border p-4 text-left transition-colors ${
                active
                  ? "border-primary bg-primary text-white shadow-[0_10px_30px_rgba(50,62,221,0.25)]"
                  : "border-black/10 bg-white text-heading hover:border-primary/60"
              }`}
            >
              <span className="flex items-center gap-2 text-sm font-bold">
                <Icon size={18} aria-hidden="true" />
                {t.label}
              </span>
              <span className={`mt-1 block text-xs ${active ? "text-white/80" : "text-body"}`}>
                {t.blurb}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        className="mt-8 rounded-xl border border-black/5 bg-white p-6 shadow-[0_5px_24px_rgba(0,0,0,0.06)] md:p-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {tab === "desk" && <DeskForm />}
            {tab === "meeting-room" && <MeetingRoomForm />}
            {tab === "office" && <OfficeForm />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

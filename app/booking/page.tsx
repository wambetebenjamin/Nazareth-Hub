import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { BookingTabs } from "@/components/booking/BookingTabs";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a desk, room or office",
  description:
    "Book a hot desk by the day, reserve a meeting room by the hour, or enquire about a private office at Nazareth Hub, Nairobi.",
};

export default function BookingPage() {
  return (
    <>
      <PageHero
        crumb="Booking"
        title="Book your space in two minutes"
        intro="Choose a tab, pick your dates, and your confirmation with a QR access pass follows immediately by email."
        image="/images/space-openplan.jpg"
      />
      <section className="ftco-section bg-light">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <BookingTabs />
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-body">
            <ShieldCheck size={14} aria-hidden="true" />
            All submissions are checked by reCAPTCHA v3, with a checkbox fallback when we
            need extra certainty.
          </p>
        </div>
      </section>
    </>
  );
}

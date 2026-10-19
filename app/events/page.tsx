import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { EventsBrowser } from "@/components/events/EventsBrowser";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Workshops, networking nights, pitch nights and socials at Nazareth Hub, Nairobi. Filter by type and RSVP online.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        crumb="Events"
        title="The calendar that keeps Nairobi working"
        intro="Workshops, networking nights, pitch nights and socials. Members attend free or at a discount; guests are always welcome."
        image="/images/event-networking.jpg"
      />
      <section className="ftco-section bg-light">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <EventsBrowser />
        </div>
      </section>
    </>
  );
}

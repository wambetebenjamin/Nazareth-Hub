"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { events, type EventItem } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prettyDate } from "@/lib/booking";

/** STEP 7 home section: three upcoming events. STEP 16 effect 7: stagger. */
export function HomeEvents() {
  const upcoming = events.slice(0, 3);

  return (
    <section className="ftco-section" aria-labelledby="home-events-heading">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          subheading="Events"
          title="What is on at"
          highlight="the Hub"
          description="Workshops, networking nights and pitch events, most of them free for members. RSVP takes ten seconds."
        />
        <h2 id="home-events-heading" className="sr-only">
          Upcoming events
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {upcoming.map((e: EventItem, i) => (
            <motion.article
              key={e.slug}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className="blog-entry flex flex-col"
            >
              <div className="relative h-44">
                <Image
                  src={e.image}
                  alt={e.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded bg-primary px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {e.type}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {prettyDate(e.date)}
                </p>
                <h3 className="mt-2 text-lg font-bold leading-snug text-heading">
                  {e.title}
                </h3>
                <p className="mt-2 flex-1 text-sm">{e.short}</p>
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-body">
                  <span className="inline-flex items-center gap-1">
                    <Clock3 size={13} aria-hidden="true" /> {e.time}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={13} aria-hidden="true" /> {e.location}
                  </span>
                </p>
                <Link
                  href={`/events/${e.slug}`}
                  className="btn btn-primary mt-5 px-5 py-2 text-sm"
                >
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={15} aria-hidden="true" />
                    RSVP
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link href="/events" className="btn btn-primary btn-outline-primary px-6 py-3 text-sm">
            See all events
          </Link>
        </p>
      </div>
    </section>
  );
}

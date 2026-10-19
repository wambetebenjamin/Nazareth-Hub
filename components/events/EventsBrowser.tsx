"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Clock3, MapPin, UsersRound } from "lucide-react";
import { eventTypes, type EventType } from "@/lib/data";
import { prettyDate } from "@/lib/booking";

type ApiEvent = {
  slug: string;
  title: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  short: string;
  capacity: number;
};

/** /events listing. Filters by type through GET /api/events. */
export function EventsBrowser() {
  const [filter, setFilter] = useState<"all" | EventType>("all");
  const [items, setItems] = useState<ApiEvent[] | null>(null);
  const [error, setError] = useState(false);

  const load = useCallback(async (type: string) => {
    setError(false);
    setItems(null);
    try {
      const res = await fetch(`/api/events?type=${encodeURIComponent(type)}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`http-${res.status}`);
      const data = (await res.json()) as { events: ApiEvent[] };
      setItems(data.events);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    void load(filter);
  }, [filter, load]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter events by type">
        <button
          type="button"
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            filter === "all"
              ? "bg-primary text-white"
              : "bg-white text-heading border border-black/10 hover:border-primary/60"
          }`}
        >
          All
        </button>
        {eventTypes.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilter(t)}
            aria-pressed={filter === t}
            className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition-colors ${
              filter === t
                ? "bg-primary text-white"
                : "bg-white text-heading border border-black/10 hover:border-primary/60"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-8 rounded-lg bg-white p-6 text-sm text-body" role="alert">
          We could not load the events list. Please refresh, or see the full calendar on
          the home page.
        </p>
      )}

      {!error && items === null && (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-72 animate-pulse rounded-lg bg-white/70" />
          ))}
        </div>
      )}

      {!error && items !== null && items.length === 0 && (
        <p className="mt-8 rounded-lg bg-white p-6 text-sm text-body">
          No events of this type are scheduled right now. Check back after the next
          community call.
        </p>
      )}

      {!error && items !== null && items.length > 0 && (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((e, i) => (
            <motion.article
              key={e.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              className="blog-entry flex flex-col"
            >
              <div className="relative h-44">
                <Image
                  src={
                    e.type === "workshop"
                      ? "/images/event-workshop-1.jpg"
                      : e.type === "networking"
                        ? "/images/event-networking.jpg"
                        : e.type === "pitch night"
                          ? "/images/event-pitch-1.jpg"
                          : "/images/amenity-rooftop.jpg"
                  }
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
                <h2 className="mt-2 text-lg font-bold leading-snug text-heading">{e.title}</h2>
                <p className="mt-2 flex-1 text-sm">{e.short}</p>
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-body">
                  <span className="inline-flex items-center gap-1">
                    <Clock3 size={13} aria-hidden="true" /> {e.time}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={13} aria-hidden="true" /> {e.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <UsersRound size={13} aria-hidden="true" /> {e.capacity} seats
                  </span>
                </p>
                <Link href={`/events/${e.slug}`} className="btn btn-primary mt-5 px-5 py-2 text-sm">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={15} aria-hidden="true" />
                    RSVP
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}

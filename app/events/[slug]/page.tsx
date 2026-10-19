import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3, MapPin, UsersRound } from "lucide-react";
import { events } from "@/lib/data";
import { prettyDate } from "@/lib/booking";
import { RsvpForm } from "@/components/events/RsvpForm";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return { title: "Event not found" };
  return {
    title: event.title,
    description: event.short,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <>
      <section className="hero-wrap" style={{ backgroundImage: `url('${event.image}')` }}>
        <div className="overlay" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[380px] max-w-7xl items-center px-4 py-24 lg:px-8">
          <div className="slider-text max-w-3xl">
            <span className="mb-4 inline-block rounded bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-darken">
              {event.type}
            </span>
            <h1 className="!text-[34px] md:!text-[46px]">{event.title}</h1>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/90">
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={15} aria-hidden="true" /> {prettyDate(event.date)}, {event.time}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} aria-hidden="true" /> {event.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <UsersRound size={15} aria-hidden="true" /> {event.capacity} seats
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="ftco-section">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              All events
            </Link>

            <h2 className="mt-6 text-2xl font-bold text-heading">About this event</h2>
            <p className="mt-3 text-[15px] leading-relaxed">{event.description}</p>

            {event.speakers && event.speakers.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-bold text-heading">Speakers and panel</h2>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                  {event.speakers.map((s) => (
                    <li
                      key={s.name}
                      className="rounded-lg border border-black/5 bg-white p-5 shadow-[0_5px_24px_rgba(0,0,0,0.05)]"
                    >
                      <p className="font-bold text-heading">{s.name}</p>
                      <p className="text-sm text-body">
                        {s.role}, {s.company}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="mt-10 text-2xl font-bold text-heading">Agenda</h2>
            <ol className="mt-4 space-y-3">
              {event.agenda.map((a) => (
                <li
                  key={a.time + a.item}
                  className="flex gap-4 rounded-lg bg-cloud p-4 text-sm"
                >
                  <span className="w-20 flex-none font-bold text-primary">{a.time}</span>
                  <span className="text-heading">{a.item}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="relative h-52 overflow-hidden rounded-xl">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <RsvpForm eventSlug={event.slug} eventTitle={event.title} />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

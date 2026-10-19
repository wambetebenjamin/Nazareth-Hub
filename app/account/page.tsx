import type { Metadata } from "next";
import Link from "next/link";
import {
  Armchair,
  CalendarClock,
  CreditCard,
  LockKeyhole,
  Ticket,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { listBookingsByEmail } from "@/lib/storage";
import { plans } from "@/lib/data";
import { formatKES, prettyDate } from "@/lib/booking";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Member dashboard",
  description:
    "Your Nazareth Hub dashboard: current plan, booking history, meeting room credits and upcoming bookings.",
};

const PLAN_CREDITS = 5; // Full-Time plan allowance per month

/** STEP 7 /account: session required. */
export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <>
        <PageHero crumb="Account" title="Your member dashboard" />
        <section className="ftco-section bg-light">
          <div className="mx-auto max-w-xl px-4 text-center lg:px-8">
            <span className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <LockKeyhole size={36} aria-hidden="true" />
            </span>
            <h2 className="text-3xl font-extrabold text-heading">Sign in to continue</h2>
            <p className="mt-3 text-[15px]">
              Your dashboard holds your plan, your bookings and your remaining meeting
              room credits.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Link href="/auth/signin" className="btn btn-primary px-6 py-3">
                Sign in
              </Link>
              <Link href="/auth/signup" className="btn btn-primary btn-outline-primary px-6 py-3">
                Create an account
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const email = session.user.email as string;
  const bookings = await listBookingsByEmail(email);
  const now = new Date();
  const monthKey = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const roomBookingsThisMonth = bookings.filter(
    (b) => b.kind === "meeting-room" && b.createdAt.startsWith(monthKey)
  ).length;
  const creditsLeft = Math.max(0, PLAN_CREDITS - roomBookingsThisMonth);
  const todayIso = now.toISOString().slice(0, 10);
  const upcoming = bookings.filter((b) => {
    const d = (b.payload?.date as string) || (b.payload?.startDate as string);
    return typeof d === "string" && d >= todayIso;
  });
  const plan = plans.find((p) => p.slug === "full-time")!;

  const cards = [
    {
      icon: CreditCard,
      label: "Current plan",
      value: plan.name,
      detail: `${plan.price} ${plan.cadence}. ${plan.hours}.`,
    },
    {
      icon: Ticket,
      label: "Meeting room credits",
      value: `${creditsLeft} of ${PLAN_CREDITS} left`,
      detail: `${roomBookingsThisMonth} used this calendar month. Credits reset on the 1st.`,
    },
    {
      icon: CalendarClock,
      label: "Upcoming bookings",
      value: String(upcoming.length),
      detail: upcoming.length ? "Listed below with dates and references." : "Nothing booked yet. Grab a desk.",
    },
    {
      icon: Armchair,
      label: "Lifetime bookings",
      value: String(bookings.length),
      detail: "Every desk, room, RSVP and enquiry on this account.",
    },
  ];

  return (
    <>
      <PageHero
        crumb="Account"
        title={`Karibu, ${session.user.name?.split(" ")[0] ?? "member"}`}
        intro="Your plan, your history and your credits, in one place."
        image="/images/space-openplan-2.jpg"
      />
      <section className="ftco-section bg-light">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  className="rounded-xl border border-black/5 bg-white p-6 shadow-[0_5px_24px_rgba(0,0,0,0.05)]"
                >
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-wider text-body">
                    {c.label}
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-heading">{c.value}</p>
                  <p className="mt-1 text-xs text-body">{c.detail}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-xl border border-black/5 bg-white p-7 shadow-[0_5px_24px_rgba(0,0,0,0.05)]">
              <h2 className="text-xl font-bold text-heading">Upcoming bookings</h2>
              {upcoming.length === 0 ? (
                <p className="mt-3 text-sm text-body">
                  Nothing upcoming.{" "}
                  <Link href="/booking" className="font-semibold text-primary underline">
                    Book a desk or a room
                  </Link>{" "}
                  and it will appear here.
                </p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {upcoming.map((b) => (
                    <li key={b.ref} className="rounded-lg bg-cloud p-4 text-sm">
                      <p className="font-bold text-heading">
                        {b.kind === "meeting-room"
                          ? `Meeting room: ${String(b.payload?.roomName ?? "")}`
                          : b.kind === "desk"
                            ? `Hot desk, ${b.payload?.desks} desk(s)`
                            : b.kind === "rsvp"
                              ? `Event: ${String(b.payload?.eventTitle ?? "")}`
                              : "Private office enquiry"}
                      </p>
                      <p className="text-xs text-body">
                        {prettyDate(String(b.payload?.date ?? b.payload?.startDate ?? b.createdAt.slice(0, 10)))}
                        {" | "}ref {b.ref}
                        {b.total !== null ? ` | ${formatKES(b.total)}` : ""}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-xl border border-black/5 bg-white p-7 shadow-[0_5px_24px_rgba(0,0,0,0.05)]">
              <h2 className="text-xl font-bold text-heading">Booking history</h2>
              {bookings.length === 0 ? (
                <p className="mt-3 text-sm text-body">
                  No bookings on this account yet.
                </p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="nh-table w-full text-sm">
                    <thead>
                      <tr>
                        <th scope="col">Reference</th>
                        <th scope="col">Type</th>
                        <th scope="col">Date</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b.ref}>
                          <td className="font-mono text-xs">{b.ref}</td>
                          <td className="capitalize">{b.kind.replace("-", " ")}</td>
                          <td className="text-body">{b.createdAt.slice(0, 10)}</td>
                          <td className="font-semibold text-primary">
                            {b.total === null ? "Free" : formatKES(b.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <p className="mt-4 text-xs text-body">
                Signed in as {email}.{" "}
                <Link href="/community" className="font-semibold text-primary underline">
                  Browse the member directory
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

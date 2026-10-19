import { DESK_DAY_RATE, DESK_WEEK_RATE, meetingRooms } from "./data";

/** Pricing math shared by the /booking form and the booking API routes. */

export function inclusiveDays(startISO: string, endISO: string): number {
  const start = new Date(`${startISO}T00:00:00Z`).getTime();
  const end = new Date(`${endISO}T00:00:00Z`).getTime();
  if (Number.isNaN(start) || Number.isNaN(end) || end < start) return 0;
  return Math.round((end - start) / 86_400_000) + 1;
}

/**
 * Hot desk total. Whole weeks are billed at the discounted weekly rate,
 * leftover days at the day rate.
 */
export function deskQuote(days: number, desks: number) {
  const weeks = Math.floor(days / 7);
  const leftover = days % 7;
  const perDesk = weeks * DESK_WEEK_RATE + leftover * DESK_DAY_RATE;
  return {
    days,
    desks,
    weeks,
    leftoverDays: leftover,
    perDesk,
    total: perDesk * desks,
  };
}

export function meetingRoomQuote(
  roomSlug: string,
  start: string,
  end: string
) {
  const room = meetingRooms.find((r) => r.slug === roomSlug);
  if (!room) return null;
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const minutes = eh * 60 + em - (sh * 60 + sm);
  if (minutes <= 0) return null;
  const hours = Math.ceil(minutes / 60);
  return { room, hours, total: hours * room.hourlyRate };
}

export function formatKES(n: number): string {
  return `KES ${n.toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;
}

export function prettyDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-KE", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

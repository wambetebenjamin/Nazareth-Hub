import { kv } from "@vercel/kv";

/**
 * Booking persistence.
 *
 * Primary store: Vercel KV (UPSTASH) when KV_REST_API_URL / KV_REST_API_TOKEN
 * are present. Fallback: a module level Map so the whole booking flow,
 * including /api/bookings/[ref] and /booking-confirmation, is fully testable in
 * local development and preview deployments with zero credentials.
 */

export type BookingRecord = {
  ref: string;
  kind: "desk" | "meeting-room" | "office-enquiry" | "rsvp";
  createdAt: string;
  email: string;
  name: string;
  payload: Record<string, unknown>;
  total: number | null;
  currency: "KES";
};

const memory = new Map<string, BookingRecord>();

export const kvConfigured = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

const keyFor = (ref: string) => `nazareth:booking:${ref}`;

export async function saveBooking(record: BookingRecord): Promise<void> {
  memory.set(record.ref, record);
  if (kvConfigured) {
    try {
      await kv.set(keyFor(record.ref), record, { ex: 60 * 60 * 24 * 180 });
    } catch (err) {
      console.warn("[storage] KV write failed, memory copy retained:", err);
    }
  }
}

export async function getBooking(ref: string): Promise<BookingRecord | null> {
  if (kvConfigured) {
    try {
      const hit = await kv.get<BookingRecord>(keyFor(ref));
      if (hit) return hit;
    } catch (err) {
      console.warn("[storage] KV read failed, falling back to memory:", err);
    }
  }
  return memory.get(ref) ?? null;
}

export async function listBookingsByEmail(
  email: string
): Promise<BookingRecord[]> {
  const all = [...memory.values()].filter(
    (b) => b.email.toLowerCase() === email.toLowerCase()
  );
  return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Reference format: NH-<base36 timestamp>-<4 random chars>, e.g. NH-M4X2K1-Q7FD */
export function makeRef(prefix = "NH"): string {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${t}-${r}`;
}

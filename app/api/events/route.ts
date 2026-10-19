import { NextResponse } from "next/server";
import { events, eventTypes } from "@/lib/data";

/** STEP 8: GET /api/events - returns the event list. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  const filtered =
    type && type !== "all"
      ? events.filter((e) => e.type === type)
      : events;

  return NextResponse.json({
    types: eventTypes,
    count: filtered.length,
    events: filtered.map((e) => ({
      slug: e.slug,
      title: e.title,
      type: e.type,
      date: e.date,
      time: e.time,
      location: e.location,
      short: e.short,
      capacity: e.capacity,
    })),
  });
}

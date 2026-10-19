import { NextResponse } from "next/server";
import { meetingRoomBookingSchema } from "@/lib/validations";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { meetingRoomQuote, prettyDate } from "@/lib/booking";
import { makeBooking } from "@/lib/bookings-service";

/**
 * STEP 8: POST /api/bookings/meeting-room
 * Accepts date, start, end, room, attendees. Returns a booking reference.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const parsed = meetingRoomBookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation-failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const captcha = await verifyRecaptcha(data.recaptchaToken, data.recaptchaKind);
  if (!captcha.ok) {
    return NextResponse.json(
      { error: "captcha-failed", reason: captcha.reason, score: captcha.score },
      { status: 403 }
    );
  }

  const quote = meetingRoomQuote(data.room, data.start, data.end);
  if (!quote) {
    return NextResponse.json(
      { error: "invalid-time-range", message: "End time must be after start time" },
      { status: 422 }
    );
  }

  if (data.attendees > quote.room.capacity) {
    return NextResponse.json(
      {
        error: "room-too-small",
        message: `${quote.room.name} seats ${quote.room.capacity}. Choose a larger room for ${data.attendees} attendees.`,
      },
      { status: 422 }
    );
  }

  const booking = await makeBooking({
    kind: "meeting-room",
    name: data.name,
    email: data.email,
    total: quote.total,
    payload: {
      date: data.date,
      start: data.start,
      end: data.end,
      room: quote.room.slug,
      roomName: quote.room.name,
      attendees: data.attendees,
      hours: quote.hours,
    },
    mailSubject: `Nazareth Hub meeting room booking, ${quote.room.name}`,
    mailBody: [
      `Karibu ${data.name},`,
      "",
      `Your meeting room is booked.`,
      `Room: ${quote.room.name} (${data.attendees} attendee${data.attendees > 1 ? "s" : ""})`,
      `Date: ${prettyDate(data.date)}`,
      `Time: ${data.start} to ${data.end} (${quote.hours} hour${quote.hours > 1 ? "s" : ""})`,
      `Total paid: KES ${quote.total.toLocaleString("en-KE")}`,
      "",
      `The display and whiteboard will be reset before you arrive.`,
    ].join("\n"),
  });

  return NextResponse.json(
    {
      ref: booking.ref,
      spaceType: "Meeting Room",
      room: quote.room.slug,
      roomName: quote.room.name,
      date: data.date,
      start: data.start,
      end: data.end,
      attendees: data.attendees,
      hours: quote.hours,
      total: quote.total,
      currency: "KES",
    },
    { status: 201 }
  );
}

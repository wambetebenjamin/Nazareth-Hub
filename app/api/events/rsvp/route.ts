import { NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/validations";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { events } from "@/lib/data";
import { prettyDate } from "@/lib/booking";
import { makeBooking } from "@/lib/bookings-service";

/** STEP 8: POST /api/events/rsvp - accepts eventId, name, email. reCAPTCHA verified. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const parsed = rsvpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation-failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const data = parsed.data;

  const captcha = await verifyRecaptcha(data.recaptchaToken, "v3");
  if (!captcha.ok) {
    return NextResponse.json(
      { error: "captcha-failed", reason: captcha.reason, score: captcha.score },
      { status: 403 }
    );
  }

  const event = events.find((e) => e.slug === data.eventId);
  if (!event) {
    return NextResponse.json({ error: "event-not-found" }, { status: 404 });
  }

  const booking = await makeBooking({
    kind: "rsvp",
    name: data.name,
    email: data.email,
    total: null,
    payload: { eventId: event.slug, eventTitle: event.title, eventDate: event.date },
    mailSubject: `RSVP confirmed: ${event.title}`,
    mailBody: [
      `Karibu ${data.name},`,
      "",
      `You are on the list for ${event.title}.`,
      `When: ${prettyDate(event.date)}, ${event.time}`,
      `Where: ${event.location}, Nazareth Hub`,
      "",
      `Arrive ten minutes early for registration and a coffee.`,
    ].join("\n"),
  });

  return NextResponse.json(
    { ref: booking.ref, event: event.slug, title: event.title, date: event.date },
    { status: 201 }
  );
}

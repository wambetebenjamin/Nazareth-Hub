import { NextResponse } from "next/server";
import { deskBookingSchema } from "@/lib/validations";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { deskQuote, inclusiveDays, prettyDate } from "@/lib/booking";
import { makeBooking } from "@/lib/bookings-service";

/**
 * STEP 8: POST /api/bookings/desk
 * Accepts dates and desk count, returns a booking reference.
 * reCAPTCHA verified (v3, v2 fallback below 0.5), confirmation by nodemailer.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const parsed = deskBookingSchema.safeParse(body);
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

  const days = inclusiveDays(data.startDate, data.endDate);
  if (days <= 0) {
    return NextResponse.json({ error: "invalid-date-range" }, { status: 422 });
  }

  const quote = deskQuote(days, data.desks);
  const booking = await makeBooking({
    kind: "desk",
    name: data.name,
    email: data.email,
    total: quote.total,
    payload: {
      startDate: data.startDate,
      endDate: data.endDate,
      days,
      desks: data.desks,
      quote: {
        weeks: quote.weeks,
        leftoverDays: quote.leftoverDays,
        perDesk: quote.perDesk,
      },
    },
    mailSubject: `Nazareth Hub desk booking ${quote.days} day${days > 1 ? "s" : ""}`,
    mailBody: [
      `Karibu ${data.name},`,
      "",
      `Your hot desk booking is confirmed.`,
      `Dates: ${prettyDate(data.startDate)} to ${prettyDate(data.endDate)} (${days} day${days > 1 ? "s" : ""})`,
      `Desks: ${data.desks}`,
      `Total paid: KES ${quote.total.toLocaleString("en-KE")}`,
      "",
      `Check in at the front desk, Savanna Business Plaza 4th Floor, from 7:00 am.`,
      `Questions? WhatsApp us any time.`,
    ].join("\n"),
  });

  return NextResponse.json(
    {
      ref: booking.ref,
      spaceType: "Hot Desk",
      startDate: data.startDate,
      endDate: data.endDate,
      days,
      desks: data.desks,
      total: quote.total,
      currency: "KES",
    },
    { status: 201 }
  );
}

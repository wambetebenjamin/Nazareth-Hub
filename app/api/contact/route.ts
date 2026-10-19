import { NextResponse } from "next/server";
import { contactSchema, officeEnquirySchema } from "@/lib/validations";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { makeBooking } from "@/lib/bookings-service";
import { prettyDate } from "@/lib/booking";

/**
 * STEP 8: POST /api/contact - reCAPTCHA verified, nodemailer.
 * Also carries private office enquiries (form: name, company, team size,
 * preferred move-in date, message) since STEP 8 defines no separate route.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const isOfficeEnquiry = body.teamSize !== undefined;

  if (isOfficeEnquiry) {
    const parsed = officeEnquirySchema.safeParse(body);
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

    const booking = await makeBooking({
      kind: "office-enquiry",
      name: data.name,
      email: data.email,
      total: null,
      payload: {
        company: data.company,
        teamSize: data.teamSize,
        moveInDate: data.moveInDate,
        message: data.message || "",
      },
      mailSubject: `Private office enquiry from ${data.company}`,
      mailBody: [
        `New private office enquiry.`,
        `Name: ${data.name}`,
        `Company: ${data.company}`,
        `Team size: ${data.teamSize}`,
        `Preferred move in: ${prettyDate(data.moveInDate)}`,
        `Message: ${data.message || "None provided"}`,
        "",
        `The spaces team replies within one working day.`,
      ].join("\n"),
    });

    return NextResponse.json({ ref: booking.ref, kind: "office-enquiry" }, { status: 201 });
  }

  const parsed = contactSchema.safeParse(body);
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

  const booking = await makeBooking({
    kind: "rsvp",
    name: data.name,
    email: data.email,
    total: null,
    payload: { subject: data.subject, message: data.message, channel: "contact-form" },
    mailSubject: `Contact: ${data.subject}`,
    mailBody: [
      `Message from ${data.name} (${data.email}).`,
      `Subject: ${data.subject}`,
      "",
      data.message,
    ].join("\n"),
  });

  return NextResponse.json({ ref: booking.ref, kind: "contact" }, { status: 201 });
}

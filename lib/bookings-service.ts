import { makeRef, saveBooking, type BookingRecord } from "./storage";
import { sendMail } from "./mailer";
import { WHATSAPP_LINK } from "./site";

/** Shared create-and-notify flow for every booking route. */
export async function makeBooking(input: {
  kind: BookingRecord["kind"];
  name: string;
  email: string;
  total: number | null;
  payload: Record<string, unknown>;
  mailSubject: string;
  mailBody: string;
}): Promise<BookingRecord> {
  const ref = makeRef();
  const record: BookingRecord = {
    ref,
    kind: input.kind,
    createdAt: new Date().toISOString(),
    email: input.email,
    name: input.name,
    payload: input.payload,
    total: input.total,
    currency: "KES",
  };

  await saveBooking(record);

  try {
    await sendMail({
      to: input.email,
      subject: input.mailSubject,
      text: `${input.mailBody}\n\nBooking reference: ${ref}\nWhatsApp: ${WHATSAPP_LINK}`,
      html: `
        <div style="font-family:Montserrat,Arial,sans-serif;color:#090f35;max-width:560px;margin:auto">
          <h2 style="color:#323edd">Nazareth Hub</h2>
          <p style="white-space:pre-line">${input.mailBody}</p>
          <p style="background:#f8f9fa;padding:12px;border-radius:6px">
            <strong>Booking reference:</strong> ${ref}
          </p>
          <p>
            <a href="${WHATSAPP_LINK}" style="color:#25d366;font-weight:700">
              Message us on WhatsApp
            </a>
          </p>
        </div>`,
    });
  } catch (err) {
    // A mail failure must not lose the booking.
    console.error("[bookings] mail send failed:", err);
  }

  return record;
}

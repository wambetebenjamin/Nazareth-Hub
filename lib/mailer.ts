import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

/**
 * Transactional email via nodemailer (STEP 8). When SMTP_* is unset the
 * transport falls back to a JSON stream so bookings still "send" and the
 * message is printed to the server log instead of the wire.
 */

let cached: Transporter | null = null;

export function getTransport(): { transport: Transporter; live: boolean } {
  const host = process.env.SMTP_HOST;
  if (host) {
    if (!cached) {
      cached = nodemailer.createTransport({
        host,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT || 587) === 465,
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
      });
    }
    return { transport: cached, live: true };
  }

  if (!cached) {
    cached = nodemailer.createTransport({ jsonTransport: true });
  }
  return { transport: cached, live: false };
}

export type MailPayload = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

/**
 * Defence in depth for the pinned nodemailer 6.10.1 (see README security note).
 * Subjects and header-adjacent fields are stripped of CR/LF so no caller can
 * inject headers, and recipients are single zod-validated addresses only.
 */
const stripHeaderInjection = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export async function sendMail(payload: MailPayload) {
  const { transport, live } = getTransport();
  const from =
    process.env.SMTP_FROM || "Nazareth Hub <bookings@nazarethhub.co.ke>";

  const info = await transport.sendMail({
    from,
    to: stripHeaderInjection(payload.to),
    subject: stripHeaderInjection(payload.subject),
    text: payload.text,
    html: payload.html,
  });

  if (!live) {
    console.info(
      `[mailer:jsonTransport] ${payload.subject} -> ${payload.to}\n${(
        info.message as string
      )?.slice(0, 400)}`
    );
  }

  return { messageId: info.messageId, live };
}

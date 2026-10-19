import { z } from "zod";
import { meetingRooms } from "./data";

/** Shared zod schemas for client forms and server routes (STEP 3 / STEP 8). */

export const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the date format YYYY-MM-DD");

export const time = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use the 24 hour format HH:MM");

export const emailField = z.string().email("Enter a valid email address");

const recaptchaToken = z.string().min(1).optional();

export const deskBookingSchema = z
  .object({
    name: z.string().min(2, "Tell us your name"),
    email: emailField,
    startDate: isoDate,
    endDate: isoDate,
    desks: z.coerce.number().int().min(1).max(40),
    recaptchaToken,
    recaptchaKind: z.enum(["v3", "v2"]).default("v3"),
  })
  .refine((v) => new Date(v.endDate) >= new Date(v.startDate), {
    message: "The end date must be on or after the start date",
    path: ["endDate"],
  });

export const meetingRoomBookingSchema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: emailField,
  date: isoDate,
  start: time,
  end: time,
  room: z.enum(meetingRooms.map((r) => r.slug) as [string, ...string[]]),
  attendees: z.coerce.number().int().min(1).max(16),
  recaptchaToken,
  recaptchaKind: z.enum(["v3", "v2"]).default("v3"),
});

export const officeEnquirySchema = z.object({
  name: z.string().min(2, "Tell us your name"),
  company: z.string().min(2, "Tell us your company name"),
  email: emailField,
  teamSize: z.coerce.number().int().min(1).max(50),
  moveInDate: isoDate,
  message: z.string().max(2000).optional().or(z.literal("")),
  recaptchaToken,
  recaptchaKind: z.enum(["v3", "v2"]).default("v3"),
});

export const rsvpSchema = z.object({
  eventId: z.string().min(1),
  name: z.string().min(2, "Tell us your name"),
  email: emailField,
  recaptchaToken: z.string().min(1),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: emailField,
  subject: z.string().min(3).max(120),
  message: z.string().min(10, "Please write at least 10 characters"),
  recaptchaToken: z.string().min(1),
});

export const recaptchaVerifySchema = z.object({
  token: z.string().min(1),
  kind: z.enum(["v3", "v2"]).default("v3"),
});

export const signupSchema = z.object({
  name: z.string().min(2),
  email: emailField,
  password: z.string().min(8, "Use at least 8 characters"),
  company: z.string().min(2).optional().or(z.literal("")),
  recaptchaToken: z.string().min(1),
});

export const signinSchema = z.object({
  email: emailField,
  password: z.string().min(1),
  recaptchaToken: z.string().min(1),
});

export type DeskBookingInput = z.infer<typeof deskBookingSchema>;
export type MeetingRoomBookingInput = z.infer<typeof meetingRoomBookingSchema>;
export type OfficeEnquiryInput = z.infer<typeof officeEnquirySchema>;
export type RsvpInput = z.infer<typeof rsvpSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

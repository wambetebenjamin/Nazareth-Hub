"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { isoDate, time, emailField } from "@/lib/validations";
import { zodResolver } from "@/lib/zod-resolver";
import { meetingRooms } from "@/lib/data";
import { meetingRoomQuote, formatKES, prettyDate } from "@/lib/booking";
import { useCaptchaSubmit } from "./useCaptchaSubmit";
import { RecaptchaV2Fallback } from "@/components/ui/ReCaptcha";
import { FieldError, FieldLabel } from "./FormField";
import { useBookingStore } from "@/store/booking";

const schema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: emailField,
  date: isoDate,
  start: time,
  end: time,
  room: z.enum(meetingRooms.map((r) => r.slug) as [string, ...string[]]),
  attendees: z.coerce.number().int().min(1).max(16),
});

type FormValues = z.infer<typeof schema>;

const today = () => new Date().toISOString().slice(0, 10);

export function MeetingRoomForm() {
  const router = useRouter();
  const setLast = useBookingStore((s) => s.setLast);
  const { state, submit, retryWithV2 } = useCaptchaSubmit("booking_meeting_room");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      date: today(),
      start: "09:00",
      end: "11:00",
      room: "nyika",
      attendees: 4,
    },
  });

  const date = watch("date");
  const start = watch("start");
  const end = watch("end");
  const room = watch("room");
  const quote = meetingRoomQuote(room, start, end);
  const chosen = meetingRooms.find((r) => r.slug === room);

  const onSubmit = handleSubmit(async (values) => {
    const result = await submit("/api/bookings/meeting-room", values);
    if (result.ok) {
      setLast({
        ref: String(result.data.ref),
        spaceType: "Meeting Room",
        detail: `${result.data.roomName} for ${values.attendees} attendee${values.attendees > 1 ? "s" : ""}`,
        date: values.date,
        time: `${values.start} to ${values.end}`,
        total: Number(result.data.total),
        currency: "KES",
        name: values.name,
        email: values.email,
        createdAt: new Date().toISOString(),
      });
      router.push("/booking-confirmation");
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 md:grid-cols-2">
      <div>
        <FieldLabel htmlFor="mr-name">Full name</FieldLabel>
        <input id="mr-name" className="form-control" placeholder="Daniel Kiprotich" {...register("name")} />
        <FieldError message={errors.name?.message} />
      </div>
      <div>
        <FieldLabel htmlFor="mr-email">Email</FieldLabel>
        <input id="mr-email" type="email" className="form-control" placeholder="you@company.co.ke" {...register("email")} />
        <FieldError message={errors.email?.message} />
      </div>
      <div>
        <FieldLabel htmlFor="mr-date">Date</FieldLabel>
        <input id="mr-date" type="date" min={today()} className="form-control" {...register("date")} />
        <FieldError message={errors.date?.message} />
      </div>
      <div>
        <FieldLabel htmlFor="mr-attendees">Attendees</FieldLabel>
        <input id="mr-attendees" type="number" min={1} max={16} className="form-control" {...register("attendees")} />
        <FieldError message={errors.attendees?.message} />
      </div>
      <div>
        <FieldLabel htmlFor="mr-start">Start time</FieldLabel>
        <input id="mr-start" type="time" className="form-control" {...register("start")} />
        <FieldError message={errors.start?.message} />
      </div>
      <div>
        <FieldLabel htmlFor="mr-end">End time</FieldLabel>
        <input id="mr-end" type="time" className="form-control" {...register("end")} />
        <FieldError message={errors.end?.message} />
      </div>

      <fieldset className="md:col-span-2">
        <legend className="mb-2 text-sm font-semibold text-heading">Choose a room</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {meetingRooms.map((r) => (
            <label
              key={r.slug}
              className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                room === r.slug
                  ? "border-primary bg-primary/5"
                  : "border-black/10 hover:border-primary/50"
              }`}
            >
              <input type="radio" value={r.slug} className="sr-only" {...register("room")} />
              <span className="block text-sm font-bold text-heading">{r.name}</span>
              <span className="block text-xs text-body">Seats {r.capacity}</span>
              <span className="block text-xs font-semibold text-primary">
                {formatKES(r.hourlyRate)} per hour
              </span>
            </label>
          ))}
        </div>
        <FieldError message={errors.room?.message} />
      </fieldset>

      <div className="rounded-lg bg-cloud p-5 md:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-body">Your total</p>
        <p className="mt-1 text-2xl font-extrabold text-primary">
          {quote ? formatKES(quote.total) : "Check your times"}
        </p>
        <p className="mt-1 text-sm">
          {quote
            ? `${quote.room.name} on ${prettyDate(date)}, ${start} to ${end}, ${quote.hours} hour${quote.hours > 1 ? "s" : ""}.`
            : "The end time must be after the start time."}
          {chosen && quote && Number(watch("attendees")) > chosen.capacity
            ? ` Note: ${chosen.name} seats ${chosen.capacity}.`
            : ""}
        </p>
      </div>

      {state.status === "needs-v2" && (
        <div className="md:col-span-2">
          <p className="text-sm text-body">{state.message}</p>
          <RecaptchaV2Fallback onToken={(t) => void retryWithV2(t)} />
        </div>
      )}
      {state.status === "error" && (
        <p role="alert" className="text-sm font-semibold text-[#dc3545] md:col-span-2">
          {state.message}
        </p>
      )}

      <div className="md:col-span-2">
        <button type="submit" disabled={state.status === "submitting"} className="btn btn-primary w-full px-6 py-3 disabled:opacity-60">
          {state.status === "submitting" ? "Reserving the room..." : "Confirm and book room"}
        </button>
        <p className="mt-2 text-center text-xs text-body">
          Protected by reCAPTCHA v3. A confirmation email and a WhatsApp link follow instantly.
        </p>
      </div>
    </form>
  );
}

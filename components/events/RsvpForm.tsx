"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PartyPopper } from "lucide-react";
import { emailField } from "@/lib/validations";
import { zodResolver } from "@/lib/zod-resolver";
import { useCaptchaSubmit } from "@/components/booking/useCaptchaSubmit";
import { RecaptchaV2Fallback } from "@/components/ui/ReCaptcha";
import { FieldError, FieldLabel } from "@/components/booking/FormField";

const schema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: emailField,
});

type FormValues = z.infer<typeof schema>;

export function RsvpForm({ eventSlug, eventTitle }: { eventSlug: string; eventTitle: string }) {
  const { state, submit, retryWithV2 } = useCaptchaSubmit("event_rsvp");
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    const result = await submit("/api/events/rsvp", {
      eventId: eventSlug,
      name: values.name,
      email: values.email,
    });
    if (result.ok) setConfirmed(String(result.data.ref));
  });

  if (confirmed) {
    return (
      <div className="rounded-xl border border-[#28a745]/30 bg-[#28a745]/5 p-8 text-center">
        <span className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#28a745]/15 text-[#28a745]">
          <PartyPopper size={30} aria-hidden="true" />
        </span>
        <h2 className="text-2xl font-extrabold text-heading">You are on the list</h2>
        <p className="mt-2 text-sm">
          Your RSVP reference is <strong className="text-primary">{confirmed}</strong>. A
          confirmation email with the agenda and a WhatsApp link is on its way.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-xl border border-black/5 bg-white p-8 shadow-[0_5px_24px_rgba(0,0,0,0.06)]"
    >
      <h2 className="text-2xl font-extrabold text-heading">RSVP to {eventTitle}</h2>
      <p className="mt-1 text-sm text-body">
        Ten seconds now saves your seat at the door.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="rsvp-name">Full name</FieldLabel>
          <input id="rsvp-name" className="form-control" placeholder="Lucy Njeri" {...register("name")} />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <FieldLabel htmlFor="rsvp-email">Email</FieldLabel>
          <input id="rsvp-email" type="email" className="form-control" placeholder="you@company.co.ke" {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      {state.status === "needs-v2" && (
        <div className="mt-4">
          <p className="text-sm text-body">{state.message}</p>
          <RecaptchaV2Fallback onToken={(t) => void retryWithV2(t)} />
        </div>
      )}
      {state.status === "error" && (
        <p role="alert" className="mt-4 text-sm font-semibold text-[#dc3545]">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className="btn btn-primary mt-6 w-full px-6 py-3 disabled:opacity-60"
      >
        {state.status === "submitting" ? "Reserving your seat..." : "RSVP now"}
      </button>
    </form>
  );
}

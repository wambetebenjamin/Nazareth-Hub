"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { isoDate, emailField } from "@/lib/validations";
import { zodResolver } from "@/lib/zod-resolver";
import { deskQuote, inclusiveDays, formatKES, prettyDate } from "@/lib/booking";
import { useCaptchaSubmit } from "./useCaptchaSubmit";
import { RecaptchaV2Fallback } from "@/components/ui/ReCaptcha";
import { FieldError, FieldLabel } from "./FormField";
import { useBookingStore } from "@/store/booking";

const schema = z
  .object({
    name: z.string().min(2, "Tell us your name"),
    email: emailField,
    startDate: isoDate,
    endDate: isoDate,
    desks: z.coerce.number().int().min(1).max(40),
  })
  .refine((v) => new Date(v.endDate) >= new Date(v.startDate), {
    message: "The end date must be on or after the start date",
    path: ["endDate"],
  });

type FormValues = z.infer<typeof schema>;

const today = () => new Date().toISOString().slice(0, 10);

export function DeskForm() {
  const router = useRouter();
  const setLast = useBookingStore((s) => s.setLast);
  const { state, submit, retryWithV2 } = useCaptchaSubmit("booking_desk");

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
      startDate: today(),
      endDate: today(),
      desks: 1,
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const desks = watch("desks");
  const days = inclusiveDays(startDate, endDate);
  const quote = deskQuote(days || 0, desks || 1);

  const onSubmit = handleSubmit(async (values) => {
    const result = await submit("/api/bookings/desk", values);
    if (result.ok) {
      setLast({
        ref: String(result.data.ref),
        spaceType: "Hot Desk",
        detail: `${values.desks} desk${values.desks > 1 ? "s" : ""} for ${days} day${days > 1 ? "s" : ""}`,
        date: values.startDate,
        endDate: values.endDate,
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
        <FieldLabel htmlFor="desk-name">Full name</FieldLabel>
        <input id="desk-name" className="form-control" placeholder="Amina Odhiambo" {...register("name")} />
        <FieldError message={errors.name?.message} />
      </div>
      <div>
        <FieldLabel htmlFor="desk-email">Email</FieldLabel>
        <input id="desk-email" type="email" className="form-control" placeholder="you@company.co.ke" {...register("email")} />
        <FieldError message={errors.email?.message} />
      </div>
      <div>
        <FieldLabel htmlFor="desk-start">First day</FieldLabel>
        <input id="desk-start" type="date" min={today()} className="form-control" {...register("startDate")} />
        <FieldError message={errors.startDate?.message} />
      </div>
      <div>
        <FieldLabel htmlFor="desk-end">Last day</FieldLabel>
        <input id="desk-end" type="date" min={startDate || today()} className="form-control" {...register("endDate")} />
        <FieldError message={errors.endDate?.message} />
      </div>
      <div>
        <FieldLabel htmlFor="desk-count">Number of desks</FieldLabel>
        <input id="desk-count" type="number" min={1} max={40} className="form-control" {...register("desks")} />
        <FieldError message={errors.desks?.message} />
      </div>

      <div className="rounded-lg bg-cloud p-5 md:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-body">Your total</p>
        <p className="mt-1 text-2xl font-extrabold text-primary">{formatKES(quote.total)}</p>
        <p className="mt-1 text-sm">
          {days} day{days === 1 ? "" : "s"} ({quote.weeks} week{quote.weeks === 1 ? "" : "s"} at{" "}
          {formatKES(6500)} plus {quote.leftoverDays} day{quote.leftoverDays === 1 ? "" : "s"} at{" "}
          {formatKES(1500)}) for {desks} desk{desks > 1 ? "s" : ""}.
        </p>
        {days > 0 && (
          <p className="mt-1 text-xs text-body">
            {prettyDate(startDate)} to {prettyDate(endDate)}
          </p>
        )}
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
          {state.status === "submitting" ? "Confirming your desks..." : "Confirm and book desks"}
        </button>
        <p className="mt-2 text-center text-xs text-body">
          Protected by reCAPTCHA v3. A confirmation email and a WhatsApp link follow instantly.
        </p>
      </div>
    </form>
  );
}

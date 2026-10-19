"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { isoDate, emailField } from "@/lib/validations";
import { zodResolver } from "@/lib/zod-resolver";
import { useCaptchaSubmit } from "./useCaptchaSubmit";
import { RecaptchaV2Fallback } from "@/components/ui/ReCaptcha";
import { FieldError, FieldLabel } from "./FormField";
import { useBookingStore } from "@/store/booking";
import { prettyDate } from "@/lib/booking";

/** Private office tab is enquiry only (STEP 7). */
const schema = z.object({
  name: z.string().min(2, "Tell us your name"),
  company: z.string().min(2, "Tell us your company name"),
  email: emailField,
  teamSize: z.coerce.number().int().min(1).max(50),
  moveInDate: isoDate,
  message: z.string().max(2000).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

const today = () => new Date().toISOString().slice(0, 10);

export function OfficeForm() {
  const router = useRouter();
  const setLast = useBookingStore((s) => s.setLast);
  const { state, submit, retryWithV2 } = useCaptchaSubmit("office_enquiry");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      teamSize: 4,
      moveInDate: today(),
      message: "",
    },
  });

  const moveInDate = watch("moveInDate");

  const onSubmit = handleSubmit(async (values) => {
    const result = await submit("/api/contact", values);
    if (result.ok) {
      setLast({
        ref: String(result.data.ref),
        spaceType: "Private Office Enquiry",
        detail: `${values.company}, team of ${values.teamSize}`,
        date: values.moveInDate,
        total: null,
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
        <FieldLabel htmlFor="of-name">Your name</FieldLabel>
        <input id="of-name" className="form-control" placeholder="Grace Wanjiru" {...register("name")} />
        <FieldError message={errors.name?.message} />
      </div>
      <div>
        <FieldLabel htmlFor="of-company">Company</FieldLabel>
        <input id="of-company" className="form-control" placeholder="Twende Digital" {...register("company")} />
        <FieldError message={errors.company?.message} />
      </div>
      <div>
        <FieldLabel htmlFor="of-email">Email</FieldLabel>
        <input id="of-email" type="email" className="form-control" placeholder="you@company.co.ke" {...register("email")} />
        <FieldError message={errors.email?.message} />
      </div>
      <div>
        <FieldLabel htmlFor="of-team">Team size</FieldLabel>
        <input id="of-team" type="number" min={1} max={50} className="form-control" {...register("teamSize")} />
        <FieldError message={errors.teamSize?.message} />
      </div>
      <div className="md:col-span-2">
        <FieldLabel htmlFor="of-movein">Preferred move in date</FieldLabel>
        <input id="of-movein" type="date" min={today()} className="form-control" {...register("moveInDate")} />
        <FieldError message={errors.moveInDate?.message} />
        {moveInDate && (
          <p className="mt-1 text-xs text-body">Target date: {prettyDate(moveInDate)}</p>
        )}
      </div>
      <div className="md:col-span-2">
        <FieldLabel htmlFor="of-message">Message</FieldLabel>
        <textarea
          id="of-message"
          rows={5}
          className="form-control"
          placeholder="Tell us about the team, the rooms you need and anything else we should prepare."
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
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
          {state.status === "submitting" ? "Sending your enquiry..." : "Send office enquiry"}
        </button>
        <p className="mt-2 text-center text-xs text-body">
          No payment now. The spaces team replies within one working day, by email and WhatsApp.
        </p>
      </div>
    </form>
  );
}

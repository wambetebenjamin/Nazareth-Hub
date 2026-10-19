"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Chrome, UserRoundPlus } from "lucide-react";
import { emailField } from "@/lib/validations";
import { zodResolver } from "@/lib/zod-resolver";
import { useRecaptcha } from "@/components/ui/ReCaptcha";
import { FieldError, FieldLabel } from "@/components/booking/FormField";

const schema = z.object({
  name: z.string().min(2, "Tell us your name"),
  company: z.string().optional().or(z.literal("")),
  email: emailField,
  password: z.string().min(8, "Use at least 8 characters"),
});

type FormValues = z.infer<typeof schema>;

export function SignUpForm({ googleEnabled }: { googleEnabled: boolean }) {
  const router = useRouter();
  const { getToken } = useRecaptcha("signup");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", company: "", email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setBusy(true);
    setError(null);
    try {
      const token = await getToken();
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, recaptchaToken: token.token }),
      });
      if (!res.ok) {
        const detail = (await res.json().catch(() => ({}))) as { message?: string };
        setError(detail.message || "We could not create that account. Please retry.");
        return;
      }
      const session = await signIn("credentials", {
        email: values.email,
        password: values.password,
        recaptchaToken: token.token,
        redirect: false,
      });
      if (session?.error) {
        router.push("/auth/signin");
        return;
      }
      router.push("/account");
      router.refresh();
    } catch {
      setError("Network error. Please retry.");
    } finally {
      setBusy(false);
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="su-name">Full name</FieldLabel>
          <input id="su-name" className="form-control" placeholder="Zawadi Mwangi" {...register("name")} />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <FieldLabel htmlFor="su-company">Company (optional)</FieldLabel>
          <input id="su-company" className="form-control" placeholder="Kifua Finance" {...register("company")} />
          <FieldError message={errors.company?.message} />
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="su-email">Email</FieldLabel>
        <input id="su-email" type="email" className="form-control" placeholder="you@company.co.ke" {...register("email")} />
        <FieldError message={errors.email?.message} />
      </div>
      <div>
        <FieldLabel htmlFor="su-password">Password</FieldLabel>
        <input id="su-password" type="password" className="form-control" placeholder="At least 8 characters" {...register("password")} />
        <FieldError message={errors.password?.message} />
      </div>

      {error && (
        <p role="alert" className="rounded-md bg-[#dc3545]/10 p-3 text-sm font-semibold text-[#dc3545]">
          {error}
        </p>
      )}

      <button type="submit" disabled={busy} className="btn btn-primary w-full px-6 py-3 disabled:opacity-60">
        <span className="inline-flex items-center gap-2">
          <UserRoundPlus size={17} aria-hidden="true" />
          {busy ? "Creating your account..." : "Create my account"}
        </span>
      </button>

      {googleEnabled && (
        <>
          <p className="text-center text-xs text-body">or</p>
          <button
            type="button"
            onClick={() => void signIn("google", { callbackUrl: "/account" })}
            className="btn btn-primary btn-outline-primary w-full px-6 py-3"
          >
            <span className="inline-flex items-center gap-2">
              <Chrome size={17} aria-hidden="true" />
              Sign up with Google
            </span>
          </button>
        </>
      )}
    </form>
  );
}

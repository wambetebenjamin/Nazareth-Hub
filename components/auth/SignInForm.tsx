"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Chrome, LogIn } from "lucide-react";
import { emailField } from "@/lib/validations";
import { zodResolver } from "@/lib/zod-resolver";
import { useRecaptcha } from "@/components/ui/ReCaptcha";
import { FieldError, FieldLabel } from "@/components/booking/FormField";
import { DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/site";

const schema = z.object({
  email: emailField,
  password: z.string().min(1, "Enter your password"),
});

type FormValues = z.infer<typeof schema>;

export function SignInForm({ googleEnabled }: { googleEnabled: boolean }) {
  const router = useRouter();
  const { getToken } = useRecaptcha("signin");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setBusy(true);
    setError(null);
    try {
      const token = await getToken();
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        recaptchaToken: token.token,
        redirect: false,
      });
      if (res?.error) {
        setError("We could not sign you in. Check your email and password, then retry.");
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
      <div>
        <FieldLabel htmlFor="si-email">Email</FieldLabel>
        <input id="si-email" type="email" className="form-control" placeholder="you@company.co.ke" {...register("email")} />
        <FieldError message={errors.email?.message} />
      </div>
      <div>
        <FieldLabel htmlFor="si-password">Password</FieldLabel>
        <input id="si-password" type="password" className="form-control" placeholder="Your password" {...register("password")} />
        <FieldError message={errors.password?.message} />
      </div>

      {error && (
        <p role="alert" className="rounded-md bg-[#dc3545]/10 p-3 text-sm font-semibold text-[#dc3545]">
          {error}
        </p>
      )}

      <button type="submit" disabled={busy} className="btn btn-primary w-full px-6 py-3 disabled:opacity-60">
        <span className="inline-flex items-center gap-2">
          <LogIn size={17} aria-hidden="true" />
          {busy ? "Signing in..." : "Sign in"}
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
              Continue with Google
            </span>
          </button>
        </>
      )}

      <p className="rounded-md bg-cloud p-3 text-xs text-body">
        Preview account: {DEMO_EMAIL} with password {DEMO_PASSWORD}.
      </p>
    </form>
  );
}

import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/validations";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { createUser, findUser } from "@/lib/users";

/** Creates a member account for the credentials provider. reCAPTCHA verified. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const parsed = signupSchema.safeParse(body);
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

  const existing = await findUser(data.email);
  if (existing) {
    return NextResponse.json(
      { error: "email-taken", message: "That email already has an account. Sign in instead." },
      { status: 409 }
    );
  }

  const user = await createUser({
    name: data.name,
    email: data.email,
    password: data.password,
    company: data.company || undefined,
  });

  return NextResponse.json(
    { ok: true, email: user.email, name: user.name },
    { status: 201 }
  );
}

import { NextResponse } from "next/server";
import { recaptchaVerifySchema } from "@/lib/validations";
import { verifyRecaptcha } from "@/lib/recaptcha";

/** STEP 8: POST /api/recaptcha/verify - token verification. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid-json" }, { status: 400 });
  }

  const parsed = recaptchaVerifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, reason: "invalid-payload", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const result = await verifyRecaptcha(parsed.data.token, parsed.data.kind);

  return NextResponse.json(result, { status: result.ok ? 200 : 403 });
}

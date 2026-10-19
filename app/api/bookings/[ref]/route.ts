import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getBooking } from "@/lib/storage";

/**
 * STEP 8: GET /api/bookings/[ref] - session gated.
 * Returns the booking only to the signed in member who owns it.
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ ref: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "unauthenticated", message: "Sign in to view a booking." },
      { status: 401 }
    );
  }

  const { ref } = await context.params;
  const booking = await getBooking(ref);

  if (!booking) {
    return NextResponse.json({ error: "not-found" }, { status: 404 });
  }

  if (booking.email.toLowerCase() !== session.user.email.toLowerCase()) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  return NextResponse.json(booking);
}

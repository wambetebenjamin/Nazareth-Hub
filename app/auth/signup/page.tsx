import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { googleEnabled } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Create your account",
  description: "Join Nazareth Hub: create a member account to book, RSVP and opt in to the directory.",
  robots: { index: false },
};

export default function SignUpPage() {
  return (
    <>
      <PageHero
        crumb="Sign up"
        title="Join three hundred members"
        image="/images/team-collaborating-2.jpg"
      />
      <section className="ftco-section bg-light">
        <div className="mx-auto max-w-md px-4 lg:px-8">
          <div className="rounded-xl border border-black/5 bg-white p-8 shadow-[0_5px_24px_rgba(0,0,0,0.06)]">
            <h1 className="text-2xl font-extrabold text-heading">Create your account</h1>
            <p className="mb-6 mt-1 text-sm text-body">
              Already a member?{" "}
              <Link href="/auth/signin" className="font-semibold text-primary underline">
                Sign in
              </Link>
              .
            </p>
            <SignUpForm googleEnabled={googleEnabled} />
          </div>
        </div>
      </section>
    </>
  );
}

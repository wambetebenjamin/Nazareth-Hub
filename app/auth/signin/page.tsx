import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SignInForm } from "@/components/auth/SignInForm";
import { googleEnabled } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Nazareth Hub member account.",
  robots: { index: false },
};

export default function SignInPage() {
  return (
    <>
      <PageHero
        crumb="Sign in"
        title="Welcome back to the Hub"
        image="/images/space-openplan-2.jpg"
      />
      <section className="ftco-section bg-light">
        <div className="mx-auto max-w-md px-4 lg:px-8">
          <div className="rounded-xl border border-black/5 bg-white p-8 shadow-[0_5px_24px_rgba(0,0,0,0.06)]">
            <h1 className="text-2xl font-extrabold text-heading">Sign in</h1>
            <p className="mb-6 mt-1 text-sm text-body">
              New here?{" "}
              <Link href="/auth/signup" className="font-semibold text-primary underline">
                Create an account
              </Link>
              .
            </p>
            <SignInForm googleEnabled={googleEnabled} />
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Check, Star } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { plans } from "@/lib/data";

export const metadata: Metadata = {
  title: "Membership plans",
  description:
    "Compare Day Pass, Flex, Full-Time and Team memberships at Nazareth Hub, Nairobi. Included hours, meeting room credits and amenities.",
};

export default function MembershipPage() {
  return (
    <>
      <PageHero
        crumb="Membership"
        title="Plans that scale with your week"
        intro="From a single day pass to five desks for your team. Every plan includes the fibre, the coffee bar and the community."
        image="/images/space-openplan-3.jpg"
      />

      <section className="ftco-section">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            subheading="Compare"
            title="Four plans,"
            highlight="one building"
            description="Hover a plan to lift it. Sign up takes five minutes and your badge is printed while you tour the floor."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <article
                key={plan.slug}
                className={`plan-card relative flex flex-col rounded-xl border bg-white p-7 ${
                  plan.highlight
                    ? "border-primary shadow-[0_18px_44px_rgba(50,62,221,0.18)]"
                    : "border-black/10"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-darken">
                    <Star size={12} aria-hidden="true" />
                    Most popular
                  </span>
                )}
                <h2 className="text-lg font-bold text-heading">{plan.name}</h2>
                <p className="mt-2">
                  <span className="text-3xl font-extrabold text-primary">{plan.price}</span>
                  <span className="ml-1 text-xs text-body">{plan.cadence}</span>
                </p>

                <dl className="mt-5 space-y-2 border-y border-black/5 py-4 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-body">Included hours</dt>
                    <dd className="text-right font-semibold text-heading">{plan.hours}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-body">Meeting room credits</dt>
                    <dd className="text-right font-semibold text-heading">{plan.roomCredits}</dd>
                  </div>
                </dl>

                <ul className="mt-4 flex-1 space-y-2 text-sm">
                  {plan.amenities.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <Check size={15} className="mt-1 flex-none text-secondary" aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/auth/signup"
                  className={`btn mt-6 w-full px-5 py-3 text-sm ${
                    plan.highlight ? "btn-primary" : "btn-primary btn-outline-primary"
                  }`}
                >
                  Sign Up
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-14 overflow-x-auto rounded-lg border border-black/5">
            <table className="nh-table w-full min-w-[720px] bg-white text-sm">
              <caption className="sr-only">Full membership comparison table</caption>
              <thead>
                <tr>
                  <th scope="col">Plan</th>
                  <th scope="col">Price</th>
                  <th scope="col">Included hours</th>
                  <th scope="col">Room credits</th>
                  <th scope="col">Best for</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((p) => (
                  <tr key={p.slug}>
                    <td className="font-bold text-heading">{p.name}</td>
                    <td className="font-semibold text-primary">
                      {p.price} <span className="text-xs text-body">{p.cadence}</span>
                    </td>
                    <td>{p.hours}</td>
                    <td>{p.roomCredits}</td>
                    <td className="text-body">
                      {p.slug === "day-pass" && "Visiting or trying us out"}
                      {p.slug === "flex" && "Freelancers with client days"}
                      {p.slug === "full-time" && "Solo founders and consultants"}
                      {p.slug === "team" && "Startups of three to five"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

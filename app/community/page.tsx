import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { auth } from "@/lib/auth";
import { members } from "@/lib/data";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Member directory",
  description:
    "The opt-in directory of Nazareth Hub members: freelancers, founders and remote teams working from Upper Hill, Nairobi.",
};

/** STEP 7 /community: session required. Members opt in to appear here. */
export default async function CommunityPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <>
        <PageHero
          crumb="Community"
          title="The member directory"
          intro="A members-only space where freelancers, startups and remote workers find each other."
          image="/images/team-collaborating.jpg"
        />
        <section className="ftco-section bg-light">
          <div className="mx-auto max-w-xl px-4 text-center lg:px-8">
            <span className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <LockKeyhole size={36} aria-hidden="true" />
            </span>
            <h2 className="text-3xl font-extrabold text-heading">Members only</h2>
            <p className="mt-3 text-[15px] leading-relaxed">
              The directory lists members who opted in, with their company, role and a
              short bio. Sign in with your member account to browse it, or join the Hub
              and add your own profile.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Link href="/auth/signin" className="btn btn-primary px-6 py-3">
                Sign in
              </Link>
              <Link href="/auth/signup" className="btn btn-primary btn-outline-primary px-6 py-3">
                Become a member
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        crumb="Community"
        title="Who you share the floor with"
        intro="Every profile below opted in. Say hello in the kitchen, or book a room and make it official."
        image="/images/team-collaborating.jpg"
      />
      <section className="ftco-section bg-light">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            subheading="Directory"
            title={`${members.length} members`}
            highlight="opted in"
            description={`Signed in as ${session.user.email}. Want your own card here? Opt in from your dashboard.`}
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => (
              <li
                key={m.name}
                className="flex flex-col rounded-xl border border-black/5 bg-white p-6 shadow-[0_5px_24px_rgba(0,0,0,0.05)]"
              >
                <div className="flex items-center gap-4">
                  <span className="relative h-16 w-16 flex-none overflow-hidden rounded-full">
                    <Image src={m.image} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                  <div>
                    <p className="font-bold text-heading">{m.name}</p>
                    <p className="text-sm text-primary">{m.role}</p>
                    <p className="text-xs text-body">{m.company}</p>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed">{m.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

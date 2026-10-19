"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Armchair, Camera } from "lucide-react";
import { site } from "@/lib/site";

/** STEP 16 effect 9: hero text reveal on load with GSAP. */
export function Hero() {
  const kicker = useRef<HTMLParagraphElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const ctas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.set([kicker.current, heading.current, sub.current, ctas.current], {
        opacity: 0,
        y: 34,
      });
      gsap.timeline({ delay: 0.25 })
        .to(kicker.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .to(heading.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .to(sub.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.45")
        .to(ctas.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="hero-wrap flex min-h-[88vh] items-center"
      style={{ backgroundImage: "url('/images/hero-coworking.jpg')" }}
    >
      <div className="overlay" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-28 lg:px-8">
        <div className="slider-text max-w-3xl">
          <p className="line mb-4" ref={kicker}>
            {site.serviceArea} coworking
          </p>
          <h1 ref={heading}>
            Work better.
            <br />
            Connect deeper.
          </h1>
          <p className="mt-5 max-w-xl" ref={sub}>
            Hot desks, private offices and meeting rooms on Uhuru Highway, Upper Hill.
            Gigabit fibre, 24/7 badge access and a community of freelancers, startups
            and remote teams who keep each other moving.
          </p>
          <div className="mt-8 flex flex-wrap gap-4" ref={ctas}>
            <Link href="/booking" className="btn btn-secondary-solid px-7 py-3">
              <span className="inline-flex items-center gap-2">
                <Armchair size={18} aria-hidden="true" />
                Book a Desk
              </span>
            </Link>
            <a href="#gallery" className="btn btn-outline-white px-7 py-3">
              <span className="inline-flex items-center gap-2">
                <Camera size={18} aria-hidden="true" />
                Tour the Space
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

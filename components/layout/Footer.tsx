import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { spaceTypes } from "@/lib/data";
import { CookieManager } from "./CookieManager";

/** Rebuilt on the zip `.ftco-footer.ftco-footer-2` structure (index.html:629). */
export function Footer() {
  return (
    <footer className="ftco-footer">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="ftco-footer-logo">
              {site.brandFirst}
              <span>{site.brandSecond}</span>
            </p>
            <p className="text-sm leading-relaxed">
              {site.tagline} A coworking home in {site.serviceArea} for freelancers,
              startups and remote teams who want fast fibre, good coffee and better
              company.
            </p>
            <ul className="ftco-footer-social mt-4 flex list-none gap-2">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                  >
                    <span className="text-xs font-bold">{s.label[0]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Our spaces</h2>
            <ul className="space-y-1 text-sm">
              {spaceTypes.map((s) => (
                <li key={s.slug}>
                  <Link href={`/spaces#${s.slug}`} className="py-1 hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/membership" className="py-1 hover:text-white">
                  Membership plans
                </Link>
              </li>
              <li>
                <Link href="/booking" className="py-1 hover:text-white">
                  Book a desk or room
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Community and legal</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/events" className="py-1 hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/community" className="py-1 hover:text-white">
                  Member directory
                </Link>
              </li>
              <li>
                <Link href="/account" className="py-1 hover:text-white">
                  Member dashboard
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy" className="py-1 hover:text-white">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="py-1 hover:text-white">
                  Terms and conditions
                </Link>
              </li>
              <li>
                <Link href="/legal/cookie-policy" className="py-1 hover:text-white">
                  Cookie policy
                </Link>
              </li>
              <li>
                <CookieManager />
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Have a question?</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="dbox">
                  <span className="icon">
                    <MapPin size={18} aria-hidden="true" />
                  </span>
                </span>
                <span className="pt-2">{site.address.full}</span>
              </li>
              <li className="flex gap-3">
                <span className="dbox">
                  <span className="icon">
                    <Phone size={18} aria-hidden="true" />
                  </span>
                </span>
                <a href={site.phoneHref} className="pt-2 hover:text-white">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <span className="dbox">
                  <span className="icon">
                    <MessageCircle size={18} aria-hidden="true" />
                  </span>
                </span>
                <a
                  href={site.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pt-2 hover:text-white"
                >
                  WhatsApp {site.whatsapp.display}
                </a>
              </li>
              <li className="flex gap-3">
                <span className="dbox">
                  <span className="icon">
                    <Mail size={18} aria-hidden="true" />
                  </span>
                </span>
                <a href={`mailto:${site.email}`} className="pt-2 hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/60">
          <p>
            Copyright &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="mt-1">
            Design adapted from the Colorlib{" "}
            <a
              href="https://colorlib.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              ITSolution
            </a>{" "}
            template, licensed CC BY 3.0. Built in Nairobi with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}

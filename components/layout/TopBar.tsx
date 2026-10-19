import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

/** Reproduced from the zip `.wrap` utility bar (index.html lines 21-38). */
export function TopBar() {
  return (
    <div className="wrap hidden md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-8">
        <p className="phone mb-0 flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <Phone size={12} aria-hidden="true" />
            <span className="mailus">Call or WhatsApp:</span>
            <a href={site.phoneHref} className="text-white hover:text-secondary">
              {site.phone}
            </a>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Mail size={12} aria-hidden="true" />
            <span className="mailus">or email us:</span>
            <a href={`mailto:${site.email}`} className="text-white hover:text-secondary">
              {site.email}
            </a>
          </span>
        </p>
        <div className="flex items-center gap-4">
          <p className="phone mb-0 inline-flex items-center gap-1.5">
            <MapPin size={12} aria-hidden="true" />
            {site.address.city}, {site.address.country}
          </p>
          <div className="flex items-center gap-2">
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-wide text-white/80 transition-colors hover:text-secondary"
              >
                {s.label.split(" ")[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

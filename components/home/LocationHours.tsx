import Link from "next/link";
import { Clock3, ExternalLink, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** STEP 7 location and hours: address, opening hours and a STATIC map image
 *  placeholder (inline SVG of the map area, deliberately not a live embed). */
export function LocationHours() {
  return (
    <section className="ftco-section bg-light" aria-labelledby="location-heading">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          subheading="Location and hours"
          title="Upper Hill,"
          highlight="five minutes from the CBD"
        />
        <h2 id="location-heading" className="sr-only">
          Location and hours
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="rounded-lg bg-white p-8 shadow-[0_5px_24px_rgba(0,0,0,0.06)]">
              <h3 className="flex items-center gap-2 text-lg font-bold text-heading">
                <MapPin size={18} className="text-primary" aria-hidden="true" />
                Find us
              </h3>
              <address className="mt-3 not-italic text-[15px] leading-relaxed">
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.city}, {site.address.country}
              </address>
              <p className="mt-4 text-sm">
                Matatu stage: Upper Hill, route 8 or 32. Parking: basement, first two
                hours free with validation at the front desk.
              </p>

              <h3 className="mt-8 flex items-center gap-2 text-lg font-bold text-heading">
                <Clock3 size={18} className="text-primary" aria-hidden="true" />
                Opening hours
              </h3>
              <dl className="mt-3 divide-y divide-black/5 text-sm">
                {site.hours.map((h) => (
                  <div key={h.label} className="flex justify-between gap-4 py-2.5">
                    <dt className="font-semibold text-heading">{h.label}</dt>
                    <dd className="text-body">{h.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Upper+Hill+Nairobi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary px-5 py-2 text-sm"
                >
                  <span className="inline-flex items-center gap-2">
                    Get directions
                    <ExternalLink size={14} aria-hidden="true" />
                  </span>
                </a>
                <Link href="/booking" className="btn btn-primary btn-outline-primary px-5 py-2 text-sm">
                  Book a tour
                </Link>
              </div>
            </div>
          </div>

          <div>
            <figure className="static-map h-full min-h-[380px]">
              <svg
                viewBox="0 0 640 460"
                role="img"
                aria-label="Static map of Upper Hill, Nairobi showing Nazareth Hub on Uhuru Highway"
                className="h-full w-full"
              >
                <rect width="640" height="460" fill="#eef1f7" />
                {/* parkland */}
                <rect x="430" y="20" width="190" height="150" rx="14" fill="#dcebd8" />
                <text x="452" y="100" fontSize="14" fill="#5d7a55" fontFamily="Montserrat, Arial, sans-serif">
                  Uhuru Gardens
                </text>
                {/* river */}
                <path
                  d="M0 380 C 120 350, 200 410, 320 385 S 560 350, 640 375"
                  fill="none"
                  stroke="#bcd6e8"
                  strokeWidth="14"
                />
                {/* roads */}
                <g stroke="#ffffff" strokeWidth="26" strokeLinecap="round">
                  <path d="M60 0 L150 460" />
                  <path d="M0 210 L640 170" />
                  <path d="M330 0 L400 460" />
                  <path d="M0 60 L640 90" />
                </g>
                <g stroke="#d7dce6" strokeWidth="2" strokeDasharray="6 8">
                  <path d="M60 0 L150 460" />
                  <path d="M0 210 L640 170" />
                  <path d="M330 0 L400 460" />
                </g>
                {/* blocks */}
                <g fill="#e3e7ef">
                  <rect x="180" y="100" width="110" height="70" rx="6" />
                  <rect x="200" y="240" width="100" height="80" rx="6" />
                  <rect x="430" y="210" width="120" height="90" rx="6" />
                  <rect x="90" y="250" width="70" height="70" rx="6" />
                </g>
                <text x="182" y="196" fontSize="12" fill="#8b93a5" fontFamily="Montserrat, Arial, sans-serif">
                  Uhuru Highway
                </text>
                <text x="340" y="40" fontSize="12" fill="#8b93a5" fontFamily="Montserrat, Arial, sans-serif">
                  Haile Selassie Rd
                </text>
                {/* hub block + pin */}
                <rect x="215" y="250" width="70" height="60" rx="6" fill="#323edd" opacity="0.15" />
                <g transform="translate(250,238)">
                  <path
                    d="M0 -34 C -16 -34 -26 -22 -26 -10 C -26 6 0 30 0 30 C 0 30 26 6 26 -10 C 26 -22 16 -34 0 -34 Z"
                    fill="#323edd"
                  />
                  <circle cx="0" cy="-12" r="9" fill="#ffffff" />
                </g>
                <text
                  x="250"
                  y="322"
                  fontSize="15"
                  fontWeight="700"
                  textAnchor="middle"
                  fill="#090f35"
                  fontFamily="Montserrat, Arial, sans-serif"
                >
                  Nazareth Hub
                </text>
                <text
                  x="250"
                  y="340"
                  fontSize="11"
                  textAnchor="middle"
                  fill="#5b6472"
                  fontFamily="Montserrat, Arial, sans-serif"
                >
                  Savanna Business Plaza, 4th Floor
                </text>
              </svg>
              <figcaption className="border-t border-black/5 bg-white p-3 text-xs text-body">
                Static map of the map area around Upper Hill. Live navigation opens in
                Google Maps.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

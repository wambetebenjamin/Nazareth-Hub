import type { Metadata, Viewport } from "next";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { VoiceTour } from "@/components/ui/VoiceTour";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { site, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.name} is a ${site.businessType.toLowerCase()} in ${site.serviceArea}. Hot desks from KES 1,500 a day, private offices, meeting rooms by the hour, fast fibre and 24/7 access.`,
  keywords: [
    "coworking Nairobi",
    "coworking space Kenya",
    "hot desk Nairobi",
    "meeting room Nairobi",
    "private office Upper Hill",
    "virtual office Nairobi",
  ],
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: `Hot desks, private offices and meeting rooms in ${site.serviceArea}.`,
    url: SITE_URL,
    siteName: site.name,
    images: [{ url: "/images/hero-coworking.jpg", width: 1536, height: 864 }],
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: `Hot desks, private offices and meeting rooms in ${site.serviceArea}.`,
    images: ["/images/hero-coworking.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090f35",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SmoothScroll>
          <TopBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <LoadingScreen />
          <CookieConsent />
          <WhatsAppButton />
          <VoiceTour />
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

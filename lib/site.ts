/**
 * Nazareth Hub - single source of truth for brand identity (STEP 2).
 */

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254112272061";

export const WHATSAPP_MESSAGE =
  "Hello Nazareth Hub, I would like to book a desk or meeting room or ask about membership.";

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const site = {
  name: "Nazareth Hub",
  brandFirst: "Nazareth",
  brandSecond: "Hub",
  tagline: "Work better. Connect deeper.",
  businessType:
    "Coworking space with hot desks, private offices, and meeting rooms",
  serviceArea: "Nairobi, Kenya",
  email: "hello@nazarethhub.co.ke",
  phone: "+254 112 272 061",
  phoneHref: "tel:+254112272061",
  address: {
    line1: "Savanna Business Plaza, 4th Floor",
    line2: "Uhuru Highway, Upper Hill",
    city: "Nairobi",
    country: "Kenya",
    full: "Savanna Business Plaza, 4th Floor, Uhuru Highway, Upper Hill, Nairobi, Kenya",
  },
  hours: [
    { label: "Monday to Friday", value: "7:00 am to 8:00 pm" },
    { label: "Saturday", value: "8:00 am to 6:00 pm" },
    { label: "Sunday and public holidays", value: "9:00 am to 4:00 pm" },
    { label: "Full-Time and Team members", value: "24/7 badge access" },
  ],
  whatsapp: {
    display: "+254 112 272 061",
    number: WHATSAPP_NUMBER,
    link: WHATSAPP_LINK,
    tooltip: "Chat with us on WhatsApp",
  },
  social: [
    { label: "X (Twitter)", href: "https://x.com/nazarethhub" },
    { label: "Instagram", href: "https://instagram.com/nazarethhub" },
    { label: "LinkedIn", href: "https://linkedin.com/company/nazarethhub" },
    { label: "Facebook", href: "https://facebook.com/nazarethhub" },
  ],
  stats: [
    { value: 120, suffix: "", label: "Desk capacity" },
    { value: 340, suffix: "+", label: "Active members" },
    { value: 86, suffix: "", label: "Events hosted" },
    { value: 24, suffix: "/7", label: "Member access" },
  ],
} as const;

export const voiceTourScript = `Welcome to Nazareth Hub, Nairobi's coworking space built for freelancers, startups, and remote teams. We offer hot desks, private offices, and meeting rooms with fast fibre internet, 24/7 access, and a community of ambitious professionals. Book a desk for a day or sign up for a monthly plan. We would love to have you work with us.`;

export const CONSENT_STORAGE_KEY = "nazareth_hub_consent";

/** Preview credentials so the member area is reachable before SMTP/KV exist. */
export const DEMO_EMAIL = "demo@nazarethhub.co.ke";
export const DEMO_PASSWORD = "demo1234";

export const metadataBase = SITE_URL;

import type { LucideIcon } from "lucide-react";
import {
  Wifi,
  Clock3,
  LockKeyhole,
  Printer,
  PhoneCall,
  Trees,
  Coffee,
  UsersRound,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Space types (home cards + /spaces detail)                           */
/* ------------------------------------------------------------------ */

export type SpaceType = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  imageAlt: string;
  rateLabel: string;
  price: string;
  priceNote: string;
  capacity: string;
  features: string[];
  pricing: { plan: string; price: string; note: string }[];
};

export const spaceTypes: SpaceType[] = [
  {
    slug: "hot-desk",
    name: "Hot Desk",
    short: "Drop in, plug in, get to work.",
    description:
      "A seat in our sunlit open plan whenever you need one. Grab any free desk, connect to the fibre, and join the hum of the floor. Perfect for freelancers and remote workers who like variety.",
    image: "/images/space-openplan.jpg",
    imageAlt: "Bright open plan coworking floor with long communal desks",
    rateLabel: "Daily and monthly rates",
    price: "KES 1,500",
    priceNote: "per desk per day",
    capacity: "1 person per desk",
    features: [
      "Any available desk in the open plan",
      "Gigabit fibre Wi-Fi and wired ethernet",
      "Free flowing coffee, tea and filtered water",
      "Access to phone booths for calls",
      "Community events and member directory",
    ],
    pricing: [
      { plan: "Day pass", price: "KES 1,500", note: "7:00 am to 8:00 pm" },
      { plan: "Weekly (5 days)", price: "KES 6,500", note: "Save KES 1,000" },
      { plan: "Monthly (unlimited days)", price: "KES 18,000", note: "Weekday hours" },
    ],
  },
  {
    slug: "dedicated-desk",
    name: "Dedicated Desk",
    short: "Your own desk, your own monitor, left exactly how you like it.",
    description:
      "A reserved desk in a shared studio that stays yours. Leave your monitor, your mug and your half finished sketchbook right where they are. Lockable storage keeps everything safe overnight.",
    image: "/images/space-openplan-3.jpg",
    imageAlt: "Reserved desks in a shared studio with ergonomic chairs",
    rateLabel: "Monthly rate",
    price: "KES 25,000",
    priceNote: "per desk per month",
    capacity: "1 person per desk",
    features: [
      "Reserved desk with dual monitor arm",
      "Lockable pedestal and locker storage",
      "24/7 badge access for Full-Time members",
      "4 meeting room credits every month",
      "Business address and mail handling",
    ],
    pricing: [
      { plan: "Monthly", price: "KES 25,000", note: "Includes 4 room credits" },
      { plan: "Quarterly", price: "KES 71,000", note: "Two months at a discount" },
      { plan: "Annual", price: "KES 264,000", note: "Two months free" },
    ],
  },
  {
    slug: "private-office",
    name: "Private Office",
    short: "A lockable, branded room for your whole team.",
    description:
      "Fully furnished private offices for teams of two to twenty, with glass frontage onto the main floor, your logo on the door, and a lease that scales with your headcount.",
    image: "/images/space-private-office.jpg",
    imageAlt: "Private glass fronted office furnished for a small team",
    rateLabel: "Monthly rate",
    price: "KES 65,000",
    priceNote: "from, per office per month",
    capacity: "2 to 20 people",
    features: [
      "Lockable, sound treated private suite",
      "Furniture, fibre and utilities included",
      "Company signage on the door and directory",
      "10 meeting room credits every month",
      "Registered business address and mail handling",
    ],
    pricing: [
      { plan: "Studio (2 to 4 people)", price: "KES 65,000", note: "Per month" },
      { plan: "Suite (5 to 9 people)", price: "KES 120,000", note: "Per month" },
      { plan: "Floor (10 to 20 people)", price: "KES 210,000", note: "Per month" },
    ],
  },
  {
    slug: "meeting-room",
    name: "Meeting Room",
    short: "Book by the hour, walk in to a room that is ready.",
    description:
      "Three bookable rooms with 4K displays, whiteboard walls and video conferencing. Hourly billing starts the moment your booking begins and the kettle is always on.",
    image: "/images/space-meeting-room.jpg",
    imageAlt: "Meeting room with a large display and whiteboard wall",
    rateLabel: "Hourly rate",
    price: "KES 2,500",
    priceNote: "per hour, from",
    capacity: "4 to 16 people",
    features: [
      "4K display with HDMI and wireless casting",
      "Video conferencing camera and speakerphone",
      "Full height whiteboard wall and markers",
      "Unlimited filter coffee and water for attendees",
      "On demand booking with instant confirmation",
    ],
    pricing: [
      { plan: "Nyika (4 to 6 people)", price: "KES 2,500", note: "Per hour" },
      { plan: "Safari (8 to 10 people)", price: "KES 3,500", note: "Per hour" },
      { plan: "Summit (12 to 16 people)", price: "KES 5,000", note: "Per hour" },
    ],
  },
  {
    slug: "event-space",
    name: "Event Space",
    short: "The rooftop and the main floor, dressed for your crowd.",
    description:
      "Host a launch, a meetup or a training day for up to 120 guests. We handle chairs, sound, projection and the coffee bar so you can focus on your audience.",
    image: "/images/amenity-rooftop.jpg",
    imageAlt: "Rooftop terrace set up for an evening community event",
    rateLabel: "Half day and full day rates",
    price: "KES 45,000",
    priceNote: "per day, from",
    capacity: "Up to 120 people",
    features: [
      "Rooftop terrace or main floor configuration",
      "PA system, two wireless mics and projector",
      "Registration desk and signage support",
      "Coffee bar and catering partners on request",
      "Load in from 7:00 am on event day",
    ],
    pricing: [
      { plan: "Half day (4 hours)", price: "KES 28,000", note: "Up to 60 guests" },
      { plan: "Full day", price: "KES 45,000", note: "Up to 120 guests" },
      { plan: "Evening (5 pm to 10 pm)", price: "KES 35,000", note: "Rooftop, 80 guests" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Amenities grid (home)                                               */
/* ------------------------------------------------------------------ */

export type Amenity = { icon: LucideIcon; title: string; detail: string };

export const amenities: Amenity[] = [
  { icon: Wifi, title: "High speed fibre", detail: "1 Gbps symmetric fibre with mesh Wi-Fi on every floor and wired drops at dedicated desks." },
  { icon: Clock3, title: "24/7 access", detail: "Full-Time and Team members badge in any hour of any day, including public holidays." },
  { icon: LockKeyhole, title: "Locker storage", detail: "Steel lockers in every studio for laptops, files and gym kits, with overnight CCTV cover." },
  { icon: Printer, title: "Printing services", detail: "Mono and colour printing, scanning and binding. First 100 pages free every month." },
  { icon: PhoneCall, title: "Phone booths", detail: "Eight acoustic booths with power, a stool and a door that actually closes, for calls that matter." },
  { icon: Trees, title: "Rooftop terrace", detail: "A planted rooftop with shade sails and city views, open for work, lunches and evening mixers." },
  { icon: Coffee, title: "Kitchen and coffee bar", detail: "Barista grade espresso, Kenyan filter roast, cold water on tap and a fridge for your lunch." },
  { icon: UsersRound, title: "Community events", detail: "Workshops, pitch nights and networking mixers every week, free or discounted for members." },
];

/* ------------------------------------------------------------------ */
/* Events (/events, /events/[slug], home preview)                      */
/* ------------------------------------------------------------------ */

export type EventType = "workshop" | "networking" | "pitch night" | "social";

export type EventItem = {
  slug: string;
  title: string;
  type: EventType;
  date: string; // ISO
  time: string;
  location: string;
  short: string;
  description: string;
  image: string;
  agenda: { time: string; item: string }[];
  speakers?: { name: string; role: string; company: string }[];
  capacity: number;
};

export const events: EventItem[] = [
  {
    slug: "founders-pitch-night",
    title: "Founders Pitch Night, October edition",
    type: "pitch night",
    date: "2026-10-29",
    time: "6:00 pm to 9:00 pm",
    location: "Rooftop terrace",
    short: "Six Nairobi founders, five minutes each, in front of a panel of angel investors.",
    description:
      "Our flagship pitch night returns. Six early stage founders get five minutes on the rooftop stage and five minutes of questions from a panel of Nairobi angel investors and ecosystem builders. The audience votes for the community favourite, who opens our December demo day. Drinks from the coffee bar, networking until late.",
    image: "/images/event-pitch-1.jpg",
    agenda: [
      { time: "6:00 pm", item: "Doors open, registration and drinks" },
      { time: "6:30 pm", item: "Welcome and community announcements" },
      { time: "6:45 pm", item: "Founder pitches, six slots of five minutes" },
      { time: "7:45 pm", item: "Investor panel feedback" },
      { time: "8:15 pm", item: "Community vote and open networking" },
    ],
    speakers: [
      { name: "Wanjiku Kamau", role: "Managing Partner", company: "Savanna Angels" },
      { name: "Peter Mbugua", role: "Head of Programs", company: "Nairobi Seed Fund" },
    ],
    capacity: 90,
  },
  {
    slug: "freelancers-networking-mixer",
    title: "Freelancers Networking Mixer",
    type: "networking",
    date: "2026-11-05",
    time: "5:30 pm to 8:30 pm",
    location: "Kitchen and coffee bar",
    short: "A relaxed evening for independent consultants, designers and developers to swap referrals.",
    description:
      "Freelancing is better with friends. Join sixty plus independent professionals for structured speed introductions, a referral wall and a short talk on pricing your work in shillings and dollars. Bring business cards, leave with three new collaborators.",
    image: "/images/event-networking.jpg",
    agenda: [
      { time: "5:30 pm", item: "Arrival, name tags and coffee" },
      { time: "6:00 pm", item: "Speed introductions, rounds of four" },
      { time: "7:00 pm", item: "Talk: pricing freelance work with confidence" },
      { time: "7:30 pm", item: "Referral wall and open mingling" },
    ],
    capacity: 60,
  },
  {
    slug: "ai-tools-for-small-business",
    title: "Workshop: AI tools for small business",
    type: "workshop",
    date: "2026-11-12",
    time: "9:00 am to 1:00 pm",
    location: "Summit meeting room",
    short: "A hands on morning putting practical AI tools to work on invoicing, marketing and support.",
    description:
      "A practical, laptop required workshop. We work through four real workflows: drafting proposals, cleaning customer data, answering support email and building a simple internal bot. No hype, no jargon, just tools you can bill for on Monday. Limited to sixteen seats so everyone gets help.",
    image: "/images/event-workshop-1.jpg",
    agenda: [
      { time: "9:00 am", item: "Setup, accounts and safety basics" },
      { time: "9:45 am", item: "Workflow one: proposals and invoices" },
      { time: "10:45 am", item: "Tea break" },
      { time: "11:00 am", item: "Workflow two: marketing and support" },
      { time: "12:15 pm", item: "Clinic: bring your own problem" },
    ],
    speakers: [
      { name: "Grace Wanjiru", role: "Product Designer", company: "Twende Digital" },
    ],
    capacity: 16,
  },
  {
    slug: "rooftop-sunset-social",
    title: "Rooftop Sunset Social",
    type: "social",
    date: "2026-11-20",
    time: "5:00 pm to 9:00 pm",
    location: "Rooftop terrace",
    short: "Music, mocktails and the best view of the Nairobi skyline after the rains.",
    description:
      "Once a month we close the laptops early. A resident DJ, a mocktail bar, board games and the skyline. Members bring one guest free. This is the night new members meet old ones and deals get made by accident.",
    image: "/images/amenity-rooftop.jpg",
    agenda: [
      { time: "5:00 pm", item: "Doors open, resident DJ set one" },
      { time: "6:30 pm", item: "Mocktail hour at the bar" },
      { time: "7:30 pm", item: "Sunset photos and board games" },
    ],
    capacity: 120,
  },
  {
    slug: "startup-funding-clinic",
    title: "Startup Funding Clinic with Savanna Angels",
    type: "workshop",
    date: "2026-11-26",
    time: "2:00 pm to 6:00 pm",
    location: "Safari meeting room",
    short: "Thirty minute one on one sessions between member startups and two investment committees.",
    description:
      "Book a thirty minute slot with either Savanna Angels or Nairobi Seed Fund. Bring your deck and your numbers. Slots are allocated first come, first served to Nazareth Hub members, and every session ends with written feedback whether or not there is a term sheet.",
    image: "/images/event-workshop-2.jpg",
    agenda: [
      { time: "2:00 pm", item: "Clinic slots begin, thirty minutes each" },
      { time: "4:00 pm", item: "Group debrief and term sheet basics" },
      { time: "5:00 pm", item: "Open office hours" },
    ],
    speakers: [
      { name: "Wanjiku Kamau", role: "Managing Partner", company: "Savanna Angels" },
      { name: "Peter Mbugua", role: "Head of Programs", company: "Nairobi Seed Fund" },
    ],
    capacity: 24,
  },
  {
    slug: "women-in-tech-brunch",
    title: "Women in Tech Brunch",
    type: "social",
    date: "2026-12-05",
    time: "10:00 am to 1:00 pm",
    location: "Kitchen and coffee bar",
    short: "Brunch, mentorship circles and a candid conversation on negotiating equity.",
    description:
      "A quarterly brunch for women building technology in Nairobi. Mentorship circles of six, a keynote on negotiating equity and salary, and a brunch menu from our kitchen. Allies welcome as guests of members.",
    image: "/images/team-women.jpg",
    agenda: [
      { time: "10:00 am", item: "Brunch and welcome" },
      { time: "10:45 am", item: "Keynote: negotiating equity that lasts" },
      { time: "11:30 am", item: "Mentorship circles" },
      { time: "12:30 pm", item: "Commitments and closing" },
    ],
    speakers: [
      { name: "Lucy Njeri", role: "Product Manager", company: "Haraka Health" },
    ],
    capacity: 50,
  },
];

export const eventTypes: EventType[] = [
  "workshop",
  "networking",
  "pitch night",
  "social",
];

/* ------------------------------------------------------------------ */
/* Membership plans (/membership)                                      */
/* ------------------------------------------------------------------ */

export type Plan = {
  slug: string;
  name: string;
  price: string;
  cadence: string;
  hours: string;
  roomCredits: string;
  highlight?: boolean;
  amenities: string[];
};

export const plans: Plan[] = [
  {
    slug: "day-pass",
    name: "Day Pass",
    price: "KES 1,500",
    cadence: "per day",
    hours: "1 day, 7:00 am to 8:00 pm",
    roomCredits: "None",
    amenities: [
      "Any free hot desk",
      "Gigabit fibre Wi-Fi",
      "Coffee, tea and water",
      "Phone booth access",
      "Community events at guest rate",
    ],
  },
  {
    slug: "flex",
    name: "Flex",
    price: "KES 12,000",
    cadence: "per month",
    hours: "10 days per month, 7:00 am to 8:00 pm",
    roomCredits: "2 hours per month",
    amenities: [
      "Any free hot desk on your days",
      "Gigabit fibre Wi-Fi and ethernet",
      "Coffee, tea and water",
      "Locker storage",
      "50 pages of printing monthly",
      "Member directory listing",
    ],
  },
  {
    slug: "full-time",
    name: "Full-Time",
    price: "KES 25,000",
    cadence: "per month",
    hours: "Unlimited, 24/7 badge access",
    roomCredits: "5 hours per month",
    highlight: true,
    amenities: [
      "Dedicated desk with monitor arm",
      "24/7 badge access",
      "Lockable pedestal and locker",
      "Business address and mail handling",
      "100 pages of printing monthly",
      "All community events included",
    ],
  },
  {
    slug: "team",
    name: "Team",
    price: "KES 95,000",
    cadence: "per month",
    hours: "5 desks, unlimited, 24/7 badge access",
    roomCredits: "15 hours per month",
    amenities: [
      "Five dedicated desks in one studio",
      "24/7 badge access for the team",
      "Private phone booth reservation",
      "Registered business address",
      "500 pages of printing monthly",
      "Branding on the member wall",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Community directory (/community) and member logos                   */
/* ------------------------------------------------------------------ */

export type Member = {
  name: string;
  company: string;
  role: string;
  bio: string;
  image: string;
};

export const members: Member[] = [
  {
    name: "Amina Odhiambo",
    company: "Safari Analytics",
    role: "Data Scientist",
    bio: "Builds forecasting models for East African retailers. Hosts the monthly data clinic.",
    image: "/images/person-amina.jpg",
  },
  {
    name: "Daniel Kiprotich",
    company: "Maziwa Labs",
    role: "Backend Engineer",
    bio: "Keeps the payments rails running for dairy cooperatives across the Rift Valley.",
    image: "/images/person-daniel.jpg",
  },
  {
    name: "Grace Wanjiru",
    company: "Twende Digital",
    role: "Product Designer",
    bio: "Designs mobile first products for SACCOs. Runs our AI tools workshop series.",
    image: "/images/person-grace.jpg",
  },
  {
    name: "Zawadi Mwangi",
    company: "Kifua Finance",
    role: "Founder",
    bio: "Building a savings app for informal traders. Pitch night community favourite, 2025.",
    image: "/images/person-zawadi.jpg",
  },
  {
    name: "Brian Otieno",
    company: "Jenga Studios",
    role: "Creative Director",
    bio: "Leads a four person brand studio on the fourth floor. Curates the member wall.",
    image: "/images/person-daniel-2.jpg",
  },
  {
    name: "Lucy Njeri",
    company: "Haraka Health",
    role: "Product Manager",
    bio: "Ships telehealth features for county clinics. Chairs the women in tech brunch.",
    image: "/images/person-couple.jpg",
  },
];

export const memberLogos = [
  "Safari Analytics",
  "Maziwa Labs",
  "Twende Digital",
  "Kifua Finance",
  "Jenga Studios",
  "Haraka Health",
];

/* ------------------------------------------------------------------ */
/* Testimonials (home)                                                 */
/* ------------------------------------------------------------------ */

export const testimonials = [
  {
    quote:
      "I moved my whole consultancy onto the fourth floor after one day pass. The fibre never blinks, the coffee is genuinely good, and my clients think the rooftop is my own building.",
    name: "Amina",
    company: "Safari Analytics",
    image: "/images/person-amina-2.jpg",
  },
  {
    quote:
      "We hired three engineers in six months and the Team plan just absorbed them. Desks appeared, credits appeared, nobody chased us for paperwork. That is the whole review.",
    name: "Brian",
    company: "Jenga Studios",
    image: "/images/person-daniel-2.jpg",
  },
  {
    quote:
      "Pitch night on the rooftop is where we met our first investor. Nine months later we signed our term sheet in the Summit room, same building, same coffee.",
    name: "Zawadi",
    company: "Kifua Finance",
    image: "/images/person-zawadi.jpg",
  },
];

/* ------------------------------------------------------------------ */
/* Gallery masonry (home)                                              */
/* ------------------------------------------------------------------ */

export type GalleryImage = { src: string; alt: string; span: string };

export const gallery: GalleryImage[] = [
  { src: "/images/space-openplan.jpg", alt: "Open plan coworking floor in morning light", span: "row-span-2" },
  { src: "/images/space-meeting-room.jpg", alt: "Safari meeting room set for a client session", span: "" },
  { src: "/images/person-amina.jpg", alt: "Member working on a laptop by the window", span: "" },
  { src: "/images/amenity-rooftop.jpg", alt: "Rooftop terrace at golden hour", span: "row-span-2" },
  { src: "/images/space-private-office.jpg", alt: "Private office suite with glass frontage", span: "" },
  { src: "/images/team-collaborating.jpg", alt: "Team collaborating around a shared table", span: "" },
  { src: "/images/amenity-coffee.jpg", alt: "Coffee bar counter with espresso machine", span: "" },
  { src: "/images/event-pitch-1.jpg", alt: "Founder presenting at rooftop pitch night", span: "row-span-2" },
  { src: "/images/space-plants.jpg", alt: "Plant filled breakout corner", span: "" },
  { src: "/images/person-grace.jpg", alt: "Designer sketching in a phone booth", span: "" },
  { src: "/images/space-glass-office.jpg", alt: "Glass walled office overlooking the floor", span: "" },
  { src: "/images/event-networking.jpg", alt: "Members networking at an evening mixer", span: "" },
];

/* ------------------------------------------------------------------ */
/* Virtual office package (home)                                       */
/* ------------------------------------------------------------------ */

export const virtualOffice = {
  title: "Virtual Office",
  kicker: "A Nairobi address without the Nairobi rent",
  description:
    "Register your company at Savanna Business Plaza, Upper Hill, without leasing a single square metre. We receive and scan your mail, answer your calls in your company name, and give you a boardroom for the days that actually need one.",
  includes: [
    "Prestigious Upper Hill business address for registration and correspondence",
    "Mail received, logged and scanned to your inbox within one working day",
    "Dedicated phone line answered in your company name",
    "8 meeting room credits per quarter for face to face days",
    "Access to the event space at member rates for AGMs and launches",
  ],
  price: "KES 9,500",
  priceNote: "per month, no deposit",
};

/* ------------------------------------------------------------------ */
/* Booking configuration (/booking and API routes)                     */
/* ------------------------------------------------------------------ */

export const DESK_DAY_RATE = 1500;
export const DESK_WEEK_RATE = 6500;

export const meetingRooms = [
  { slug: "nyika", name: "Nyika", capacity: 6, hourlyRate: 2500 },
  { slug: "safari", name: "Safari", capacity: 10, hourlyRate: 3500 },
  { slug: "summit", name: "Summit", capacity: 16, hourlyRate: 5000 },
] as const;

export const KES = (n: number) =>
  `KES ${n.toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;

import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { site, CONSENT_STORAGE_KEY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "What cookies and local storage Nazareth Hub uses, why, and how to change your choice.",
};

const ROWS = [
  {
    category: "Necessary",
    storage: "Session cookie, auth token",
    purpose: "Keeps you signed in and protects forms from abuse. Always on.",
    duration: "Session, or 30 days for the signed in cookie",
  },
  {
    category: "Necessary",
    storage: `localStorage: ${CONSENT_STORAGE_KEY}`,
    purpose: "Remembers the cookie choice you made in the banner.",
    duration: "Until you change it",
  },
  {
    category: "Functional",
    storage: "sessionStorage: nazareth_hub_last_booking",
    purpose: "Holds your most recent booking so the confirmation page can show it.",
    duration: "Until the tab closes",
  },
  {
    category: "Analytics",
    storage: "First party analytics cookie",
    purpose: "Anonymous counts of pages visited, used to plan rooms and events.",
    duration: "Only while consent is granted",
  },
  {
    category: "Marketing",
    storage: "Campaign measurement cookie",
    purpose: "Tells us which adverts led to a tour booking.",
    duration: "Only while consent is granted",
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalShell crumb="Cookie policy" title="Cookie policy" updated="1 October 2026">
      <p>
        This policy explains the cookies and browser storage used by {site.name}, and
        how to control them. It should be read with our privacy policy.
      </p>

      <h2>1. The consent banner</h2>
      <p>
        On your first visit a fixed banner asks for your choice across four categories:
        Necessary, Functional, Analytics and Marketing. Necessary cannot be switched off
        because the site cannot operate without it. Your choice is stored on this device
        under the key <code>{CONSENT_STORAGE_KEY}</code> and you can change it at any
        time using the Manage cookies link in the footer.
      </p>

      <h2>2. What we store, category by category</h2>
      <div className="overflow-x-auto">
        <table className="nh-table w-full min-w-[640px] bg-white text-sm">
          <caption className="sr-only">Cookies and storage by category</caption>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Storage</th>
              <th scope="col">Purpose</th>
              <th scope="col">Duration</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.storage + r.category}>
                <td className="font-semibold text-heading">{r.category}</td>
                <td className="font-mono text-xs">{r.storage}</td>
                <td className="text-body">{r.purpose}</td>
                <td className="text-body">{r.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>3. Third party cookies</h2>
      <p>
        Google reCAPTCHA sets a cookie when a form is submitted, to tell humans from
        bots. This is a necessary security measure and is not used for advertising.
        Where Google OAuth is used to sign in, Google sets its own session cookies
        under its own policy.
      </p>

      <h2>4. Your rights</h2>
      <p>
        Under the Data Protection Act, 2019 consent must be freely given, specific and
        informed, and as easy to withdraw as to give. Withdrawing analytics or marketing
        consent stops those scripts on your next page load and does not affect your
        bookings or membership.
      </p>

      <h2>5. Contact</h2>
      <p>
        Questions about cookies: {site.email} or WhatsApp {site.whatsapp.display}.
      </p>
    </LegalShell>
  );
}

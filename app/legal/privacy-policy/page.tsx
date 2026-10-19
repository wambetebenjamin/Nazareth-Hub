import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Nazareth Hub collects, uses and protects personal data under the Kenya Data Protection Act, 2019.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalShell crumb="Privacy policy" title="Privacy policy" updated="1 October 2026">
      <p>
        Nazareth Hub (data controller) operates a coworking space at {site.address.full}.
        This policy explains what personal data we collect, why we collect it, and the
        rights you hold under the Data Protection Act, 2019 (Kenya).
      </p>

      <h2>1. Data we collect</h2>
      <ul>
        <li>Identity and contact data: name, email address, company and phone number you give us when booking, enquiring or registering.</li>
        <li>Booking data: dates, desk counts, room choices, attendee counts and booking references.</li>
        <li>Account data: your name, email and a scrypt hash of your password. We never store plain text passwords.</li>
        <li>Event data: RSVPs, dietary notes you volunteer, and photographs only where you consent at the door.</li>
        <li>Technical data: anonymous usage counts, device type and pages visited, only if you accept analytics cookies.</li>
      </ul>

      <h2>2. Lawful bases and purposes</h2>
      <ul>
        <li>Performance of a contract: processing bookings, memberships and invoices.</li>
        <li>Legitimate interest: keeping premises secure, preventing fraud and spam, and improving the space.</li>
        <li>Consent: marketing emails, analytics and the member directory, each withdrawable at any time.</li>
        <li>Legal obligation: retaining tax and invoice records as required by Kenyan law.</li>
      </ul>

      <h2>3. Who we share data with</h2>
      <p>
        We share the minimum necessary with processors who run our infrastructure:
        hosting and serverless functions, email delivery, KV storage, and reCAPTCHA for
        spam prevention. We do not sell personal data, and we do not share member
        contact details with other members unless you opt in to the directory.
      </p>

      <h2>4. Retention</h2>
      <p>
        Booking records are kept for 180 days after the booking date, then deleted.
        Invoice records are kept for seven years as required by the Tax Procedures Act.
        Directory profiles exist only while your membership and opt in remain active.
      </p>

      <h2>5. Your rights under the Data Protection Act, 2019</h2>
      <ul>
        <li>Access: request a copy of the personal data we hold about you.</li>
        <li>Rectification: correct inaccurate data.</li>
        <li>Erasure: request deletion where no legal retention duty applies.</li>
        <li>Objection and restriction: object to processing based on legitimate interest.</li>
        <li>Portability: receive your data in a structured, machine readable format.</li>
        <li>Complaint: lodge a complaint with the Office of the Data Protection Commissioner, Kenya.</li>
      </ul>

      <h2>6. Security</h2>
      <p>
        All traffic is served over HTTPS with HSTS. Passwords are salted and hashed with
        scrypt. Access to production data is limited to two named staff members and is
        logged.
      </p>

      <h2>7. Contact the data controller</h2>
      <p>
        Email {site.email}, call {site.phone}, or write to the Data Protection Officer,
        Nazareth Hub, {site.address.full}. We respond within thirty days, as the Act
        requires.
      </p>
    </LegalShell>
  );
}

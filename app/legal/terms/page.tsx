import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "The terms on which Nazareth Hub provides desks, offices, meeting rooms and event space in Nairobi.",
};

export default function TermsPage() {
  return (
    <LegalShell crumb="Terms" title="Terms and conditions" updated="1 October 2026">
      <p>
        These terms govern your use of Nazareth Hub, {site.address.full}, and every
        booking, membership and enquiry made through this website. By booking a desk,
        room or office you accept these terms.
      </p>

      <h2>1. Bookings and confirmation</h2>
      <p>
        A booking is confirmed when we issue a booking reference on the confirmation
        page and by email. Hot desk and meeting room totals are calculated at the rates
        shown at the time of booking and include all amenities listed for that space
        type.
      </p>

      <h2>2. Rates and payment</h2>
      <ul>
        <li>Hot desks are billed per desk per day, with whole weeks at the weekly rate.</li>
        <li>Meeting rooms are billed per commenced hour at the rate of the chosen room.</li>
        <li>Private offices and the Team plan are billed monthly in advance.</li>
        <li>All rates are in Kenya Shillings and are exclusive of VAT where applicable.</li>
      </ul>

      <h2>3. Cancellations and changes</h2>
      <ul>
        <li>Meeting rooms: free cancellation up to 24 hours before the start time.</li>
        <li>Hot desks: free cancellation up to 24 hours before the first day.</li>
        <li>Monthly plans: one calendar month of notice, given in writing.</li>
        <li>No shows on meeting rooms are charged in full.</li>
      </ul>

      <h2>4. House rules</h2>
      <ul>
        <li>Badge access is personal and must not be shared or lent.</li>
        <li>Phone booths are for calls, not for full day occupation.</li>
        <li>Food belongs in the kitchen and the rooftop, not at open plan desks.</li>
        <li>Members are responsible for their guests and for their conduct.</li>
        <li>24/7 access may be suspended during declared emergencies or maintenance.</li>
      </ul>

      <h2>5. Acceptable use</h2>
      <p>
        The space and the network may not be used for anything unlawful under Kenyan
        law, for activities that disturb other members, or for reselling desk space
        without written permission. We may suspend access immediately for breach.
      </p>

      <h2>6. Liability</h2>
      <p>
        We maintain insurance for the building and common areas. Members insure their
        own equipment. To the extent permitted by law, our aggregate liability for any
        claim arising from use of the space is limited to the fees paid in the month of
        the claim. Nothing in these terms limits liability for death or personal injury
        caused by negligence.
      </p>

      <h2>7. Events and photographs</h2>
      <p>
        Event capacity is fixed for fire safety and RSVPs close when reached. Where an
        event is photographed, signage is posted at the door and anyone who prefers not
        to appear may ask the host for a coloured lanyard.
      </p>

      <h2>8. Governing law</h2>
      <p>
        These terms are governed by the laws of the Republic of Kenya. Disputes are
        first referred to good faith negotiation, then to the courts of Nairobi.
      </p>
    </LegalShell>
  );
}

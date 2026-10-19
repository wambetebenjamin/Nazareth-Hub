import { Hero } from "@/components/home/Hero";
import { SpaceTypes } from "@/components/home/SpaceTypes";
import { StatsBand } from "@/components/home/StatsBand";
import { Amenities } from "@/components/home/Amenities";
import { Community } from "@/components/home/Community";
import { VirtualOffice } from "@/components/home/VirtualOffice";
import { HomeEvents } from "@/components/home/HomeEvents";
import { Gallery } from "@/components/home/Gallery";
import { Testimonials } from "@/components/home/Testimonials";
import { LocationHours } from "@/components/home/LocationHours";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SpaceTypes />
      <StatsBand />
      <Amenities />
      <Community />
      <VirtualOffice />
      <HomeEvents />
      <Gallery />
      <Testimonials />
      <LocationHours />
    </>
  );
}

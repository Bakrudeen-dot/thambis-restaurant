import type { Metadata } from "next";
import Location from "@/components/Location";
import PageHero from "@/components/PageHero";
import Reviews from "@/components/Reviews";

export const metadata: Metadata = {
  title: "Contact & Location — Al Malaz, Riyadh",
  description: "Visit Thambis Restaurant & Cafe at Al Shawiar, Al Malaz, Riyadh 12831. Call or WhatsApp 059 797 4906, or get directions.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero page="contact" image="/images/dining-atmosphere.jpg" alt="Dining atmosphere at Thambis Restaurant & Cafe" />
      <Location />
      <Reviews />
    </>
  );
}

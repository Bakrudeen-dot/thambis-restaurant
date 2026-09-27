import type { Metadata } from "next";
import FinalCTA from "@/components/FinalCTA";
import Gallery from "@/components/Gallery";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Gallery — Tamil Food Photography",
  description: "Dosa, banana leaf meals, biryani, Chicken 65, filter coffee and the dining room at Thambis Restaurant & Cafe, Riyadh.",
  alternates: { canonical: "/gallery" },
  openGraph: { url: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero page="gallery" image="/images/banana-leaf-meals.jpg" alt="South Indian meals on banana leaf" />
      <Gallery variant="full" />
      <FinalCTA />
    </>
  );
}

import type { Metadata } from "next";
import Experience from "@/components/Experience";
import FinalCTA from "@/components/FinalCTA";
import FoodStory from "@/components/FoodStory";
import MealsSection from "@/components/MealsSection";
import PageHero from "@/components/PageHero";
import WhyThambis from "@/components/WhyThambis";

export const metadata: Metadata = {
  title: "Our Story — Tamil Cuisine in Riyadh",
  description:
    "From Tamil Nadu to Riyadh: Thambis Restaurant & Cafe has served authentic Tamil and South Indian flavours in Al Malaz for more than three years.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero page="about" image="/images/restaurant-interior.jpg" alt="Warm interior of Thambis Restaurant & Cafe" />
      <FoodStory />
      <Experience />
      <MealsSection />
      <WhyThambis />
      <FinalCTA />
    </>
  );
}

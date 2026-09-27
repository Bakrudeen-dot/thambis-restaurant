import CafeSection from "@/components/CafeSection";
import Experience from "@/components/Experience";
import FinalCTA from "@/components/FinalCTA";
import FoodStory from "@/components/FoodStory";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Location from "@/components/Location";
import MealsSection from "@/components/MealsSection";
import MenuPreview from "@/components/MenuPreview";
import NonVegSection from "@/components/NonVegSection";
import Reviews from "@/components/Reviews";
import SignatureDishes from "@/components/SignatureDishes";
import WhyThambis from "@/components/WhyThambis";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Experience />
      <SignatureDishes />
      <MenuPreview />
      <FoodStory />
      <MealsSection />
      <NonVegSection />
      <CafeSection />
      <Gallery />
      <WhyThambis />
      <Reviews />
      <Location />
      <FinalCTA />
    </>
  );
}

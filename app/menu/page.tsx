import type { Metadata } from "next";
import FinalCTA from "@/components/FinalCTA";
import JsonLd from "@/components/JsonLd";
import MenuPreview from "@/components/MenuPreview";
import PageHero from "@/components/PageHero";
import { menuJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Menu — Dosa, Meals, Biryani & Filter Coffee",
  description:
    "Explore the Thambis menu: dosa, idli & vada, South Indian meals, chicken and mutton biryani, parotta, kothu, Tamil snacks, filter coffee and desserts in Al Malaz, Riyadh.",
  alternates: { canonical: "/menu" },
  openGraph: { url: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <JsonLd data={menuJsonLd()} />
      <PageHero page="menu" image="/images/masala-dosa.jpg" alt="Masala dosa with sambar and chutneys on banana leaf" />
      <MenuPreview variant="full" />
      <FinalCTA />
    </>
  );
}

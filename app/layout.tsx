import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/manrope";
import "@fontsource-variable/noto-sans-tamil";
import "@fontsource-variable/noto-serif-tamil";
import "@fontsource-variable/noto-kufi-arabic";
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-700.css";
import "./globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import MobileBottomBar from "@/components/MobileBottomBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { restaurantConfig } from "@/data/restaurantConfig";
import { LanguageProvider, languageBootScript } from "@/lib/i18n";
import { restaurantJsonLd } from "@/lib/seo";

const title = "Thambis Restaurant & Cafe | Authentic Tamil Food in Riyadh";
const description =
  "Authentic Tamil and South Indian food in Al Malaz, Riyadh — crisp dosa, banana leaf meals, biryani, kothu parotta and filter coffee. Serving Riyadh for 3+ years.";

export const metadata: Metadata = {
  metadataBase: new URL(restaurantConfig.siteUrl),
  title: { default: title, template: "%s | Thambis Restaurant & Cafe" },
  description,
  keywords: [
    "Tamil restaurant Riyadh",
    "Tamil food Riyadh",
    "South Indian restaurant Riyadh",
    "Tamil cuisine Riyadh",
    "Dosa Riyadh",
    "Tamil meals Riyadh",
    "Indian restaurant Al Malaz",
  ],
  applicationName: restaurantConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: restaurantConfig.name,
    title,
    description,
    locale: "en_US",
    alternateLocale: ["ar_SA", "ta_IN"],
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Tamil food spread at Thambis Restaurant & Cafe, Riyadh" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: true },
  category: "restaurant",
};

export const viewport: Viewport = {
  themeColor: "#14100E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageBootScript }} />
        <JsonLd data={restaurantJsonLd()} />
      </head>
      <body>
        <LanguageProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileBottomBar />
          <WhatsAppButton variant="floating" />
        </LanguageProvider>
      </body>
    </html>
  );
}

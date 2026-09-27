import { categories, menuItems } from "@/data/menu";
import { fullAddress, hasOpeningHours, restaurantConfig as c } from "@/data/restaurantConfig";

const dayMap = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" } as const;

/** Restaurant (a LocalBusiness subtype) structured data — only confirmed facts. */
export function restaurantJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    "@id": `${c.siteUrl}/#restaurant`,
    name: c.name,
    alternateName: c.shortName,
    url: c.siteUrl,
    image: [`${c.siteUrl}/images/og-image.jpg`],
    telephone: c.phoneE164,
    servesCuisine: ["Tamil", "South Indian", "Indian"],
    description: "Established Tamil and South Indian restaurant & cafe in Al Malaz, Riyadh — dosa, South Indian meals, biryani, parotta, kothu and filter coffee.",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${c.address.street}, ${c.address.district}`,
      addressLocality: c.address.city,
      postalCode: c.address.postalCode,
      addressCountry: c.address.countryCode,
    },
    hasMenu: `${c.siteUrl}/menu`,
    acceptsReservations: false,
    areaServed: { "@type": "City", name: "Riyadh" },
    sameAs: Object.values(c.socialLinks).filter(Boolean),
  };
  if (c.geo) data.geo = { "@type": "GeoCoordinates", latitude: c.geo.lat, longitude: c.geo.lng };
  if (c.googleMaps.placeUrl) data.hasMap = c.googleMaps.placeUrl;
  if (hasOpeningHours()) {
    data.openingHoursSpecification = c.openingHours
      .filter((h) => h.opens && h.closes)
      .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: dayMap[h.day], opens: h.opens, closes: h.closes }));
  }
  return data;
}

/** Menu structured data. Prices are omitted until confirmed by the restaurant. */
export function menuJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${c.siteUrl}/menu#menu`,
    name: `${c.name} Menu`,
    inLanguage: ["en", "ta", "ar"],
    hasMenuSection: categories.map((cat) => ({
      "@type": "MenuSection",
      name: cat.name.en,
      hasMenuItem: menuItems
        .filter((i) => i.category === cat.id)
        .map((i) => ({
          "@type": "MenuItem",
          name: i.name.en,
          description: i.description.en,
          ...(i.veg ? { suitableForDiet: "https://schema.org/VegetarianDiet" } : {}),
          ...(i.price != null ? { offers: { "@type": "Offer", price: i.price, priceCurrency: "SAR" } } : {}),
        })),
    })),
  };
}

export const addressLine = fullAddress();

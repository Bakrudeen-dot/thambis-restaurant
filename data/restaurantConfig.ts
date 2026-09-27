/**
 * ─────────────────────────────────────────────────────────────
 *  THAMBIS RESTAURANT & CAFE — central configuration
 * ─────────────────────────────────────────────────────────────
 *  Every phone number, address, link and hour on the website is
 *  read from this single file. Update values here only.
 *
 *  Anything marked TODO is a placeholder waiting for real data
 *  from the restaurant. Do not invent values.
 */

export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface OpeningHoursEntry {
  day: Weekday;
  /** 24h "HH:MM". Leave null until confirmed by the restaurant. */
  opens: string | null;
  closes: string | null;
}

export const restaurantConfig = {
  name: "Thambis Restaurant & Cafe",
  shortName: "Thambis",
  siteUrl: "https://thambis-restaurant.vercel.app", // TODO: change when a custom domain is added

  /** Human-readable local format, shown on the page. */
  phoneDisplay: "059 797 4906",
  /** E.164 format, used for tel: links and structured data. */
  phoneE164: "+966597974906",
  /** Digits only, international format, used for wa.me links. */
  whatsapp: "966597974906",
  whatsappMessage:
    "Hello Thambis Restaurant & Cafe, I would like to know more about the menu/order.",

  address: {
    street: "Al Shawiar",
    district: "Al Malaz",
    city: "Riyadh",
    postalCode: "12831",
    country: "Saudi Arabia",
    countryCode: "SA",
  },

  /** TODO: add latitude/longitude once the exact pin is confirmed. */
  geo: null as { lat: number; lng: number } | null,

  googleMaps: {
    /**
     * TODO: paste the restaurant's Google Maps share link here.
     * Until then, directions use an address search.
     */
    placeUrl: "",
    /** TODO: paste the "Embed a map" iframe src from Google Maps. Empty = styled placeholder. */
    embedUrl: "",
    /** TODO: Google Business review link (e.g. https://g.page/r/XXXX/review). */
    reviewsUrl: "",
  },

  /** TODO: Replace nulls with confirmed hours. Nothing is shown as "open" until set. */
  openingHours: [
    { day: "mon", opens: null, closes: null },
    { day: "tue", opens: null, closes: null },
    { day: "wed", opens: null, closes: null },
    { day: "thu", opens: null, closes: null },
    { day: "fri", opens: null, closes: null },
    { day: "sat", opens: null, closes: null },
    { day: "sun", opens: null, closes: null },
  ] as OpeningHoursEntry[],

  /** TODO: add real profile URLs. Empty strings render as disabled placeholders. */
  socialLinks: {
    instagram: "",
    tiktok: "",
    facebook: "",
  },

  /** Years serving Riyadh — used in copy as "3+". */
  yearsServing: 3,
} as const;

export type RestaurantConfig = typeof restaurantConfig;

/* ───────── helpers (keep links consistent everywhere) ───────── */

export const fullAddress = (c: RestaurantConfig = restaurantConfig) =>
  `${c.address.street}, ${c.address.district}, ${c.address.city} ${c.address.postalCode}, ${c.address.country}`;

export const telLink = () => `tel:${restaurantConfig.phoneE164}`;

export const whatsappLink = (message: string = restaurantConfig.whatsappMessage) =>
  `https://wa.me/${restaurantConfig.whatsapp}?text=${encodeURIComponent(message)}`;

export const directionsLink = () =>
  restaurantConfig.googleMaps.placeUrl ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${restaurantConfig.name}, ${fullAddress()}`,
  )}`;

export const hasOpeningHours = () =>
  restaurantConfig.openingHours.some((h) => h.opens && h.closes);

"use client";

import { MapPin, Navigation, Phone } from "lucide-react";
import { directionsLink, fullAddress, restaurantConfig, telLink } from "@/data/restaurantConfig";
import { useLanguage } from "@/lib/i18n";
import OpeningHours from "./OpeningHours";
import Reveal from "./Reveal";
import WhatsAppButton from "./WhatsAppButton";

export default function Location() {
  const { t } = useLanguage();
  const { address, googleMaps } = restaurantConfig;

  return (
    <section id="contact" aria-labelledby="location-title" className="relative bg-ink text-cream">
      <div className="grid lg:grid-cols-2">
        {/* Map */}
        <div className="relative min-h-[380px] overflow-hidden bg-ink-soft lg:min-h-[760px]">
          {googleMaps.embedUrl ? (
            <iframe
              src={googleMaps.embedUrl}
              title={t.location.mapTitle}
              className="absolute inset-0 h-full w-full grayscale-[40%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0" role="img" aria-label={t.location.mapPlaceholder}>
              {/* Stylised street-grid placeholder */}
              <svg className="absolute inset-0 h-full w-full text-cream/[0.07]" aria-hidden="true">
                <defs>
                  <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
                    <path d="M64 0H0V64" fill="none" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <path d="M-20 260 C 200 220, 360 420, 900 300" stroke="currentColor" strokeWidth="18" fill="none" />
                <path d="M300 -20 L 420 900" stroke="currentColor" strokeWidth="12" fill="none" />
              </svg>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(122,30,36,0.35),transparent_55%)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <span className="relative flex h-20 w-20 items-center justify-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-maroon/40 [animation-duration:2.5s]" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-maroon shadow-xl">
                    <MapPin className="h-6 w-6" />
                  </span>
                </span>
                <p className="mt-6 font-display text-2xl">{address.district}, {address.city}</p>
                <p className="mt-3 max-w-xs text-sm text-cream/50">{t.location.mapPlaceholder}</p>
                <a href={directionsLink()} target="_blank" rel="noopener noreferrer" className="btn-outline-light mt-8 !min-h-[44px]">
                  <Navigation className="flip-rtl h-4 w-4" /> {t.common.getDirections}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="px-5 py-20 sm:px-10 lg:px-16 lg:py-28 xl:px-24">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-brass">
              <span className="h-px w-8 bg-current" aria-hidden="true" /> {t.location.eyebrow}
            </p>
            <h2 id="location-title" className="display-lg mt-5">{t.location.title}</h2>
          </Reveal>

          <Reveal delay={100} className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cream/45">{t.location.address}</p>
              <address className="mt-3 not-italic leading-relaxed text-cream/85" dir="ltr" style={{ textAlign: "start" }}>
                <strong className="font-display text-lg font-semibold text-cream">{restaurantConfig.name}</strong>
                <br />
                {address.street}, {address.district},
                <br />
                {address.city} {address.postalCode},
                <br />
                {address.country}
              </address>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cream/45">{t.location.phone}</p>
              <a href={telLink()} className="mt-3 block font-display text-3xl text-cream hover:text-brass-light" dir="ltr" style={{ textAlign: "start" }}>
                {restaurantConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={telLink()} className="btn-light">
              <Phone className="h-4 w-4" /> {t.common.callNow}
            </a>
            <WhatsAppButton label={t.common.whatsapp} className="btn-primary" />
            <a href={directionsLink()} target="_blank" rel="noopener noreferrer" className="btn-outline-light" aria-label={`${t.common.getDirections} — ${fullAddress()}`}>
              <Navigation className="flip-rtl h-4 w-4" /> {t.common.getDirections}
            </a>
          </Reveal>

          <Reveal delay={300} className="mt-16 border-t border-cream/10 pt-12">
            <OpeningHours tone="light" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

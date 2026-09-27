"use client";

import { ExternalLink, Quote, Star } from "lucide-react";
import { restaurantConfig } from "@/data/restaurantConfig";
import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";

/**
 * Plug real reviews in here (or fetch them from an API later).
 * Leave empty to show the placeholder cards. NEVER add invented reviews.
 */
export interface Review {
  author: string;
  text: string;
  rating?: number; // 1–5, only if taken from the real review
  source?: "Google" | "Instagram" | "Other";
  url?: string;
}
export const reviews: Review[] = [];

export default function Reviews() {
  const { t } = useLanguage();
  const reviewUrl = restaurantConfig.googleMaps.reviewsUrl;
  const hasReal = reviews.length > 0;

  return (
    <section aria-labelledby="reviews-title" className="relative overflow-hidden bg-cream-deep/70 py-24 sm:py-32 lg:py-40">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionIntro id="reviews-title" eyebrow={t.reviews.eyebrow} title={t.reviews.title} sub={t.reviews.sub} size="lg" />
          {reviewUrl ? (
            <a href={reviewUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-dark shrink-0">
              {t.reviews.google} <ExternalLink className="h-4 w-4" />
            </a>
          ) : (
            <span className="btn-outline-dark shrink-0 cursor-not-allowed opacity-50" aria-disabled="true" title={t.footer.soon}>
              {t.reviews.google} <ExternalLink className="h-4 w-4" />
            </span>
          )}
        </div>

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {(hasReal ? reviews : [null, null, null]).map((r, i) => (
            <Reveal as="li" key={i} delay={i * 120} className={i === 1 ? "md:translate-y-10" : ""}>
              <figure className={`flex h-full flex-col justify-between border p-8 lg:p-10 ${hasReal ? "border-ink/10 bg-ivory" : "border-dashed border-ink/25 bg-ivory/60"}`}>
                <div>
                  <Quote className="flip-rtl h-8 w-8 text-maroon/70" aria-hidden="true" />
                  <blockquote className={`mt-6 font-display text-xl leading-snug ${hasReal ? "text-ink" : "text-ink/45"}`}>
                    {r ? r.text : t.reviews.placeholder}
                  </blockquote>
                </div>
                <figcaption className="mt-10 flex items-center justify-between border-t border-ink/10 pt-5">
                  <div>
                    <p className={`font-semibold ${hasReal ? "text-ink" : "text-ink/40"}`}>{r ? r.author : t.reviews.guest}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-ink/40">{t.reviews.source}</p>
                  </div>
                  {r?.rating ? (
                    <span className="flex gap-0.5 text-brass" aria-label={`${r.rating} / 5`}>
                      {Array.from({ length: r.rating }).map((_, s) => <Star key={s} className="h-4 w-4 fill-current" aria-hidden="true" />)}
                    </span>
                  ) : (
                    <span className="flex gap-0.5 text-ink/15" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-4 w-4" />)}
                    </span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

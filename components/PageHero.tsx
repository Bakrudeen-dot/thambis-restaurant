"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import type { Dictionary } from "@/data/translations";

/** Compact cinematic hero for inner pages. */
export default function PageHero({ page, image, alt }: { page: keyof Dictionary["pages"]; image: string; alt: string }) {
  const { t } = useLanguage();
  const c = t.pages[page];
  return (
    <section className="relative isolate flex min-h-[62vh] items-end overflow-hidden bg-ink pb-16 pt-40 text-cream lg:min-h-[70vh] lg:pb-24">
      <div className="absolute inset-0 -z-10 animate-hero-zoom">
        <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/30" aria-hidden="true" />
      <div className="container-site">
        <p className="eyebrow flex animate-fade-up items-center gap-3 text-brass">
          <span className="h-px w-8 bg-current" aria-hidden="true" /> {c.eyebrow}
        </p>
        <h1 className="display-hero mt-6 max-w-5xl animate-fade-up [animation-delay:150ms]">{c.title}</h1>
        <p className="lede mt-6 max-w-2xl animate-fade-up text-cream/75 [animation-delay:300ms]">{c.sub}</p>
      </div>
    </section>
  );
}

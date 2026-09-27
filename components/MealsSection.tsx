"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function MealsSection() {
  const { t } = useLanguage();
  return (
    <section aria-labelledby="meals-title" className="relative overflow-hidden bg-ivory">
      {/* Full-bleed banana leaf image */}
      <div className="relative h-[62vh] min-h-[380px] w-full sm:h-[72vh] lg:h-[88vh] lg:max-h-[920px]">
        <Image
          src="/images/banana-leaf-meals.jpg"
          alt="South Indian meals served on a banana leaf with rice, sambar, rasam, poriyal, curry, pickle and papad"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-ivory" aria-hidden="true" />
        <div className="container-site absolute inset-x-0 top-0 pt-16 sm:pt-24">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-3 bg-ink/70 px-4 py-2.5 text-brass backdrop-blur-sm">{t.meals.eyebrow}</p>
          </Reveal>
        </div>
      </div>

      <div className="container-site relative -mt-24 pb-24 sm:-mt-32 sm:pb-32 lg:-mt-48 lg:pb-40">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="bg-ivory pt-10 lg:col-span-7 lg:pe-16 lg:pt-14">
            <h2 id="meals-title" className="display-hero text-ink">{t.meals.title}</h2>
            <p className="lede mt-8 max-w-xl text-ink/70">{t.meals.body}</p>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-5 lg:pt-14">
            <ol className="grid grid-cols-2 border-t border-ink/15">
              {t.meals.items.map((item, i) => (
                <li key={i} className="flex items-baseline gap-4 border-b border-ink/15 py-5 odd:border-e odd:pe-4 even:ps-5">
                  <span className="font-display text-xs text-brass">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[clamp(1.05rem,0.9rem+0.6vw,1.45rem)] text-ink">{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm italic text-ink/55">{t.meals.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

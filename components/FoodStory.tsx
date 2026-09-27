"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function FoodStory() {
  const { t } = useLanguage();
  return (
    <section id="story" aria-labelledby="story-title" className="relative overflow-hidden bg-ink py-24 text-cream sm:py-32 lg:py-44">
      <div className="kolam-dots pointer-events-none absolute inset-0 opacity-[0.18]" aria-hidden="true" />

      <div className="container-site relative grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Images */}
        <div className="relative order-2 lg:order-1 lg:col-span-6">
          <Reveal className="relative aspect-[4/5] w-[86%] overflow-hidden">
            <Image src="/images/story-kitchen.jpg" alt="Dosa batter spread on a seasoned tawa in the kitchen" fill sizes="(min-width:1024px) 45vw, 85vw" className="object-cover" />
          </Reveal>
          <Reveal delay={250} className="absolute -bottom-12 end-0 aspect-[3/4] w-[44%] overflow-hidden border-[8px] border-ink shadow-2xl lg:-bottom-16">
            <Image src="/images/tamil-spices.jpg" alt="Traditional Tamil spices in brass bowls" fill sizes="(min-width:1024px) 22vw, 45vw" className="object-cover" />
          </Reveal>
          <div className="absolute start-[-4px] top-10 origin-top-left -rotate-90 rtl:origin-top-right rtl:rotate-90" aria-hidden="true">
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.5em] text-brass/80">Tamil Nadu · Riyadh</span>
          </div>
        </div>

        {/* Copy */}
        <div className="order-1 flex flex-col justify-center lg:order-2 lg:col-span-6 lg:ps-10 xl:ps-16">
          <Reveal>
            <p lang="ta" className="font-['Noto_Serif_Tamil_Variable',serif] text-[clamp(2.6rem,1.5rem+4.5vw,6rem)] font-semibold leading-[1.15] text-maroon-bright">
              தமிழ் சுவை
            </p>
            <p className="serif-italic mt-2 text-lg text-cream/50">{t.story.tamilMeaning}</p>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow mt-12 flex items-center gap-3 text-brass">
              <span className="h-px w-8 bg-current" aria-hidden="true" />
              {t.story.eyebrow}
            </p>
            <h2 id="story-title" className="display-xl mt-5">
              <span className="block">{t.story.title1}</span>
              <span className="block text-brass-light">{t.story.title2}</span>
            </h2>
          </Reveal>
          <Reveal delay={200} className="mt-10 space-y-6 text-cream/70 lede">
            <p>{t.story.p1}</p>
            <p>{t.story.p2}</p>
          </Reveal>
          <Reveal delay={300}>
            <blockquote className="mt-12 border-s-2 border-maroon-bright ps-6">
              <p className="serif-italic text-[clamp(1.3rem,1rem+1vw,1.9rem)] leading-snug text-cream">{t.story.quote}</p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

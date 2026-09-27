"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Experience() {
  const { t } = useLanguage();
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative overflow-hidden bg-cream pb-20 pt-24 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-40">
      {/* Oversized watermark numeral */}
      <span
        className="pointer-events-none absolute -top-10 end-[-2vw] select-none font-display text-[38vw] font-semibold leading-none text-ink/[0.035] lg:text-[26vw]"
        aria-hidden="true"
      >
        3+
      </span>

      <div className="container-site relative grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-maroon">
              <span className="h-px w-8 bg-current" aria-hidden="true" />
              {t.experience.eyebrow}
            </p>
            <h2 id="experience-title" className="display-xl mt-6 text-ink">
              <span className="block text-maroon">{t.experience.title1}</span>
              <span className="block">{t.experience.title2}</span>
            </h2>
            <p className="lede mt-8 max-w-xl text-ink/70">{t.experience.body}</p>
            <Link href="/about" className="group mt-10 inline-flex items-center gap-3 border-b border-ink/30 pb-2 text-[0.78rem] font-bold uppercase tracking-[0.2em] text-ink hover:border-maroon hover:text-maroon">
              {t.common.ourStory}
              <ArrowRight className="flip-rtl h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* Overlapping photo composition */}
        <div className="relative lg:col-span-6">
          <Reveal className="relative ms-auto aspect-[4/5] w-[88%] overflow-hidden shadow-[0_40px_80px_-40px_rgba(20,16,14,0.6)] sm:w-[78%] lg:w-[84%]">
            <Image
              src="/images/dosa-tawa.jpg"
              alt="Dosa being cooked on a hot cast-iron tawa"
              fill
              sizes="(min-width:1024px) 42vw, 80vw"
              className="object-cover transition-transform duration-[2s] ease-luxe hover:scale-105"
            />
          </Reveal>
          <Reveal delay={200} className="absolute -bottom-10 start-0 aspect-square w-[46%] overflow-hidden border-[10px] border-cream shadow-[0_30px_60px_-30px_rgba(20,16,14,0.7)] sm:w-[40%]">
            <Image src="/images/idli-vada.jpg" alt="Idli and medu vada served with sambar and coconut chutney" fill sizes="(min-width:1024px) 20vw, 45vw" className="object-cover" />
          </Reveal>
          <div className="absolute -top-8 start-[4%] z-10 hidden border border-maroon/40 bg-cream px-5 py-4 text-maroon sm:block" aria-hidden="true">
            <span className="block font-display text-4xl font-semibold leading-none">3+</span>
            <span className="mt-1 block text-[0.6rem] font-bold uppercase tracking-[0.25em]">{t.hero.badgeSub}</span>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div className="container-site relative mt-28 lg:mt-36">
        <ul className="grid border-t border-ink/15 md:grid-cols-3">
          {t.experience.pillars.map((p, i) => (
            <Reveal as="li" key={p.k} delay={i * 120} className="border-b border-ink/15 py-8 md:border-b-0 md:border-e md:px-8 md:first:ps-0 md:last:border-e-0">
              <span className="font-display text-sm text-brass">{p.k}</span>
              <h3 className="display-md mt-3 !text-[1.35rem] text-ink">{p.t}</h3>
              <p className="mt-2 text-ink/60">{p.d}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

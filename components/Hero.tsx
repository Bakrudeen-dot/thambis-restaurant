"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import WhatsAppButton from "./WhatsAppButton";

export default function Hero() {
  const { t } = useLanguage();
  const marquee = [...t.hero.marquee, ...t.hero.marquee, ...t.hero.marquee, ...t.hero.marquee];

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-cream">
      {/* Background photograph */}
      <div className="absolute inset-0 -z-10 animate-hero-zoom">
        <Image
          src="/images/hero-tamil-food.jpg"
          alt="Traditional Tamil food spread on banana leaf — masala dosa, chicken biryani, sambar, chutneys and filter coffee"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] rtl:object-[30%_center]"
        />
      </div>
      {/* Cinematic overlay: darker on the text side only */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/45 to-black/10 rtl:bg-gradient-to-l" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-black/75 to-transparent" aria-hidden="true" />

      <div className="container-site relative flex flex-1 flex-col justify-center pb-40 pt-36 sm:pb-44 lg:pt-44">
        <div className="max-w-[min(100%,62rem)]">
          <p className="eyebrow flex animate-fade-up items-center gap-4 text-brass [animation-delay:200ms]">
            <span className="h-px w-10 bg-brass" aria-hidden="true" />
            {t.hero.eyebrow}
          </p>

          <h1 id="hero-title" className="mt-7">
            <span className="sr-only">Thambis Restaurant &amp; Cafe — </span>
            <span className="display-hero block animate-fade-up [animation-delay:350ms]">{t.hero.line1}</span>
            <span className="serif-italic mt-3 block animate-fade-up text-[clamp(1.6rem,0.9rem+3vw,4.4rem)] leading-[1.1] text-cream/90 [animation-delay:520ms]">
              {t.hero.line2}
            </span>
          </h1>

          <p className="mt-8 flex animate-fade-up items-center gap-3 text-sm font-semibold text-cream/80 [animation-delay:700ms]">
            <span className="inline-block h-2 w-2 rotate-45 bg-maroon-bright" aria-hidden="true" />
            {t.hero.serving}
          </p>

          <div className="mt-10 flex animate-fade-up flex-col gap-3 xs:flex-row xs:flex-wrap [animation-delay:850ms]">
            <Link href="/menu" className="btn-light group">
              {t.common.exploreMenu}
              <ArrowRight className="flip-rtl h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
            <WhatsAppButton />
          </div>
        </div>

        {/* 3+ years seal */}
        <div className="pointer-events-none absolute bottom-40 end-5 hidden animate-fade-up [animation-delay:1100ms] md:block lg:end-12 2xl:end-16" aria-hidden="true">
          <div className="relative h-36 w-36 lg:h-44 lg:w-44">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow text-cream/70">
              <defs>
                <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text fontSize="13" letterSpacing="5" fill="currentColor" fontFamily="Manrope Variable, sans-serif" fontWeight="700">
                <textPath href="#seal-circle">AUTHENTIC • TRADITIONAL • TAMIL • RIYADH •</textPath>
              </text>
            </svg>
            <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full border border-brass/60 bg-ink/40 text-center backdrop-blur-[2px]">
              <span className="font-display text-3xl font-semibold leading-none text-cream lg:text-4xl">3+</span>
              <span className="mt-1 text-[0.55rem] font-bold uppercase tracking-[0.25em] text-brass">Years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee band */}
      <div className="absolute inset-x-0 bottom-0 border-t border-cream/15 bg-ink/40 backdrop-blur-[3px]">
        <div className="flex items-center">
          <a
            href="#experience"
            className="hidden shrink-0 items-center gap-3 border-e border-cream/15 px-8 py-5 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-cream/70 hover:text-cream sm:flex"
          >
            <ArrowDown className="h-4 w-4 animate-bounce" /> {t.hero.scroll}
          </a>
          <div className="relative flex-1 overflow-hidden py-5" aria-hidden="true" dir="ltr">
            <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
              {marquee.map((w, i) => (
                <span key={i} className="flex items-center gap-10 font-display text-lg uppercase tracking-[0.2em] text-cream/75">
                  {w}
                  <span className="text-brass">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

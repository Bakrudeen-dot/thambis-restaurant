"use client";

import Image from "next/image";
import { Coffee } from "lucide-react";
import { cafeItems } from "@/data/menu";
import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function CafeSection() {
  const { t, pick } = useLanguage();
  return (
    <section aria-labelledby="cafe-title" className="relative overflow-hidden bg-[#2a1d16] py-24 text-cream sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(176,141,87,0.22),transparent_60%)] rtl:bg-[radial-gradient(ellipse_at_top_left,rgba(176,141,87,0.22),transparent_60%)]" aria-hidden="true" />
      <div className="container-site relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Tall hero cup */}
        <Reveal className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden lg:sticky lg:top-28">
            <Image src="/images/filter-coffee.jpg" alt="South Indian filter coffee in a brass tumbler and dabarah" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-6 start-6 flex items-center gap-3 text-cream/85">
              <Coffee className="h-5 w-5 text-brass" aria-hidden="true" />
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em]">Kaapi · காபி · قهوة</span>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-brass">
              <span className="h-px w-8 bg-current" aria-hidden="true" />
              {t.cafe.eyebrow}
            </p>
            <h2 id="cafe-title" className="display-xl mt-6">{t.cafe.title}</h2>
            <p className="lede mt-8 max-w-xl text-cream/70">{t.cafe.body}</p>
          </Reveal>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2">
            {cafeItems.map((c, i) => (
              <Reveal as="li" key={c.id} delay={i * 100} className={i % 2 === 1 ? "sm:translate-y-12" : ""}>
                <article className="group">
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <Image src={c.image} alt={pick(c.name)} fill sizes="(min-width:1024px) 28vw, (min-width:640px) 45vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-105" />
                  </div>
                  <div className="mt-5 flex items-baseline gap-4 border-b border-cream/15 pb-5">
                    <span className="font-display text-xs text-brass">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="display-md !text-[1.35rem]">{pick(c.name)}</h3>
                      <p className="mt-1 text-sm text-cream/60">{pick(c.tagline)}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

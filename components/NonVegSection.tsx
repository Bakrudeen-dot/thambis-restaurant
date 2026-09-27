"use client";

import Image from "next/image";
import { nonVegDishes } from "@/data/menu";
import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function NonVegSection() {
  const { t, pick } = useLanguage();
  return (
    <section aria-labelledby="nonveg-title" className="relative overflow-hidden bg-[#0d0a09] py-24 text-cream sm:py-32 lg:py-40">
      {/* Ember glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[520px] w-[min(820px,100%)] rounded-full bg-maroon/35 blur-[140px]" aria-hidden="true" />

      <div className="container-site relative">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow flex items-center gap-3 text-maroon-bright">
              <span className="h-px w-8 bg-current" aria-hidden="true" />
              {t.nonveg.eyebrow}
            </p>
            <h2 id="nonveg-title" className="display-hero mt-6">
              {t.nonveg.title}
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-4">
            <p className="lede text-cream/65">{t.nonveg.body}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-24 lg:grid-cols-6 lg:grid-rows-2 lg:gap-4">
          {nonVegDishes.map((d, i) => {
            // Bento arrangement on desktop
            const span = [
              "col-span-2 lg:col-span-3 lg:row-span-2",
              "col-span-2 lg:col-span-2",
              "lg:col-span-1",
              "lg:col-span-1",
              "lg:col-span-1",
              "lg:col-span-1",
            ][i];
            const aspect = i === 0 ? "aspect-[4/3] lg:aspect-auto lg:h-full" : i === 1 ? "aspect-[16/9] lg:aspect-auto lg:h-full" : "aspect-square lg:aspect-auto lg:h-full";
            return (
              <Reveal key={d.id} delay={(i % 3) * 100} className={`${span} lg:min-h-[300px]`}>
                <article className={`group relative h-full overflow-hidden ${aspect}`}>
                  <Image
                    src={d.image}
                    alt={pick(d.name)}
                    fill
                    sizes={i === 0 ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 50vw"}
                    className="object-cover brightness-[0.85] transition-all duration-[1.4s] ease-luxe group-hover:scale-105 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-7">
                    <h3 className={`font-display font-semibold uppercase leading-none ${i === 0 ? "text-[clamp(2rem,1.2rem+3vw,4rem)]" : "text-[clamp(1.1rem,0.9rem+1vw,1.6rem)]"}`}>
                      {pick(d.name)}
                    </h3>
                    <p className="mt-2 text-xs text-cream/65 sm:text-sm">{pick(d.tagline)}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

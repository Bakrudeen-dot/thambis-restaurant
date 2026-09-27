"use client";

import { CalendarHeart, ChefHat, HandPlatter, Leaf, ShieldCheck, Users } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";

const icons = [Leaf, ChefHat, CalendarHeart, HandPlatter, Users, ShieldCheck];

export default function WhyThambis() {
  const { t } = useLanguage();
  return (
    <section aria-labelledby="why-title" className="relative bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="container-site grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionIntro id="why-title" eyebrow={t.why.eyebrow} title={t.why.title} size="lg" />
            <div className="mt-10 hidden h-40 w-40 items-center justify-center rounded-full border border-maroon/25 lg:flex" aria-hidden="true">
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-maroon text-cream">
                <span className="font-display text-4xl font-semibold leading-none">3+</span>
                <span className="mt-1 text-[0.55rem] font-bold uppercase tracking-[0.25em]">{t.hero.badgeSub}</span>
              </div>
            </div>
          </div>
        </div>
        <ul className="grid gap-px bg-ink/10 sm:grid-cols-2 lg:col-span-8">
          {t.why.cards.map((c, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={i} delay={(i % 2) * 120} className="group relative bg-ivory p-8 transition-colors duration-500 hover:bg-ink sm:p-10 xl:p-12">
                <div className="flex items-start justify-between">
                  <Icon className="h-8 w-8 text-maroon transition-colors duration-500 group-hover:text-brass" strokeWidth={1.3} aria-hidden="true" />
                  <span className="font-display text-sm text-ink/30 transition-colors group-hover:text-cream/40">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="display-md mt-10 !text-[clamp(1.3rem,1.05rem+0.8vw,1.8rem)] uppercase text-ink transition-colors duration-500 group-hover:text-cream">{c.t}</h3>
                <p className="mt-3 text-ink/60 transition-colors duration-500 group-hover:text-cream/70">{c.d}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

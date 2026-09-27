"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { signatureDishes, type Feature } from "@/data/menu";
import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";

type Size = "xl" | "lg" | "md";

function DishCard({ d, n, className, size, sizes }: { d: Feature; n: number; className: string; size: Size; sizes: string }) {
  const { pick } = useLanguage();
  return (
    <article className={`group relative h-full overflow-hidden bg-ink ${className}`}>
      <Image src={d.image} alt={pick(d.name)} fill sizes={sizes} className="object-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.06]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" aria-hidden="true" />
      <span className="absolute start-5 top-5 font-display text-sm text-cream/80 sm:start-7 sm:top-7">{String(n).padStart(2, "0")}</span>
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
        <h3 className={`${size === "xl" ? "display-lg" : "display-md"} text-cream`}>{pick(d.name)}</h3>
        <p className={`mt-3 max-w-md text-cream/75 ${size === "md" ? "text-sm" : ""}`}>{pick(d.tagline)}</p>
      </div>
      <span className="absolute end-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream opacity-0 transition-all duration-500 group-hover:opacity-100 sm:end-7 sm:top-7" aria-hidden="true">
        <ArrowUpRight className="flip-rtl h-4 w-4" />
      </span>
    </article>
  );
}

export default function SignatureDishes() {
  const { t, pick } = useLanguage();
  const [dosa, ghee, meals, biryani, kothu, c65, idli, eighth] = signatureDishes;

  return (
    <section aria-labelledby="signature-title" className="relative bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionIntro id="signature-title" eyebrow={t.signature.eyebrow} title={t.signature.title} sub={t.signature.sub} />
          <p lang="ta" className="font-['Noto_Serif_Tamil_Variable',serif] text-[clamp(2.5rem,5vw,5rem)] leading-none text-maroon/15" aria-hidden="true">
            சுவை
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          {/* Row 1 — large feature + two stacked */}
          <Reveal className="sm:col-span-2 lg:col-span-7 lg:row-span-2">
            <DishCard d={dosa} n={1} size="xl" className="aspect-[4/3] lg:aspect-auto lg:min-h-[680px]" sizes="(min-width:1024px) 58vw, 100vw" />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5">
            <DishCard d={ghee} n={2} size="lg" className="aspect-[4/5] lg:aspect-auto lg:h-[328px]" sizes="(min-width:1024px) 42vw, (min-width:640px) 50vw, 100vw" />
          </Reveal>
          <Reveal delay={200} className="lg:col-span-5">
            <DishCard d={c65} n={3} size="lg" className="aspect-[4/5] lg:aspect-auto lg:h-[328px]" sizes="(min-width:1024px) 42vw, (min-width:640px) 50vw, 100vw" />
          </Reveal>

          {/* Row 2 — three portrait cards */}
          {[meals, biryani, kothu].map((d, i) => (
            <Reveal key={d.id} delay={i * 100} className={`lg:col-span-4 ${i === 2 ? "sm:col-span-2 lg:col-span-4" : ""}`}>
              <DishCard d={d} n={4 + i} size="md" className={`aspect-[4/5] ${i === 2 ? "sm:aspect-[16/9] lg:aspect-[4/5]" : ""}`} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
            </Reveal>
          ))}

          {/* Row 3 — wide horizontal + text-led */}
          <Reveal className="sm:col-span-2 lg:col-span-8">
            <DishCard d={idli} n={7} size="lg" className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[520px]" sizes="(min-width:1024px) 66vw, 100vw" />
          </Reveal>

          {/* Text-led card: Filter Coffee */}
          <Reveal delay={150} className="sm:col-span-2 lg:col-span-4">
            <article className="relative flex h-full flex-col justify-between overflow-hidden bg-maroon p-8 text-cream lg:p-10">
              <div className="kolam-dots absolute inset-0 opacity-30" aria-hidden="true" />
              <div className="relative">
                <span className="font-display text-sm text-cream/70">08</span>
                <h3 className="display-lg mt-6">{pick(eighth.name)}</h3>
                <p className="mt-4 max-w-xs text-cream/80">{pick(eighth.tagline)}</p>
              </div>
              <div className="relative mt-10 aspect-[4/3] overflow-hidden">
                <Image src={eighth.image} alt={pick(eighth.name)} fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover" />
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

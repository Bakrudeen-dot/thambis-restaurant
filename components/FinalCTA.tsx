"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";
import WhatsAppButton from "./WhatsAppButton";

export default function FinalCTA() {
  const { t } = useLanguage();
  return (
    <section aria-labelledby="cta-title" className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-ink py-28 text-cream lg:min-h-[92vh]">
      <Image src="/images/final-cta-spread.jpg" alt="A table of Tamil dishes — dosa, biryani, curries and filter coffee" fill sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-black/60" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.65)_80%)]" aria-hidden="true" />

      <div className="container-site text-center">
        <Reveal>
          <p lang="ta" className="font-['Noto_Serif_Tamil_Variable',serif] text-xl text-brass">வாங்க, சாப்பிடலாம்</p>
          <h2 id="cta-title" className="display-hero mx-auto mt-6 max-w-6xl">
            <span className="block">{t.finalCta.title1}</span>
            <span className="block text-brass-light">{t.finalCta.title2}</span>
          </h2>
          <p className="lede mx-auto mt-8 max-w-xl text-cream/75">{t.finalCta.body}</p>
          <div className="mt-12 flex flex-col items-stretch justify-center gap-3 xs:flex-row xs:items-center">
            <Link href="/menu" className="btn-light">
              {t.common.viewMenu} <ArrowRight className="flip-rtl h-4 w-4" />
            </Link>
            <WhatsAppButton />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

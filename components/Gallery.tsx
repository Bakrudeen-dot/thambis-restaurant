"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { galleryImages, type GalleryImage } from "@/data/menu";
import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";

function Lightbox({ images, index, onClose, onNav }: { images: GalleryImage[]; index: number; onClose: () => void; onNav: (d: 1 | -1) => void }) {
  const { t, pick, dir } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const img = images[index];

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Arrow keys follow reading direction
      if (e.key === "ArrowRight") onNav(dir === "rtl" ? -1 : 1);
      if (e.key === "ArrowLeft") onNav(dir === "rtl" ? 1 : -1);
      if (e.key === "Tab") {
        const f = Array.from(document.querySelectorAll<HTMLElement>("#lightbox button"));
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1]?.focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0]?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, [onClose, onNav, dir]);

  return (
    <div id="lightbox" role="dialog" aria-modal="true" aria-label={pick(img.caption)} className="fixed inset-0 z-[80] flex flex-col bg-black/95 text-cream" onClick={onClose}>
      <div className="flex items-center justify-between px-5 py-4 sm:px-8" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm text-cream/70" aria-live="polite">
          <span dir="ltr">{index + 1} {t.gallery.counter} {images.length}</span> — {pick(img.caption)}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={t.gallery.close} className="flex h-12 w-12 items-center justify-center border border-cream/25 hover:border-cream">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
        <Image key={img.src} src={img.src} alt={pick(img.caption)} fill sizes="100vw" className="animate-fade-up object-contain p-4 sm:p-10" />
        <button type="button" onClick={() => onNav(-1)} aria-label={t.gallery.prev} className="absolute start-2 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center bg-black/50 hover:bg-maroon sm:start-6">
          <ChevronLeft className="flip-rtl h-6 w-6" />
        </button>
        <button type="button" onClick={() => onNav(1)} aria-label={t.gallery.next} className="absolute end-2 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center bg-black/50 hover:bg-maroon sm:end-6">
          <ChevronRight className="flip-rtl h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default function Gallery({ variant = "preview" }: { variant?: "preview" | "full" }) {
  const { t, pick } = useLanguage();
  const images = variant === "preview" ? galleryImages.slice(0, 8) : galleryImages;
  const [open, setOpen] = useState<number | null>(null);

  const nav = useCallback((d: 1 | -1) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)), [images.length]);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-cream py-24 sm:py-32 lg:py-40">
      <div className="container-site">
        {variant === "preview" ? (
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionIntro id="gallery-title" eyebrow={t.gallery.eyebrow} title={t.gallery.title} sub={t.gallery.sub} />
            <Link href="/gallery" className="btn-outline-dark shrink-0">
              {t.gallery.viewAll} <ArrowRight className="flip-rtl h-4 w-4" />
            </Link>
          </div>
        ) : (
          <h2 id="gallery-title" className="sr-only">{t.gallery.title}</h2>
        )}

        {/* Masonry via CSS columns */}
        <ul className={`${variant === "preview" ? "mt-16" : ""} columns-1 gap-4 xs:columns-2 lg:columns-3 lg:gap-5 2xl:columns-4`}>
          {images.map((img, i) => (
            <Reveal as="li" key={img.src} delay={(i % 4) * 80} className="mb-4 break-inside-avoid lg:mb-5">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`${t.gallery.open}: ${pick(img.caption)}`}
                className="group relative block w-full overflow-hidden bg-ink"
              >
                <Image
                  src={img.src}
                  alt={pick(img.caption)}
                  width={img.w}
                  height={img.h}
                  sizes="(min-width:1536px) 25vw, (min-width:1024px) 33vw, (min-width:390px) 50vw, 100vw"
                  className="h-auto w-full transition-transform duration-[1.4s] ease-luxe group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/75 via-transparent to-transparent p-5 text-start opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="font-display text-lg text-cream">{pick(img.caption)}</span>
                  <Expand className="h-5 w-5 text-cream" aria-hidden="true" />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
      {open !== null && <Lightbox images={images} index={open} onClose={close} onNav={nav} />}
    </section>
  );
}

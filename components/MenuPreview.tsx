"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Flame, Info, Leaf } from "lucide-react";
import { categories, menuItems, type CategoryId, type MenuItem } from "@/data/menu";
import { whatsappLink } from "@/data/restaurantConfig";
import { useLanguage } from "@/lib/i18n";
import { WhatsAppIcon } from "./BrandIcons";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";


/** Scroll a horizontal rail so `el` is centred — without moving the page vertically. */
function centerInRail(rail: HTMLElement | null | undefined, el: HTMLElement | null | undefined) {
  if (!rail || !el) return;
  const r = rail.getBoundingClientRect();
  const e = el.getBoundingClientRect();
  rail.scrollBy({ left: e.left + e.width / 2 - (r.left + r.width / 2), behavior: "smooth" });
}

function Price({ item }: { item: MenuItem }) {
  const { t } = useLanguage();
  if (item.price != null) return <span className="font-display text-xl text-maroon" dir="ltr">SAR {item.price}</span>;
  return (
    <span className="flex flex-col">
      <span className="font-display text-lg text-ink/80" dir="auto">{t.common.currencyPlaceholder}</span>
      <span className="text-[0.7rem] text-ink/50">{t.common.priceTBC}</span>
    </span>
  );
}

function MenuCard({ item, priority }: { item: MenuItem; priority?: boolean }) {
  const { t, pick } = useLanguage();
  const name = pick(item.name);
  return (
    <article className="group flex h-full flex-col bg-ivory shadow-[0_1px_0_rgba(20,16,14,0.08)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(20,16,14,0.45)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        <Image
          src={item.image}
          alt={name}
          fill
          priority={priority}
          sizes="(min-width:1280px) 30vw, (min-width:640px) 45vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-105"
        />
        <div className="absolute start-4 top-4 flex gap-2">
          {item.veg && (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/95 text-[#2f7a3a]" title="Vegetarian">
              <Leaf className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Vegetarian</span>
            </span>
          )}
          {item.spicy && (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/95 text-maroon" title="Spicy">
              <Flame className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Spicy</span>
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="display-md !text-[1.4rem] text-ink">{name}</h3>
        <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink/60">{pick(item.description)}</p>
        <div className="mt-6 flex items-end justify-between gap-4 border-t border-ink/10 pt-5">
          <Price item={item} />
          <a
            href={whatsappLink(`${t.menu.orderItem}${item.name.en}`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.common.order}: ${name}`}
            className="inline-flex min-h-[44px] items-center gap-2 bg-ink px-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-maroon"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t.common.order}
          </a>
        </div>
      </div>
    </article>
  );
}

export default function MenuPreview({ variant = "preview" }: { variant?: "preview" | "full" }) {
  if (variant === "full") return <FullMenu />;
  return <PreviewMenu variant="preview" />;
}

function PreviewMenu({ variant }: { variant: "preview" | "full" }) {
  const { t, pick } = useLanguage();
  const [active, setActive] = useState<CategoryId>("dosa");
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const items = menuItems.filter((i) => i.category === active);
  const shown = variant === "preview" ? items.slice(0, 3) : items;

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const rtl = document.documentElement.dir === "rtl";
    const nextKey = rtl ? "ArrowLeft" : "ArrowRight";
    const prevKey = rtl ? "ArrowRight" : "ArrowLeft";
    let n = index;
    if (e.key === nextKey) n = (index + 1) % categories.length;
    else if (e.key === prevKey) n = (index - 1 + categories.length) % categories.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = categories.length - 1;
    else return;
    e.preventDefault();
    setActive(categories[n].id);
    tabsRef.current[n]?.focus({ preventScroll: true });
    centerInRail(tabsRef.current[n]?.parentElement, tabsRef.current[n]);
  };

  return (
    <section id="menu" aria-labelledby="menu-title" className="relative bg-cream-deep/60 py-24 sm:py-32 lg:py-40">
      <div className="container-site">
        {variant === "preview" && <SectionIntro id="menu-title" eyebrow={t.menu.eyebrow} title={t.menu.title} sub={t.menu.sub} />}
        {variant === "full" && <h2 id="menu-title" className="sr-only">{t.nav.menu}</h2>}

        {/* Category tabs */}
        <div className={`${variant === "preview" ? "mt-14" : ""} sticky top-[68px] z-30 -mx-5 border-y border-ink/10 bg-cream-deep/95 backdrop-blur sm:-mx-8 lg:-mx-12 2xl:-mx-16`}>
          <div
            role="tablist"
            aria-label={t.menu.categoriesLabel}
            className="no-scrollbar flex gap-1 overflow-x-auto px-5 sm:px-8 lg:px-12 2xl:px-16"
          >
            {categories.map((c, i) => {
              const selected = c.id === active;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls="menu-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(c.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`relative min-h-[56px] shrink-0 whitespace-nowrap px-4 text-[0.8rem] font-bold uppercase tracking-[0.16em] transition-colors sm:px-5 ${
                    selected ? "text-maroon" : "text-ink/55 hover:text-ink"
                  }`}
                >
                  {pick(c.name)}
                  <span
                    className={`absolute inset-x-3 bottom-0 h-[3px] bg-maroon transition-transform duration-500 ease-luxe ${selected ? "scale-x-100" : "scale-x-0"}`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-12">
          <div key={active} className="grid animate-fade-up gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((item, i) => (
              <MenuCard key={item.id} item={item} priority={variant === "full" && i < 3} />
            ))}
          </div>
        </div>

        <Reveal className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-ink/10 pt-8 md:flex-row md:items-center">
          <p className="flex max-w-2xl items-start gap-3 text-sm text-ink/60">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-maroon" aria-hidden="true" />
            {t.menu.notice}
          </p>
          {variant === "preview" && (
            <Link href="/menu" className="btn-outline-dark group shrink-0">
              {t.common.viewFullMenu}
              <ArrowRight className="flip-rtl h-4 w-4" />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/** Full /menu page: every category rendered (good for SEO), with a sticky scroll-spy rail. */
function FullMenu() {
  const { t, pick } = useLanguage();
  const [active, setActive] = useState<CategoryId>(categories[0].id);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = categories.map((c) => document.getElementById(`cat-${c.id}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id.replace("cat-", "") as CategoryId);
      },
      { rootMargin: "-160px 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    centerInRail(railRef.current, railRef.current?.querySelector<HTMLElement>(`[data-cat="${active}"]`));
  }, [active]);

  return (
    <section aria-labelledby="menu-title" className="relative bg-cream-deep/60 pb-24 sm:pb-32">
      <h2 id="menu-title" className="sr-only">{t.nav.menu}</h2>
      <nav aria-label={t.menu.categoriesLabel} className="sticky top-[68px] z-30 border-b border-ink/10 bg-cream-deep/95 backdrop-blur">
        <div ref={railRef} className="no-scrollbar container-site flex gap-1 overflow-x-auto">
          {categories.map((c) => {
            const selected = c.id === active;
            return (
              <a
                key={c.id}
                data-cat={c.id}
                href={`#cat-${c.id}`}
                aria-current={selected ? "true" : undefined}
                className={`relative flex min-h-[56px] shrink-0 items-center whitespace-nowrap px-4 text-[0.8rem] font-bold uppercase tracking-[0.16em] transition-colors sm:px-5 ${
                  selected ? "text-maroon" : "text-ink/55 hover:text-ink"
                }`}
              >
                {pick(c.name)}
                <span className={`absolute inset-x-3 bottom-0 h-[3px] bg-maroon transition-transform duration-500 ease-luxe ${selected ? "scale-x-100" : "scale-x-0"}`} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </nav>

      <div className="container-site">
        <p className="mt-10 flex max-w-3xl items-start gap-3 border border-maroon/20 bg-ivory px-5 py-4 text-sm text-ink/70">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-maroon" aria-hidden="true" />
          {t.menu.notice}
        </p>

        {categories.map((c, ci) => {
          const items = menuItems.filter((i) => i.category === c.id);
          if (!items.length) return null;
          return (
            <section key={c.id} id={`cat-${c.id}`} aria-labelledby={`h-${c.id}`} className="scroll-mt-[150px] pt-16 lg:pt-20">
              <div className="mb-8 flex items-baseline gap-5 border-b border-ink/15 pb-5">
                <span className="font-display text-sm text-brass">{String(ci + 1).padStart(2, "0")}</span>
                <h3 id={`h-${c.id}`} className="display-lg !text-[clamp(1.8rem,1.2rem+2vw,3.2rem)] text-ink">{pick(c.name)}</h3>
                <span className="ms-auto text-sm text-ink/45">{items.length}</span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item, i) => (
                  <MenuCard key={item.id} item={item} priority={ci === 0 && i < 3} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { whatsappLink } from "@/data/restaurantConfig";
import { useLanguage } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { navLinks } from "./navLinks";

export default function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const links = navLinks(t);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:bg-cream focus:px-4 focus:py-3 focus:text-ink">
        {t.meta.skip}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxe ${
          scrolled
            ? "border-b border-cream/10 bg-ink/90 py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-black/50 to-transparent py-5 lg:py-7"
        }`}
      >
        <div className="container-site flex items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-9 2xl:gap-11">
              {links.map((l) => {
                const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative py-2 text-[0.8rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
                        active ? "text-cream" : "text-cream/70 hover:text-cream"
                      }`}
                    >
                      {l.label}
                      <span
                        className={`absolute inset-x-0 -bottom-0.5 h-px origin-center bg-brass transition-transform duration-500 ease-luxe ${
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4 lg:gap-6">
            <LanguageSwitcher className="hidden lg:flex" />
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden !min-h-[44px] !px-6 sm:inline-flex"
            >
              {t.nav.orderNow}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.nav.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-12 w-12 items-center justify-center border border-cream/25 text-cream transition-colors hover:border-cream xl:hidden"
            >
              <MenuIcon className="h-5 w-5" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} links={links} />
    </>
  );
}

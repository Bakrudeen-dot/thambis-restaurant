"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { MapPin, Phone, X } from "lucide-react";
import { fullAddress, restaurantConfig, telLink } from "@/data/restaurantConfig";
import { useLanguage } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import WhatsAppButton from "./WhatsAppButton";

export default function MobileMenu({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}) {
  const { t } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.menu}
      aria-hidden={!open}
      inert={!open ? true : undefined}
      className={`fixed inset-0 z-[60] flex flex-col bg-ink text-cream transition-[opacity,visibility] duration-500 ease-luxe xl:hidden ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="kolam-dots pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-site relative flex items-center justify-between py-5">
        <Logo />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.nav.closeMenu}
          className="flex h-12 w-12 items-center justify-center border border-cream/25 hover:border-cream"
        >
          <X className="h-5 w-5" strokeWidth={1.6} />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-site relative flex-1 overflow-y-auto py-6">
        <ul className="space-y-1">
          {links.map((l, i) => (
            <li
              key={l.href}
              className={`border-b border-cream/10 transition-all duration-700 ease-luxe ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            >
              <Link href={l.href} onClick={onClose} className="flex items-baseline gap-5 py-4">
                <span className="text-xs font-semibold text-brass">0{i + 1}</span>
                <span className="display-md !text-[clamp(1.7rem,6vw,2.6rem)] uppercase">{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 space-y-8">
          <LanguageSwitcher />
          <div className="flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton className="btn-primary" />
            <a href={telLink()} className="btn-outline-light">
              <Phone className="h-4 w-4" /> <span dir="ltr">{restaurantConfig.phoneDisplay}</span>
            </a>
          </div>
          <p className="flex items-start gap-3 text-sm text-cream/60">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
            {fullAddress()}
          </p>
        </div>
      </nav>
    </div>
  );
}

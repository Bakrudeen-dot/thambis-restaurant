"use client";

import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { LANG_LABELS, LANGS } from "@/data/translations";
import { restaurantConfig, telLink, whatsappLink } from "@/data/restaurantConfig";
import { useLanguage } from "@/lib/i18n";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "./BrandIcons";
import Logo from "./Logo";
import { navLinks } from "./navLinks";

export default function Footer() {
  const { t, setLang, lang } = useLanguage();
  const { socialLinks, address } = restaurantConfig;
  const socials = [
    { name: "Instagram", href: socialLinks.instagram, Icon: InstagramIcon },
    { name: "TikTok", href: socialLinks.tiktok, Icon: TikTokIcon },
    { name: "Facebook", href: socialLinks.facebook, Icon: FacebookIcon },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0d0a09] pb-28 pt-20 text-cream md:pb-10 lg:pt-28">
      {/* Giant wordmark */}
      <p className="pointer-events-none absolute inset-x-0 -bottom-[0.18em] select-none whitespace-nowrap text-center font-display text-[24vw] font-semibold uppercase leading-none text-cream/[0.03]" aria-hidden="true" dir="ltr">
        Thambis
      </p>

      <div className="container-site relative">
        <div className="grid gap-14 border-b border-cream/10 pb-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo size="lg" />
            <p className="mt-6 max-w-xs text-cream/60">{t.footer.tagline}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-brass">{t.footer.navigate}</h2>
            <ul className="mt-6 space-y-3">
              {navLinks(t).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream/70 transition-colors hover:text-cream">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-brass">{t.footer.languages}</h2>
            <ul className="mt-6 space-y-3">
              {LANGS.map((l) => (
                <li key={l}>
                  <button type="button" onClick={() => setLang(l)} lang={LANG_LABELS[l].htmlLang} aria-pressed={lang === l} className={`min-h-[32px] transition-colors ${lang === l ? "text-cream" : "text-cream/60 hover:text-cream"}`}>
                    {LANG_LABELS[l].native}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-brass">{t.footer.contact}</h2>
            <ul className="mt-6 space-y-4 text-cream/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
                <span dir="ltr" style={{ textAlign: "start" }}>{address.street}, {address.district},<br />{address.city} {address.postalCode}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
                <a href={telLink()} className="hover:text-cream" dir="ltr">{restaurantConfig.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-3">
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-brass" />
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-cream">{t.common.whatsapp}</a>
              </li>
            </ul>
            <h2 className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-brass">{t.footer.follow}</h2>
            <ul className="mt-5 flex gap-3">
              {socials.map(({ name, href, Icon }) => (
                <li key={name}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="flex h-12 w-12 items-center justify-center border border-cream/20 transition-colors hover:border-brass hover:bg-brass hover:text-ink">
                      <Icon />
                    </a>
                  ) : (
                    <span aria-label={`${name} — ${t.footer.soon}`} title={t.footer.soon} role="img" className="flex h-12 w-12 cursor-not-allowed items-center justify-center border border-dashed border-cream/20 text-cream/40">
                      <Icon />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 pt-8 text-sm text-cream/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {restaurantConfig.name}. {t.footer.rights}</p>
          <p dir="ltr">Al Malaz · Riyadh · Saudi Arabia</p>
        </div>
      </div>
    </footer>
  );
}

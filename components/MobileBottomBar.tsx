"use client";

import Link from "next/link";
import { Phone, UtensilsCrossed } from "lucide-react";
import { telLink, whatsappLink } from "@/data/restaurantConfig";
import { useLanguage } from "@/lib/i18n";
import { WhatsAppIcon } from "./BrandIcons";

/** App-like sticky action bar on phones & small tablets. */
export default function MobileBottomBar() {
  const { t } = useLanguage();
  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] transition-colors";
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-ink/95 pb-[env(safe-area-inset-bottom)] text-cream backdrop-blur-md md:hidden">
      <div className="flex">
        <Link href="/menu" className={`${item} hover:text-brass-light`}>
          <UtensilsCrossed className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          {t.bottomBar.menu}
        </Link>
        <a href={telLink()} className={`${item} border-x border-cream/10 hover:text-brass-light`}>
          <Phone className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          {t.bottomBar.call}
        </a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${item} bg-maroon hover:bg-maroon-bright`}>
          <WhatsAppIcon className="h-5 w-5" />
          {t.bottomBar.whatsapp}
        </a>
      </div>
    </nav>
  );
}

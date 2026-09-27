"use client";

import { whatsappLink } from "@/data/restaurantConfig";
import { useLanguage } from "@/lib/i18n";
import { WhatsAppIcon } from "./BrandIcons";

/**
 * WhatsApp CTA. Number + default message come from restaurantConfig.
 * variant="floating" → desktop floating button (mobile uses the bottom bar).
 */
export default function WhatsAppButton({
  variant = "button",
  label,
  message,
  className = "",
}: {
  variant?: "button" | "floating";
  label?: string;
  message?: string;
  className?: string;
}) {
  const { t } = useLanguage();
  const href = whatsappLink(message);

  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.common.orderWhatsApp}
        className="group fixed bottom-8 end-8 z-40 hidden h-16 w-16 items-center justify-center rounded-full bg-[#1f8f4e] text-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-luxe hover:scale-105 md:flex"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#1f8f4e]/30 [animation-duration:2.8s]" aria-hidden="true" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className || "btn-outline-light"}>
      <WhatsAppIcon className="h-[18px] w-[18px]" />
      <span>{label ?? t.common.orderWhatsApp}</span>
    </a>
  );
}

"use client";

import { Clock } from "lucide-react";
import { hasOpeningHours, restaurantConfig } from "@/data/restaurantConfig";
import { useLanguage } from "@/lib/i18n";

/** Renders hours from restaurantConfig.openingHours. Shows "To be confirmed" until real hours are set. */
export default function OpeningHours({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { t } = useLanguage();
  const confirmed = hasOpeningHours();
  const muted = tone === "light" ? "text-cream/55" : "text-ink/55";
  const strong = tone === "light" ? "text-cream" : "text-ink";
  const line = tone === "light" ? "border-cream/10" : "border-ink/10";

  // Week order starting Sunday (common in Saudi Arabia)
  const order = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
  const rows = order.map((d) => restaurantConfig.openingHours.find((h) => h.day === d)!);

  return (
    <div>
      <p className="eyebrow flex items-center gap-3 text-brass">
        <Clock className="h-4 w-4" aria-hidden="true" /> {t.hours.eyebrow}
      </p>
      <h3 className={`display-md mt-4 ${strong}`}>{t.hours.title}</h3>
      <dl className="mt-8">
        {rows.map((r) => (
          <div key={r.day} className={`flex items-center justify-between gap-4 border-b py-3.5 ${line}`}>
            <dt className={`font-medium ${strong}`}>{t.hours.days[r.day]}</dt>
            <dd className={r.opens && r.closes ? strong : `${muted} italic`} dir={r.opens ? "ltr" : undefined}>
              {r.opens && r.closes ? `${r.opens} – ${r.closes}` : t.hours.tbc}
            </dd>
          </div>
        ))}
      </dl>
      {!confirmed && <p className={`mt-5 text-sm ${muted}`}>{t.hours.note}</p>}
    </div>
  );
}

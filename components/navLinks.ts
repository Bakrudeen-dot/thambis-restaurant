import type { Dictionary } from "@/data/translations";

export const navLinks = (t: Dictionary) => [
  { href: "/", label: t.nav.home },
  { href: "/menu", label: t.nav.menu },
  { href: "/about", label: t.nav.story },
  { href: "/gallery", label: t.nav.gallery },
  { href: "/contact", label: t.nav.contact },
];

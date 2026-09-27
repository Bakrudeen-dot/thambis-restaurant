import Link from "next/link";

/**
 * Text-based wordmark fallback. When the real logo is available, drop it in
 * /public/images/logo.svg and swap the markup below for <Image src="/images/logo.svg" … />.
 */
export default function Logo({ tone = "light", size = "md" }: { tone?: "light" | "dark"; size?: "md" | "lg" }) {
  const color = tone === "light" ? "text-cream" : "text-ink";
  return (
    <Link href="/" aria-label="Thambis Restaurant & Cafe — Home" className={`group inline-flex flex-col leading-none ${color}`} dir="ltr">
      <span
        className={`font-semibold uppercase ${size === "lg" ? "text-5xl sm:text-6xl" : "text-[1.65rem] sm:text-[1.85rem]"}`}
        style={{ fontFamily: '"Fraunces Variable", Georgia, serif', letterSpacing: "0.16em", fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
      >
        Thambis
      </span>
      <span className="mt-1.5 flex items-center gap-2 text-[0.56rem] font-bold uppercase text-brass" style={{ fontFamily: '"Manrope Variable", sans-serif', letterSpacing: "0.38em" }}>
        <span className="h-px w-4 bg-brass/70" aria-hidden="true" />
        Restaurant &amp; Cafe
      </span>
    </Link>
  );
}

import Reveal from "./Reveal";

/** Eyebrow + heading pattern used across sections. */
export default function SectionIntro({
  eyebrow,
  title,
  sub,
  tone = "dark",
  align = "start",
  size = "xl",
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  tone?: "dark" | "light";
  align?: "start" | "center";
  size?: "xl" | "lg";
  id?: string;
}) {
  const text = tone === "light" ? "text-cream" : "text-ink";
  const subText = tone === "light" ? "text-cream/70" : "text-ink/65";
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
      <p className={`eyebrow flex items-center gap-3 text-maroon ${tone === "light" ? "!text-brass" : ""} ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-current" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className={`${size === "xl" ? "display-xl" : "display-lg"} mt-5 ${text}`}>
        {title}
      </h2>
      {sub && <p className={`lede mt-6 max-w-2xl ${subText} ${align === "center" ? "mx-auto" : ""}`}>{sub}</p>}
    </Reveal>
  );
}

import type { SanityImage } from "lib/sanity";
import { urlForImage } from "lib/sanity/image";
import Image from "next/image";

export type Tone = "dark" | "light" | "lilac";

export function toneClass(tone?: Tone | string): string {
  switch (tone) {
    case "dark":
      return "bg-[#111111] text-white";
    case "lilac":
      return "bg-[#EDE9F8] text-[#111111]";
    default:
      return "bg-white text-[#111111]";
  }
}

// Brand button used across blocks. Dark tone gets a white button; everything
// else gets the brand purple.
export function BlockCta({
  href,
  label,
  tone,
}: {
  href?: string;
  label?: string;
  tone?: Tone | string;
}) {
  if (!href || !label) return null;
  const styles =
    tone === "dark"
      ? "border-2 border-white bg-white text-[#111111]"
      : "border-2 border-[#5A3493] bg-[#5A3493] text-white";
  return (
    <a
      href={href}
      className={`stunn-cta-motion inline-flex min-h-12 items-center justify-center rounded-lg px-6 text-sm font-black ${styles}`}
    >
      {label}
    </a>
  );
}

// Renders a Sanity image with next/image (served from cdn.sanity.io). Returns
// null when there's no image, so blocks degrade gracefully.
export function SanityImg({
  image,
  alt,
  width = 1200,
  sizes,
  priority,
  className = "object-cover",
}: {
  image?: SanityImage | null;
  alt?: string;
  width?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const builder = urlForImage(image);
  if (!builder) return null;
  return (
    <Image
      src={builder.width(width).url()}
      alt={alt || ""}
      fill
      sizes={sizes || "100vw"}
      priority={priority}
      className={className}
    />
  );
}

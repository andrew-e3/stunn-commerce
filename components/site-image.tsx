import { getSiteImages } from "lib/sanity";
import Image, { type ImageProps } from "next/image";

type SiteImageProps = Omit<ImageProps, "src" | "alt"> & {
  /** Stable key matching a Site Image in the Studio (e.g. "home-hero"). */
  slot: string;
  /** The current hardcoded image, shown until a Site Image is uploaded. */
  fallbackSrc: ImageProps["src"];
  alt?: string;
};

// Server component drop-in for next/image. Renders the Site Image uploaded for
// `slot` if one exists, otherwise the hardcoded `fallbackSrc`. So the site
// looks identical until someone swaps the image in the Studio.
export async function SiteImage({
  slot,
  fallbackSrc,
  alt,
  ...rest
}: SiteImageProps) {
  const images = await getSiteImages();
  const entry = images[slot];
  return (
    <Image src={entry?.url ?? fallbackSrc} alt={alt ?? entry?.alt ?? ""} {...rest} />
  );
}

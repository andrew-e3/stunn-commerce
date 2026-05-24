import type { SanityImage } from "lib/sanity";
import { SanityImg } from "../shared";

export interface ImageBlockData {
  image?: SanityImage;
  alt?: string;
  caption?: string;
  fullBleed?: boolean;
}

export function ImageBlock({ block }: { block: ImageBlockData }) {
  if (!block.image) return null;
  return (
    <section className="bg-white">
      <div
        className={
          block.fullBleed ? "" : "mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14"
        }
      >
        <figure>
          <div
            className={`relative aspect-[16/9] w-full overflow-hidden bg-[#EDE9F8] ${
              block.fullBleed ? "" : "rounded-[22px]"
            }`}
          >
            <SanityImg
              image={block.image}
              alt={block.alt}
              width={1800}
              sizes="100vw"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-xs text-[#111111]/55">
              {block.caption}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}

import type { SanityImage } from "lib/sanity";
import { BlockCta, SanityImg } from "../shared";

export interface HeroBlockData {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  ratingText?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: SanityImage;
}

export function Hero({ block }: { block: HeroBlockData }) {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
        <div>
          {block.ratingText && (
            <p className="mb-3 text-sm font-semibold text-[#EFAF00]">
              ★★★★★{" "}
              <span className="text-[#111111]/65">{block.ratingText}</span>
            </p>
          )}
          {block.eyebrow && (
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#111111]/45">
              {block.eyebrow}
            </p>
          )}
          {block.headline && (
            <h1 className="stunn-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase leading-[0.92] text-[#111111]">
              {block.headline}
            </h1>
          )}
          {block.subhead && (
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#111111]/70">
              {block.subhead}
            </p>
          )}
          <div className="mt-7">
            <BlockCta href={block.ctaHref} label={block.ctaLabel} />
          </div>
        </div>
        {block.image && (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] bg-[#EDE9F8]">
            <SanityImg
              image={block.image}
              alt={block.headline}
              priority
              width={1400}
              sizes="(min-width:1024px) 50vw, 100vw"
            />
          </div>
        )}
      </div>
    </section>
  );
}

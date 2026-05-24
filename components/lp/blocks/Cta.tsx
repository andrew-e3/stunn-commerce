import { BlockCta, toneClass, type Tone } from "../shared";

export interface CtaBlockData {
  headline?: string;
  subhead?: string;
  ctaLabel?: string;
  ctaHref?: string;
  note?: string;
  tone?: Tone;
}

export function Cta({ block }: { block: CtaBlockData }) {
  const tone = block.tone || "lilac";
  return (
    <section className={toneClass(tone)}>
      <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-8 lg:py-24">
        {block.headline && (
          <h2 className="stunn-display text-[clamp(2rem,5vw,3.75rem)] uppercase leading-[0.95]">
            {block.headline}
          </h2>
        )}
        {block.subhead && (
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed opacity-75">
            {block.subhead}
          </p>
        )}
        <div className="mt-7">
          <BlockCta href={block.ctaHref} label={block.ctaLabel} tone={tone} />
        </div>
        {block.note && (
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide opacity-55">
            {block.note}
          </p>
        )}
      </div>
    </section>
  );
}

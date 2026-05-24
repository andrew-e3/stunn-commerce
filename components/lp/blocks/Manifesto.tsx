import { BlockCta, toneClass, type Tone } from "../shared";

export interface ManifestoBlockData {
  eyebrow?: string;
  headline?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  tone?: Tone;
}

export function Manifesto({ block }: { block: ManifestoBlockData }) {
  const tone = block.tone || "dark";
  return (
    <section className={toneClass(tone)}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            {block.eyebrow && (
              <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] opacity-55">
                {block.eyebrow}
              </p>
            )}
            {block.headline && (
              <h2 className="stunn-display text-[clamp(2.25rem,5vw,4rem)] uppercase leading-[0.92]">
                {block.headline}
              </h2>
            )}
          </div>
          <div>
            {block.body && (
              <p className="whitespace-pre-line text-base leading-relaxed opacity-80">
                {block.body}
              </p>
            )}
            {block.ctaHref && block.ctaLabel && (
              <div className="mt-6">
                <BlockCta
                  href={block.ctaHref}
                  label={block.ctaLabel}
                  tone={tone}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

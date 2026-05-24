import type { SanityImage } from "lib/sanity";
import { SanityImg } from "../shared";

interface Feature {
  _key?: string;
  title?: string;
  description?: string;
  image?: SanityImage;
}

export interface FeatureGridBlockData {
  heading?: string;
  intro?: string;
  columns?: number;
  features?: Feature[];
}

const COL_CLASS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGrid({ block }: { block: FeatureGridBlockData }) {
  const cols = COL_CLASS[block.columns || 3] || COL_CLASS[3];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        {block.heading && (
          <h2 className="stunn-display text-center text-[clamp(2rem,4.5vw,3.5rem)] uppercase leading-[0.95] text-[#111111]">
            {block.heading}
          </h2>
        )}
        {block.intro && (
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-[#111111]/65">
            {block.intro}
          </p>
        )}
        {block.features && block.features.length > 0 && (
          <div className={`mt-12 grid grid-cols-1 gap-8 ${cols}`}>
            {block.features.map((feature, i) => (
              <div key={feature._key || i}>
                {feature.image && (
                  <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-[16px] bg-[#EDE9F8]">
                    <SanityImg
                      image={feature.image}
                      alt={feature.title}
                      width={700}
                      sizes="(min-width:1024px) 25vw, 90vw"
                    />
                  </div>
                )}
                {feature.title && (
                  <h3 className="text-lg font-extrabold text-[#111111]">
                    {feature.title}
                  </h3>
                )}
                {feature.description && (
                  <p className="mt-2 text-sm leading-relaxed text-[#111111]/65">
                    {feature.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

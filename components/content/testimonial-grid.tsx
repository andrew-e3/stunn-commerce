import type { Testimonial } from "lib/sanity";
import { urlForImage } from "lib/sanity/image";
import Image from "next/image";

// Renders real testimonials from Sanity. Returns null when there are none, so
// the PDP/homepage can simply omit the section until reviews exist.
export function TestimonialGrid({
  testimonials,
  heading,
}: {
  testimonials?: Testimonial[];
  heading?: string;
}) {
  if (!testimonials || testimonials.length === 0) return null;
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        {heading && (
          <h2 className="stunn-display mb-10 text-center text-[clamp(2rem,4.5vw,3.5rem)] uppercase leading-[0.95] text-[#111111]">
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => {
            const avatar = urlForImage(t.avatar)?.width(96).height(96).url();
            return (
              <figure
                key={i}
                className="flex flex-col rounded-[16px] border border-black/10 bg-white p-6"
              >
                {typeof t.rating === "number" && (
                  <div className="mb-3 text-sm leading-none text-[#EFAF00]">
                    {"★".repeat(Math.max(1, Math.min(5, t.rating)))}
                  </div>
                )}
                <blockquote className="flex-1 text-sm leading-relaxed text-[#111111]/80">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  {avatar && (
                    <span className="relative h-9 w-9 overflow-hidden rounded-full bg-[#EDE9F8]">
                      <Image
                        src={avatar}
                        alt={t.author}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </span>
                  )}
                  <span>
                    <span className="block text-sm font-extrabold text-[#111111]">
                      {t.author}
                    </span>
                    {t.role && (
                      <span className="block text-xs text-[#111111]/55">
                        {t.role}
                      </span>
                    )}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import type { FaqItem } from "lib/sanity";

// Accessible accordion using native <details>, so it needs no client JS.
// Returns null when there are no items.
export function FaqList({
  items,
  heading,
}: {
  items?: FaqItem[];
  heading?: string;
}) {
  if (!items || items.length === 0) return null;
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
        {heading && (
          <h2 className="stunn-display mb-8 text-[clamp(2rem,4.5vw,3rem)] uppercase leading-[0.95] text-[#111111]">
            {heading}
          </h2>
        )}
        <div className="divide-y divide-black/10 border-y border-black/10">
          {items.map((item, i) => (
            <details key={i} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-extrabold text-[#111111] [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="text-xl leading-none text-[#5A3493] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#111111]/70">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

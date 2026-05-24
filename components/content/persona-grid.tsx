import type { CustomerProfile } from "lib/sanity";

// Renders customer profiles managed in Sanity. Returns null when empty.
export function PersonaGrid({
  profiles,
  heading,
  intro,
}: {
  profiles?: CustomerProfile[];
  heading?: string;
  intro?: string;
}) {
  if (!profiles || profiles.length === 0) return null;
  return (
    <section className="bg-[#EDE9F8]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        {heading && (
          <h2 className="stunn-display max-w-3xl text-[clamp(2rem,5vw,3.75rem)] uppercase leading-[0.95] text-[#111111]">
            {heading}
          </h2>
        )}
        {intro && (
          <p className="mt-4 max-w-2xl text-base text-[#111111]/65">{intro}</p>
        )}
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
          {profiles.map((p, i) => (
            <div key={i}>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#111111]/45">
                {p.label}
              </p>
              <h3 className="text-lg font-extrabold leading-snug text-[#111111]">
                {p.headline}
              </h3>
              {p.body && (
                <p className="mt-2 text-sm leading-relaxed text-[#111111]/65">
                  {p.body}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

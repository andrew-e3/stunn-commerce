interface PersonaItem {
  _key?: string;
  label?: string;
  headline?: string;
  body?: string;
}

export interface PersonaBlockData {
  heading?: string;
  intro?: string;
  personas?: PersonaItem[];
}

export function Persona({ block }: { block: PersonaBlockData }) {
  return (
    <section className="bg-[#EDE9F8]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        {block.heading && (
          <h2 className="stunn-display max-w-3xl text-[clamp(2rem,5vw,3.75rem)] uppercase leading-[0.95] text-[#111111]">
            {block.heading}
          </h2>
        )}
        {block.intro && (
          <p className="mt-4 max-w-2xl text-base text-[#111111]/65">
            {block.intro}
          </p>
        )}
        {block.personas && block.personas.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
            {block.personas.map((persona, i) => (
              <div key={persona._key || i}>
                {persona.label && (
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#111111]/45">
                    {persona.label}
                  </p>
                )}
                {persona.headline && (
                  <h3 className="text-lg font-extrabold leading-snug text-[#111111]">
                    {persona.headline}
                  </h3>
                )}
                {persona.body && (
                  <p className="mt-2 text-sm leading-relaxed text-[#111111]/65">
                    {persona.body}
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

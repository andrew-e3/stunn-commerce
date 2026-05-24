export interface ProseBlockData {
  heading?: string;
  body?: string;
  align?: "left" | "center";
}

export function Prose({ block }: { block: ProseBlockData }) {
  const center = block.align === "center";
  return (
    <section className="bg-white">
      <div
        className={`mx-auto max-w-3xl px-6 py-12 lg:px-8 lg:py-16 ${
          center ? "text-center" : "text-left"
        }`}
      >
        {block.heading && (
          <h2 className="stunn-display mb-4 text-[clamp(1.75rem,4vw,3rem)] uppercase leading-[0.95] text-[#111111]">
            {block.heading}
          </h2>
        )}
        {block.body && (
          <p className="whitespace-pre-line text-base leading-relaxed text-[#111111]/75">
            {block.body}
          </p>
        )}
      </div>
    </section>
  );
}

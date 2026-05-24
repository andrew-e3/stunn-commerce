import Footer from "components/layout/footer";
import Link from "next/link";

type PolicySection = {
  title: string;
  copy: string;
};

export default function PolicyPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: PolicySection[];
}) {
  return (
    <>
      <section className="bg-white px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#5A3493]">
            {eyebrow}
          </p>
          <h1 className="text-[clamp(42px,8vw,88px)] font-black uppercase leading-[0.92] tracking-[-0.052em] text-[#111111]">
            {title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#111111]/68">
            {intro}
          </p>
          <p className="mt-3 text-sm font-semibold text-[#111111]/50">
            Last updated May 17, 2026.
          </p>

          <div className="mt-10 divide-y divide-[#111111]/12 border-y border-[#111111]/12">
            {sections.map((section) => (
              <section key={section.title} className="py-6">
                <h2 className="text-xl font-black uppercase tracking-[-0.02em] text-[#111111]">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#111111]/68">
                  {section.copy}
                </p>
              </section>
            ))}
          </div>

          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-[8px] bg-[#5A3493] px-6 py-3 text-sm font-black uppercase tracking-wide text-white"
          >
            Contact support
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}

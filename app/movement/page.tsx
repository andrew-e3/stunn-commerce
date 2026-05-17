import Footer from "components/layout/footer";
import { OffTheDripCapture } from "components/off-the-drip-capture";
import Link from "next/link";

const PDP = "/products/focus-without-caffeine";

const MYTHS = [
  {
    q: "Is this only for people who quit caffeine?",
    a: "No. Off The Drip is for anyone choosing when caffeine serves them, instead of needing it to feel normal.",
  },
  {
    q: "Is STUNN anti-coffee?",
    a: "No. STUNN is coffee-first. We keep the taste, warmth, and ritual. We remove the dependency loop.",
  },
  {
    q: "Will STUNN ever make caffeinated products?",
    a: "No. Every STUNN product is caffeine-free by design. That is the brand promise.",
  },
];

export const metadata = {
  title: "Off The Drip - The STUNN Movement",
  description:
    "Off The Drip is STUNN's movement for caffeine-free coffee rituals, calm focus, and owning your energy without dependency.",
};

export default function MovementPage() {
  return (
    <>
      <section className="bg-[#111111] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-white/45">
              The STUNN movement
            </p>
            <h1 className="max-w-5xl text-[clamp(64px,11vw,168px)] stunn-display uppercase leading-[0.84] tracking-normal">
              Off The Drip
            </h1>
          </div>
          <div className="max-w-xl">
            <p className="text-xl font-semibold leading-relaxed text-white/80">
              You do not need caffeine to function.
            </p>
            <p className="mt-5 text-base leading-relaxed text-white/65">
              The point is not quitting coffee. The point is quitting the cycle:
              headaches without it, anxiety from too much, the 2pm crash, and
              the quiet feeling that energy now belongs to something else.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`${PDP}#purchase`}
                className="stunn-cta-motion inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-white bg-white px-6 text-sm font-black uppercase tracking-[0.08em] text-[#111111]"
              >
                Try STUNN
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.26em] text-[#111111]/45">
              Manifesto
            </p>
            <h2 className="max-w-xl text-[clamp(44px,7vw,108px)] stunn-display uppercase leading-[0.9] tracking-normal text-[#111111]">
              Own your energy.
            </h2>
          </div>
          <div className="grid gap-8 text-[#111111]">
            <p className="max-w-3xl text-2xl font-semibold leading-snug">
              Caffeine had its run. Not because coffee stopped mattering, but
              because needing a stimulant to feel normal is a bad deal.
            </p>
            <div className="grid gap-6 text-base leading-relaxed text-[#111111]/68 sm:grid-cols-2">
              <p>
                STUNN is built for high-performers, optimisers, and coffee
                lovers who take their mornings seriously but want more control
                over the rest of the day.
              </p>
              <p>
                Drink espresso at 7am if you want. Drink STUNN at 2pm because
                you choose the ritual, not because caffeine owns the switch.
              </p>
            </div>
            <div className="rounded-[20px] bg-[#EDE9F8] p-6 sm:p-8">
              <p className="stunn-display text-[clamp(2rem,5vw,4.6rem)] uppercase leading-[0.9] tracking-normal">
                Caffeine-free by design. Always.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#5A3493] px-5 py-14 text-white sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.26em] text-white/52">
              Join the list
            </p>
            <h2 className="max-w-xl text-[clamp(42px,7vw,96px)] stunn-display uppercase leading-[0.9] tracking-normal">
              Build better rituals without dependency.
            </h2>
          </div>
          <OffTheDripCapture mode="inline" tone="dark" />
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="stunn-display text-[clamp(38px,6vw,76px)] uppercase leading-[0.9] tracking-normal text-[#111111]">
            Myth busting
          </h2>
          <div className="divide-y divide-[#111111]/12">
            {MYTHS.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5">
                  <span className="text-lg font-black text-[#111111]">
                    {item.q}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EDE9F8] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#111111]/65">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

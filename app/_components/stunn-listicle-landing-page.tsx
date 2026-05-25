import { SiteImage } from "components/site-image";
import { BEST_VALUE_PER_DAY_LABEL } from "lib/pricing";
import Link from "next/link";

const PDP = "/products/focus-without-caffeine";

export type ListicleSection = {
  number: string;
  eyebrow: string;
  title: string;
  copy: string;
  pull: string;
  image: string;
  alt: string;
};

export type ProofCard = {
  title: string;
  copy: string;
};

export type ListicleLandingPageProps = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  trustRow: string[];
  heroImage: string;
  heroAlt: string;
  heroCaptionEyebrow: string;
  heroCaption: string;
  listEyebrow: string;
  listHeadline: string;
  listIntro: string;
  sections: ListicleSection[];
  proofEyebrow: string;
  proofHeadline: string;
  proofNumbers: string[][];
  formula: string[][];
  objectionsEyebrow: string;
  objectionsHeadline: string;
  proofCards: ProofCard[];
  offerHeadline: string;
  faqEyebrow: string;
  faqHeadline: string;
  faqs: string[][];
  finalHeadline: string;
  finalSubhead: string;
  stickyLabel: string;
  /** Prefix for Site Image slot keys, so each LP's images swap independently. */
  slotPrefix: string;
};

function PrimaryCta({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href={`${PDP}#purchase`}
      className="inline-flex min-h-14 w-full items-center justify-center rounded-[8px] bg-[#5A3493] px-6 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_16px_35px_rgba(90,52,147,0.24)] transition hover:-translate-y-0.5 sm:w-auto"
    >
      {children}
    </Link>
  );
}

export function StunnListicleLandingPage({
  eyebrow,
  headline,
  subheadline,
  trustRow,
  heroImage,
  heroAlt,
  slotPrefix,
  heroCaptionEyebrow,
  heroCaption,
  listEyebrow,
  listHeadline,
  listIntro,
  sections,
  proofEyebrow,
  proofHeadline,
  proofNumbers,
  formula,
  objectionsEyebrow,
  objectionsHeadline,
  proofCards,
  offerHeadline,
  faqEyebrow,
  faqHeadline,
  faqs,
  finalHeadline,
  finalSubhead,
  stickyLabel,
}: ListicleLandingPageProps) {
  return (
    <article className="bg-[#F5EFE7] pb-24 text-[#111111]">
      <section className="relative overflow-hidden bg-[#F5EFE7]">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 pb-12 pt-8 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-12 lg:py-14">
          <div className="relative z-10">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-[#5A3493]">
              {eyebrow}
            </p>
            <h1 className="stunn-display max-w-4xl text-[clamp(46px,8.4vw,98px)] uppercase leading-[0.88] tracking-normal">
              {headline}
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-[#111111]/68 sm:mt-6 sm:text-xl">
              {subheadline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryCta>Shop now</PrimaryCta>
              <span className="text-sm font-bold uppercase tracking-[0.12em] text-[#111111]/44">
                From {BEST_VALUE_PER_DAY_LABEL}. Cancel any time.
              </span>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-2 text-center text-[10px] font-black uppercase tracking-[0.05em] text-[#111111]/60 sm:max-w-xl sm:text-[11px] sm:tracking-[0.08em]">
              {trustRow.map((item) => (
                <div key={item} className="border-t border-[#111111]/15 pt-3">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-x-8 top-8 h-2/3 rounded-full bg-[#D9C9F2]/70 blur-3xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[#2D2145] shadow-[0_24px_70px_rgba(17,17,17,0.15)] sm:aspect-[5/4] lg:aspect-[1.08/1]">
              <SiteImage
                slot={`${slotPrefix}-hero`}
                fallbackSrc={heroImage}
                alt={heroAlt}
                fill
                priority
                className="object-cover object-center"
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/30 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-[8px] bg-white/90 p-4 backdrop-blur-sm sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-[320px]">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#5A3493]">
                  {heroCaptionEyebrow}
                </p>
                <p className="mt-2 text-lg font-black leading-snug text-[#111111]">
                  {heroCaption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#111111] py-3 text-white">
        <div className="flex overflow-hidden whitespace-nowrap text-xs font-black uppercase tracking-[0.18em] text-white/75">
          <div className="animate-[marquee_26s_linear_infinite]">
            OFF THE DRIP · CAFFEINE HAD ITS RUN · OFF THE DRIP · CAFFEINE HAD
            ITS RUN · OFF THE DRIP · CAFFEINE HAD ITS RUN ·
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#5A3493]">
              {listEyebrow}
            </p>
            <h2 className="mt-4 stunn-display text-[clamp(44px,8vw,96px)] uppercase leading-[0.88]">
              {listHeadline}
            </h2>
          </div>
          <p className="max-w-2xl text-xl font-semibold leading-relaxed text-[#111111]/64">
            {listIntro}
          </p>
        </div>
      </section>

      <section className="bg-white">
        {sections.map((section, index) => (
          <div
            key={section.number}
            className="border-t border-[#111111]/10 px-5 py-12 sm:px-8 lg:py-18"
          >
            <div className="mx-auto grid max-w-[1180px] gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
              <div className={index % 2 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[#5A3493] px-3 py-1 text-xs font-black text-white">
                    {section.number}
                  </span>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#5A3493]">
                    {section.eyebrow}
                  </p>
                </div>
                <h3 className="mt-5 stunn-display text-[clamp(42px,7vw,84px)] uppercase leading-[0.88]">
                  {section.title}
                </h3>
                <p className="mt-5 max-w-xl text-lg font-semibold leading-relaxed text-[#111111]/66">
                  {section.copy}
                </p>
                <div className="mt-7 rounded-[8px] border-l-4 border-[#5A3493] bg-[#F5EFE7] p-5 text-lg font-black leading-snug text-[#111111]/74">
                  {section.pull}
                </div>
              </div>
              <div className="relative aspect-[5/4] overflow-hidden rounded-[16px] bg-[#EEEAF8] shadow-[0_18px_50px_rgba(17,17,17,0.1)]">
                <SiteImage
                  slot={`${slotPrefix}-section-${section.number}`}
                  fallbackSrc={section.image}
                  alt={section.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 46vw, 100vw"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-[#111111] px-5 py-14 text-white sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-white/40">
            {proofEyebrow}
          </p>
          <h2 className="mt-4 max-w-4xl stunn-display text-[clamp(44px,8vw,92px)] uppercase leading-[0.88]">
            {proofHeadline}
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[10px] bg-white/12 md:grid-cols-4">
            {proofNumbers.map(([value, label]) => (
              <div key={label} className="bg-[#181818] p-6">
                <p className="stunn-display text-6xl uppercase text-white">{value}</p>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-white/62">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 divide-y divide-white/10 rounded-[10px] border border-white/10 bg-white/[0.03]">
            {formula.map(([ingredient, dose, role]) => (
              <div
                key={ingredient}
                className="grid gap-2 px-5 py-4 text-sm sm:grid-cols-[1fr_auto_1fr] sm:items-center"
              >
                <p className="text-lg font-black">{ingredient}</p>
                <p className="font-black text-white/75">{dose}</p>
                <p className="font-semibold uppercase tracking-[0.14em] text-white/42 sm:text-right">
                  {role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5EFE7] px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#5A3493]">
                {objectionsEyebrow}
              </p>
              <h2 className="mt-4 stunn-display text-[clamp(42px,8vw,86px)] uppercase leading-[0.88]">
                {objectionsHeadline}
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {proofCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[10px] border border-[#111111]/10 bg-white p-5 shadow-[0_12px_35px_rgba(17,17,17,0.06)]"
                >
                  <p className="text-lg font-black leading-tight">{card.title}</p>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-[#111111]/62">
                    {card.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[16px] bg-white shadow-[0_18px_55px_rgba(17,17,17,0.12)]">
            <SiteImage
              slot={`${slotPrefix}-closing`}
              fallbackSrc="/images/stunn-sachet-pour.png"
              alt="STUNN sachet being poured into a cup"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
          </div>
          <div className="rounded-[12px] bg-[#EEEAF8] p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#5A3493]">
              Start here
            </p>
            <h2 className="mt-4 stunn-display text-[clamp(42px,8vw,84px)] uppercase leading-[0.88]">
              {offerHeadline}
            </h2>
            <div className="mt-6 rounded-[10px] border-2 border-[#5A3493] bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-[#5A3493]">
                    Subscribe and save
                  </p>
                  <p className="mt-2 text-3xl font-black">
                    From {BEST_VALUE_PER_DAY_LABEL}
                  </p>
                </div>
                <span className="rounded-full bg-[#5A3493] px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-white">
                  Best value
                </span>
              </div>
              <ul className="mt-5 grid gap-2 text-sm font-bold text-[#111111]/64">
                <li>Free shipping on subscription</li>
                <li>Pause or cancel any time</li>
                <li>30-day money-back guarantee</li>
              </ul>
              <div className="mt-6">
                <PrimaryCta>Shop now</PrimaryCta>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5EFE7] px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[900px]">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#5A3493]">
            {faqEyebrow}
          </p>
          <h2 className="mt-4 stunn-display text-[clamp(42px,8vw,82px)] uppercase leading-[0.88]">
            {faqHeadline}
          </h2>
          <div className="mt-8 divide-y divide-[#111111]/12 rounded-[10px] bg-white px-5">
            {faqs.map(([question, answer], index) => (
              <details key={question} className="group py-5" open={index === 0}>
                <summary className="cursor-pointer list-none text-lg font-black">
                  {question}
                </summary>
                <p className="mt-3 text-base font-semibold leading-relaxed text-[#111111]/62">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#5A3493] px-5 py-14 text-white sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/45">
              Off The Drip
            </p>
            <h2 className="mt-4 stunn-display text-[clamp(44px,8vw,92px)] uppercase leading-[0.88]">
              {finalHeadline}
            </h2>
            <p className="mt-4 max-w-2xl text-lg font-semibold text-white/72">
              {finalSubhead}
            </p>
          </div>
          <PrimaryCta>Shop now</PrimaryCta>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#111111]/10 bg-white/92 px-4 py-3 shadow-[0_-14px_40px_rgba(17,17,17,0.12)] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1180px] items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#5A3493]">
              {stickyLabel}
            </p>
            <p className="truncate text-sm font-bold text-[#111111]/62">
              Real coffee ritual. 0mg caffeine.
            </p>
          </div>
          <Link
            href={`${PDP}#purchase`}
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-[8px] bg-[#5A3493] px-5 text-xs font-black uppercase tracking-[0.08em] text-white shadow-[0_10px_24px_rgba(90,52,147,0.28)] transition hover:-translate-y-0.5"
          >
            Shop now
          </Link>
        </div>
      </div>

      <footer className="bg-[#111111] px-5 py-8 text-xs font-semibold leading-relaxed text-white/42 sm:px-8">
        <div className="mx-auto max-w-[1180px]">
          *These statements have not been evaluated by the Food and Drug
          Administration. This product is not intended to diagnose, treat, cure
          or prevent any disease.
        </div>
      </footer>
    </article>
  );
}

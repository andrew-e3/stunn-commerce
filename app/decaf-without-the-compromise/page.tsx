import {
  StunnListicleLandingPage,
  type ListicleLandingPageProps,
} from "app/_components/stunn-listicle-landing-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decaf Without the Compromise",
  description:
    "For people who love coffee and want the ritual back without caffeine deciding how the day feels.",
  robots: { index: false, follow: false },
};

const page: ListicleLandingPageProps = {
  eyebrow: "For people who love coffee and lost it",
  headline: "You did not lose coffee. You lost what coffee used to feel like.",
  subheadline:
    "Real coffee, real ritual, no caffeine. With Lion's Mane, Rhodiola, Cordyceps, and L-Theanine doing the quiet work underneath the cup.",
  trustRow: ["Real coffee taste", "No caffeine", "Cancel any time"],
  heroImage: "/images/stunn-about-purple-ritual-coffee.png",
  heroAlt: "A glass of coffee in purple light with coffee beans",
  heroCaptionEyebrow: "The cup, returned",
  heroCaption: "The ritual stays. The rest gets lighter.",
  listEyebrow: "The return",
  listHeadline: "6 reasons decaf does not have to feel like a compromise.",
  listIntro:
    "This is for the people who miss the warmth, the smell, the first quiet minutes, and the feeling that the cup used to mark the day.",
  sections: [
    {
      number: "01",
      eyebrow: "The cup you miss",
      title: "It was never just caffeine.",
      copy: "It was the warmth in your hands. The smell. The shape of the morning. When caffeine left, supermarket decaf did not fill the gap.",
      pull: "You miss the cup more than the climb.",
      image: "/images/stunn-about-purple-ritual-coffee.png",
      alt: "A glass of coffee in purple light with coffee beans",
    },
    {
      number: "02",
      eyebrow: "The cup you get back",
      title: "Real coffee. Real ritual. No caffeine.",
      copy: "STUNN is decaf instant coffee with real coffee taste and the sensory weight of a morning cup. Warm, familiar, and easy to return to. Not a wellness drink in a coffee costume. A cup.",
      pull: "Decaf without the compromise.",
      image: "/images/stunn-home-hero-mobile-product.png",
      alt: "STUNN decaf coffee box, sachet, glass of coffee, and grounds",
    },
    {
      number: "03",
      eyebrow: "The feeling",
      title: "Something is doing something.",
      copy: "Lion's Mane, Rhodiola, Cordyceps, and L-Theanine do quiet work in the background. It is not caffeine. It is a different kind of clear.",
      pull: "Quieter than coffee. Sharper than plain decaf.",
      image: "/images/stunn-email-ritual.jpg",
      alt: "A glass of coffee in purple light with coffee beans",
    },
    {
      number: "04",
      eyebrow: "What's inside",
      title: "Four ingredients, doing the work.",
      copy: "Lion's Mane 300mg. Rhodiola 250mg. Cordyceps 100mg. L-Theanine 100mg. Decaf instant coffee 1500mg. Per sachet, every day.",
      pull: "Real doses, in a decaf coffee that tastes like coffee.",
      image: "/images/stunn-function-pour-corrected.png",
      alt: "STUNN sachet pouring into coffee with ingredients nearby",
    },
    {
      number: "05",
      eyebrow: "The format",
      title: "Sachet. Hot water. Stir.",
      copy: "No machine, no scoop, no equipment. Office, hotel, hospital bag, holiday. The ritual goes where you go.",
      pull: "Wherever you make a cup, you can make this one.",
      image: "/images/stunn-sachet-pour.png",
      alt: "A STUNN sachet being poured into coffee",
    },
    {
      number: "06",
      eyebrow: "The people who get it",
      title: "For everyone caffeine left behind.",
      copy: "Some people stepped away for sleep. Some for health. Some because their body quietly said enough. STUNN was built because there should still be a cup.",
      pull: "The ritual stays. The rest gets lighter.",
      image: "/images/stunn-email-pour.jpg",
      alt: "STUNN sachet being poured into a cup of coffee",
    },
  ],
  proofEyebrow: "Proof, gently",
  proofHeadline: "What makes this decaf different.",
  proofNumbers: [
    ["0mg", "caffeine in every sachet"],
    ["1500mg", "real decaf instant coffee"],
    ["4", "functional ingredients"],
    ["30", "day money-back guarantee"],
  ],
  formula: [
    ["Lion's Mane", "300mg", "Focus + clarity"],
    ["Rhodiola", "250mg", "Stress + energy"],
    ["Cordyceps", "100mg", "Endurance + drive"],
    ["L-Theanine", "100mg", "Calm + alert"],
    ["Decaf instant coffee", "1500mg", "The real coffee base"],
  ],
  objectionsEyebrow: "If decaf let you down",
  objectionsHeadline: "This is not sad coffee.",
  proofCards: [
    {
      title: "Is it actually coffee?",
      copy: "Yes. The base is real decaf instant coffee, not a chicory or mushroom-only blend.",
    },
    {
      title: "Will I feel anything?",
      copy: "The formula is built for a quieter kind of clear, not a caffeine spike.",
    },
    {
      title: "Does it fit real life?",
      copy: "One sachet, hot water, stir. No machine or new morning ceremony required.",
    },
    {
      title: "Is it only for mornings?",
      copy: "No. The cup works whenever you want the ritual without the caffeine tradeoff.",
    },
  ],
  offerHeadline: "Get the cup back.",
  faqEyebrow: "Questions before you switch",
  faqHeadline: "The details coffee lovers check first.",
  faqs: [
    [
      "Does it actually taste like coffee?",
      "Yes. The base is real decaf instant coffee, not a chicory or mushroom-only blend. It tastes like coffee because it is coffee.",
    ],
    [
      "Is it truly caffeine-free?",
      "STUNN is decaf coffee with no added caffeine. Like almost all decaf coffee, trace residual caffeine may be present. If you need fully zero caffeine for medical reasons, check with your doctor.",
    ],
    [
      "Is it safe during pregnancy or breastfeeding?",
      "STUNN contains functional ingredients that may not be appropriate for every pregnancy or breastfeeding situation. Always check with your doctor before starting any new supplement.",
    ],
    [
      "Will it disturb my sleep?",
      "There is no added caffeine. Most people use it in the morning out of habit, but it is built for the afternoon window too.",
    ],
    [
      "Can I drink more than one a day?",
      "One sachet is the recommended daily serving. If you want a second cup, check the label and use your own judgement.",
    ],
  ],
  finalHeadline: "Get the cup back.",
  finalSubhead: "Real coffee taste. No caffeine. Free shipping. Cancel any time.",
  stickyLabel: "Decaf without compromise",
  slotPrefix: "lp-decaf",
};

export default function DecafWithoutTheCompromisePage() {
  return <StunnListicleLandingPage {...page} />;
}

import {
  StunnListicleLandingPage,
  type ListicleLandingPageProps,
} from "app/_components/stunn-listicle-landing-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drink the Stack",
  description:
    "For people already taking adaptogens and nootropics separately. Real decaf coffee with full doses in one sachet.",
  robots: { index: false, follow: false },
};

const page: ListicleLandingPageProps = {
  eyebrow: "For people already taking the stack separately",
  headline: "You are already taking all of this. Just not in the same cup.",
  subheadline:
    "Lion's Mane 300mg. Rhodiola 250mg. Cordyceps 100mg. L-Theanine 100mg. In a decaf coffee that replaces what was sitting on top of it.",
  trustRow: ["Full doses", "0mg caffeine", "Cancel any time"],
  heroImage: "/images/stunn-function-pour-corrected.png",
  heroAlt: "A STUNN sachet pouring into coffee with functional ingredients nearby",
  heroCaptionEyebrow: "The stack, simplified",
  heroCaption: "Full doses on label. One coffee ritual.",
  listEyebrow: "The audit",
  listHeadline: "6 reasons to close the supplement drawer.",
  listIntro:
    "This is for the people who already read the label, already know the ingredients, and still have too many bottles in the morning.",
  sections: [
    {
      number: "01",
      eyebrow: "The stack you already take",
      title: "The drawer says so.",
      copy: "Lion's Mane. Rhodiola. L-Theanine. Maybe Cordyceps. You are not new to this. The friction is not belief. It is logistics.",
      pull: "You believe in the stack. You just want it in one cup.",
      image: "/images/stunn-home-hero-mobile-product.png",
      alt: "STUNN box, sachet, coffee, and grounds",
    },
    {
      number: "02",
      eyebrow: "The doses",
      title: "Not a blend. A dose.",
      copy: "Most functional coffees hide behind proprietary blends. STUNN lists every dose per serving, every cup.",
      pull: "300mg Lion's Mane. 250mg Rhodiola. 100mg Cordyceps. 100mg L-Theanine.",
      image: "/images/stunn-function-pour-corrected.png",
      alt: "STUNN sachet pouring into coffee with ingredient still life",
    },
    {
      number: "03",
      eyebrow: "The caffeine question",
      title: "The leak you had not closed.",
      copy: "Sleep, screens, training, food. All audited. Then there is the regular coffee running on autopilot, deciding more of the day than it should.",
      pull: "Performance without dependency as a personality.",
      image: "/images/stunn-comparison-pour.png",
      alt: "A STUNN sachet pouring into coffee with functional ingredients nearby",
    },
    {
      number: "04",
      eyebrow: "The math",
      title: "Fewer products. Same morning.",
      copy: "Single-ingredient supplements add up fast. STUNN replaces the scattered stack and the extra coffee decision with one sachet.",
      pull: "Consolidation of products, time, and cost.",
      image: "/images/stunn-email-comparison.jpg",
      alt: "STUNN product comparison still life",
    },
    {
      number: "05",
      eyebrow: "The format",
      title: "One step, not seven.",
      copy: "Sachet. Hot water. Stir. Done. No measuring scoops, no pill organiser, no moment where you wonder which bottle you already opened.",
      pull: "Your stack, riding inside a habit you already have.",
      image: "/images/stunn-sachet-pour.png",
      alt: "STUNN sachet being poured into a cup",
    },
    {
      number: "06",
      eyebrow: "The identity",
      title: "The quiet club.",
      copy: "For people who got the rest of the system tight and decided sharp does not need to mean wired.",
      pull: "Quiet confidence. No grind.",
      image: "/images/stunn-about-purple-ritual-coffee.png",
      alt: "A glass of coffee in purple light",
    },
  ],
  proofEyebrow: "Proof, without the noise",
  proofHeadline: "The numbers are the point.",
  proofNumbers: [
    ["300mg", "Lion's Mane per sachet"],
    ["250mg", "Rhodiola per sachet"],
    ["100mg", "Cordyceps and L-Theanine"],
    ["0mg", "caffeine in every cup"],
  ],
  formula: [
    ["Lion's Mane", "300mg", "Focus + clarity"],
    ["Rhodiola", "250mg", "Stress + energy"],
    ["Cordyceps", "100mg", "Endurance + drive"],
    ["L-Theanine", "100mg", "Calm + alert"],
    ["Decaf instant coffee", "1500mg", "The real coffee base"],
  ],
  objectionsEyebrow: "If you read the label",
  objectionsHeadline: "The usual functional coffee objections.",
  proofCards: [
    {
      title: "Is it underdosed?",
      copy: "No proprietary blend hiding the math. Every dose is listed.",
    },
    {
      title: "Is it another morning step?",
      copy: "No. It replaces a step inside the coffee ritual you already have.",
    },
    {
      title: "Is it stimulant-coded?",
      copy: "No caffeine. No synthetic stimulant. Just the cue without the dependency.",
    },
    {
      title: "Is it portable?",
      copy: "One sachet goes where a bottle stack does not: desk, bag, hotel, office.",
    },
  ],
  offerHeadline: "Drink the stack.",
  faqEyebrow: "Questions before you switch",
  faqHeadline: "The details label-readers check first.",
  faqs: [
    [
      "Are the doses meaningful?",
      "The full per-serving doses are published on the label and on this page. You are not getting a sprinkle hidden inside a proprietary blend.",
    ],
    [
      "Can I take this on top of my existing supplements?",
      "Check the label against your current stack. Many customers use STUNN to simplify what they already take, but you should decide what stays based on your own routine.",
    ],
    [
      "Is there any stimulant in here?",
      "No added caffeine, no synthetic stimulants, and no proprietary blends. The coffee base is decaf instant coffee.",
    ],
    [
      "What if it does not replace what I am taking?",
      "There is a 30-day money-back guarantee, and subscriptions can be paused or cancelled from your account.",
    ],
  ],
  finalHeadline: "Drink the stack.",
  finalSubhead: "Full doses. 0mg caffeine. Free shipping. Cancel any time.",
  stickyLabel: "Drink the stack",
};

export default function DrinkTheStackPage() {
  return <StunnListicleLandingPage {...page} />;
}

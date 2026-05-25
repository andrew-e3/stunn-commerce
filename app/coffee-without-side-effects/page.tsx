import {
  StunnListicleLandingPage,
  type ListicleLandingPageProps,
} from "app/_components/stunn-listicle-landing-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coffee Without the Side Effects",
  description:
    "For coffee drinkers who cut back on caffeine but still want the ritual, taste, and clear workday cue.",
  robots: { index: false, follow: false },
};

const page: ListicleLandingPageProps = {
  eyebrow: "For people who cut back on caffeine and never replaced it",
  headline: "You did not quit coffee. You quit what coffee was doing to you.",
  subheadline:
    "Decaf coffee with Lion's Mane, Rhodiola, Cordyceps, and L-Theanine. One sachet. Your whole stack. No caffeine, no jitters, no crash.",
  trustRow: ["0mg caffeine", "Functional dose", "Coffee taste"],
  heroImage: "/images/stunn-about-purple-ritual-coffee.png",
  heroAlt: "A glass of decaf coffee in purple light with coffee beans",
  heroCaptionEyebrow: "The quiet switch",
  heroCaption: "Coffee taste, daily cue, 0mg caffeine.",
  listEyebrow: "The list",
  listHeadline: "6 reasons the coffee ritual had to change.",
  listIntro:
    "This is for the people who tried to cut back and realized the hard part was never giving up coffee. It was replacing the role coffee played in the day.",
  sections: [
    {
      number: "01",
      eyebrow: "The problem",
      title: "The afternoon you keep losing",
      copy: "Coffee used to be a tool. Then the tool started taking a cut: the second cup, the wired edge, the drop when you still need to think.",
      pull: "You are not anti-coffee. You are done paying for it twice.",
      image: "/images/stunn-email-pour.jpg",
      alt: "STUNN sachet being poured into a cup of coffee",
    },
    {
      number: "02",
      eyebrow: "The failed swaps",
      title: "Matcha was close. Nothing was not.",
      copy: "Cutting back often leaves a gap. You still want the cup, the pause, the warm cue that says it is time to switch on. You just do not want caffeine deciding how the day feels.",
      pull: "The ritual was never the problem. The dependency was.",
      image: "/images/stunn-email-ritual.jpg",
      alt: "A glass of coffee in purple light with coffee beans",
    },
    {
      number: "03",
      eyebrow: "The swap",
      title: "One sachet. Not six pills.",
      copy: "Lion's Mane in one bottle. Rhodiola in another. L-Theanine somewhere else. STUNN puts the functional stack inside a real decaf coffee cup.",
      pull: "Tear. Pour. Stir. Done.",
      image: "/images/stunn-home-hero-mobile-product.png",
      alt: "STUNN decaf coffee box, sachet, glass of coffee, and grounds",
    },
    {
      number: "04",
      eyebrow: "The feeling",
      title: "Sharp without the spike",
      copy: "This is not a stimulant hit. It is the calmer part of the coffee ritual: focus, warmth, momentum, and none of the climb-and-crash bargain.",
      pull: "No buzz. No crash. Just clear.",
      image: "/images/stunn-comparison-pour-lilac.png",
      alt: "A STUNN sachet pouring into coffee with ingredients nearby",
    },
    {
      number: "05",
      eyebrow: "The formula",
      title: "Doses, not a mystery blend",
      copy: "Real decaf coffee with 300mg Lion's Mane, 250mg Rhodiola, 100mg Cordyceps, and 100mg L-Theanine. The label is built to be read.",
      pull: "Coffee first. Function underneath.",
      image: "/images/stunn-function-pour-corrected.png",
      alt: "A STUNN sachet pouring into a cup with functional ingredients nearby",
    },
    {
      number: "06",
      eyebrow: "The identity",
      title: "The quiet club",
      copy: "For people who still care about output, but no longer want dependency dressed up as discipline. Same ambition. Cleaner ritual.",
      pull: "Off the drip is a calmer kind of sharp.",
      image: "/images/stunn-sachet-pour.png",
      alt: "A STUNN sachet being poured into a cup",
    },
  ],
  proofEyebrow: "Proof points",
  proofHeadline: "What changes in the cup.",
  proofNumbers: [
    ["0mg", "caffeine in every sachet"],
    ["4", "functional ingredients in one cup"],
    ["30", "sachets in a monthly box"],
    ["1", "coffee ritual replacing the second-cup loop"],
  ],
  formula: [
    ["Lion's Mane", "300mg", "Focus + clarity"],
    ["Rhodiola", "250mg", "Stress + energy"],
    ["Cordyceps", "100mg", "Endurance + drive"],
    ["L-Theanine", "100mg", "Calm + alert"],
    ["Decaf instant coffee", "1500mg", "The real coffee base"],
  ],
  objectionsEyebrow: "The objections",
  objectionsHeadline: "If you already tried the obvious swaps.",
  proofCards: [
    {
      title: "For the shaky second cup",
      copy: "A coffee ritual that does not ask you to trade focus for tension.",
    },
    {
      title: "For the 3pm dip",
      copy: "A calmer afternoon cue when another regular coffee would be too expensive later.",
    },
    {
      title: "For the overbuilt stack",
      copy: "The core support lives in one sachet, not across a row of bottles.",
    },
    {
      title: "For the coffee person",
      copy: "You keep the taste, warmth, and pause. You lose the caffeine loop.",
    },
  ],
  offerHeadline: "One month of the ritual reset.",
  faqEyebrow: "Questions before you switch",
  faqHeadline: "The details people check before they try it.",
  faqs: [
    [
      "Will I miss coffee?",
      "STUNN is decaf instant coffee. You still get the cup, warmth, and ritual. The difference is that caffeine is no longer driving the day.",
    ],
    [
      "Is this a stimulant?",
      "No. STUNN has 0mg caffeine. The formula uses adaptogens and nootropics for functional support without the caffeine spike.",
    ],
    [
      "Can I drink it in the afternoon?",
      "Yes. Since it is caffeine-free, it is built for the afternoon window where regular coffee can interfere with sleep later.",
    ],
    [
      "What if it does not work for me?",
      "STUNN includes a 30-day money-back guarantee. Subscription orders can be paused or cancelled from your account.",
    ],
  ],
  finalHeadline: "Caffeine had its run.",
  finalSubhead:
    "You do not have to quit coffee. You just stop letting caffeine decide how the day feels.",
  stickyLabel: "Coffee without the side effects",
  slotPrefix: "lp-coffee",
};

export default function CoffeeWithoutSideEffectsPage() {
  return <StunnListicleLandingPage {...page} />;
}

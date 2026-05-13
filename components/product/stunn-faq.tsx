"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const faqs = [
  {
    q: "What makes STUNN different from regular coffee?",
    a: "STUNN combines the ritual of coffee with functional nootropics — Lion's Mane, Rhodiola, Cordyceps, and L-Theanine. It's completely caffeine-free, so you get mental clarity and focus without jitters, crashes, or sleep disruption.",
  },
  {
    q: "How do I prepare STUNN?",
    a: "Each stick pack dissolves easily in hot or cold water. Mix one stick with 8-12oz of water, stir or shake, and enjoy. No brewing equipment needed.",
  },
  {
    q: "When can I drink STUNN?",
    a: "Any time of day — morning, afternoon, or evening. Because it's caffeine-free, STUNN won't affect your sleep no matter when you drink it.",
  },
  {
    q: "How long does one box last?",
    a: "Each box contains 30 individual stick packs. Enjoying one per day, a single box lasts a full month. Subscribe and save with multi-month options for even better value.",
  },
];

export function StunnFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-200">
      {faqs.map((faq, i) => (
        <div key={i} className="py-5">
          <button
            className="flex w-full items-center justify-between gap-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-medium text-gray-900">{faq.q}</span>
            <ChevronDownIcon
              className={`h-5 w-5 flex-none text-gray-400 transition-transform duration-200 ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {open === i && (
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

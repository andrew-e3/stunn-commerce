"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  {
    text: "Free shipping on subscription + orders $75+",
    className: "bg-[#5A3493] text-white",
  },
  {
    text: "No caffeine. No crash. Same ritual.",
    className: "bg-[#111111] text-white",
  },
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const message = MESSAGES[index]!;

  const showPrevious = () => {
    setIndex((current) => (current - 1 + MESSAGES.length) % MESSAGES.length);
  };

  const showNext = () => {
    setIndex((current) => (current + 1) % MESSAGES.length);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % MESSAGES.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className={`relative flex min-h-9 items-center justify-center overflow-hidden px-11 py-2 text-center text-sm font-semibold transition-colors duration-500 ${message.className}`}
    >
      <button
        type="button"
        aria-label="Previous announcement"
        onClick={showPrevious}
        className="absolute left-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-white transition-opacity hover:opacity-70"
      >
        <span aria-hidden="true" className="text-2xl font-light leading-none">
          ‹
        </span>
      </button>
      <span key={message.text} className="animate-hero-copy-in block px-4">
        {message.text}
      </span>
      <button
        type="button"
        aria-label="Next announcement"
        onClick={showNext}
        className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-white transition-opacity hover:opacity-70"
      >
        <span aria-hidden="true" className="text-2xl font-light leading-none">
          ›
        </span>
      </button>
    </div>
  );
}

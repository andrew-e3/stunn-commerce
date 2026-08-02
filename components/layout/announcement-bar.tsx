"use client";

import { useEffect, useState } from "react";

export type AnnouncementMessage = { text: string; href?: string };

// Fallback copy, used when Sanity has no announcements configured so the bar
// always renders something on brand.
const DEFAULT_MESSAGES: AnnouncementMessage[] = [
  { text: "10% off your first order · code WELCOME10" },
  { text: "Free shipping on every US order" },
  { text: "No caffeine. No crash. Same ritual." },
];

const BAR_CLASS = "bg-[#5A3493] text-white";

export function AnnouncementBar({
  messages,
}: {
  messages?: AnnouncementMessage[];
}) {
  const MESSAGES =
    messages && messages.length > 0 ? messages : DEFAULT_MESSAGES;
  const [index, setIndex] = useState(0);
  const safeIndex = index % MESSAGES.length;
  const message = MESSAGES[safeIndex]!;

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
    // Fixed height, not min-height: messages rotate every 3.5s, and a longer one
    // wrapping to two lines used to grow the bar and shift the whole page down.
    // Height is locked and copy is held to a single line at every width.
    <div
      className={`relative flex h-9 items-center justify-center overflow-hidden px-10 text-center text-[13px] font-semibold transition-colors duration-500 sm:px-11 sm:text-sm ${BAR_CLASS}`}
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
      {message.href ? (
        <a
          key={message.text}
          href={message.href}
          className="animate-hero-copy-in block truncate whitespace-nowrap px-2 underline-offset-2 hover:underline sm:px-4"
        >
          {message.text}
        </a>
      ) : (
        <span key={message.text} className="animate-hero-copy-in block truncate whitespace-nowrap px-2 sm:px-4">
          {message.text}
        </span>
      )}
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

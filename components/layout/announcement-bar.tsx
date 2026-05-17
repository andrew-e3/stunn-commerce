"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  {
    text: "No caffeine. No crash. Same ritual.",
    className: "bg-[#5A3493] text-white",
  },
  {
    text: "Free shipping on subscription + orders $75+",
    className: "bg-[#F47A1F] text-white",
  },
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const message = MESSAGES[index]!;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % MESSAGES.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className={`relative overflow-hidden py-2 text-center text-sm font-semibold transition-colors duration-500 ${message.className}`}
    >
      <span key={message.text} className="animate-hero-copy-in block px-4">
        {message.text}
      </span>
    </div>
  );
}

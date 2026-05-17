"use client";

import { FormEvent, useEffect, useState } from "react";

declare global {
  interface Window {
    klaviyo?: {
      push?: (args: unknown[]) => void;
    };
  }
}

type CaptureMode = "inline" | "popup";
type CaptureTone = "light" | "dark";

const DISMISSED_KEY = "stunn.offTheDrip.dismissedUntil";
const JOINED_KEY = "stunn.offTheDrip.joined";
const DISMISS_MS = 1000 * 60 * 60 * 24 * 7;

export function OffTheDripCapture({
  mode = "inline",
  tone = "dark",
  className = "",
}: {
  mode?: CaptureMode;
  tone?: CaptureTone;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [open, setOpen] = useState(mode === "inline");

  useEffect(() => {
    if (mode !== "popup") return;
    if (typeof window === "undefined") return;

    const joined = window.localStorage.getItem(JOINED_KEY);
    const dismissedUntil = Number(window.localStorage.getItem(DISMISSED_KEY) || 0);
    if (joined || dismissedUntil > Date.now()) return;

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable > 0.5) {
        setOpen(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 8) {
        setOpen(true);
        document.removeEventListener("mouseleave", onMouseLeave);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [mode]);

  const dismiss = () => {
    window.localStorage.setItem(DISMISSED_KEY, String(Date.now() + DISMISS_MS));
    setOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      setStatus("error");
      return;
    }

    window.klaviyo?.push?.(["identify", { $email: trimmed }]);
    window.klaviyo?.push?.([
      "track",
      "Joined Off The Drip",
      { source: mode, movement: "Off The Drip" },
    ]);
    window.localStorage.setItem(JOINED_KEY, "true");
    setStatus("success");
  };

  if (!open) return null;

  const dark = tone === "dark";
  const shell =
    mode === "popup"
      ? "fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-[520px] rounded-[18px] border p-4 shadow-[0_18px_70px_rgba(17,17,17,0.28)] sm:bottom-5 sm:right-5 sm:left-auto"
      : `rounded-[18px] border p-5 sm:p-6 ${className}`;
  const colors = dark
    ? "border-white/14 bg-[#111111] text-white"
    : "border-[#111111]/12 bg-white text-[#111111]";
  const inputColors = dark
    ? "border-white/22 bg-white/8 text-white placeholder:text-white/45 focus:border-white"
    : "border-[#111111]/18 bg-white text-[#111111] placeholder:text-[#111111]/38 focus:border-[#111111]";

  return (
    <div className={`${shell} ${colors}`}>
      {mode === "popup" && (
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none text-current/60 transition hover:bg-current/10 hover:text-current"
          aria-label="Close Off The Drip signup"
        >
          ×
        </button>
      )}

      <p className="mb-2 text-[11px] font-black uppercase tracking-[0.24em] opacity-55">
        Off The Drip
      </p>
      <h2 className="stunn-display text-[clamp(2rem,5vw,3.75rem)] uppercase leading-[0.92] tracking-normal">
        Join Off The Drip
      </h2>
      <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed opacity-72">
        Early access to new caffeine-free drops, behind-the-scenes, and a
        community of people who have broken the dependency.
      </p>

      {status === "success" ? (
        <p className="mt-5 rounded-[10px] bg-[#EDE9F8] px-4 py-3 text-sm font-black text-[#111111]">
          You&apos;re in. Caffeine had its run.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-5 flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setStatus("idle");
            }}
            placeholder="Email"
            aria-label="Email address"
            className={`min-h-12 min-w-0 flex-1 rounded-[8px] border px-4 text-sm font-bold outline-none transition ${inputColors}`}
          />
          <button
            type="submit"
            className="stunn-cta-motion min-h-12 rounded-[8px] border-2 border-[#5A3493] bg-[#5A3493] px-5 text-sm font-black uppercase tracking-[0.08em] text-white"
          >
            Join Off The Drip
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-2 text-xs font-bold text-[#EFAF00]">
          Add a valid email to join.
        </p>
      )}
    </div>
  );
}

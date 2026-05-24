"use client";

import { FormEvent, useState } from "react";
import { toneClass, type Tone } from "../shared";

export interface EmailCaptureBlockData {
  heading?: string;
  body?: string;
  tone?: Tone;
}

// Self-contained Quiet Club capture for landing pages, so the copy is editable
// per page. Posts to the existing Klaviyo subscribe route with an LP source.
export function EmailCapture({ block }: { block: EmailCaptureBlockData }) {
  const tone = block.tone === "light" ? "light" : "dark";
  const dark = tone === "dark";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const response = await fetch("/api/klaviyo/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          source: "quiet-club-lp",
          page:
            typeof window === "undefined"
              ? undefined
              : window.location.pathname,
        }),
      });
      if (!response.ok) throw new Error("subscribe failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputColors = dark
    ? "border-white/22 bg-white/10 text-white placeholder:text-white/45 focus:border-white"
    : "border-[#111111]/18 bg-white text-[#111111] placeholder:text-[#111111]/38 focus:border-[#111111]";

  return (
    <section className={toneClass(tone)}>
      <div className="mx-auto max-w-2xl px-6 py-16 text-center lg:px-8 lg:py-20">
        <p className="mb-2 text-[11px] font-black uppercase tracking-[0.24em] opacity-55">
          Quiet Club
        </p>
        <h2 className="stunn-display text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[0.95]">
          {block.heading || "Join the Quiet Club"}
        </h2>
        {block.body && (
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed opacity-75">
            {block.body}
          </p>
        )}

        {status === "success" ? (
          <p className="mx-auto mt-6 inline-block rounded-[10px] bg-[#EDE9F8] px-4 py-3 text-sm font-black text-[#111111]">
            You&apos;re in. Welcome to Quiet Club.
          </p>
        ) : (
          <form
            onSubmit={submit}
            className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              disabled={status === "submitting"}
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
              disabled={status === "submitting"}
              className="stunn-cta-motion min-h-12 rounded-[8px] border-2 border-[#5A3493] bg-[#5A3493] px-5 text-sm font-black uppercase tracking-[0.08em] text-white"
            >
              {status === "submitting" ? "Joining..." : "Join Quiet Club"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 text-xs font-bold text-[#EFAF00]">
            Add a valid email to join.
          </p>
        )}
      </div>
    </section>
  );
}

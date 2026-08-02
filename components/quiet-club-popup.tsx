"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import BrandLogo from "components/brand-logo";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type SubmitStatus = "idle" | "submitting" | "error" | "success";

const DISMISSED_KEY = "stunn.quietClub.dismissedUntil";
const JOINED_KEY = "stunn.quietClub.joined";
const DISMISS_MS = 1000 * 60 * 60 * 24 * 7;
const DISCOUNT_CODE = "WELCOME10";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function QuietClubPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const joined = window.localStorage.getItem(JOINED_KEY);
    const dismissedUntil = Number(
      window.localStorage.getItem(DISMISSED_KEY) || 0,
    );
    if (joined || dismissedUntil > Date.now()) return;

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    let timer: number | undefined;

    const reveal = () => {
      setOpen(true);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (timer) window.clearTimeout(timer);
    };

    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= 0.45) reveal();
    };

    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 8) reveal();
    };

    if (finePointer) {
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("mouseleave", onMouseLeave);
      timer = window.setTimeout(reveal, 30000);
    } else {
      // A timer avoids reopening the mobile scroll-jump issue caused by
      // depth-triggered overlays while the customer is actively swiping.
      timer = window.setTimeout(reveal, 12000);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(DISMISSED_KEY, String(Date.now() + DISMISS_MS));
    setOpen(false);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim().toLowerCase();

    if (!isValidEmail(trimmed)) {
      setError("Enter a valid email to unlock your code.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/klaviyo/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          source: "quiet-club-10-off-popup",
          page: window.location.pathname,
        }),
      });

      if (!response.ok) throw new Error("Klaviyo subscribe failed");

      window.localStorage.setItem(JOINED_KEY, "true");
      setStatus("success");
    } catch {
      setError("We couldn't add you just now. Please try again.");
      setStatus("error");
    }
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(DISCOUNT_CODE);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  if (
    pathname.includes("mockup") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/checkout")
  ) {
    return null;
  }

  return (
    <Dialog open={open} onClose={dismiss} className="relative z-[1000001]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-[#111111]/66 backdrop-blur-[3px] transition duration-300 data-closed:opacity-0"
      />

      <div className="fixed inset-0 flex w-screen items-end justify-center overflow-y-auto px-3 py-3 sm:items-center sm:px-6 sm:py-8">
        <DialogPanel
          transition
          className="relative grid w-full max-w-[900px] overflow-hidden rounded-[12px] border border-[#111111]/12 bg-[#F4F1F6] text-[#111111] shadow-[0_28px_100px_rgba(17,17,17,0.38)] transition duration-300 data-closed:translate-y-5 data-closed:opacity-0 sm:data-closed:scale-[0.98] md:grid-cols-[1.06fr_0.94fr]"
        >
          <button
            type="button"
            onClick={dismiss}
            className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[#111111]/12 bg-white/92 text-2xl leading-none text-[#111111] transition hover:border-[#111111] hover:bg-[#111111] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A3493]"
            aria-label="Close Quiet Club offer"
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="order-2 flex flex-col justify-center px-5 py-6 sm:px-8 sm:py-8 md:order-1 md:min-h-[548px] md:px-11 md:py-12">
            <div className="[&>span]:h-6 [&>span]:w-[105px]">
              <BrandLogo />
            </div>

            {status === "success" ? (
              <div className="mt-7 max-w-[440px]">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#5A3493]">
                  Welcome to Quiet Club
                </p>
                <DialogTitle className="stunn-display mt-3 text-[clamp(3rem,12vw,5.4rem)] uppercase leading-[0.88] tracking-normal">
                  Your 10% is unlocked.
                </DialogTitle>
                <p className="mt-4 max-w-sm text-sm font-semibold leading-relaxed text-[#56505C] sm:text-base">
                  Use this code on your first STUNN order. Keep it handy for
                  checkout.
                </p>

                <button
                  type="button"
                  onClick={copyCode}
                  className="mt-6 flex min-h-16 w-full max-w-sm items-center justify-between rounded-[8px] border border-[#5A3493]/24 bg-white px-5 text-left transition hover:border-[#5A3493]"
                  aria-label={`Copy discount code ${DISCOUNT_CODE}`}
                >
                  <span>
                    <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-[#5A3493]">
                      Your code
                    </span>
                    <span className="mt-0.5 block text-xl font-black tracking-[0.12em]">
                      {DISCOUNT_CODE}
                    </span>
                  </span>
                  <span className="text-xs font-black uppercase tracking-[0.08em] text-[#5A3493]">
                    {copied ? "Copied" : "Copy"}
                  </span>
                </button>

                <a
                  href="/products/focus-without-caffeine"
                  className="stunn-cta-motion mt-3 inline-flex min-h-12 w-full max-w-sm items-center justify-center rounded-[8px] border-2 border-[#5A3493] bg-[#5A3493] px-5 text-sm font-black uppercase tracking-[0.08em] text-white"
                >
                  Shop STUNN
                </a>
              </div>
            ) : (
              <>
                <p className="mt-6 text-[11px] font-black uppercase tracking-[0.22em] text-[#5A3493]">
                  Join the Quiet Club
                </p>
                <DialogTitle className="stunn-display mt-3 max-w-[460px] text-[clamp(3.05rem,12vw,4.9rem)] uppercase leading-[0.88] tracking-normal">
                  10% off your first order.
                </DialogTitle>
                <p className="mt-4 max-w-[410px] text-sm font-semibold leading-relaxed text-[#56505C] sm:text-base">
                  Start your caffeine-free ritual for less, then stay close for
                  new drops, private notes, and Quiet Club offers.
                </p>

                <form onSubmit={submit} className="mt-6 max-w-[455px]">
                  <label
                    htmlFor="quiet-club-email"
                    className="text-[10px] font-black uppercase tracking-[0.16em] text-[#111111]/58"
                  >
                    Email address
                  </label>
                  <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                    <input
                      id="quiet-club-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      disabled={status === "submitting"}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setStatus("idle");
                        setError("");
                      }}
                      placeholder="you@email.com"
                      aria-describedby={error ? "quiet-club-error" : undefined}
                      className="min-h-12 min-w-0 flex-1 rounded-[8px] border border-[#111111]/18 bg-white px-4 text-sm font-bold text-[#111111] outline-none transition placeholder:text-[#111111]/34 focus:border-[#5A3493] focus:ring-2 focus:ring-[#5A3493]/12"
                    />
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="stunn-cta-motion min-h-12 rounded-[8px] border-2 border-[#5A3493] bg-[#5A3493] px-5 text-sm font-black uppercase tracking-[0.08em] text-white disabled:opacity-60"
                    >
                      {status === "submitting" ? "Unlocking..." : "Unlock 10%"}
                    </button>
                  </div>
                  {status === "error" && error ? (
                    <p
                      id="quiet-club-error"
                      role="alert"
                      className="mt-2 text-xs font-bold text-[#5A3493]"
                    >
                      {error}
                    </p>
                  ) : null}
                  <p className="mt-3 text-[11px] font-semibold leading-relaxed text-[#6E6873]">
                    No inbox noise. Unsubscribe anytime.
                  </p>
                </form>

                <div className="mt-6 grid max-w-[455px] grid-cols-3 border-t border-[#111111]/12 pt-4">
                  {["10% today", "Early drops", "Private offers"].map(
                    (item) => (
                      <p
                        key={item}
                        className="border-r border-[#111111]/10 px-2 text-center text-[9px] font-black uppercase leading-tight tracking-[0.09em] text-[#111111]/62 first:pl-0 last:border-0 last:pr-0 sm:text-[10px]"
                      >
                        {item}
                      </p>
                    ),
                  )}
                </div>
              </>
            )}
          </div>

          <div className="relative order-1 h-[150px] overflow-hidden border-b border-[#111111]/10 bg-[#EDE9F8] md:order-2 md:h-auto md:min-h-[548px] md:border-b-0 md:border-l">
            <img
              src="/images/stunn-home-hero-mobile-product.png"
              alt="STUNN decaf coffee box, sachet, and prepared coffee"
              className="absolute inset-0 h-full w-full object-cover object-[50%_55%] md:hidden"
            />
            <img
              src="/images/stunn-sachet-pour-lilac.png"
              alt="STUNN decaf coffee sachet being poured beside the product box"
              className="absolute inset-0 hidden h-full w-full object-cover object-[48%_50%] md:block"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.02)_50%,rgba(17,17,17,0.13)_100%)]" />
            <div className="absolute bottom-3 left-3 rounded-full border border-white/55 bg-white/88 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-[#111111] backdrop-blur-sm md:bottom-5 md:left-5 md:text-[10px]">
              No caffeine. Same ritual.
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

"use client";

import Footer from "components/layout/footer";
import Image from "next/image";
import { useState } from "react";

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";

const iconColumns = [
  {
    icon: `${CDN}icon-package.svg`,
    heading: "Fast Delivery",
    text: "Get STUNN shipped straight to your door. Quick, reliable, hassle-free.",
  },
  {
    icon: `${CDN}icon-exchange.svg`,
    heading: "Subscription Made Easy",
    text: "Never run out. Save up to 25% with subscription orders, and cancel anytime.",
  },
  {
    icon: `${CDN}icon-bolt-circle.svg`,
    heading: "Simple & Convenient",
    text: "One box a month, zero stress, coffee delivered the way you want it.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  }

  return (
    <>
      {/* ── HEADER ── */}
      <section className="bg-white border-b border-[#111111]/10 py-14 lg:py-20">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full border border-[#111111]/30 px-3 py-1 text-xs font-medium tracking-widest text-[#111111]">
              Get In Touch
            </span>
            <h1 className="mb-4 font-[family-name:var(--font-anton)] text-[clamp(36px,5vw,64px)] uppercase leading-tight text-[#111111]">
              Contact Us
            </h1>
            <p className="text-base leading-relaxed text-[#111111]/65">
              We Are Here To Help.
            </p>
            <p className="mt-2 text-sm text-[#111111]/50">
              If you have a question about STUNN, your order, or whether this is
              the right fit for you, we would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          {submitted ? (
            <div className="rounded-xl border border-[#111111]/20 bg-white/60 p-12 text-center">
              <div className="mb-4 text-4xl">✓</div>
              <h2 className="mb-2 font-[family-name:var(--font-anton)] text-2xl uppercase text-[#111111]">
                Message Sent
              </h2>
              <p className="text-sm text-[#111111]/65">
                Thanks for reaching out. We&apos;ll get back to you as soon as
                possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#111111]/75"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full rounded-[10px] border border-gray-200 bg-white px-4 py-3 text-sm text-[#111111] outline-none transition-all focus:border-[#5A3493] focus:ring-2 focus:ring-[#5A3493]/20"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#111111]/75"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full rounded-[10px] border border-gray-200 bg-white px-4 py-3 text-sm text-[#111111] outline-none transition-all focus:border-[#5A3493] focus:ring-2 focus:ring-[#5A3493]/20"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#111111]/75"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-[10px] border border-gray-200 bg-white px-4 py-3 text-sm text-[#111111] outline-none transition-all focus:border-[#5A3493] focus:ring-2 focus:ring-[#5A3493]/20"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#111111]/75"
                >
                  Phone Number{" "}
                  <span className="font-normal normal-case tracking-normal text-[#111111]/40">
                    (optional)
                  </span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full rounded-[10px] border border-gray-200 bg-white px-4 py-3 text-sm text-[#111111] outline-none transition-all focus:border-[#5A3493] focus:ring-2 focus:ring-[#5A3493]/20"
                  placeholder="+1 (000) 000-0000"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#111111]/75"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-[10px] border border-gray-200 bg-white px-4 py-3 text-sm text-[#111111] outline-none transition-all focus:border-[#5A3493] focus:ring-2 focus:ring-[#5A3493]/20"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-[10px] bg-[#5A3493] py-4 text-sm font-bold uppercase tracking-widest text-white shadow-[0_5px_0_0_#43256F] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#43256F] active:translate-y-[4px] active:shadow-[0_1px_0_0_#43256F] disabled:opacity-60"
              >
                {loading ? "Sending..." : "Submit"}
              </button>

              <p className="text-center text-xs text-[#111111]/40">
                This site is protected by reCAPTCHA and the Google{" "}
                <a
                  href="https://policies.google.com/privacy"
                  className="underline"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://policies.google.com/terms"
                  className="underline"
                >
                  Terms of Service
                </a>{" "}
                apply.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── ICON COLUMNS ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid divide-x divide-[#111111]/10 border-b border-t border-[#111111]/10 lg:grid-cols-3">
            {iconColumns.map((col) => (
              <div
                key={col.heading}
                className="flex flex-col items-center px-8 py-12 text-center"
              >
                <Image
                  src={col.icon}
                  alt={col.heading}
                  width={40}
                  height={40}
                  className="mb-4 h-10 w-10"
                />
                <p className="mb-2 font-[family-name:var(--font-anton)] text-xl uppercase text-[#111111]">
                  {col.heading}
                </p>
                <p className="text-sm leading-relaxed text-[#111111]/65">
                  {col.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

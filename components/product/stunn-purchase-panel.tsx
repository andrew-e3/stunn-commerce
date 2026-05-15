"use client";

import { addItem } from "components/cart/actions";
import { useCart } from "components/cart/cart-context";
import { DEFAULT_OPTION } from "lib/constants";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import { useState, useTransition } from "react";

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";

// Each tier = N single boxes. Shopify automatic discounts should apply the real discount.
const SUPPLY_TIERS = [
  {
    qty: 3,
    label: "3 Months",
    display: "3 Boxes",
    shipEvery: "every 3 months",
    shipLabel: "3 boxes (90 sachets) · ships every 3 months",
    count: 90,
    retailPrice: 119.97,
    subPrice: 101.97,
    subPerDay: "1.13",
    retailPerDay: "1.33",
    saving: 18.0,
    popular: true,
    boxImg: `${CDN}3_e644de60-d3c2-46f8-8f0c-a3ff6cdc08ce.svg`,
  },
  {
    qty: 2,
    label: "2 Months",
    display: "2 Boxes",
    shipEvery: "every 2 months",
    shipLabel: "2 boxes (60 sachets) · ships every 2 months",
    count: 60,
    retailPrice: 79.98,
    subPrice: 67.98,
    subPerDay: "1.19",
    retailPerDay: "1.33",
    saving: 12.0,
    popular: false,
    boxImg: `${CDN}2_285eb8bf-bd05-4b30-9fe2-102fc163df41.svg`,
  },
  {
    qty: 1,
    label: "1 Month",
    display: "1 Box",
    shipEvery: "every month",
    shipLabel: "1 box (30 sachets) · ships every month",
    count: 30,
    retailPrice: 39.99,
    subPrice: 33.99,
    subPerDay: "1.22",
    retailPerDay: "1.33",
    saving: 6.0,
    popular: false,
    boxImg: `${CDN}1_f8453072-0eb1-4a97-b211-2dca94f998b6.svg`,
  },
];

const BENEFIT_CHIPS = [
  "Calm Focus",
  "No Jitters",
  "No Crash",
  "Sleep Friendly",
  "Steady Energy",
  "Gentle on Stomach",
];

function CheckCircleIcon() {
  return (
    <svg
      className="h-4 w-4 flex-shrink-0 text-[#5A3493]"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.78 6.28-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 3.97-3.97a.75.75 0 0 1 1.06 1.06z" />
    </svg>
  );
}

function DarkCheckIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white">
      <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor">
        <path d="M6.4 10.9 3.2 7.7l1.1-1.1 2.1 2.1 5.3-5.3 1.1 1.1z" />
      </svg>
    </span>
  );
}

export function StunnPurchasePanel({ product }: { product: Product }) {
  const [selectedQty, setSelectedQty] = useState(3);
  const { addCartItem } = useCart();
  const [addPending, startAddTransition] = useTransition();
  const [otpPending, startOtpTransition] = useTransition();

  const display = SUPPLY_TIERS.find((v) => v.qty === selectedQty)!;

  const oneBoxVariant =
    product.variants.find(
      (variant) =>
        variant.title === DEFAULT_OPTION ||
        variant.selectedOptions.every(
          (option) => option.value === DEFAULT_OPTION,
        ),
    ) ||
    product.variants.find((variant) =>
      variant.selectedOptions.some((option) => option.value === "1 Month"),
    ) ||
    product.variants[0];

  return (
    <div className="px-6 py-8 lg:px-10">
      {/* Stars */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-lg leading-none text-[#EFAF00]">★★★★★</span>
        <span className="text-sm font-bold text-gray-900">5.0</span>
        <span className="text-sm text-gray-500">Excellent</span>
      </div>

      {/* Title */}
      <h1 className="mb-1 font-[family-name:var(--font-anton)] text-4xl uppercase leading-tight tracking-wide text-[#5A3493]">
        Quit caffeine. Keep the edge.
      </h1>
      <p className="mb-5 max-w-md text-base leading-relaxed text-gray-600">
        Everything you love about coffee. None of what you don&apos;t: no
        jitters, no crash, no dependency.
      </p>

      {/* Benefit chips */}
      <div className="mb-5 flex flex-wrap gap-2">
        {BENEFIT_CHIPS.slice(0, 4).map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-[#5A3493]/20 bg-[#EDE9F8] px-3 py-1 text-xs font-semibold text-[#5A3493]"
          >
            {chip}
          </span>
        ))}
      </div>

      {/* Social proof avatars */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex -space-x-2">
          {["img-avatar-3.jpg", "img-avatar-4.jpg", "img-avatar-5.jpg"].map(
            (a) => (
              <img
                key={a}
                src={`${CDN}${a}`}
                alt=""
                className="h-7 w-7 rounded-full border-2 border-white object-cover"
              />
            ),
          )}
        </div>
        <span className="text-xs text-gray-500">
          1,000+ Others Exploring Better Coffee
        </span>
      </div>

      {/* Quantity selector */}
      <p className="mb-3 text-sm font-extrabold text-gray-900">
        1. Select Your Size:
      </p>
      <div className="mb-5 grid grid-cols-3 gap-2">
        {SUPPLY_TIERS.map((v) => {
          const isSelected = selectedQty === v.qty;
          return (
            <button
              key={v.qty}
              type="button"
              onClick={() => setSelectedQty(v.qty)}
              className={`relative flex min-h-[82px] items-center gap-2 rounded-[10px] border p-2 text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(90,52,147,0.12)] ${
                isSelected
                  ? "border-2 border-gray-900 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                  : "border-gray-300 bg-white hover:border-[#5A3493]/60"
              }`}
            >
              {v.popular && (
                <span className="absolute -top-2 left-3 whitespace-nowrap rounded-[3px] bg-gray-900 px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wide text-white">
                  Best Value
                </span>
              )}
              <img
                src={v.boxImg}
                alt={`${v.qty} box supply`}
                className="h-14 w-14 shrink-0 object-contain"
              />
              <div className="min-w-0">
                <span className="block text-sm font-extrabold leading-tight text-gray-900">
                  {v.label}
                </span>
                <span className="block text-[11px] leading-tight text-gray-500">
                  {v.count} Count
                </span>
                <span className="mt-0.5 block text-[11px] font-medium leading-tight text-gray-500">
                  (${v.subPerDay} / Day)
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Autoship offer card */}
      <div className="mb-5 rounded-[12px] bg-white p-4 shadow-[0_12px_32px_rgba(90,52,147,0.14)]">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-extrabold leading-none text-gray-900">
                Autoship
              </h2>
              <span className="rounded-full bg-[#5A3493] px-2 py-1 text-[11px] font-extrabold uppercase leading-none text-white">
                Save 15%
              </span>
            </div>
            <p className="text-xs text-gray-900">
              <strong>{display.label}</strong>{" "}
              <span>{display.count} Count</span>{" "}
              <span>${display.subPerDay} / Day</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400 line-through">
              ${display.retailPrice.toFixed(0)}
            </p>
            <p className="text-xl font-extrabold leading-none text-gray-900">
              ${display.subPrice.toFixed(0)}
            </p>
            <p className="mt-1 text-xs text-gray-700">
              You&apos;re saving ${display.saving.toFixed(0)}
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={!oneBoxVariant || addPending}
          onClick={() => {
            if (!oneBoxVariant) return;
            addCartItem(oneBoxVariant, product, display.qty);
            startAddTransition(async () => {
              await addItem(null, oneBoxVariant.id, display.qty);
            });
          }}
          className="mb-4 w-full rounded-[8px] bg-[#5A3493] py-4 text-sm font-extrabold uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-[#4A2A78] hover:shadow-[0_10px_22px_rgba(90,52,147,0.22)] active:translate-y-0 disabled:opacity-50"
        >
          {addPending ? "ADDING..." : "ADD TO CART"}
        </button>

        <div className="grid gap-2 text-[11px] text-gray-700 sm:grid-cols-3">
          {[
            `Ships FREE ${display.shipEvery}`,
            "VIP discounts & perks",
            "Pause, edit or cancel anytime",
          ].map((b) => (
            <span key={b} className="flex items-center gap-2">
              <DarkCheckIcon />
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* One-time purchase — secondary, clearly below ATC */}
      <div className="mb-6 text-center">
        <button
          type="button"
          disabled={!oneBoxVariant || otpPending}
          onClick={() => {
            if (!oneBoxVariant) return;
            addCartItem(oneBoxVariant, product, display.qty);
            startOtpTransition(async () => {
              await addItem(null, oneBoxVariant.id, display.qty);
            });
          }}
          className="text-xs text-gray-500 disabled:opacity-50"
        >
          <span className="font-semibold underline text-gray-700">
            {otpPending
              ? "Adding…"
              : `One-Time Purchase — $${display.retailPrice.toFixed(0)} ($${display.retailPerDay} / Day)`}
          </span>
        </button>
      </div>

      {/* Trust badges */}
      <div className="mb-5 grid grid-cols-3 gap-6 text-center">
        {[
          {
            icon: `${CDN}icon-check-tag.svg`,
            label: "30-Day Money Back\nGuarantee",
          },
          {
            icon: `${CDN}icon-truck.svg`,
            label: "Ships Within\n1 Business Day",
          },
          {
            icon: `${CDN}icon-smile.svg`,
            label: "Over 1000+\nHappy Customers",
          },
        ].map((b) => (
          <div
            key={b.label}
            className="flex flex-col items-center gap-2 text-center"
          >
            <Image
              src={b.icon}
              alt={b.label.replace("\n", " ")}
              width={32}
              height={32}
              className="h-7 w-7 brightness-0"
            />
            <span className="whitespace-pre-line text-xs font-extrabold leading-tight text-gray-900">
              {b.label}
            </span>
          </div>
        ))}
      </div>

      {/* Payment icons */}
      <div className="mb-6 rounded-[10px] border border-gray-100 p-3 text-center">
        <p className="mb-2 text-xs text-gray-400">We accept:</p>
        <Image
          src={`${CDN}icon-payment-mode-logos.svg`}
          alt="Visa, Apple Pay, Mastercard and more"
          width={300}
          height={24}
          className="mx-auto h-5 w-auto"
        />
      </div>

      {/* Accordions */}
      <Accordion title="INGREDIENTS" defaultOpen>
        <p className="text-sm leading-relaxed text-gray-600">
          <strong className="text-gray-900">STUNN</strong> is crafted with a
          clean, functional blend of Lion&apos;s Mane 300mg, Rhodiola 250mg,
          Cordyceps 100mg, L-Theanine 100mg, and Decaf Instant Coffee 1500mg.
        </p>
      </Accordion>
      <Accordion title="WHY STUNN?">
        <p className="text-sm leading-relaxed text-gray-600">
          Most coffee gives you ritual and side effects together. STUNN keeps
          the ritual and removes the caffeine loop: the spike, crash, disrupted
          sleep, and tolerance creep.
        </p>
      </Accordion>
      <Accordion title="DIRECTIONS">
        <p className="text-sm leading-relaxed text-gray-600">
          Mix one sachet into 8–12 oz of hot or cold water. Stir or shake well.
          Enjoy morning, afternoon, or evening — no cutoff time needed.
        </p>
      </Accordion>
      <Accordion title="BENEFITS">
        <ul className="space-y-2 text-sm text-gray-600">
          {[
            "Calm, sustained focus without jitters",
            "No afternoon crash",
            "Sleep-friendly — drink it any time of day",
            "Gentle on the stomach",
            "30-day money back guarantee",
          ].map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-0.5 text-[#5A3493]">✓</span>
              {b}
            </li>
          ))}
        </ul>
      </Accordion>
    </div>
  );
}

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-gray-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 text-left"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-gray-800">
          {title}
        </span>
        <span className="text-lg text-gray-400">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

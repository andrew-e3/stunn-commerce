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
      className="h-3 w-3 flex-shrink-0 text-[#5A3493]"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.78 6.28-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 3.97-3.97a.75.75 0 0 1 1.06 1.06z" />
    </svg>
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
        {product.title}
      </h1>
      <p className="mb-5 max-w-md text-base leading-relaxed text-gray-600">
        Everything you love about coffee. None of what you don&apos;t.
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
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-700">
        Choose your supply
      </p>
      <div className="mb-5 grid grid-cols-3 gap-2">
        {SUPPLY_TIERS.map((v) => {
          const isSelected = selectedQty === v.qty;
          return (
            <button
              key={v.qty}
              type="button"
              onClick={() => setSelectedQty(v.qty)}
              className={`relative flex flex-col items-center rounded-[12px] border-2 p-2 text-center transition-all ${
                isSelected
                  ? "border-[#5A3493] bg-[#EDE9F8]"
                  : "border-gray-200 bg-white hover:border-[#5A3493]/40"
              }`}
            >
              {v.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#5A3493] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#fef8dd]">
                  Most Popular
                </span>
              )}
              <img
                src={v.boxImg}
                alt={`${v.qty} box supply`}
                className="mb-1 h-14 w-full object-contain"
              />
              <span className="text-xs font-bold text-gray-900">
                {v.display}
              </span>
              <span className="text-[10px] text-gray-500">
                {v.count} Sachets
              </span>
              <span className="mt-0.5 text-xs font-semibold text-[#5A3493]">
                ${v.subPerDay}/day
              </span>
            </button>
          );
        })}
      </div>

      {/* Price — visible before ATC */}
      <div className="mb-1 flex items-baseline gap-3">
        <span className="text-3xl font-bold text-gray-900">
          ${display.subPrice.toFixed(2)}
        </span>
        <span className="text-base text-gray-400 line-through">
          ${display.retailPrice.toFixed(2)}
        </span>
        <span className="rounded-full bg-[#EDE9F8] px-2 py-0.5 text-xs font-bold text-[#5A3493]">
          SAVE ${display.saving.toFixed(0)}
        </span>
      </div>
      <p className="mb-4 text-xs text-gray-500">
        {display.shipLabel} · discount applied at checkout
      </p>

      {/* ADD TO CART — solid purple, primary action */}
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
        className="mb-2 w-full rounded-[10px] bg-[#5A3493] py-4 text-sm font-bold uppercase tracking-widest text-white shadow-[0_5px_0_0_#3d1c8f] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#3d1c8f] active:translate-y-[4px] active:shadow-[0_1px_0_0_#3d1c8f] disabled:opacity-50"
      >
        {addPending
          ? "ADDING..."
          : `ADD ${display.qty} ${display.qty === 1 ? "BOX" : "BOXES"} TO CART`}
      </button>

      {/* Autoship perks — dynamic cadence */}
      <div className="mb-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        {[
          `Ships FREE ${display.shipEvery}`,
          "VIP discounts & perks",
          "Cancel anytime",
        ].map((b) => (
          <span
            key={b}
            className="flex items-center gap-1 text-[10px] text-gray-500"
          >
            <CheckCircleIcon />
            {b}
          </span>
        ))}
      </div>

      {/* One-time purchase — secondary, clearly below ATC */}
      <div className="mb-5 text-center">
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
          Or{" "}
          <span className="font-semibold underline text-gray-700">
            {otpPending
              ? "Adding…"
              : `One-Time Purchase — $${display.retailPrice.toFixed(2)} ($${display.retailPerDay}/day)`}
          </span>
        </button>
      </div>

      {/* Trust badges */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        {[
          {
            icon: `${CDN}icon-truck.svg`,
            label: "Ships Within\n1 Business Day",
          },
          {
            icon: `${CDN}icon-smile.svg`,
            label: "Over 1000+\nHappy Customers",
          },
          {
            icon: `${CDN}icon-check-tag.svg`,
            label: "30-Day Money Back\nGuarantee",
          },
        ].map((b) => (
          <div
            key={b.label}
            className="flex flex-col items-center gap-2 rounded-[10px] bg-[#EDE9F8] px-2 py-4 text-center"
          >
            <Image
              src={b.icon}
              alt={b.label.replace("\n", " ")}
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="whitespace-pre-line text-[10px] font-semibold text-[#5A3493]">
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
          clean, functional blend of Lion&apos;s Mane, Rhodiola, Cordyceps, and
          L-Theanine to support focus, balance, and steady energy.
        </p>
      </Accordion>
      <Accordion title="WHY STUNN?">
        <p className="text-sm leading-relaxed text-gray-600">
          Most coffees give you energy and anxiety together. STUNN separates
          them — delivering the focus and ritual you love, without the spike,
          crash, or dependency.
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

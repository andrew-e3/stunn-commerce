"use client";

import { addItem } from "components/cart/actions";
import { trackStunnEvent } from "components/analytics-beacon";
import { trackMetaEvent } from "components/meta-pixel";
import { useCart } from "components/cart/cart-context";
import { attachAnalyticsSession } from "lib/analytics/attach-session";
import { DEFAULT_OPTION } from "lib/constants";
import {
  FREE_SHIPPING_THRESHOLD,
  formatPerDay,
  perDay,
  priceAfterDiscount,
  roundMoney,
  shipsFree,
  SUPPLY_TIERS,
} from "lib/pricing";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import { useState, useTransition } from "react";
import { ProductFacts } from "./product-facts";
import { ShopPayInstallments } from "./shop-pay-installments";
import { usePurchaseSelection } from "./purchase-selection-context";

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";

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
      className="h-4 w-4 flex-shrink-0 text-[#111111]"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.78 6.28-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 3.97-3.97a.75.75 0 0 1 1.06 1.06z" />
    </svg>
  );
}

function DarkCheckIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#101827] text-white">
      <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor">
        <path d="M6.4 10.9 3.2 7.7l1.1-1.1 2.1 2.1 5.3-5.3 1.1 1.1z" />
      </svg>
    </span>
  );
}

/** Find the Appstle selling plan ID that matches a given delivery interval in months */
function findSellingPlanId(
  product: Product,
  intervalMonths: number,
): string | undefined {
  for (const group of product.sellingPlanGroups ?? []) {
    for (const plan of group.sellingPlans ?? []) {
      if (
        plan.deliveryPolicy?.interval === "MONTH" &&
        plan.deliveryPolicy?.intervalCount === intervalMonths
      ) {
        return plan.id;
      }
    }
  }
  return undefined;
}

export function StunnPurchasePanel({ product }: { product: Product }) {
  const { selectedQty, setSelectedQty } = usePurchaseSelection();
  const { addCartItem } = useCart();
  const [addPending, startAddTransition] = useTransition();
  const [otpPending, startOtpTransition] = useTransition();

  const display = SUPPLY_TIERS.find((v) => v.qty === selectedQty)!;
  const subPrice = priceAfterDiscount(
    display.retailPrice,
    display.subDiscountPct,
  );
  const subSaving = roundMoney(display.retailPrice - subPrice);
  const oneTimePerDay = perDay(display.retailPrice, display.count);

  // Selling plan ID for the current tier (intervalCount = qty, since qty = months between deliveries)
  const sellingPlanId = findSellingPlanId(product, display.qty);

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
    <div className="px-6 py-6 pb-20 lg:px-10 lg:py-8 lg:pb-8">
      {/* Stars */}
      <div className="mb-4 flex w-full items-center gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="text-lg leading-none text-[#EFAF00]">★★★★★</span>
          <span className="text-sm font-bold text-[#111111]">4.8</span>
          <span className="text-sm text-[#111111]/55">Excellent</span>
        </div>
        <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#111111] px-3 py-1.5 text-[11px] font-bold text-white">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#111111]">
            <svg
              width="11"
              height="11"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
            </svg>
          </span>
          In Stock
        </span>
      </div>

      {/* Title */}
      <h1 className="mb-2 stunn-display text-[clamp(2.35rem,9vw,4.5rem)] uppercase leading-[0.9] tracking-normal text-[#111111]">
        <span>Decaf </span>
        <span className="whitespace-nowrap">
          Coffee
          <span className="ml-1.5 inline-flex -translate-y-[0.03em] flex-col items-center justify-center align-top text-[0.58em] leading-[0.52] text-[#111111]">
            <span>+</span>
            <span>−</span>
          </span>
        </span>
      </h1>
      <p className="mb-5 max-w-lg text-base font-medium leading-snug text-[#111111]/75 lg:text-lg">
        Real decaf coffee with functional support. The ritual stays. The
        caffeine loop goes.
      </p>

      {/* Benefit chips */}
      <div className="mb-5 flex flex-wrap gap-2">
        {BENEFIT_CHIPS.slice(0, 4).map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-[#5A3493]/20 bg-[#EDE9F8] px-3 py-1 text-xs font-bold text-[#111111]"
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
        <span className="text-xs text-[#111111]/55">
          1,000+ Others Exploring Better Coffee
        </span>
      </div>

      {/* Quantity selector */}
      <p className="mb-3 text-sm font-extrabold text-[#111111]">
        1. Choose your supply:
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

              <img
                src={`${CDN}${v.boxImgName}`}
                alt={`${v.qty} box supply`}
                className="h-10 w-10 shrink-0 object-contain sm:h-14 sm:w-14"
              />
              <div className="min-w-0">
                <span className="block text-xs font-extrabold leading-tight text-[#111111] sm:text-sm">
                  {v.label}
                </span>
                <span className="block text-[10px] leading-tight text-[#111111]/55 sm:text-[11px]">
                  {v.count} Count
                </span>
                {/* One-time price, not the subscription price. There is no
                    volume discount on one-time purchases, so per-day is
                    identical across all three tiers ($1.33) and showing it
                    made the tiles look broken. The total is what differs. */}
                <span className="mt-0.5 block text-[10px] font-bold leading-tight text-[#111111] sm:text-[11px]">
                  ${v.retailPrice.toFixed(2)}
                </span>
                <span className="block text-[9px] font-medium leading-tight text-[#5A3493] sm:text-[10px]">
                  save {v.subDiscountPct}% on subscription
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* PRIMARY — one-time purchase. Lowest-friction entry for cold traffic:
          no commitment, no recurring charge, one box by default. Subscribe is
          the upgrade below, not the default (see wiki: PDP buy box vs Lowkey). */}
      <div className="mb-4 rounded-[12px] bg-white p-4 shadow-[0_12px_32px_rgba(90,52,147,0.14)]">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-extrabold leading-none text-[#111111]">
                Buy once
              </h2>
              <span className="rounded-full bg-[#111111] px-2 py-1 text-[11px] font-extrabold uppercase leading-none text-white">
                No commitment
              </span>
            </div>
            <p className="text-xs text-[#111111]">
              <strong>{display.label}</strong>{" "}
              <span>{display.count} Count</span>{" "}
              <span className="whitespace-nowrap">
                {formatPerDay(oneTimePerDay, { spaced: true, unit: "Day" })}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-extrabold leading-none text-[#111111]">
              ${display.retailPrice.toFixed(2)}
            </p>
            <p className="mt-1 text-xs font-semibold text-[#5A3493]">
              ${roundMoney(display.retailPrice * 0.9).toFixed(2)} with WELCOME10
            </p>
            <ShopPayInstallments total={display.retailPrice} />
          </div>
        </div>

        <button
          type="button"
          disabled={!oneBoxVariant || otpPending}
          onClick={() => {
            if (!oneBoxVariant) return;
            trackStunnEvent("add_to_cart");
            trackMetaEvent("AddToCart", {
              content_ids: [product.id],
              content_name: product.title,
              content_type: "product",
              value: display.retailPrice,
              currency: "USD",
            });
            addCartItem(oneBoxVariant, product, display.qty);
            startOtpTransition(async () => {
              await addItem(null, oneBoxVariant.id, display.qty);
              await attachAnalyticsSession();
            });
          }}
          className="stunn-cta-motion mb-4 w-full rounded-[8px] border-2 border-[#5A3493] bg-[#5A3493] py-4 text-sm font-extrabold uppercase tracking-wide text-white disabled:opacity-50"
        >
          {otpPending ? "ADDING..." : "ADD TO CART"}
        </button>

        <div className="grid gap-2 text-[11px] text-[#111111]/72 sm:grid-cols-3">
          {[
            shipsFree(display.retailPrice)
              ? "Ships FREE"
              : `Free shipping over $${FREE_SHIPPING_THRESHOLD}`,
            "10% off your first order",
            "No subscription",
          ].map((b) => (
            <span key={b} className="flex items-center gap-2">
              <DarkCheckIcon />
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* SECONDARY — subscribe & save. Still visible and still carries the real
          20/23/25% saving, but it is now the upgrade rather than the default. */}
      <div className="mb-6 rounded-[12px] border border-[#5A3493]/25 bg-[#F6F3FC] p-4">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-sm font-extrabold text-[#111111]">
              Subscribe &amp; save {display.subDiscountPct}%
            </p>
            <p className="text-xs text-[#111111]/70">
              Ships {display.shipEvery}. Pause, edit or cancel anytime.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#111111]/35 line-through">
              ${display.retailPrice.toFixed(2)}
            </p>
            <p className="text-lg font-extrabold leading-none text-[#5A3493]">
              ${subPrice.toFixed(2)}
            </p>
            <p className="mt-0.5 text-[11px] text-[#111111]/65">
              save ${subSaving.toFixed(2)}
            </p>
          </div>
        </div>
        <button
          type="button"
          disabled={!oneBoxVariant || addPending}
          onClick={() => {
            if (!oneBoxVariant) return;
            trackStunnEvent("add_to_cart");
            trackMetaEvent("AddToCart", {
              content_ids: [product.id],
              content_name: product.title,
              content_type: "product",
              value: priceAfterDiscount(
                display.retailPrice,
                display.subDiscountPct,
              ),
              currency: "USD",
            });
            addCartItem(oneBoxVariant, product, display.qty, sellingPlanId);
            startAddTransition(async () => {
              await addItem(null, oneBoxVariant.id, display.qty, sellingPlanId);
              await attachAnalyticsSession();
            });
          }}
          className="w-full rounded-[8px] border-2 border-[#5A3493] bg-white py-3 text-xs font-extrabold uppercase tracking-wide text-[#5A3493] disabled:opacity-50"
        >
          {addPending ? "ADDING..." : `Subscribe instead — save ${display.subDiscountPct}%`}
        </button>
      </div>

      <ProductFacts />

      {/* Trust badges */}
      <div className="mb-5 grid grid-cols-3 gap-6 text-center">
        {[
          {
            icon: (
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3 20 7v6c0 5-3.4 7.5-8 8-4.6-.5-8-3-8-8V7l8-4Z" />
                <path d="m8.5 12 2.2 2.2 4.8-5" />
              </svg>
            ),
            label: "30-Day Money Back\nGuarantee",
          },
          {
            icon: (
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 7h11v10H3z" />
                <path d="M14 10h4l3 3v4h-7z" />
                <circle cx="7" cy="18" r="2" />
                <circle cx="18" cy="18" r="2" />
              </svg>
            ),
            label: "Ships Within\n1 Business Day",
          },
          {
            icon: (
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M8 14.5c1 1.2 2.3 1.8 4 1.8s3-.6 4-1.8" />
                <circle
                  cx="9"
                  cy="9.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
                <circle
                  cx="15"
                  cy="9.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            ),
            label: "Over 1000+\nHappy Customers",
          },
        ].map((b) => (
          <div
            key={b.label}
            className="flex flex-col items-center gap-2 text-center text-[#111111]"
          >
            {b.icon}
            <span className="whitespace-pre-line text-xs font-extrabold leading-tight text-[#111111]">
              {b.label}
            </span>
          </div>
        ))}
      </div>

      {/* Payment icons */}
      <div className="mb-6 rounded-[10px] border border-[#5A3493]/10 p-3 text-center">
        <p className="mb-2 text-xs text-[#111111]/45">We accept:</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Image
            src={`${CDN}icon-payment-mode-logos.svg`}
            alt="Visa, Shop Pay, Amex, Discover, and Mastercard"
            width={300}
            height={24}
            className="h-5 w-auto"
          />
          <span
            aria-label="PayPal"
            className="inline-flex h-5 items-center rounded-[2px] border border-[#D9D9D9] bg-white px-1.5 text-[9px] font-black leading-none tracking-[-0.03em] text-[#003087]"
          >
            Pay<span className="text-[#009CDE]">Pal</span>
          </span>
        </div>
      </div>

      {/* Accordions */}
      <Accordion title="INGREDIENTS" defaultOpen>
        <p className="text-sm leading-relaxed text-[#111111]/68">
          <strong className="text-[#111111]">STUNN</strong> is crafted with a
          clean, functional blend of Lion&apos;s Mane 300mg, Rhodiola 250mg,
          Cordyceps 100mg, L-Theanine 100mg, and Decaf Instant Coffee 1500mg.
        </p>
      </Accordion>
      <Accordion title="WHY STUNN?">
        <p className="text-sm leading-relaxed text-[#111111]/68">
          Most people don&apos;t realise caffeine is running the day until they
          skip the cup: the headache, the second coffee, the 2pm crash. STUNN is
          for people who want the cup without the cycle: real decaf coffee,
          functional support, same ritual, no dependency loop.
        </p>
      </Accordion>
      <Accordion title="DIRECTIONS">
        <p className="text-sm leading-relaxed text-[#111111]/68">
          Mix one sachet into 8–12 oz of hot or cold water. Stir or shake well.
          Enjoy morning, afternoon, or evening — no cutoff time needed.
        </p>
      </Accordion>
      <Accordion title="BENEFITS">
        <ul className="space-y-2 text-sm text-[#111111]/68">
          {[
            "Calm, sustained focus without jitters",
            "No afternoon crash",
            "Sleep-friendly — drink it any time of day",
            "Gentle on the stomach",
            "30-day money back guarantee",
          ].map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-0.5 text-[#111111]">✓</span>
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
    <div className="border-t border-[#5A3493]/14">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 text-left"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-[#111111]">
          {title}
        </span>
        <span className="text-lg text-[#111111]/45">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

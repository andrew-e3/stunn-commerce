"use client";

import { addItem } from "components/cart/actions";
import { trackStunnEvent } from "components/analytics-beacon";
import { trackMetaEvent } from "components/meta-pixel";
import { useCart } from "components/cart/cart-context";
import { DEFAULT_OPTION } from "lib/constants";
import {
  formatPerDay,
  perDay,
  priceAfterDiscount,
  roundMoney,
  SUPPLY_TIERS,
} from "lib/pricing";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { usePurchaseSelection } from "./purchase-selection-context";

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";

export function StickyAtc({
  product,
  oneTime = false,
}: {
  product: Product;
  // Variant B sells one-time by default, so the sticky bar must match the page
  // rather than silently adding a subscription.
  oneTime?: boolean;
}) {
  const { selectedQty } = usePurchaseSelection();
  const [isVisible, setIsVisible] = useState(false);
  const [pending, startTransition] = useTransition();
  const visibleRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const { addCartItem } = useCart();
  const selectedTier =
    SUPPLY_TIERS.find((tier) => tier.qty === selectedQty) || SUPPLY_TIERS[0]!;
  const retailPrice = roundMoney(selectedTier.retailPrice);
  const subscriptionPrice = priceAfterDiscount(
    retailPrice,
    selectedTier.subDiscountPct,
  );
  const subscriptionPerDay = perDay(subscriptionPrice, selectedTier.count);

  const oneBoxVariant = useMemo(
    () =>
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
      product.variants[0],
    [product.variants],
  );

  useEffect(() => {
    const isMobile = () => window.matchMedia("(max-width: 1023px)").matches;
    const setVisible = (nextVisible: boolean) => {
      if (visibleRef.current === nextVisible) return;
      visibleRef.current = nextVisible;
      setIsVisible(nextVisible);
    };

    const onScroll = () => {
      if (!isMobile()) return;
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        const y = window.scrollY;

        if (!visibleRef.current && y > 560) {
          setVisible(true);
          return;
        }

        if (visibleRef.current && y < 440) {
          setVisible(false);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const purchase = document.getElementById("purchase");
    if (!purchase) {
      return () => {
        window.removeEventListener("scroll", onScroll);
        if (frameRef.current !== null) {
          window.cancelAnimationFrame(frameRef.current);
        }
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!isMobile()) {
          setVisible(!entry?.isIntersecting && window.scrollY > 260);
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(purchase);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const sellingPlanId = useMemo(() => {
    for (const group of product.sellingPlanGroups ?? []) {
      for (const plan of group.sellingPlans ?? []) {
        if (
          plan.deliveryPolicy?.interval === "MONTH" &&
          plan.deliveryPolicy?.intervalCount === selectedTier.qty
        ) {
          return plan.id;
        }
      }
    }
    return undefined;
  }, [product.sellingPlanGroups, selectedTier.qty]);

  const addSelectedOffer = () => {
    if (!oneBoxVariant) return;
    trackStunnEvent("add_to_cart");
    trackMetaEvent("AddToCart", {
      content_ids: [product.id],
      content_name: product.title,
      content_type: "product",
      currency: "USD",
    });
    const plan = oneTime ? undefined : sellingPlanId;
    addCartItem(oneBoxVariant, product, selectedTier.qty, plan);
    startTransition(async () => {
      await addItem(null, oneBoxVariant.id, selectedTier.qty, plan);
    });
  };

  return (
    <div
      className={`fixed inset-x-0 z-30 border-black/10 bg-white shadow-[0_-8px_28px_rgba(0,0,0,0.12)] transition-transform duration-300 lg:bottom-auto lg:top-[100px] lg:border-b lg:shadow-[0_8px_28px_rgba(0,0,0,0.08)] ${
        isVisible
          ? "bottom-0 translate-y-0"
          : "bottom-0 translate-y-full lg:-translate-y-full"
      }`}
      aria-hidden={!isVisible}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-3 lg:px-8">
        <div className="hidden items-center gap-3 sm:flex">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[8px] bg-[#EDE9F8]">
            <Image
              src={`${CDN}mockup-stunn-box.webp`}
              alt="STUNN decaf coffee"
              fill
              className="object-contain p-1.5"
            />
          </div>
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="text-sm leading-none text-[#EFAF00]">★★★★★</span>
              <span className="text-xs font-semibold text-[#111111]/70">
                4.8
              </span>
            </div>
            <p className="text-sm font-extrabold leading-tight text-[#111111]">
              STUNN Decaf Coffee
            </p>
            <p className="text-xs text-[#111111]/55">
              {selectedTier.display.toLowerCase()} · {selectedTier.count}{" "}
              sachets · calm focus
            </p>
          </div>
        </div>

        <div className="min-w-0 flex-1 lg:text-right">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 lg:justify-end">
            <span className="text-[11px] font-extrabold uppercase tracking-wide text-[#111111] sm:text-sm sm:normal-case sm:tracking-normal">
              {oneTime ? "Buy once" : "Autoship"}
            </span>
            <span className="rounded-full bg-[#5A3493] px-2 py-1 text-[10px] font-extrabold uppercase leading-none text-white">
              {oneTime ? "No commitment" : `Save ${selectedTier.subDiscountPct}%`}
            </span>
            {!oneTime && (
              <span className="hidden text-sm text-[#111111]/35 line-through sm:inline">
                ${retailPrice.toFixed(2)}
              </span>
            )}
            <span className="text-base font-extrabold leading-none text-[#111111] sm:text-lg">
              ${(oneTime ? retailPrice : subscriptionPrice).toFixed(2)}
            </span>
          </div>
          <p className="mt-1 hidden truncate text-[11px] text-[#111111]/60 sm:block sm:text-xs">
            {selectedTier.display.toLowerCase()} {selectedTier.shipEvery} ·{" "}
            {formatPerDay(oneTime ? perDay(retailPrice, selectedTier.count) : subscriptionPerDay)}
            {oneTime ? " · one-time, ships free" : " · subscription ships free"}
          </p>
        </div>

        <button
          type="button"
          disabled={!oneBoxVariant || pending}
          onClick={addSelectedOffer}
          className="stunn-cta-motion shrink-0 rounded-[8px] border-2 border-[#5A3493] bg-[#5A3493] px-4 py-3 text-xs font-extrabold uppercase tracking-wide text-white disabled:opacity-50 sm:px-8 lg:min-w-[190px] lg:text-sm"
        >
          {pending ? "Adding..." : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

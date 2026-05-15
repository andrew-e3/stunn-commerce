"use client";

import { addItem } from "components/cart/actions";
import { useCart } from "components/cart/cart-context";
import { DEFAULT_OPTION } from "lib/constants";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import { useEffect, useMemo, useState, useTransition } from "react";

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";
const RETAIL_THREE_BOXES = 119.97;
const SUBSCRIPTION_DISCOUNT_PCT = 23;
const SUBSCRIPTION_PRICE = Math.round(
  RETAIL_THREE_BOXES * (1 - SUBSCRIPTION_DISCOUNT_PCT / 100),
);
const SUBSCRIPTION_PER_DAY = (
  (RETAIL_THREE_BOXES * (1 - SUBSCRIPTION_DISCOUNT_PCT / 100)) /
  90
).toFixed(2);

export function StickyAtc({ product }: { product: Product }) {
  const [isVisible, setIsVisible] = useState(false);
  const [pending, startTransition] = useTransition();
  const { addCartItem } = useCart();

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
    const onScroll = () => {
      if (isMobile()) setIsVisible(window.scrollY > 520);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const purchase = document.getElementById("purchase");
    if (!purchase) {
      return () => window.removeEventListener("scroll", onScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!isMobile()) {
          setIsVisible(!entry?.isIntersecting && window.scrollY > 260);
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(purchase);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const addBestValue = () => {
    if (!oneBoxVariant) return;
    addCartItem(oneBoxVariant, product, 3);
    startTransition(async () => {
      await addItem(null, oneBoxVariant.id, 3);
    });
  };

  return (
    <div
      className={`fixed inset-x-0 z-40 border-black/10 bg-white shadow-[0_-8px_28px_rgba(0,0,0,0.12)] transition-transform duration-300 lg:bottom-auto lg:top-0 lg:border-b lg:shadow-[0_8px_28px_rgba(0,0,0,0.08)] ${
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
              3 boxes · 90 sachets · calm focus
            </p>
          </div>
        </div>

        <div className="min-w-0 flex-1 lg:text-right">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 lg:justify-end">
            <span className="text-[11px] font-extrabold uppercase tracking-wide text-[#111111] sm:text-sm sm:normal-case sm:tracking-normal">
              Autoship
            </span>
            <span className="rounded-full bg-[#7C3AED] px-2 py-1 text-[10px] font-extrabold uppercase leading-none text-white">
              Save {SUBSCRIPTION_DISCOUNT_PCT}%
            </span>
            <span className="hidden text-sm text-[#111111]/35 line-through sm:inline">
              $120
            </span>
            <span className="text-base font-extrabold leading-none text-[#111111] sm:text-lg">
              ${SUBSCRIPTION_PRICE}
            </span>
          </div>
          <p className="mt-1 hidden truncate text-[11px] text-[#111111]/60 sm:block sm:text-xs">
            3 boxes every 3 months · ${SUBSCRIPTION_PER_DAY}/day · free shipping
          </p>
        </div>

        <button
          type="button"
          disabled={!oneBoxVariant || pending}
          onClick={addBestValue}
          className="shrink-0 rounded-[8px] bg-[#7C3AED] px-4 py-3 text-xs font-extrabold uppercase tracking-wide text-white shadow-[0_4px_0_0_#5B21B6] transition-all hover:translate-y-[1px] hover:bg-[#6D28D9] hover:shadow-[0_3px_0_0_#5B21B6] active:translate-y-[3px] active:shadow-none disabled:opacity-50 sm:px-8 lg:min-w-[190px] lg:text-sm"
        >
          {pending ? "Adding..." : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

"use client";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { trackStunnEvent } from "components/analytics-beacon";
import LoadingDots from "components/loading-dots";
import { DEFAULT_OPTION } from "lib/constants";
import {
  priceAfterDiscount,
  RETAIL_PER_BOX,
  SUPPLY_TIERS,
} from "lib/pricing";
import type { CartItem } from "lib/shopify/types";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import {
  convertCartLineToSubscription,
  createCartAndSetCookie,
  redirectToCheckout,
  updateCartLineQuantity,
} from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";

type MerchandiseSearchParams = { [key: string]: string };

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";

const BRAND_PURPLE = "#5A3493";
const BRAND_LIGHT_PURPLE = "#EDE9F8";

// Qty tiers — savings shown in the button label, cadence in the sub-label.
// Shopify Automatic Discounts should mirror this model at checkout:
// 1 box subscription = 20% off, 2 boxes = 23% off, 3+ boxes = 25% off.
const QTY_TIERS = SUPPLY_TIERS.map((tier) => ({
  qty: tier.qty,
  label: `BUY ${tier.qty}`,
  savePct: tier.subDiscountPct,
  sub: tier.shipEvery,
  best: tier.popular,
}));

function getTierForQuantity(quantity: number) {
  if (quantity <= 1) return QTY_TIERS.find((tier) => tier.qty === 1)!;
  if (quantity === 2) return QTY_TIERS.find((tier) => tier.qty === 2)!;
  return QTY_TIERS.find((tier) => tier.qty === 3)!;
}

function getSavingsForQuantity(quantity: number) {
  const tier = getTierForQuantity(quantity);
  const retail = quantity * RETAIL_PER_BOX;
  const discounted = priceAfterDiscount(retail, tier.savePct);
  const savings = retail - discounted;
  return {
    retail,
    savings,
    discounted,
    savePct: tier.savePct,
    tier,
  };
}

function getUpsellQuantities(quantity: number, includeCurrent: boolean) {
  const start = includeCurrent ? quantity : quantity + 1;
  return [start, start + 1, start + 2];
}

function getLinePricing(line: CartItem) {
  const tier = getTierForQuantity(line.quantity);
  const retail = line.quantity * RETAIL_PER_BOX;

  if (!line.sellingPlanAllocation) {
    return {
      retail,
      savings: 0,
      discounted: retail,
      savePct: 0,
      tier,
    };
  }

  return getSavingsForQuantity(line.quantity);
}

function getSubscriptionInterval(line: CartItem) {
  if (!line.sellingPlanAllocation) return null;
  return Math.min(Math.max(line.quantity, 1), 3);
}

function getSellingPlanIdForQuantity(item: CartItem, quantity: number) {
  const cappedInterval = Math.min(Math.max(quantity, 1), 3);
  const groups = item.merchandise.product.sellingPlanGroups as any;
  const normalizedGroups = Array.isArray(groups)
    ? groups
    : (groups?.edges?.map((edge: any) => edge.node) ?? []);
  const plans = normalizedGroups.flatMap((group: any) => {
    const sellingPlans = group.sellingPlans;
    return Array.isArray(sellingPlans)
      ? sellingPlans
      : (sellingPlans?.edges?.map((edge: any) => edge.node) ?? []);
  });

  return (
    plans.find(
      (plan: any) =>
        plan.deliveryPolicy?.interval === "MONTH" &&
        plan.deliveryPolicy.intervalCount === cappedInterval,
    )?.id ?? plans[0]?.id
  );
}

function EmptyBox() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="16" y="36" width="48" height="36" rx="3" fill="#E8E3F5" />
      <rect
        x="16"
        y="36"
        width="48"
        height="36"
        rx="3"
        stroke="#5A3493"
        strokeWidth="2"
      />
      <path d="M16 44h48" stroke="#5A3493" strokeWidth="2" />
      <path
        d="M32 44v28"
        stroke="#5A3493"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <path
        d="M48 44v28"
        stroke="#5A3493"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <path
        d="M28 36V28a12 12 0 0 1 24 0v8"
        stroke="#5A3493"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="40" cy="20" r="3" fill="#5A3493" />
      <path
        d="M40 8v4M40 28v4M52 16l-3 3M31 29l-3 3M52 24l-3-3M31 11l-3-3"
        stroke="#5A3493"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const [qtyChanging, startQtyTransition] = useTransition();

  useEffect(() => {
    if (!cart) createCartAndSetCookie();
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) setIsOpen(true);
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-[1000000]">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            {/* Wider panel — matches Create.co proportions */}
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col overflow-hidden rounded-none bg-white shadow-2xl md:w-[520px] md:rounded-l-[20px]">
              {/* ── Header ── */}
              <div className="flex items-center justify-between px-6 py-5">
                <p className="text-lg font-extrabold tracking-tight text-[#111111]">
                  Your Cart{" "}
                  {cart && cart.lines.length > 0 && (
                    <span className="text-[#111111]">
                      ({cart.totalQuantity})
                    </span>
                  )}
                </p>
                <button
                  aria-label="Close cart"
                  onClick={closeCart}
                  className="flex h-9 w-9 items-center justify-center text-[#111111] hover:text-[#111111]/65"
                >
                  <XMarkIcon className="h-6 w-6 stroke-2" />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                /* ── Empty state ── */
                <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                  <EmptyBox />
                  <p className="mt-6 stunn-display text-2xl uppercase text-[#5A3493]">
                    Your cart is empty
                  </p>
                  <Link
                    href="/products/focus-without-caffeine"
                    onClick={closeCart}
                    className="stunn-cta-motion mt-6 inline-flex items-center gap-2 rounded-full border-2 border-[#5A3493] bg-[#5A3493] px-8 py-3 text-sm font-bold text-white"
                  >
                    Shop now →
                  </Link>
                </div>
              ) : (
                (() => {
                  // ── Displayed cart economics. Shopify checkout remains the source of truth.
                  const totalRetail = cart.lines.reduce(
                    (sum, line) => sum + getLinePricing(line).retail,
                    0,
                  );
                  const discountedSubtotal = cart.lines.reduce(
                    (sum, line) => sum + getLinePricing(line).discounted,
                    0,
                  );
                  const cartSavings = totalRetail - discountedSubtotal;
                  const cartSavePct =
                    totalRetail > 0
                      ? Math.round((cartSavings / totalRetail) * 100)
                      : 0;

                  // ── Shipping progress ──
                  const hasSubscription = cart.lines.some((line) =>
                    Boolean(line.sellingPlanAllocation),
                  );
                  const subscriptionLines = cart.lines.filter((line) =>
                    Boolean(line.sellingPlanAllocation),
                  );
                  const subscriptionQuantity = subscriptionLines.reduce(
                    (sum, line) => sum + line.quantity,
                    0,
                  );
                  const subscriptionInterval =
                    subscriptionLines[0] &&
                    getSubscriptionInterval(subscriptionLines[0]);
                  // Every US order ships free (Economy $0.00 at any value - see
                  // lib/pricing.ts). The old "spend $X more to unlock free
                  // shipping" meter and its progress bar are gone: with no
                  // threshold there is nothing to progress toward, and the
                  // prompt was telling a $39.99 shopper to add $35.01 they
                  // never needed to spend.

                  return (
                    <div className="flex h-full flex-col overflow-hidden">
                      {/* ── Free shipping banner ── */}
                      <div
                        className="px-5 py-4 text-center text-[#5A3493] sm:px-6"
                        style={{ backgroundColor: BRAND_LIGHT_PURPLE }}
                      >
                        <div className="mx-auto flex max-w-full flex-col items-center gap-2">
                          {cartSavings > 0 && (
                            <div className="inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-white px-3 py-1 text-[10px] font-extrabold uppercase leading-none tracking-wide text-[#5A3493] sm:text-[11px]">
                              <span className="whitespace-nowrap">
                                Estimated savings
                              </span>
                              <span className="whitespace-nowrap">
                                ${cartSavings.toFixed(2)} / {cartSavePct}% off
                              </span>
                            </div>
                          )}
                          <p className="text-sm font-semibold leading-snug sm:text-[15px]">
                            <strong>Free shipping</strong> on every US order
                          </p>
                        </div>
                      </div>

                      {/* ── Scrollable items ── */}
                      <div className="flex-1 overflow-y-auto bg-white">
                        <ul className="divide-y divide-gray-100 px-5">
                          {cart.lines
                            .sort((a, b) =>
                              a.merchandise.product.title.localeCompare(
                                b.merchandise.product.title,
                              ),
                            )
                            .map((item, i) => {
                              const params = {} as MerchandiseSearchParams;
                              item.merchandise.selectedOptions.forEach(
                                ({ name, value }) => {
                                  if (value !== DEFAULT_OPTION)
                                    params[name.toLowerCase()] = value;
                                },
                              );
                              const url = createUrl(
                                `/products/${item.merchandise.product.handle}`,
                                new URLSearchParams(params),
                              );

                              const {
                                retail: itemRetail,
                                discounted: itemDiscounted,
                                savePct: itemSavePct,
                                tier: currentTier,
                              } = getLinePricing(item);
                              const isSubscription = Boolean(
                                item.sellingPlanAllocation,
                              );
                              const upsellQuantities = getUpsellQuantities(
                                item.quantity,
                                !isSubscription,
                              );

                              return (
                                <li key={i} className="py-5">
                                  {/* ── Product row ── */}
                                  <div className="flex gap-5">
                                    {/* Image */}
                                    <Link
                                      href={url}
                                      onClick={closeCart}
                                      className="h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-[6px] bg-[#EDE9F8]"
                                    >
                                      <Image
                                        className="h-full w-full object-cover"
                                        width={100}
                                        height={100}
                                        alt={
                                          item.merchandise.product.featuredImage
                                            ?.altText ||
                                          item.merchandise.product.title
                                        }
                                        src={
                                          item.merchandise.product.featuredImage
                                            ?.url
                                        }
                                      />
                                    </Link>

                                    {/* Details */}
                                    <div className="flex min-w-0 flex-1 flex-col">
                                      {/* Name + REMOVE */}
                                      <div className="flex items-start justify-between gap-2">
                                        <p className="text-base font-extrabold leading-tight text-[#111111]">
                                          {item.merchandise.product.title}
                                        </p>
                                        <DeleteItemButton
                                          item={item}
                                          optimisticUpdate={updateCartItem}
                                        />
                                      </div>

                                      {/* Cadence subtitle */}
                                      <p className="mt-1 text-sm text-[#111111]/65">
                                        {item.quantity}{" "}
                                        {item.quantity === 1 ? "box" : "boxes"}{" "}
                                        ·{" "}
                                        {isSubscription
                                          ? `Ships ${currentTier.sub}`
                                          : "One-time purchase"}
                                      </p>

                                      {/* Qty stepper + prices */}
                                      <div className="mt-4 flex items-center gap-3">
                                        {/* Qty stepper */}
                                        <div className="flex h-9 items-center overflow-hidden rounded-[5px] border border-[#111111]">
                                          <EditItemQuantityButton
                                            item={item}
                                            type="minus"
                                            optimisticUpdate={updateCartItem}
                                          />
                                          <span className="w-10 text-center text-sm font-extrabold text-[#111111]">
                                            {item.quantity}
                                          </span>
                                          <EditItemQuantityButton
                                            item={item}
                                            type="plus"
                                            optimisticUpdate={updateCartItem}
                                          />
                                        </div>

                                        {/* Prices */}
                                        <div className="ml-auto flex items-baseline gap-2">
                                          {itemSavePct > 0 && (
                                            <span className="text-sm text-[#111111]/40 line-through">
                                              ${itemRetail.toFixed(2)}
                                            </span>
                                          )}
                                          <span className="text-base font-bold text-[#111111]">
                                            ${itemDiscounted.toFixed(2)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-4 flex items-center justify-between rounded-[5px] border border-[#5A3493]/15 bg-[#EDE9F8] px-3 py-2 text-[#5A3493]">
                                    <span className="text-[11px] font-bold uppercase tracking-wide">
                                      {isSubscription
                                        ? "Subscription active"
                                        : "Switch to autoship"}
                                    </span>
                                    <span className="text-[11px] font-extrabold uppercase tracking-wide">
                                      {isSubscription
                                        ? `Save ${itemSavePct}% · ${item.quantity} ${item.quantity === 1 ? "box" : "boxes"} today`
                                        : "Save 20-25%"}
                                    </span>
                                  </div>

                                  {/* ── Upsell buttons ── */}
                                  <div className="mt-5 grid grid-cols-3 gap-3">
                                    {upsellQuantities.map((quantity) => {
                                      const tier = getTierForQuantity(quantity);
                                      const sellingPlanId =
                                        getSellingPlanIdForQuantity(
                                          item,
                                          quantity,
                                        );
                                      const disabled =
                                        qtyChanging ||
                                        (!isSubscription && !sellingPlanId);

                                      return (
                                        <button
                                          key={`${isSubscription ? "upgrade" : "subscribe"}-${quantity}`}
                                          type="button"
                                          disabled={disabled}
                                          onClick={() => {
                                            startQtyTransition(async () => {
                                              if (isSubscription) {
                                                await updateCartLineQuantity(
                                                  null,
                                                  {
                                                    lineId: item.id,
                                                    merchandiseId:
                                                      item.merchandise.id,
                                                    quantity,
                                                  },
                                                );
                                                return;
                                              }

                                              await convertCartLineToSubscription(
                                                null,
                                                {
                                                  lineId: item.id,
                                                  merchandiseId:
                                                    item.merchandise.id,
                                                  quantity,
                                                  sellingPlanId,
                                                },
                                              );
                                            });
                                          }}
                                          className="rounded-[5px] border border-[#5A3493]/35 bg-white py-3 text-center text-[#5A3493] transition-all hover:border-[#5A3493] hover:bg-[#EDE9F8] disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                          <span className="block text-[12px] font-extrabold uppercase leading-none">
                                            {isSubscription
                                              ? `Upgrade to ${quantity}`
                                              : `Subscribe ${quantity}`}
                                          </span>
                                          <span className="mt-1 block text-[10px] font-bold uppercase leading-none">
                                            Save {tier.savePct}%
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </li>
                              );
                            })}
                        </ul>
                      </div>

                      {/* ── Sticky footer ── */}
                      <div
                        className="px-6 pb-6 pt-0"
                        style={{ backgroundColor: BRAND_PURPLE }}
                      >
                        {/* Scrolling trust ticker */}
                        <div className="-mx-6 mb-4 overflow-hidden bg-[#1F1530] py-3">
                          <div
                            className="animate-marquee"
                            style={{ animationDuration: "22s" }}
                          >
                            {[
                              {
                                icon: `${CDN}icon-return.svg`,
                                label: "30-Day Money Back Guarantee",
                              },
                              {
                                icon: `${CDN}icon-truck.svg`,
                                label: "Ships Within 1 Business Day",
                              },
                              {
                                icon: `${CDN}icon-check-tag.svg`,
                                label: "Cancel Anytime",
                              },
                              {
                                icon: `${CDN}icon-lock.svg`,
                                label: "Discount Auto-Applied",
                              },
                              {
                                icon: `${CDN}icon-return.svg`,
                                label: "30-Day Money Back Guarantee",
                              },
                              {
                                icon: `${CDN}icon-truck.svg`,
                                label: "Ships Within 1 Business Day",
                              },
                              {
                                icon: `${CDN}icon-check-tag.svg`,
                                label: "Cancel Anytime",
                              },
                              {
                                icon: `${CDN}icon-lock.svg`,
                                label: "Discount Auto-Applied",
                              },
                            ].map((t, i) => (
                              <span
                                key={i}
                                className="flex shrink-0 items-center gap-2 px-5 text-[9px] font-extrabold uppercase tracking-wider text-white"
                              >
                                <img
                                  src={t.icon}
                                  alt=""
                                  className="h-4 w-4 shrink-0"
                                  style={{ filter: "brightness(0) invert(1)" }}
                                />
                                {t.label}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4 rounded-[8px] border border-white/20 bg-white/10 p-4 text-white">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/65">
                                Checkout summary
                              </p>
                              <p className="mt-1 text-sm font-extrabold leading-tight">
                                {hasSubscription
                                  ? `${subscriptionQuantity} ${subscriptionQuantity === 1 ? "box" : "boxes"} today · ships every ${subscriptionInterval || 1} ${subscriptionInterval === 1 ? "month" : "months"}`
                                  : `${cart.totalQuantity} ${cart.totalQuantity === 1 ? "box" : "boxes"} today · one-time purchase`}
                              </p>
                            </div>
                            {cartSavings > 0 && (
                              <div className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#5A3493]">
                                Save ${cartSavings.toFixed(2)}
                              </div>
                            )}
                          </div>
                          <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] font-bold uppercase leading-tight tracking-wide text-white/80">
                            <span>Free shipping</span>
                            <span>Secure checkout</span>
                            <span>
                              {hasSubscription
                                ? "Pause anytime"
                                : "30-day guarantee"}
                            </span>
                          </div>
                        </div>

                        {/* Subtotal: [X% OFF] $old  $new — matches Create.co pattern */}
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <span className="text-lg font-extrabold text-white">
                            Subtotal
                          </span>
                          <div className="flex items-center gap-2">
                            {cartSavings > 0 && (
                              <span
                                className="rounded-[4px] bg-white px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide"
                                style={{ color: BRAND_PURPLE }}
                              >
                                {cartSavePct}% OFF
                              </span>
                            )}
                            {cartSavings > 0 && (
                              <span className="text-sm text-white/50 line-through">
                                ${totalRetail.toFixed(2)}
                              </span>
                            )}
                            <span className="text-xl font-extrabold text-white">
                              ${discountedSubtotal.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {cartSavings > 0 && (
                          <p className="-mt-1 mb-3 text-right text-xs font-semibold text-white/75">
                            You save ${cartSavings.toFixed(2)} today
                          </p>
                        )}

                        {/* onSubmit runs client-side before the server action
                            navigates away, which is the only place the checkout
                            step can be recorded - redirectToCheckout is a
                            server action and cannot reach the beacon. Without
                            this, reached_checkout is permanently false for
                            every session. */}
                        <form
                          action={redirectToCheckout}
                          onSubmit={() =>
                            trackStunnEvent("begin_checkout", discountedSubtotal)
                          }
                        >
                          <CheckoutButton />
                        </form>
                        <p className="mt-4 text-center text-[11px] font-semibold text-white">
                          {hasSubscription
                            ? "*Subscription renews on the selected cadence. You can pause, edit, or cancel before renewal."
                            : "*Taxes, shipping and discounts calculated at checkout."}
                        </p>
                      </div>
                    </div>
                  );
                })()
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="stunn-cta-motion w-full rounded-[5px] border-2 border-[#111111] bg-white py-4 text-base font-extrabold uppercase tracking-wide text-[#111111] disabled:opacity-60"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-gray-900" /> : "Checkout"}
    </button>
  );
}

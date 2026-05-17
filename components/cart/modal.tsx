"use client";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import LoadingDots from "components/loading-dots";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import {
  createCartAndSetCookie,
  redirectToCheckout,
  updateItemQuantity,
} from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";

type MerchandiseSearchParams = { [key: string]: string };

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";

const BRAND_PURPLE = "#5A3493";
const BRAND_LIGHT_PURPLE = "#EDE9F8";

// Retail price per box (no discount). Discount is applied by Shopify Automatic Discounts.
const RETAIL_PER_BOX = 39.99;

// Qty tiers — savings shown in the button label, cadence in the sub-label.
// Shopify Automatic Discounts should mirror this model at checkout:
// 1 box subscription = 20% off, 2 boxes = 23% off, 3+ boxes = 25% off.
const QTY_TIERS = [
  { qty: 1, label: "BUY 1", savePct: 20, sub: "every month", best: false },
  { qty: 2, label: "BUY 2", savePct: 23, sub: "every 2 months", best: false },
  { qty: 3, label: "BUY 3", savePct: 25, sub: "every 3 months", best: true },
];

const FREQUENCY_OPTIONS = [
  { label: "Every 1 month", value: "1" },
  { label: "Every 2 months", value: "2" },
  { label: "Every 3 months", value: "3" },
];

function getTierForQuantity(quantity: number) {
  if (quantity <= 1) return QTY_TIERS[0]!;
  if (quantity === 2) return QTY_TIERS[1]!;
  return QTY_TIERS[2]!;
}

function getSavingsForQuantity(quantity: number) {
  const tier = getTierForQuantity(quantity);
  const retail = quantity * RETAIL_PER_BOX;
  const savings = retail * (tier.savePct / 100);
  return {
    retail,
    savings,
    discounted: retail - savings,
    savePct: tier.savePct,
    tier,
  };
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
        <Dialog onClose={closeCart} className="relative z-50">
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
                  <p className="mt-6 font-[family-name:var(--font-anton)] text-2xl uppercase text-[#5A3493]">
                    Your cart is empty
                  </p>
                  <Link
                    href="/products/focus-without-caffeine"
                    onClick={closeCart}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#5A3493] px-8 py-3 text-sm font-bold text-white shadow-[0_4px_0_0_#43256F] transition-all hover:translate-y-px hover:shadow-[0_3px_0_0_#43256F]"
                  >
                    Shop now →
                  </Link>
                </div>
              ) : (
                (() => {
                  // ── Displayed cart economics. Shopify checkout remains the source of truth.
                  const FREE_SHIPPING_THRESHOLD = 60;
                  const totalRetail = cart.lines.reduce(
                    (sum, line) =>
                      sum + getSavingsForQuantity(line.quantity).retail,
                    0,
                  );
                  const discountedSubtotal = cart.lines.reduce(
                    (sum, line) =>
                      sum + getSavingsForQuantity(line.quantity).discounted,
                    0,
                  );
                  const cartSavings = totalRetail - discountedSubtotal;
                  const cartSavePct =
                    totalRetail > 0
                      ? Math.round((cartSavings / totalRetail) * 100)
                      : 0;

                  // ── Shipping progress ──
                  const remaining = Math.max(
                    0,
                    FREE_SHIPPING_THRESHOLD - totalRetail,
                  );
                  const progress = Math.min(
                    100,
                    (totalRetail / FREE_SHIPPING_THRESHOLD) * 100,
                  );
                  const hasFreeShipping = remaining === 0;

                  return (
                    <div className="flex h-full flex-col overflow-hidden">
                      {/* ── Free shipping banner ── */}
                      <div
                        className="px-6 py-4 text-center text-xs font-medium text-[#5A3493]"
                        style={{ backgroundColor: BRAND_LIGHT_PURPLE }}
                      >
                        {cartSavings > 0 && (
                          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[#5A3493]">
                            <span>Estimated savings</span>
                            <span>
                              ${cartSavings.toFixed(2)} / {cartSavePct}% off
                            </span>
                          </div>
                        )}
                        {hasFreeShipping ? (
                          <span>
                            Congrats, you&apos;ve unlocked{" "}
                            <strong>Free Shipping!</strong>
                          </span>
                        ) : (
                          <span>
                            Add <strong>${remaining.toFixed(2)}</strong> more
                            for <strong>Free Shipping</strong>
                          </span>
                        )}
                        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/80">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${progress}%`,
                              backgroundColor: BRAND_PURPLE,
                            }}
                          />
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
                                savings: itemSaveAmt,
                                discounted: itemDiscounted,
                                savePct: itemSavePct,
                                tier: currentTier,
                              } = getSavingsForQuantity(item.quantity);

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
                                        · {currentTier.sub}
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
                                      Buy more, save more
                                    </span>
                                    <span className="text-[11px] font-extrabold uppercase tracking-wide">
                                      Save ${itemSaveAmt.toFixed(2)} (
                                      {itemSavePct}%)
                                    </span>
                                  </div>

                                  {/* ── Qty tier buttons ── */}
                                  <div className="mt-5 grid grid-cols-3 gap-3">
                                    {QTY_TIERS.map((tier) => {
                                      const isSelected =
                                        item.quantity === tier.qty;
                                      return (
                                        <button
                                          key={tier.qty}
                                          type="button"
                                          disabled={isSelected || qtyChanging}
                                          onClick={() => {
                                            startQtyTransition(async () => {
                                              await updateItemQuantity(null, {
                                                merchandiseId:
                                                  item.merchandise.id,
                                                quantity: tier.qty,
                                              });
                                            });
                                          }}
                                          className={`rounded-[5px] border py-3 text-center transition-all disabled:cursor-default ${
                                            isSelected
                                              ? "border-[#5A3493]/20 bg-[#EDE9F8] text-[#5A3493]"
                                              : "border-[#5A3493] bg-[#5A3493] text-white hover:bg-[#4F2D82]"
                                          }`}
                                          style={{
                                            boxShadow:
                                              tier.best && !isSelected
                                                ? "0 0 0 2px rgba(90,52,147,0.18)"
                                                : undefined,
                                          }}
                                        >
                                          <span className="block text-[12px] font-extrabold uppercase leading-none">
                                            {tier.label} SAVE {tier.savePct}%
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {/* ── Frequency dropdown ── */}
                                  <div className="mt-2">
                                    <FrequencyDropdown
                                      currentQty={item.quantity}
                                      disabled={qtyChanging}
                                      onSelectQuantity={(quantity) => {
                                        startQtyTransition(async () => {
                                          await updateItemQuantity(null, {
                                            merchandiseId: item.merchandise.id,
                                            quantity,
                                          });
                                        });
                                      }}
                                    />
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

                        <form action={redirectToCheckout}>
                          <CheckoutButton />
                        </form>
                        <p className="mt-4 text-center text-[11px] font-semibold text-white">
                          *Taxes, shipping and discounts calculated at checkout.
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
      className="w-full rounded-[5px] bg-white py-4 text-base font-extrabold uppercase tracking-wide text-[#111111] transition-opacity hover:opacity-95 disabled:opacity-60"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-gray-900" /> : "Checkout"}
    </button>
  );
}

function FrequencyDropdown({ currentQty }: { currentQty: number }) {
  const defaultOpt =
    FREQUENCY_OPTIONS.find((option) => Number(option.value) === currentQty) ??
    FREQUENCY_OPTIONS[2]!;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultOpt);
  const prevQty = useRef(currentQty);

  useEffect(() => {
    if (prevQty.current !== currentQty) {
      prevQty.current = currentQty;
      setSelected(
        FREQUENCY_OPTIONS.find(
          (option) => Number(option.value) === currentQty,
        ) ?? FREQUENCY_OPTIONS[2]!,
      );
    }
  }, [currentQty]);

  const savePct = Math.max(0, (Number(selected.value) - 1) * 5);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-[5px] border border-[#5A3493] bg-white px-3 py-3 text-left"
      >
        <span className="text-sm font-extrabold text-[#111111]">
          Delivers {selected.label.toLowerCase()}
        </span>
        <div className="flex items-center gap-2">
          {savePct > 0 && (
            <span
              className="text-xs font-bold uppercase tracking-wide"
              style={{ color: BRAND_PURPLE }}
            >
              SAVE {savePct}%
            </span>
          )}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className={`text-[#111111] transition-transform ${open ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-[5px] border border-[#5A3493] bg-white shadow-lg">
          {FREQUENCY_OPTIONS.map((opt) => {
            const pct = Math.max(0, (Number(opt.value) - 1) * 5);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-xs transition-colors hover:bg-[#EDE9F8] ${
                  selected.value === opt.value
                    ? "font-bold text-[#111111]"
                    : "text-[#111111]/75"
                }`}
              >
                <span>Delivers {opt.label.toLowerCase()}</span>
                {pct > 0 && (
                  <span
                    className="text-[9px] font-bold uppercase tracking-wide"
                    style={{ color: BRAND_PURPLE }}
                  >
                    SAVE {pct}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

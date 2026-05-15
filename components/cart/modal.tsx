"use client";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import LoadingDots from "components/loading-dots";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { addItem, createCartAndSetCookie, redirectToCheckout, updateItemQuantity } from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";

type MerchandiseSearchParams = { [key: string]: string };

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";

const QTY_TIERS = [
  { qty: 1, display: "1 MONTH",  saving: "–",          perDay: "$1.33/day", best: false },
  { qty: 2, display: "2 MONTHS", saving: "SAVE 10%",   perDay: "$1.19/day", best: false },
  { qty: 3, display: "3 MONTHS", saving: "BEST VALUE",  perDay: "$1.13/day", best: true  },
];

const FREQUENCY_OPTIONS = [
  { label: "Every 1 month",  value: "1" },
  { label: "Every 2 months", value: "2" },
  { label: "Every 3 months – SAVE 15%", value: "3", highlight: true },
];

function EmptyBox() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="36" width="48" height="36" rx="3" fill="#E8E3F5" />
      <rect x="16" y="36" width="48" height="36" rx="3" stroke="#5A3493" strokeWidth="2" />
      <path d="M16 44h48" stroke="#5A3493" strokeWidth="2" />
      <path d="M32 44v28" stroke="#5A3493" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M48 44v28" stroke="#5A3493" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M28 36V28a12 12 0 0 1 24 0v8" stroke="#5A3493" strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="20" r="3" fill="#5A3493" />
      <path d="M40 8v4M40 28v4M52 16l-3 3M31 29l-3 3M52 24l-3-3M31 11l-3-3" stroke="#C1D0A5" strokeWidth="1.5" strokeLinecap="round" />
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
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col bg-white md:w-[420px]">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5">
                <p className="font-[family-name:var(--font-anton)] text-2xl uppercase text-[#5A3493]">
                  Your Cart {cart && cart.lines.length > 0 && <span className="text-[#5A3493]/50">({cart.totalQuantity})</span>}
                </p>
                <button
                  aria-label="Close cart"
                  onClick={closeCart}
                  className="flex h-8 w-8 items-center justify-center text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="h-px bg-gray-100" />

              {!cart || cart.lines.length === 0 ? (
                /* Empty state */
                <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                  <EmptyBox />
                  <p className="mt-6 font-[family-name:var(--font-anton)] text-2xl uppercase text-[#5A3493]">
                    Your cart is empty
                  </p>
                  <Link
                    href="/products/focus-without-caffeine"
                    onClick={closeCart}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#5A3493] px-8 py-3 text-sm font-bold text-white shadow-[0_4px_0_0_#3d1c8f] transition-all hover:translate-y-px hover:shadow-[0_3px_0_0_#3d1c8f]"
                  >
                    Continue shopping →
                  </Link>
                  <p className="mt-5 text-sm text-gray-500">
                    Have an account?{" "}
                    <Link href="/account" className="text-[#5A3493] underline">
                      Log in
                    </Link>{" "}
                    to check out faster.
                  </p>
                </div>
              ) : (() => {
                const FREE_SHIPPING_THRESHOLD = 60;
                const subtotal = parseFloat(cart.cost.totalAmount.amount);
                const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
                const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
                const hasFreeShipping = remaining === 0;

                return (
                  <div className="flex h-full flex-col overflow-hidden">

                    {/* Free shipping banner — always light purple */}
                    <div className="bg-[#EDE9F8] px-6 py-3 text-center text-xs font-semibold text-[#5A3493]">
                      {hasFreeShipping ? (
                        <span className="font-bold">🎉 You&apos;ve unlocked <span className="underline">Free Shipping!</span></span>
                      ) : (
                        <span>Add <strong>${remaining.toFixed(2)}</strong> more for <strong>Free Shipping</strong></span>
                      )}
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#5A3493]/15">
                        <div className="h-full rounded-full bg-[#5A3493] transition-all duration-500" style={{ width: `${progress}%` }} />
                      </div>
                    </div>

                    {/* Scrollable area */}
                    <div className="flex-1 overflow-y-auto">
                      <ul className="divide-y divide-gray-100 px-5">
                        {cart.lines
                          .sort((a, b) =>
                            a.merchandise.product.title.localeCompare(b.merchandise.product.title)
                          )
                          .map((item, i) => {
                            const params = {} as MerchandiseSearchParams;
                            item.merchandise.selectedOptions.forEach(({ name, value }) => {
                              if (value !== DEFAULT_OPTION) params[name.toLowerCase()] = value;
                            });
                            const url = createUrl(
                              `/products/${item.merchandise.product.handle}`,
                              new URLSearchParams(params)
                            );
                            return (
                              <li key={i} className="py-5">
                                {/* Row 1: image + name/variant + remove */}
                                <div className="flex gap-4">
                                  <Link href={url} onClick={closeCart} className="h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-[10px] bg-[#EDE9F8]">
                                    <Image
                                      className="h-full w-full object-cover"
                                      width={72}
                                      height={72}
                                      alt={item.merchandise.product.featuredImage?.altText || item.merchandise.product.title}
                                      src={item.merchandise.product.featuredImage?.url}
                                    />
                                  </Link>

                                  <div className="flex flex-1 flex-col">
                                    {/* Name + Remove */}
                                    <div className="flex items-start justify-between gap-2">
                                      <div>
                                        <p className="text-sm font-bold leading-tight text-gray-900">
                                          {item.merchandise.product.title}
                                        </p>
                                        {item.merchandise.title !== DEFAULT_OPTION && (
                                          <p className="mt-0.5 text-xs text-gray-400">{item.merchandise.title}</p>
                                        )}
                                      </div>
                                      <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
                                    </div>

                                    {/* Qty stepper + price */}
                                    <div className="mt-3 flex items-center justify-between">
                                      <div className="flex items-center overflow-hidden rounded-full border-2 border-[#5A3493]">
                                        <EditItemQuantityButton item={item} type="minus" optimisticUpdate={updateCartItem} />
                                        <span className="w-8 text-center text-sm font-bold text-[#5A3493]">{item.quantity}</span>
                                        <EditItemQuantityButton item={item} type="plus" optimisticUpdate={updateCartItem} />
                                      </div>
                                      <Price
                                        className="text-base font-bold text-gray-900"
                                        amount={item.cost.totalAmount.amount}
                                        currencyCode={item.cost.totalAmount.currencyCode}
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Row 2: Qty tier buttons */}
                                <div className="mt-3 grid grid-cols-3 gap-2">
                                  {QTY_TIERS.map((tier) => {
                                    const isSelected = item.quantity === tier.qty;
                                    return (
                                      <button
                                        key={tier.qty}
                                        type="button"
                                        disabled={isSelected || qtyChanging}
                                        onClick={() => {
                                          startQtyTransition(async () => {
                                            await updateItemQuantity(null, {
                                              merchandiseId: item.merchandise.id,
                                              quantity: tier.qty,
                                            });
                                          });
                                        }}
                                        className={`rounded-[10px] py-2.5 text-center transition-all disabled:cursor-default ${
                                          isSelected
                                            ? "bg-[#5A3493] text-white"
                                            : tier.best
                                            ? "border-2 border-[#5A3493] bg-white text-[#5A3493] hover:bg-[#EDE9F8]"
                                            : "border border-gray-200 bg-white text-gray-600 hover:border-[#5A3493]/40"
                                        }`}
                                      >
                                        <span className="block text-[10px] font-extrabold uppercase tracking-wide leading-none">
                                          {tier.display}
                                        </span>
                                        <span className={`mt-1 block text-[9px] font-semibold leading-none ${
                                          isSelected ? "text-white/75" : tier.best ? "text-[#5A3493]" : "text-gray-400"
                                        }`}>
                                          {tier.saving}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Row 3: Subscription frequency dropdown */}
                                <div className="mt-2">
                                  <FrequencyDropdown />
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>

                    {/* Sticky footer */}
                    <div className="bg-[#5A3493] px-6 pb-6 pt-4">
                      {/* Scrolling trust ticker */}
                      <div className="mb-4 overflow-hidden border-b border-white/20 pb-4">
                        <div className="animate-marquee" style={{ animationDuration: "20s" }}>
                          {[
                            { icon: `${CDN}icon-return.svg`,    label: "30-Day Money Back Guarantee" },
                            { icon: `${CDN}icon-truck.svg`,     label: "Ships Within 1 Business Day" },
                            { icon: `${CDN}icon-check-tag.svg`, label: "Cancel Anytime" },
                            { icon: `${CDN}icon-lock.svg`,      label: "Secure Checkout" },
                            { icon: `${CDN}icon-return.svg`,    label: "30-Day Money Back Guarantee" },
                            { icon: `${CDN}icon-truck.svg`,     label: "Ships Within 1 Business Day" },
                            { icon: `${CDN}icon-check-tag.svg`, label: "Cancel Anytime" },
                            { icon: `${CDN}icon-lock.svg`,      label: "Secure Checkout" },
                          ].map((t, i) => (
                            <span key={i} className="flex shrink-0 items-center gap-2 px-5 text-[10px] font-bold uppercase tracking-widest text-white/80">
                              <img src={t.icon} alt="" className="h-4 w-4 shrink-0" style={{ filter: "brightness(0) invert(1)" }} />
                              {t.label}
                              <span className="ml-3 text-white/30">·</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Subtotal row */}
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-white/80">Subtotal</span>
                        <Price
                          className="text-xl font-bold text-white"
                          amount={cart.cost.totalAmount.amount}
                          currencyCode={cart.cost.totalAmount.currencyCode}
                        />
                      </div>

                      <form action={redirectToCheckout}>
                        <CheckoutButton />
                      </form>
                      <p className="mt-2 text-center text-[10px] text-white/50">Taxes &amp; shipping calculated at checkout</p>
                    </div>
                  </div>
                );
              })()}
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
      className="w-full rounded-full bg-white py-3.5 text-sm font-bold text-[#5A3493] shadow-[0_4px_0_0_rgba(0,0,0,0.2)] transition-all hover:translate-y-px hover:shadow-[0_3px_0_0_rgba(0,0,0,0.2)] disabled:opacity-60"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-[#5A3493]" /> : "Checkout →"}
    </button>
  );
}

function FrequencyDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(FREQUENCY_OPTIONS[2]!);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between rounded-[10px] border border-gray-200 bg-white px-3 py-2.5 text-left"
      >
        <span className="text-xs font-semibold text-gray-800">{selected.label.replace(" – SAVE 15%", "")}</span>
        <div className="flex items-center gap-2">
          {selected.highlight && (
            <span className="rounded-full bg-[#EDE9F8] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#5A3493]">SAVE 15%</span>
          )}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-[10px] border border-gray-200 bg-white shadow-lg">
          {FREQUENCY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { setSelected(opt); setOpen(false); }}
              className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-xs transition-colors hover:bg-[#EDE9F8] ${selected.value === opt.value ? "font-bold text-[#5A3493]" : "text-gray-700"}`}
            >
              <span>{opt.label.replace(" – SAVE 15%", "")}</span>
              {opt.highlight && (
                <span className="rounded-full bg-[#EDE9F8] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#5A3493]">SAVE 15%</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

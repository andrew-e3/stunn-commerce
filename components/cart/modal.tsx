"use client";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import LoadingDots from "components/loading-dots";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";

type MerchandiseSearchParams = { [key: string]: string };

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

                const hasOneMonth = cart.lines.some(l => l.merchandise.title?.includes("1 Month"));
                const hasTwoMonths = cart.lines.some(l => l.merchandise.title?.includes("2 Month") && !l.merchandise.title?.includes("3"));
                const showUpgradeNudge = hasOneMonth || hasTwoMonths;
                const upgradeSaving = hasOneMonth ? 18 : 6;

                return (
                <div className="flex h-full flex-col overflow-hidden">

                  {/* Free shipping banner */}
                  <div className={`px-6 py-2.5 text-center text-xs font-semibold ${hasFreeShipping ? "bg-[#d4edda] text-green-800" : "bg-[#EDE9F8] text-[#5A3493]"}`}>
                    {hasFreeShipping ? (
                      "🎉 Congrats, you've unlocked Free Shipping!"
                    ) : (
                      <span>Add <strong>${remaining.toFixed(2)}</strong> more for <strong>Free Shipping</strong></span>
                    )}
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[#5A3493]/20">
                      <div className="h-full rounded-full bg-[#5A3493] transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  {/* Scrollable area */}
                  <div className="flex-1 overflow-y-auto">

                    {/* Upgrade nudge */}
                    {showUpgradeNudge && (
                      <div className="mx-4 mt-4 flex items-center justify-between gap-3 rounded-[10px] border border-[#5A3493]/20 bg-[#EDE9F8] px-4 py-3">
                        <div>
                          <p className="text-xs font-bold text-[#5A3493]">Save ${upgradeSaving} — upgrade to 3 Months</p>
                          <p className="text-[10px] text-[#5A3493]/70">Ships free every 3 months · Cancel anytime</p>
                        </div>
                        <Link
                          href="/products/focus-without-caffeine"
                          onClick={closeCart}
                          className="shrink-0 rounded-full bg-[#5A3493] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white"
                        >
                          Upgrade
                        </Link>
                      </div>
                    )}

                    {/* Items */}
                    <ul className="px-4 py-2">
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
                            <li key={i} className="border-b border-gray-100 py-4">
                              <div className="flex gap-3">
                                {/* Image */}
                                <Link href={url} onClick={closeCart} className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-[10px] bg-[#EDE9F8]">
                                  <Image
                                    className="h-full w-full object-cover"
                                    width={80}
                                    height={80}
                                    alt={item.merchandise.product.featuredImage?.altText || item.merchandise.product.title}
                                    src={item.merchandise.product.featuredImage?.url}
                                  />
                                </Link>

                                {/* Details */}
                                <div className="flex flex-1 flex-col gap-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <Link href={url} onClick={closeCart}>
                                      <p className="text-sm font-bold leading-tight text-gray-900">
                                        {item.merchandise.product.title}
                                      </p>
                                      {item.merchandise.title !== DEFAULT_OPTION && (
                                        <p className="mt-0.5 text-xs text-gray-500">{item.merchandise.title}</p>
                                      )}
                                    </Link>
                                    <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
                                  </div>

                                  <div className="mt-auto flex items-center justify-between pt-2">
                                    {/* Quantity stepper */}
                                    <div className="flex items-center gap-0 rounded-full border-2 border-[#5A3493] overflow-hidden">
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
                            </li>
                          );
                        })}
                    </ul>
                  </div>

                  {/* Sticky footer */}
                  <div className="bg-[#5A3493] px-6 pb-6 pt-4">
                    {/* Trust strip */}
                    <div className="mb-4 flex items-center justify-between border-b border-white/20 pb-4">
                      {[
                        { icon: "🚚", label: "Ships in 1 Business Day" },
                        { icon: "↩️", label: "30-Day Money Back" },
                        { icon: "✕", label: "Cancel Anytime" },
                      ].map((b) => (
                        <div key={b.label} className="flex flex-col items-center gap-0.5 text-center">
                          <span className="text-sm">{b.icon}</span>
                          <span className="text-[9px] font-semibold uppercase tracking-wide text-white/70">{b.label}</span>
                        </div>
                      ))}
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
                    <p className="mt-2 text-center text-[10px] text-white/50">Taxes & shipping calculated at checkout</p>
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

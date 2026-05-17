"use client";

import { Dialog, Transition } from "@headlessui/react";
import BrandLogo from "components/brand-logo";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import {
  Bars3Icon,
  PlusIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const PDP = "/products/focus-without-caffeine";

type MobileMenuItem = {
  label: string;
  href: string;
  external?: boolean;
};

export default function MobileMenu({ menu }: { menu: MobileMenuItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  const account = menu.find((item) => item.label.toLowerCase() === "account");
  const about = menu.find((item) => item.label.toLowerCase() === "about") ?? {
    label: "About",
    href: "/about-us",
  };

  const MenuLink = ({
    item,
    children,
    className,
  }: {
    item: MobileMenuItem;
    children: React.ReactNode;
    className?: string;
  }) =>
    item.external ? (
      <a href={item.href} onClick={closeMobileMenu} className={className}>
        {children}
      </a>
    ) : (
      <Link
        href={item.href}
        prefetch={true}
        onClick={closeMobileMenu}
        className={className}
      >
        {children}
      </Link>
    );

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center text-[#111111] transition-colors md:hidden"
      >
        <Bars3Icon className="h-6" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col overflow-y-auto bg-white">
              <div className="sticky top-0 z-10 grid min-h-[72px] grid-cols-[1fr_auto_1fr] items-center border-b border-[#111111] bg-white px-5">
                <button
                  className="flex h-11 w-11 items-center justify-center text-[#111111] transition-opacity hover:opacity-60"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6" />
                </button>

                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center"
                  aria-label="STUNN home"
                >
                  <BrandLogo />
                </Link>

                <div className="flex justify-end">
                  {account ? (
                    <MenuLink
                      item={account}
                      className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#111111]"
                    >
                      Account
                    </MenuLink>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-1 flex-col px-5 py-6">
                <div className="divide-y divide-[#111111] border-b border-t border-[#111111]">
                  <Link
                    href={PDP}
                    prefetch={true}
                    onClick={closeMobileMenu}
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <div>
                      <p className="text-2xl font-black tracking-[-0.02em] text-[#111111]">
                        STUNN Decaf Coffee
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#111111]/55">
                        Save up to 25% on subscription
                      </p>
                    </div>
                    <PlusIcon className="h-7 w-7 shrink-0 text-[#111111] transition-transform group-hover:rotate-90" />
                  </Link>

                  <Link
                    href={PDP}
                    prefetch={true}
                    onClick={closeMobileMenu}
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-black tracking-[-0.02em] text-[#111111]">
                          Bundle & Save
                        </p>
                        <span className="rounded bg-[#5A3493] px-2 py-1 text-[10px] font-black uppercase tracking-wide text-white">
                          Best value
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-[#111111]/55">
                        3 boxes, lowest price per cup
                      </p>
                    </div>
                    <PlusIcon className="h-7 w-7 shrink-0 text-[#111111] transition-transform group-hover:rotate-90" />
                  </Link>
                </div>

                <Link
                  href={PDP}
                  prefetch={true}
                  onClick={closeMobileMenu}
                  className="mt-7 flex min-h-14 items-center justify-center rounded-lg border-2 border-[#111111] text-base font-black uppercase tracking-[0.04em] text-[#111111] transition-colors hover:bg-[#111111] hover:text-white"
                >
                  Shop STUNN
                </Link>

                <div className="mt-7 divide-y divide-[#111111] border-b border-t border-[#111111]">
                  <MenuLink
                    item={about}
                    className="group flex items-center justify-between py-5"
                  >
                    <span className="text-2xl font-black tracking-[-0.02em] text-[#111111]">
                      About
                    </span>
                    <PlusIcon className="h-7 w-7 text-[#111111] transition-transform group-hover:rotate-90" />
                  </MenuLink>
                  <Link
                    href={`${PDP}#faq`}
                    prefetch={true}
                    onClick={closeMobileMenu}
                    className="group flex items-center justify-between py-5"
                  >
                    <span className="text-2xl font-black tracking-[-0.02em] text-[#111111]">
                      FAQ
                    </span>
                    <PlusIcon className="h-7 w-7 text-[#111111] transition-transform group-hover:rotate-90" />
                  </Link>
                </div>

                {account ? (
                  <MenuLink
                    item={account}
                    className="mt-7 flex items-center gap-3 text-lg font-semibold text-[#111111]/75"
                  >
                    <UserCircleIcon className="h-7 w-7" />
                    Login
                  </MenuLink>
                ) : null}

                <div className="mt-auto pt-10">
                  <div className="rounded-[20px] bg-[#F4F0FB] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#111111]/45">
                      Launch offer
                    </p>
                    <p className="mt-2 text-2xl font-black uppercase leading-tight tracking-[-0.03em] text-[#111111]">
                      Upgrade your coffee ritual.
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#111111]/60">
                      Save up to 25% and get free shipping on the best-value subscription.
                    </p>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

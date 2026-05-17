"use client";

import { Dialog, Transition } from "@headlessui/react";
import BrandLogo from "components/brand-logo";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import {
  Bars3Icon,
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
        <Dialog onClose={closeMobileMenu} className="relative z-[1000000]">
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

                <div />
              </div>

              <div className="flex flex-1 flex-col px-5 py-7">
                <Link
                  href={PDP}
                  prefetch={true}
                  onClick={closeMobileMenu}
                  className="stunn-cta-motion flex min-h-14 items-center justify-center rounded-lg border-2 border-[#5A3493] bg-[#5A3493] text-base font-black uppercase tracking-[0.04em] text-white"
                >
                  Shop STUNN
                </Link>

                <div className="mt-7 divide-y divide-[#111111]/14 border-y border-[#111111]/14">
                  <MenuLink
                    item={about}
                    className="flex items-center justify-between py-5"
                  >
                    <span className="text-2xl font-black uppercase tracking-[-0.02em] text-[#111111]">
                      About
                    </span>
                  </MenuLink>
                  {account ? (
                    <MenuLink
                      item={account}
                      className="flex items-center gap-3 py-5 text-2xl font-black uppercase tracking-[-0.02em] text-[#111111]"
                    >
                      <UserCircleIcon className="h-7 w-7" />
                      Login
                    </MenuLink>
                  ) : null}
                </div>

                <div className="mt-auto pt-10">
                  <div className="rounded-[20px] bg-[#111111] p-5 text-white">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-white/45">
                      Off The Drip
                    </p>
                    <p className="mt-2 text-2xl font-black uppercase leading-tight tracking-[-0.03em] text-white">
                      You do not need caffeine to function.
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-white/62">
                      STUNN is always caffeine-free: real coffee ritual, calm focus, no dependency loop.
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

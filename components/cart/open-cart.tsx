"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function OpenCart({ quantity }: { quantity?: number }) {
  return (
    <div className="relative flex items-center justify-center">
      <ShoppingCartIcon className="h-6 w-6 text-[#111111]" />
      {quantity ? (
        <div className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#7C3AED] text-[10px] font-bold leading-none text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function OpenCart({ quantity }: { quantity?: number }) {
  return (
    <div className="relative flex items-center justify-center">
      <ShoppingCartIcon className="h-6 w-6 text-white" />
      {quantity ? (
        <div className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#F9CEE1] text-[10px] font-bold leading-none text-[#5A3493]">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { removeItem } from "components/cart/actions";
import type { CartItem } from "lib/shopify/types";
import { useActionState } from "react";

export function DeleteItemButton({
  item,
  optimisticUpdate,
}: {
  item: CartItem;
  optimisticUpdate: any;
}) {
  const [message, formAction] = useActionState(removeItem, null);
  const merchandiseId = item.merchandise.id;
  const removeItemAction = formAction.bind(null, merchandiseId);

  return (
    <form
      action={async () => {
        optimisticUpdate(merchandiseId, "delete");
        removeItemAction();
      }}
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-700 transition-colors"
      >
        Remove
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}

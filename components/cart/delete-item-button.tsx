"use client";

import { removeCartLine, removeItem } from "components/cart/actions";
import type { CartItem } from "lib/shopify/types";
import { useActionState } from "react";

export function DeleteItemButton({
  item,
  optimisticUpdate,
}: {
  item: CartItem;
  optimisticUpdate: any;
}) {
  const [message, formAction] = useActionState(
    item.id ? removeCartLine : removeItem,
    null,
  );
  const merchandiseId = item.merchandise.id;
  const removeItemAction = formAction.bind(null, item.id ?? merchandiseId);

  return (
    <form
      action={async () => {
        optimisticUpdate(merchandiseId, "delete", item.id);
        removeItemAction();
      }}
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        className="shrink-0 border-b border-[#111111] text-[10px] font-medium uppercase tracking-normal text-[#111111] transition-opacity hover:opacity-60"
      >
        REMOVE
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}

"use server";

import { TAGS } from "lib/constants";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
  updateCartAttributes,
} from "lib/shopify";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Attaches the analytics session key to the cart so the Shopify order it
// becomes carries it in note_attributes, letting ib_orders join back to
// ib_sessions on a real key rather than on timestamp proximity.
//
// Swallows its own errors on purpose - attribution is worth strictly less than
// the order, so a failure here must be invisible to the shopper.
export async function attachSessionToCart(sessionKey: string) {
  if (!sessionKey || sessionKey.length > 64) return;
  try {
    await updateCartAttributes([
      { key: "analytics_session_key", value: sessionKey },
    ]);
  } catch (e) {
    console.error("attachSessionToCart failed (non-fatal)", e);
  }
}

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined,
  quantity: number = 1,
  sellingPlanId?: string,
) {
  if (!selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    const cart = await getCart();
    const line = {
      merchandiseId: selectedVariantId,
      quantity,
      ...(sellingPlanId ? { sellingPlanId } : {}),
    };

    if (!cart) {
      const newCart = await createCart([line]);
      (await cookies()).set("cartId", newCart.id!);
    } else {
      await addToCart([line]);
    }

    updateTag(TAGS.cart);
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId,
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      updateTag(TAGS.cart);
    } else {
      return "Item not found in cart";
    }
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function removeCartLine(prevState: any, lineId: string) {
  if (!lineId) return "Item not found in cart";

  try {
    await removeFromCart([lineId]);
    updateTag(TAGS.cart);
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  },
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId,
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity,
          },
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart([{ merchandiseId, quantity }]);
    }

    updateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
    return "Error updating item quantity";
  }
}

export async function updateCartLineQuantity(
  prevState: any,
  payload: {
    lineId?: string;
    merchandiseId: string;
    quantity: number;
  },
) {
  const { lineId, merchandiseId, quantity } = payload;

  if (!lineId) {
    return updateItemQuantity(prevState, { merchandiseId, quantity });
  }

  try {
    if (quantity === 0) {
      await removeFromCart([lineId]);
    } else {
      await updateCart([
        {
          id: lineId,
          merchandiseId,
          quantity,
        },
      ]);
    }

    updateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
    return "Error updating item quantity";
  }
}

export async function convertCartLineToSubscription(
  prevState: any,
  payload: {
    lineId?: string;
    merchandiseId: string;
    quantity: number;
    sellingPlanId?: string;
  },
) {
  const { lineId, merchandiseId, quantity, sellingPlanId } = payload;

  if (!sellingPlanId) return "Subscription plan not found";

  try {
    if (lineId) {
      await removeFromCart([lineId]);
    } else {
      const cart = await getCart();
      const lineItem = cart?.lines.find(
        (line) =>
          line.merchandise.id === merchandiseId && !line.sellingPlanAllocation,
      );

      if (lineItem?.id) {
        await removeFromCart([lineItem.id]);
      }
    }

    await addToCart([{ merchandiseId, quantity, sellingPlanId }]);
    updateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
    return "Error switching item to subscription";
  }
}

export async function redirectToCheckout() {
  const cart = await getCart();
  redirect(cart!.checkoutUrl);
}

export async function createCartAndSetCookie() {
  let cart = await createCart();
  (await cookies()).set("cartId", cart.id!);
}

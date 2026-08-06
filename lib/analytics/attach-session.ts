"use client";

import { getStunnSessionKey } from "components/analytics-beacon";
import { attachSessionToCart } from "components/cart/actions";

// Stamps the current first-party analytics session onto the Shopify cart, so
// the order it eventually becomes carries the session key in note_attributes.
//
// Call this immediately after an add-to-cart. It must run after the cart
// exists: on a shopper's first add there is no cartId cookie until addItem has
// created one, and a cartAttributesUpdate with no cart is a no-op.
//
// Never throws. Attribution is worth less than the order, so any failure here
// is swallowed rather than surfaced.
export async function attachAnalyticsSession(): Promise<void> {
  try {
    const key = getStunnSessionKey();
    if (!key) return;
    await attachSessionToCart(key);
  } catch {
    /* attribution is best-effort by design */
  }
}

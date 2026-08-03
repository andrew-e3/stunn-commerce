// Shop Pay Installments messaging.
//
// Shopify's official banner is the <shopify-payment-terms> element that themes
// emit via the Liquid `payment_terms` filter. It depends on shop-side script
// tags and a serialised financing-plan blob, neither of which a headless
// Next.js storefront gets - so there is no first-party component to drop in
// here. This renders the equivalent message ourselves from the cart total.
//
// Eligibility, per Shopify's US rules:
//   - order total (incl. discounts, shipping, tax) between $35 and $30,000
//   - subscription products are NOT eligible
//   - store needs a US Shopify Payments account with Shop Pay Installments on
//
// That last condition cannot be verified from code - we have no Shopify Admin
// API token yet. Asserting a payment method that turns out to be switched off
// would be worse than saying nothing, so this is gated behind
// NEXT_PUBLIC_SHOP_PAY_INSTALLMENTS and renders nothing until it is set to "1".
// Confirm under Settings -> Payments -> Shop Pay Installments, then flip the
// env var in Vercel. No code change needed.

const MIN_USD = 35;
const MAX_USD = 30000;
const TERMS = 4;

export function shopPayInstallmentsEligible(total: number) {
  return total >= MIN_USD && total <= MAX_USD;
}

function ShopPayLogo() {
  return (
    <span
      aria-label="Shop Pay"
      className="inline-flex items-center rounded-[3px] bg-[#5A31F4] px-1.5 py-0.5 text-[10px] font-extrabold italic leading-none tracking-tight text-white"
    >
      shop
      <span className="not-italic">Pay</span>
    </span>
  );
}

/**
 * Renders "Pay in 4 interest-free payments of $X with Shop Pay" for a one-time
 * purchase total. Pass the one-time price only - never a subscription price,
 * because subscriptions are ineligible and the message would be false.
 */
export function ShopPayInstallments({ total }: { total: number }) {
  if (process.env.NEXT_PUBLIC_SHOP_PAY_INSTALLMENTS !== "1") return null;
  if (!shopPayInstallmentsEligible(total)) return null;

  const perTerm = (total / TERMS).toFixed(2);

  return (
    <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-[#111111]/70">
      <span>
        or {TERMS} interest-free payments of{" "}
        <span className="font-semibold text-[#111111]">${perTerm}</span> with
      </span>
      <ShopPayLogo />
    </p>
  );
}

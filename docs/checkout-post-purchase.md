# Checkout + Post-Purchase Rules

STUNN checkout should feel calm, familiar, and trustworthy. Do not make Shopify checkout feel like another landing page. The conversion work happens before checkout; checkout should remove doubt.

## Current Reality

- The storefront is headless Next.js.
- Checkout is Shopify-hosted.
- Subscriptions are powered by Appstle selling plans exposed through the Shopify Storefront API.
- The product strategy is one-box quantity logic:
  - `1 box` = quantity 1 + 1-month selling plan + 20% off.
  - `2 boxes` = quantity 2 + 2-month selling plan + 23% off.
  - `3 boxes` = quantity 3 + 3-month selling plan + 25% off.
- The live PDP/cart should never imply that `3 months` is a separate SKU. It is multiple boxes of the one-box product.

## Checkout Priorities

1. **Clarity beats persuasion.**
   The customer should understand what they are buying, how often it ships, how much they save, and whether they can cancel.

2. **Do not over-brand checkout.**
   Use the STUNN logo, black text, white space, and restrained purple accents. Avoid lavender-heavy panels, loud icon rows, and manifesto copy inside checkout.

3. **Subscription language must be explicit.**
   Use plain language:

   - `3 boxes today`
   - `Ships every 3 months`
   - `You save 25%`
   - `Pause, edit, or cancel before renewal`

4. **Keep guarantees compact.**
   The best checkout reassurance set is:

   - `30-day money-back guarantee`
   - `Ships within 1 business day`
   - `Secure Shopify checkout`
   - `Pause or cancel anytime`

5. **Do not interrupt payment.**
   Do not add education, long ingredient explanations, persona copy, or extra product storytelling in checkout.

## Cart-To-Checkout Handoff

The cart is the last owned surface before Shopify checkout. It should show:

- The exact number of boxes going to checkout.
- Whether this is one-time or autoship.
- Subscription cadence.
- Today’s estimated savings in dollars and percent.
- Free shipping status.
- A short renewal/cancel note for subscription orders.

Current cart implementation includes a checkout summary block in `components/cart/modal.tsx`.

## Native Shopify Checkout Setup

These changes are configured in Shopify Admin / checkout customizer, not the Next.js repo, unless a Shopify checkout extension app is added later.

Recommended checkout customizer setup:

- Header: white background, STUNN logo.
- Button/accent: STUNN logo purple.
- Body: white background, black text.
- Avoid heavy brand panels and extra decorative sections.
- If Shopify checkout app blocks are available, add one compact trust block near payment:
  - `Ships within 1 business day`
  - `30-day money-back guarantee`
  - `Secure checkout`
  - `Pause, edit, or cancel anytime`

Recommended subscription block copy:

> Your order contains a subscription. Your selected boxes ship on the cadence shown above. You can pause, edit, or cancel before renewal.

## Thank You / Order Status Page

The confirmation page should answer four questions:

1. Did my order work?
2. What happens next?
3. How do I use STUNN?
4. How do I manage my subscription?

Recommended module order:

1. `You're in. Your quieter coffee ritual starts now.`
2. Order status / tracking expectation.
3. `How to use STUNN`: one sachet, hot water or milk, stir.
4. Subscription management note if autoship.
5. Quiet Club / referral prompt.

Recommended copy:

> We’ll send tracking as soon as your order ships. When it lands, mix one sachet with hot water or milk. Use it where caffeine usually wins: the second cup, the afternoon cup, or the evening ritual.

Subscription copy:

> If you chose autoship, your discount is locked in. Your future orders follow the cadence you selected at checkout. You can pause, edit, or cancel before renewal.

## Post-Purchase Email System

Because checkout is Shopify-hosted, STUNN’s email system is the owned post-purchase experience.

The order-confirmation email should mirror the thank-you page:

- Confirm the order.
- Set shipping expectations.
- Explain first-cup usage.
- Clarify subscription management.
- Invite the customer into the Quiet Club world without making the transactional email feel promotional.

Current file: `email-system/emails/order-confirmation.tsx`.

## Do Not Do

- Do not use exaggerated DTC urgency inside checkout.
- Do not add long-form manifesto copy to payment pages.
- Do not create confusing language around `1 Month`, `2 Months`, and `3 Months` variants.
- Do not show a subscription discount unless Shopify/Appstle actually applies it.
- Do not use purple everywhere. Purple is for logo, CTA, savings, and small brand accents.

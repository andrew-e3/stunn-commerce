# STUNN Klaviyo Lifecycle Strategy

## Principle
Every automated email should reinforce the same market position: STUNN is the coffee brand that never uses caffeine. The movement is not anti-coffee. It is anti-dependency.

## Launch Flow Map

| Stage | Flow | Klaviyo ID | Trigger | Goal | Status target |
| --- | --- | --- | --- | --- | --- |
| Capture | Welcome Series - Quiet Club | `RnF5cv` | Added to Quiet Club list | Convert belief into first order | Live |
| Recovery | Abandoned Checkout - Off The Drip | `XBN3eY` | Shopify Checkout Started | Recover checkout without discounts | Live with Placed Order suppression |
| Recovery | Browse Abandonment - Off The Drip | `QTR38T` | Viewed Product | Bring product viewers back | Live with checkout/order suppression |
| Customer | Post Purchase - Off The Drip | `RsePq8` | Shopify Placed Order | Educate, reduce remorse, build movement belief | Live |
| Retention | Replenishment - Off The Drip | `UWtk5G` | Shopify Placed Order | Restock or subscribe before running out | Live with repeat-order suppression |
| Retention | Winback - Off The Drip | `WEfXeM` | Shopify Placed Order | Bring lapsed customers back | Live with repeat-order suppression |

## Cadence
- Welcome: immediate, day 1, day 3, day 5.
- Abandoned checkout: 4 hours, then 20 hours.
- Browse abandon: 3 hours after product view.
- Post purchase: day 1 and day 5 after order.
- Replenishment: day 21 after order.
- Winback: day 45 after order.

## Guardrails
- No SMS until the brand intentionally launches SMS.
- No discount-led copy in lifecycle flows.
- No order confirmation flow live unless Shopify transactional confirmation is intentionally replaced.
- Recovery flows must suppress anyone who placed an order since entering the flow.
- Browse flow must suppress anyone who started checkout or placed an order since entering the flow.

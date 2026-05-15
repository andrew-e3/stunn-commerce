# STUNN Mobile Rules

Mobile is the primary luxury experience. The site should feel calmer and more premium on mobile, not like a compressed desktop page.

## Mobile North Star

Mobile should feel:

- Slow enough to understand
- Clear enough to buy
- Spacious enough to feel premium
- Simple enough to trust

## Layout Rules

- Design mobile first, then expand to desktop.
- Avoid squeezing desktop grids into mobile.
- One strong idea per viewport.
- Stack sections cleanly with generous vertical rhythm.
- Avoid dense icon rows above the fold.
- Avoid side-by-side comparisons that force horizontal scrolling unless absolutely necessary.

## Typography Rules

- Hero headline: large, but not clipped. Use `clamp()` carefully.
- Mobile headings should usually be 32-48px depending on context.
- Body copy should stay readable: 15-17px with comfortable line-height.
- Avoid tiny all-caps explanatory text.
- Do not let Anton become decorative noise on mobile.

## Spacing Rules

- Minimum horizontal page padding: 20-24px.
- Major section vertical padding: 56-80px.
- Purchase UI internal padding: 20-28px.
- Keep CTA spacing consistent and obvious.
- Do not stack pills/badges so tightly that they feel like tags in an admin UI.

## PDP Mobile Rules

Above the fold should answer:

- What is this?
- Why should I care emotionally?
- Can I buy it easily?
- Can I trust it?

PDP mobile should prioritize:

1. Strong product/lifestyle image.
2. Concise emotional headline.
3. Purchase panel with clear quantity/subscription.
4. Trust reassurance.
5. Deeper story below.

Avoid:

- Large galleries before the purchase decision.
- Too many floating overlays on the hero image.
- Repeating "no jitters/no crash" in every section.
- Dense comparison tables too early.

## Cart Mobile Rules

Cart drawer should:

- Open fast and feel clean.
- Keep checkout visible or easy to reach.
- Make quantity tiers obvious.
- Use light purple for progress/trust states.
- Avoid green success styling unless explicitly required.
- Keep product row aligned: image, title, quantity, price, remove.

Quantity strategy:

- One box = quantity 1.
- 2 months = quantity 2.
- 3 months = quantity 3.
- Tier buttons should update quantity.
- Discount messaging should mirror Shopify automatic discount rules.

## Image Rules

- Images should crop intentionally.
- Avoid cropping packaging text.
- Lifestyle photos should show quiet ritual, not generic wellness posing.
- If a hero overlay blocks the subject or packaging, remove it.
- Product gallery images should be expandable.

## Navigation Rules

- Mobile nav should be minimal.
- Cart should remain easy to find.
- Links should route to PDP where possible because no collection page is needed for the current single-product strategy.

## Interaction Rules

- Tap targets should be at least 44px.
- Accordions should use clear affordances.
- Lightbox close/prev/next controls should be reachable by thumb.
- Avoid surprise motion.

## Mobile QA Checklist

Before shipping a mobile change, check:

- No text clipping.
- No horizontal overflow.
- CTAs remain visible and readable.
- Product image is not distorted.
- Cart tier buttons are tappable.
- Checkout button is obvious.
- Footer logo scales without creating awkward whitespace.
- The first three viewports tell a coherent story.

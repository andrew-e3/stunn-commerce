# PDP Audit and Redesign Roadmap

Date: 2026-05-14

Scope: current headless PDP at `/products/focus-without-caffeine`, based on local architecture and current STUNN brand direction.

## Executive Read

The PDP has useful pieces, but the hierarchy still leans too much toward functional DTC/supplement logic. It explains benefits, ingredients, comparison, and proof, but it does not yet fully behave like a premium modern coffee ritual page.

The next work should not be a full redesign. It should be a sequence of controlled improvements that make the page calmer, more editorial, more mobile-aware, and more aligned with the single-box quantity purchase strategy.

## Current PDP Architecture

Current sections:

1. Hero: expandable image gallery + purchase panel.
2. Benefits grid: six icon-led benefit blocks.
3. Timeline: three image-led "what to expect" stages.
4. Photo/content gallery: ingredients and comparison.
5. Testimonials.
6. Founder.
7. FAQ.
8. Final CTA rail.
9. Footer.

Client components:

- `ImageGallery`
- `StunnPurchasePanel`
- Cart drawer through shared navbar.

## Weakest Sections Visually

### 1. Purchase Panel

Why it is weak:

- It still appears to use duration variants, while the latest cart strategy is quantity-based single boxes.
- The panel has too many competing micro-elements: stars, chips, avatars, selector cards, discount badge, autoship perks, one-time link, trust cards, payments, accordions.
- It feels closer to supplement conversion UI than premium coffee ritual.

Direction:

- Make the purchase panel calmer and clearer.
- Quantity should be the core selector: 1 box, 2 boxes, 3 boxes.
- Discount messaging should align with Shopify automatic discounts.
- Trust/proof should be quieter and better spaced.

### 2. Hero

Why it is weak:

- The gallery and benefit overlays are useful, but the first impression risks feeling like a product widget rather than a cinematic coffee ritual.
- Benefit pills can feel pasted on if not integrated with the image.
- The emotional proposition is not as strong as it could be above the fold.

Direction:

- Lead with one emotional line: "Everything you love about coffee. None of what you don't."
- Let the hero image breathe.
- Keep expandable gallery behavior, but reduce visual clutter above the fold.
- Use product/lifestyle image hierarchy rather than many claims.

### 3. Benefits Grid

Why it is weak:

- It is cleaner than earlier versions, but still reads like a UI grid.
- Six icons in a bordered grid can push the brand toward supplement/DTC.

Direction:

- Convert from icon grid to editorial benefit blocks.
- Use fewer icons or no icons.
- Give each benefit more whitespace and stronger copy hierarchy.
- The section should feel like a calm explanation, not a dashboard.

### 4. Timeline

Why it is weak:

- The concept is good, but current images are partly infographic-style rather than cinematic.
- It risks feeling like a borrowed supplement results section.

Direction:

- Keep the idea but make it more sensory and ritual-led.
- Replace with better photography when available.
- Copy should talk about felt state, not exaggerated transformation.

### 5. Ingredients / Comparison Gallery

Why it is weak:

- Combining ingredients and comparison into image/content panels is efficient, but currently dense.
- Ingredient cards can still feel supplement-first if they dominate the story.

Direction:

- Ingredients should be "what makes the ritual work", not the main sales hook.
- Use ingredient imagery only if it feels premium.
- Comparison table should be clear, quieter, and more elegant.

## Prioritized Redesign Roadmap

### Phase 1 — Strategic Alignment

Goal: fix purchase truth before visual polish.

Tasks:

- Update PDP purchase panel to use quantity-based boxes, matching the cart.
- Replace "duration variant" language with "1 box / 2 boxes / 3 boxes" or "1 month / 2 months / 3 months" where one box equals one month.
- Make one-time vs subscription copy honest and wired to available Shopify functionality.
- Ensure cart tier behavior and PDP selector tell the same story.

Why it improves the brand:

- Premium brands feel trustworthy when the buying model is simple and consistent.
- Confusing product mechanics make the page feel cheap, even if the visuals improve.

### Phase 2 — Hero Refinement

Goal: make the first screen feel like STUNN, not a supplement funnel.

Tasks:

- Reduce above-fold clutter.
- Use a calmer headline/subcopy hierarchy.
- Keep gallery expansion but make the first image the visual lead.
- Move most benefit proof below the purchase panel or into the next section.

Why it improves the brand:

- The first screen should create desire and trust before it starts explaining everything.

### Phase 3 — Benefits Rebuild

Goal: turn benefits from UI claims into emotional product storytelling.

Tasks:

- Replace six equal icon cards with 3-4 larger editorial benefit moments.
- Lead each with a short feeling phrase.
- Use thin lines and whitespace instead of heavy cards.
- Keep icons minimal or remove them entirely.

Why it improves the brand:

- Fewer, better benefits feel more premium and more believable.

### Phase 4 — Mechanism Polish

Goal: make ingredients/comparison feel like premium product education.

Tasks:

- Rework ingredients into an editorial section with stronger spacing.
- Pair each ingredient with the felt outcome it supports.
- Simplify comparison table styling.
- Avoid over-emphasizing cost-per-serving if it cheapens the page.

Why it improves the brand:

- The formula should support the ritual, not turn STUNN into a supplement label.

### Phase 5 — Mobile Luxury Pass

Goal: make the mobile PDP feel intentional and easy to buy.

Tasks:

- Audit first three mobile viewports.
- Reduce stacked badges/pills.
- Ensure image, headline, price, quantity, CTA, and trust are all clear.
- Keep checkout path thumb-friendly.

Why it improves the brand:

- Most purchase decisions happen on mobile. Premium on mobile is spacing, clarity, and calm sequencing.

## Section-by-Section Recommendations

### Hero

- Use one strong emotional headline.
- Keep product/lifestyle image as the anchor.
- Limit overlays to one or remove them.
- Ensure packaging is visible and accurate.

### Purchase Panel

- Align to quantity strategy.
- Make price/discount logic clear.
- Reduce chips.
- Use one primary CTA.
- Move accordions lower or simplify them.

### Benefits

- Use editorial blocks instead of equal UI cards.
- Focus on emotional state: calm focus, steady energy, sleep-friendly ritual.
- Avoid repeating every claim in every section.

### Timeline

- Keep only if imagery supports the story.
- Rewrite to sound calmer: first cup, afternoon, evening, next morning.

### Ingredients

- Introduce after desire is established.
- Use "inside the ritual" framing.
- Keep ingredient descriptions short.

### Comparison

- Use a cleaner table.
- Keep STUNN column visually anchored but not cartoonish.
- Avoid making the page feel like a spreadsheet.

### Testimonials

- Use human, editorial reviews.
- Avoid fake-looking proof density.
- Consider one stronger quote plus two smaller supporting quotes.

### Founder

- Good strategic section.
- Should feel personal and restrained.
- Copy should reinforce "I loved coffee, not what caffeine did to me."

### FAQ

- Keep practical.
- Add subscription/cancel/shipping questions if they reduce purchase friction.

## Do Not Do Next

- Do not start with a new visual system.
- Do not add more sections.
- Do not add more icons.
- Do not make a full redesign before fixing product/quantity logic.
- Do not use generic luxury aesthetics that ignore existing STUNN packaging.

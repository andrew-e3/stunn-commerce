# STUNN Design Rules

These rules guide all frontend and design work on the STUNN headless storefront.

## North Star

STUNN should feel like a premium coffee ritual brand with a modern wellness edge. The page should slow the user down slightly, create desire, then make buying feel obvious.

The design should communicate:

- Calm ambition
- Warm control
- Editorial restraint
- Premium daily ritual
- Product confidence

## Layout Principles

- Whitespace first. Give every section enough air to feel considered.
- Use fewer blocks with clearer hierarchy.
- Let one image or one idea lead each section.
- Prefer clean editorial grids over stacked DTC cards.
- Avoid cluttered rows of badges, icons, pills, and claims.
- Use thin borders and quiet dividers when structure is needed.
- Keep purchase actions obvious, but do not make every section feel like a hard sell.

## Section Rhythm

Good STUNN pacing:

1. Emotional promise
2. Product ritual
3. Purchase path
4. Feeling/outcome
5. Mechanism and ingredients
6. Proof/comparison
7. Founder or identity
8. FAQ and final confidence

Bad STUNN pacing:

1. Hero
2. Badges
3. Icons
4. Ingredients
5. Icons again
6. More badges
7. Comparison
8. More CTAs

## Component Shape

- Default border radius should be low: `0px` to `12px`.
- Avoid giant rounded cards unless the live Shopify/source design specifically uses them.
- Avoid nested cards.
- Avoid glassmorphism.
- Avoid gradients unless they are part of a deliberate photo treatment.
- Avoid oversized shadows. Luxury should come from proportion, not effects.
- Buttons can have subtle tactile depth, but should not feel toy-like.

## Color Rules

- Use `#5A3493` as the primary brand anchor.
- Use `#EDEAEF`, `#EDE9F8`, and `#EEEAF8` for calm section surfaces.
- Use `#fef8dd` for warmth and editorial pause.
- Use `#F9CEE1` sparingly as an accent.
- Do not introduce neon, saturated greens, blues, or generic supplement colors.
- Do not use green success states in main cart/PDP surfaces unless there is a clear reason. Light purple is preferred for STUNN trust/progress.

## Typography Rules

- Anton is for short uppercase headlines only.
- Inter is for body copy, UI, price, form controls, and support text.
- Avoid Anton in dense cards where legibility matters.
- Body text should generally sit between `14px` and `18px` with generous line-height.
- Small uppercase labels should be used sparingly. Too many labels make the site feel like a dashboard.
- Avoid all-caps buttons if they make the page feel cheap or aggressive. Use sentence case where a softer purchase feel is needed.

## Image Rules

- Product packaging must remain accurate.
- Product imagery should not be cropped in a way that hides or distorts the pack.
- Lifestyle images should support the emotional state: calm, focused, adult, capable.
- If image quality is weak, do not compensate with loud UI.
- Expandable gallery/lightbox is required for product evidence images on the PDP.

## Motion Rules

- Motion should be subtle and slow.
- Marquees can be used, but never as a gimmick. They should feel like brand atmosphere.
- Avoid two competing scroll behaviors in the hero.
- Avoid aggressive hover transforms.
- Lightbox and cart drawer motion should feel smooth and functional.

## CTA Rules

- Primary CTA: clear, high contrast, brand purple.
- Secondary CTA: quiet text link or restrained outline.
- Avoid placing a CTA every few hundred pixels unless the section genuinely completes a decision.
- CTAs should lead to the PDP purchase panel or open cart where appropriate.

## Proof Rules

- Proof should support emotional belief, not drown the page.
- Reviews should be editorial and human.
- Comparison tables should be clean and scannable.
- Ingredient proof belongs after the user understands the feeling and ritual.

## Current Implementation Notes

The current headless site uses many Tailwind one-off values directly in page files. That is workable during iteration, but future stabilization should extract:

- Section wrappers
- Editorial heading component
- CTA component
- Trust/guarantee row
- Product image block
- Comparison table
- FAQ section

Do this only when the design direction is stable.

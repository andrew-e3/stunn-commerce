# STUNN Do Not Do

This is the guardrail file. If a future change violates this list, stop and rethink before implementing.

## Brand Positioning

Do not make STUNN feel like:

- A supplement brand
- A nootropic startup
- A SaaS landing page
- A cheap DTC funnel
- An influencer wellness product
- A generic mushroom coffee clone
- A gym/performance powder

## Visual Style

Do not use:

- Giant rounded corners everywhere
- Excessive gradients
- Glassmorphism
- Startup illustrations
- Random icon systems
- Dense card grids
- Loud neon colors
- Generic green success banners
- Heavy drop shadows
- Decorative blobs/orbs
- Overlapping UI that blocks product imagery
- Random one-off Tailwind styles without a design reason

## Typography

Do not:

- Use Anton for paragraphs.
- Use Anton for dense labels where clarity matters.
- Mix too many text treatments in one section.
- Let every label become uppercase/tracked.
- Make the page feel like a dashboard.
- Use tiny text for important purchase details.

## Copy

Do not lead with:

- Ingredients first.
- "Biohack" language.
- "Stack" language unless deliberately reframing away from supplement fatigue.
- Aggressive performance claims.
- Medical claims.
- Hyperbolic startup copy.

Avoid phrases like:

- "supercharge"
- "unlock limitless focus"
- "crush your day"
- "hack your energy"
- "next-gen nootropic"
- "clinically proven" unless legally substantiated

## PDP

Do not:

- Redesign the entire PDP in one pass without approval.
- Move into a new visual system without documenting the reason.
- Add more sections when the issue is hierarchy.
- Put ingredient education before emotional desire.
- Treat every benefit as an icon card.
- Add floating hero callouts if they feel pasted on or block the image.
- Use separate duration products if the strategy is quantity-based single boxes.

## Cart

Do not:

- Use green for free-shipping success state.
- Swap variants for quantity tiering.
- Hide quantity logic from customers.
- Make subscription frequency look functional if it is not wired to selling plans.
- Add upsell clutter before the core line-item design is clear.

## Packaging

Never:

- Alter STUNN packaging.
- Recolor the box.
- Rewrite visible packaging claims.
- Stretch or distort pack images.
- Generate fake packaging.
- Use product images where the label is inaccurate.

## Components

Do not:

- Build a generic design system for its own sake.
- Add nested cards.
- Copy inherited Vercel Commerce components visually.
- Use multiple icon styles in the same section.
- Introduce a new button style without adding it to the rules.

## Implementation

Do not:

- Make code changes before explaining the visual direction and receiving approval when the request is exploratory.
- Claim something matches live STUNN without visual verification.
- Push to Vercel without checking build/type status when the change is non-trivial.
- Commit `.claude/` unless explicitly asked.
- Hardcode secrets in the repo.

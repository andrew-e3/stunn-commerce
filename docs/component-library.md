# STUNN Component Library

This file documents the current reusable systems in the STUNN headless storefront and how they should evolve.

## Project Structure

Core app files:

- `app/layout.tsx` - root layout, fonts, announcement bar, cart provider, navbar.
- `app/page.tsx` - homepage sections.
- `app/products/[handle]/page.tsx` - PDP route.
- `app/about-us/page.tsx` - brand/about page.
- `app/contact/page.tsx` - contact page.
- `app/search/*` - inherited commerce search/collection pages. These are not core STUNN flow.

Core component folders:

- `components/layout/*` - navbar, footer, search/product-grid leftovers.
- `components/cart/*` - cart drawer, cart state, quantity actions.
- `components/product/*` - PDP gallery, purchase panel, selectors, FAQ.
- `components/grid/*` - inherited homepage/category grid components.
- `lib/shopify/*` - Storefront API queries, mutations, fragments, types.

## Current PDP Architecture

`app/products/[handle]/page.tsx` is a server component that:

1. Fetches product data with `getProduct(handle)`.
2. Generates product metadata and JSON-LD.
3. Defines local content arrays for ingredients, comparison rows, testimonials, FAQs, benefits, and gallery images.
4. Renders the PDP in sequence.
5. Uses client components for image gallery and purchase interaction.

Client components used by PDP:

- `components/product/image-gallery.tsx`
- `components/product/stunn-purchase-panel.tsx`
- `components/cart/modal.tsx` indirectly through navbar

Current PDP sections:

- Hero gallery + purchase panel
- Benefits grid
- "What to expect" timeline
- Photo/content gallery with ingredients and comparison
- Testimonials
- Founder section
- FAQ
- Final CTA rail
- Footer

## Current Cart Architecture

`components/cart/modal.tsx` is a client drawer using Headless UI.

Current functions:

- Opens automatically when cart quantity changes.
- Shows free-shipping progress.
- Shows cart line image/title/quantity/price.
- Quantity tier buttons update line quantity.
- Frequency dropdown is presentational only.
- Sticky checkout footer contains trust ticker, subtotal, checkout button.

Known strategic note:

- Cart has moved toward one-box quantity strategy.
- PDP purchase panel still needs to be aligned with that model.
- Subscription selling plans are not fully wired in the current headless implementation.

## Existing Reusable Patterns

### Navbar

File: `components/layout/navbar/index.tsx`

- Purple background.
- Real STUNN white logo from Shopify CDN.
- Shopify menu with fallback links.
- Cart icon on right.

Rule:

- Logo should use `STUNN_LOGO-White.png`, not a text reconstruction.

### Footer

File: `components/layout/footer.tsx`

- Purple footer.
- Newsletter block.
- Store/help/social links.
- Large white STUNN logo asset.
- Payment icons and FDA disclaimer.

Rule:

- Keep footer visually quiet. Avoid extra divider lines unless live source design requires them.

### Image Gallery

File: `components/product/image-gallery.tsx`

Capabilities:

- Clickable hero image.
- Clickable grid images.
- Fullscreen lightbox.
- Prev/next controls.
- Dot indicators.
- Escape and arrow-key support.
- Scroll lock.
- Optional `heroOverlay`.

Rules:

- Keep it generic.
- Do not hardcode STUNN benefit copy inside the gallery component.
- Use overlays sparingly.

### Purchase Panel

File: `components/product/stunn-purchase-panel.tsx`

Current capabilities:

- Star rating.
- Product title/subtitle.
- Benefit chips.
- Social proof avatars.
- Duration cards.
- Price display.
- Add to cart.
- One-time purchase button.
- Trust badges.
- Payment icons.
- Accordions.

Known issue:

- It still assumes duration variants. The strategic model should be one box as one product/variant and multi-month purchase as quantity.

### Cart Drawer

File: `components/cart/modal.tsx`

Current capabilities:

- Create-style quantity tiers.
- Light purple free shipping banner.
- Subscription frequency dropdown.
- Sticky checkout footer.
- Trust marquee.

Rules:

- Tier buttons should update quantity, not variant.
- Free shipping UI should remain light purple.
- Avoid generic green success styling.

## Recommended Extraction Plan

Do not abstract prematurely. Extract only after the next PDP pass stabilizes.

Priority components to extract:

1. `SectionShell`
   - Owns max-width, horizontal padding, vertical rhythm.

2. `EditorialHeading`
   - Eyebrow, headline, optional subcopy.
   - Encodes Anton/Inter usage rules.

3. `StunnButton`
   - Primary, secondary, light, text.
   - Prevents random button styling.

4. `TrustRow`
   - Guarantee, shipping, secure checkout.
   - Minimal icon usage.

5. `QuantityTierSelector`
   - Shared by PDP and cart.
   - One-box quantity model.

6. `IngredientEditorial`
   - Premium ingredient story cards.
   - Can support image or text-only variants.

7. `ComparisonTable`
   - Reusable STUNN vs regular coffee table.

8. `FaqSection`
   - Shared FAQ styling.

## Component Design Rules

- Components should reduce inconsistency, not hide unclear thinking.
- Keep props semantic: `tone="purple"` is better than passing random classes everywhere.
- Do not make every component fully generic. STUNN is the product.
- Prefer composition over large configuration objects.
- Do not create a design system that feels like SaaS.

## Deprecated / Low-Priority Areas

Inherited commerce template components should not drive STUNN design:

- `components/grid/*`
- generic `components/product/gallery.tsx`
- generic `components/product/variant-selector.tsx`
- search/collection pages

These can stay for now, but future STUNN work should not copy their visual style.

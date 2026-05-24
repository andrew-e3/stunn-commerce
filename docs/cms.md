# STUNN Content Management (Sanity)

The marketing content layer is managed in **Sanity**, embedded in this Next.js
app and served at **`/admin`** (e.g. `https://stunn.co/admin`). Editors change
values in typed fields — they never touch code or layout.

Commerce (products, variants, pricing, selling plans, cart, checkout) stays in
**Shopify**. Sanity only owns marketing copy, images, page structure, and SEO.

## Architecture

| Piece | Location |
|---|---|
| Studio (admin UI) | `app/admin/[[...index]]/page.tsx` → `sanity.config.ts` |
| Schemas (content types) | `sanity/schemas/` |
| Singleton desk structure | `sanity/desk-structure.ts` |
| Read client + fetchers | `lib/sanity/` |
| Image URL helper | `lib/sanity/image.ts` |
| Publish webhook | `app/api/sanity/revalidate/route.ts` |
| Env config | `sanity/env.ts` |

### The fallback pattern (important)

Every fetcher returns `null` on any failure (CMS empty, unconfigured, or
unreachable), and every component falls back to hardcoded copy. **The site
never breaks if Sanity is empty or down.** Migrating a component to the CMS is
additive — it works before and after its content exists in Sanity.

```tsx
const settings = await getSiteSettings();
<AnnouncementBar messages={settings?.announcements} /> // empty → defaults
```

## Environment variables

In `.env.local` (and Vercel project settings):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=0qua5cu2
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<viewer token>
SANITY_REVALIDATE_SECRET=<shared secret for the publish webhook>
```

Shared secrets also live in `~/.openclaw/workspace/credentials/secrets.env`
(prefixed `STUNN_SANITY_*`) so every agent/session can read them.

## First-time setup (one-off)

1. **Add the env vars to Vercel** (Production + Preview) — same values as
   `.env.local`.
2. **Log into the Studio** at `/admin` with Google SSO (andrew@edition3.io).
3. **Create the singletons:** open *Site Settings* and *Homepage*, fill the
   fields, and **Publish**. Until then the site shows the hardcoded defaults.
4. **Set up the publish webhook** in [sanity.io/manage](https://sanity.io/manage)
   → API → Webhooks:
   - **URL:** `https://stunn.co/api/sanity/revalidate?secret=<SANITY_REVALIDATE_SECRET>`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** (leave blank for all types)
   - **Projection:** `{_type}`
   - On publish, the live site updates within seconds.

## Day-to-day editing

- Go to `/admin`, edit a field, **Publish**.
- Images: use the built-in asset library (drag-drop, auto-optimised on render).
- Nothing goes live until you click Publish.

## Building a landing page (Phase 2)

The landing page builder lets you ship campaign pages with no code.

1. In `/admin`, open **Landing Pages** → **Create new**.
2. Set an **internal title** and a **slug** (the URL becomes `/lp/<slug>`).
3. In **Page content**, add blocks and fill them in. Available blocks:
   Hero, Manifesto, Feature Grid, Personas, Call To Action, Email Capture
   (Quiet Club), Text, Image. Drag to reorder.
4. Set **SEO** and leave **"Hide from search engines"** ON for paid pages.
5. **Preview before publishing** (Draft Mode):
   `/api/draft/enable?secret=<SANITY_REVALIDATE_SECRET>&slug=<your-slug>`
   shows the unpublished draft on the live render. A yellow banner appears with
   an "exit preview" link.
6. **Publish.** The page is live at `/lp/<slug>` within seconds.

Note: a hardcoded route (e.g. the existing `/lp/founding-member`) takes
priority over a CMS page with the same slug — avoid reusing those slugs.

## What's content-managed today

- **Announcement bar** messages (rotating top bar) ✅ live
- **Header nav links** (with highlighted/button flag) ✅ live
- **Default SEO** (title, description, social image) ✅ live
- **Landing pages** — full block builder at `/lp/<slug>` ✅ live (Phase 2)
- **Testimonials, Customer Profiles, FAQ Items, Product Content** — editable in
  the Studio now; display components built (`components/content/`). Wiring into
  the PDP is deferred (see below).
- **Homepage hero** & **footer links** — schema ready; wiring deferred.

## Phase 3 content (editable now)

In `/admin` you can already create and publish:

- **Testimonials** — author, role, quote, rating, avatar, featured flag. Add
  real reviews here and retire any placeholder copy.
- **Customer Profiles** — the Jamie/Sam/Rachel personas (label, headline, body).
- **FAQ Items** — question, answer, section (General or Product).
- **Product Content** — a marketing overlay keyed by Shopify **handle**
  (e.g. `focus-without-caffeine`): subtitle override, extra block sections, and
  toggles to show testimonials / profiles on that product page.

Display components (`TestimonialGrid`, `PersonaGrid`, `FaqList`) and the
fetchers (`getTestimonials`, `getCustomerProfiles`, `getFaqItems`,
`getProductContent`) are ready — the PDP just needs them dropped in (deferred
below).

### Deferred (blocked only by uncommitted parallel work)

These are quick follow-ups once the relevant file is committed — the schemas,
fetchers, and components all exist:

- **Homepage hero** → `app/page.tsx` (uses `getHomepage()`)
- **PDP content** → `app/products/[handle]/page.tsx`: read `getProductContent(handle)`
  for the subtitle override + extra sections (via `BlockRenderer`), and drop in
  `TestimonialGrid` / `PersonaGrid` / `FaqList` guarded by the product's toggles
- **Footer links** → needs a richer grouped-footer schema (STORE / HELP /
  social columns) rather than the current flat `footerLinks` field

## Roadmap

- **Phase 2 — Landing page builder:** ✅ done. Block library + `landingPage`
  docs + `/lp/[slug]` renderer + Draft Mode preview.
- **Phase 3 — PDP content + testimonials + personas + FAQ:** ✅ schemas,
  fetchers, and display components done and editable in the Studio. Only the
  PDP read-wiring is deferred (see Deferred above).
- **Finish wiring:** homepage hero, PDP reads, and footer — see Deferred above.
  Nav + default SEO are ✅ done.

## Adding a new content type (for developers)

1. Add a schema in `sanity/schemas/` and register it in `sanity/schemas/index.ts`.
2. Add a GROQ query in `lib/sanity/queries.ts` and a fetcher in
   `lib/sanity/index.ts` (with a cache tag in `SANITY_TAGS`).
3. Map the new `_type` → tag in `app/api/sanity/revalidate/route.ts`.
4. Read it in a Server Component **with a hardcoded fallback**.

## Notes

- `.npmrc` sets `legacy-peer-deps=true` because the app runs a canary Next,
  which trips npm's strict peer-dependency check with a false positive.
- Sanity packages are pinned to the v3 line (`sanity@3`, `next-sanity@9`) for
  React 19.0.0 compatibility — do not bump to `sanity@5` without also bumping
  React to ≥19.2.

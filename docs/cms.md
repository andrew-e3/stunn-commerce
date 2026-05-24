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

## What's content-managed today (Phase 1)

- **Announcement bar** messages (rotating top bar)
- **Site Settings:** nav links, footer links, default SEO (title, description,
  social image) — *schema ready; wire into navbar/footer/metadata next*
- **Homepage hero** — *schema ready; wiring deferred (see below)*

### Deferred

- **Homepage hero wiring** into `app/page.tsx` is deferred because that file had
  uncommitted parallel work at build time. The `homepage` schema and
  `getHomepage()` fetcher exist — wiring is a small follow-up once `page.tsx` is
  committed.

## Roadmap

- **Phase 2 — Landing page builder:** block library + `landingPage` docs +
  `/lp/[slug]` renderer + Draft Mode preview. Ship campaign LPs with no code.
- **Phase 3 — PDP content + testimonials + personas + FAQ:** `productContent`
  overlay joined to Shopify by handle; testimonials/personas/FAQ as documents.

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

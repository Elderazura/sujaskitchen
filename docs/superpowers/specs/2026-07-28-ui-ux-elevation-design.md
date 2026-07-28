1# Suja's Kitchen — UI/UX Elevation Design

**Date:** 2026-07-28  
**Status:** Approved for planning  
**Inputs:** UI/UX Pro Max (restaurant / heritage editorial), existing brand tokens, brainstorm decisions

## Goal

Make Suja's Kitchen feel **premium and heritage-editorial** without abandoning the current product: time-of-day home, brand red, food photography, kitchen/catering/seasonal routes, and shadcn/ui.

Primary pain: the site does not feel premium / on-brand enough.  
Method: run a full UX audit, fix critical issues, elevate the design system, rewrite homepage composition, then cascade patterns.

## Decisions (locked)

| Decision | Choice |
|----------|--------|
| Scope mode | Full UX audit, then fix (ranked) |
| Primary pain | Premium / brand feel |
| Change depth | Elevate the system (structure-aware; not a from-scratch brand) |
| Personality | Heritage editorial — magazine storytelling, quiet luxury, craft and family history |
| Combined approaches | All three, sequenced as phases (below) |

## Phased program

### Phase 0 — Audit

Walk these surfaces and score each against the checklist:

- Home
- Navigation / Footer
- Kitchen
- Kitchen menu
- Catering
- Seasonal (template + key festivals)
- Snibbles
- Contact

**Checklist**

- Hierarchy: brand/story clear in first viewport
- Conversion: primary action obvious
- Contrast and focus: readable text, visible focus rings
- Mobile: no horizontal scroll, touch targets ≥44px, body text ≥16px
- Motion: `prefers-reduced-motion` respected; no scroll-jacking
- Consistency: type roles, spacing, CTA styles align with elevated system

Output: ranked punch list (High / Medium / Low) by brand and conversion impact.

### Phase 1 — Critical fixes

Ship **High** audit findings only (contrast, focus, broken or competing CTAs, overflow, reduced-motion gaps) before visual elevation so later work is not built on broken UX.

### Phase 2 — Elevate the design system

Heritage editorial tokens and patterns, applied sitewide starting with global chrome.

**Keep**

- Brand red `#c91432` (and existing hover/dark companions)
- Playfair Display for display / headings
- Time-of-day surfaces (day/night `pageBg` and overlays)
- shadcn/ui for interactive controls; Lucide for icons
- No emoji in UI

**Elevate**

- Body font: replace Inter with Karla (editorial sans paired with Playfair; UI/UX Pro Max restaurant recommendation)
- Type scale with explicit roles: eyebrow, display, section title, body, caption
- Spacing: 8pt rhythm; more air between major chapters; fewer cramped bands
- Surfaces: reduce card-on-card noise in story sections; cards only when they aid interaction (order, forms, reviews)
- CTA discipline: one primary action per viewport/section; secondary as text or outline
- Motion: keep intentional reveals; respect reduced motion; no new decorative glass/blur stacks

**Avoid**

- Flat generic white dashboard look
- Cream + terracotta as the entire identity
- Purple / glow / pill-cluster aesthetics
- Detached labels, floating badges, or stickers on hero media
- Liquid Glass / heavy translucent effects from generic design-system suggestions

### Phase 3 — Homepage composition rewrite

Keep the full-bleed time-of-day hero. Recompose below-the-fold as editorial chapters.

**Chapter order**

1. Hero — brand, one headline, one supporting line, one primary CTA (kitchen/order), one secondary CTA (catering). Story lives in chapter 3.
2. Signature / featured food — short, image-led proof (tighten FeaturedItems)
3. The kitchen since 1999 — heritage story (keep Suja ticker; quieter surrounding chrome)
4. How we make food — three truths as editorial columns (less card chrome)
5. Eat / gather — single dual path: daily kitchen vs catering (merge duplicate promo paths into this)
6. Social proof — Google reviews required; Instagram only if it does not fight hierarchy
7. Seasonal + Snibbles — one compact band each
8. Closing CTA — single clear next step

**Cut or merge**

- Duplicate catering and kitchen promo banners that restate the same dual path
- Competing mid-page CTAs that dilute the primary action
- Decorative dividers/bands that do not advance the story

**Preserve in spirit**

- Time-of-day context, steam/motion (with reduced-motion), existing food photography assets

### Phase 4 — Cascade

After homepage:

1. Navigation and footer
2. Kitchen and menu
3. Catering
4. Seasonal templates (chrome/patterns first; not a full content rewrite of every festival page)

## Architecture notes

- Prefer elevating shared tokens in `app/globals.css` / Tailwind theme and shared components (`CTAButton`, `Navigation`, `Footer`, motion helpers) over one-off page styling.
- Homepage remains client-composed via `HomeGate` → `HomePageClient` → `TimeHero` + `HomeBelowFold`; rewrite focuses on section order and visual treatment inside those modules, not a new routing model.
- Keep Next.js App Router, existing metadata patterns, and current image/video assets unless audit finds a specific broken asset.

## Testing / verification

- Visual pass: desktop and mobile (~375px)
- Reduced-motion enabled smoke check on home
- Keyboard focus visible on primary nav and CTAs
- High audit items cleared on key routes listed above
- No emoji in shipping UI

## Success criteria

- Homepage reads as heritage editorial, not a promo stack
- One clear primary CTA per major section
- Sitewide type, spacing, and CTA feel consistent
- High audit findings cleared on key routes
- Brand red and time-of-day behavior preserved

## Out of scope (this cycle)

- New order backend or payment flows
- New CMS
- New brand primary color
- Full rewrite of all seasonal page copy
- Trendy glassmorphism / Liquid Glass effects

## Implementation next step

After this spec is reviewed and accepted, create an implementation plan via the writing-plans skill, sequenced Phase 0 → 4 with reviewable checkpoints.

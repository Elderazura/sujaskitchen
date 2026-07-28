# UI/UX Elevation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate Suja's Kitchen to a heritage-editorial, premium brand feel via audit → critical fixes → design tokens → homepage rewrite → cascade.

**Architecture:** Keep App Router and `HomeGate` → `HomePageClient` → `TimeHero` + `HomeBelowFold`. Raise shared tokens in `app/globals.css` / `app/layout.tsx`, then recompose homepage chapters and cascade chrome patterns to nav, footer, kitchen, catering, and seasonal templates. No new backend or brand color.

**Tech Stack:** Next.js 16 App Router, React client components, Tailwind v4 (`@theme inline`), Framer Motion, shadcn/ui, Lucide, next/font (Playfair + Karla)

**Spec:** `docs/superpowers/specs/2026-07-28-ui-ux-elevation-design.md`

---

## File map

| File | Responsibility |
|------|----------------|
| `docs/superpowers/audits/2026-07-28-ux-audit.md` | Phase 0 ranked punch list |
| `scripts/verify-ui-elevation.mjs` | Lightweight regression checks (font, emoji, placeholders) |
| `app/layout.tsx` | Load Karla + Playfair; apply sans variable |
| `app/globals.css` | Brand tokens, type-role utilities, spacing helpers |
| `components/shared/CTAButton.tsx` | Primary / outline / secondary CTA variants |
| `components/shared/SectionEyebrow.tsx` | Shared editorial eyebrow label |
| `components/home/TimeHero.tsx` | Hero CTAs: primary kitchen/order, secondary catering |
| `components/home/HomeEatGather.tsx` | Single dual-path Eat / Gather chapter |
| `components/home/HomeBelowFold.tsx` | Chapter order; remove duplicate promos |
| `components/home/FeaturedItems.tsx` | Tighter signature food section |
| `components/Navigation.tsx` | Quieter heritage chrome; focus + overflow |
| `components/Footer.tsx` | Match elevated type/spacing |
| `components/seasonal/SeasonalPageTemplate.tsx` | Cascade tokens/chrome |
| `components/seasonal/SeasonalExperience.tsx` | Cascade tokens/chrome |
| `app/kitchen/page.tsx`, `app/kitchen/menu/page.tsx`, `app/catering/page.tsx` | Cascade patterns |

---

### Task 1: Phase 0 — Write UX audit punch list

**Files:**
- Create: `docs/superpowers/audits/2026-07-28-ux-audit.md`

- [ ] **Step 1: Start local app if not running**

```bash
cd /Users/azura/sujas-kitchen && npm run dev
```

Expected: Next.js ready at `http://localhost:3000`

- [ ] **Step 2: Walk routes and score checklist**

Open and score each route against hierarchy, conversion, contrast/focus, mobile (~375), motion, consistency:

- `/`
- Nav + footer (any page)
- `/kitchen`, `/kitchen/menu`
- `/catering`
- `/seasonal` (+ one festival page)
- `/snibbles`
- `/contact`

- [ ] **Step 3: Write ranked punch list**

Create `docs/superpowers/audits/2026-07-28-ux-audit.md` with this structure (fill real findings; include these known seeds if still true):

```markdown
# UX Audit — 2026-07-28

## High
- [ ] Placeholder phone in `lib/constants.ts` / Navigation (`+971 50 123 4567`) undermines trust — replace with real number or remove tel CTAs until confirmed
- [ ] Homepage stacks duplicate kitchen/catering promos (`HomePromoBanner` x2 + dual cards + `HomeOrderStrip`) — dilutes conversion
- [ ] Hero lacks dedicated secondary catering CTA (spec: primary kitchen/order, secondary catering)
- [ ] (Add any High contrast / overflow / focus issues found)

## Medium
- [ ] Body font Inter reads SaaS, not heritage editorial — swap to Karla
- [ ] Desktop nav has 9 text links — crowded; consider overflow/more pattern
- [ ] Story sections over-use Card chrome
- [ ] (Add Medium findings)

## Low
- [ ] Decorative `HomeDivider` frequency
- [ ] (Add Low findings)
```

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/audits/2026-07-28-ux-audit.md
git commit -m "$(cat <<'EOF'
docs: add UX audit punch list for elevation work

EOF
)"
```

---

### Task 2: Add UI elevation verification script

**Files:**
- Create: `scripts/verify-ui-elevation.mjs`

Repo has no Jest/Vitest suite. Use a small Node script as the automated acceptance gate for elevation invariants.

- [ ] **Step 1: Write the script (initial failing expectations OK until later tasks land)**

```javascript
#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const fail = [];

const layout = read("app/layout.tsx");
if (!layout.includes("Karla") || layout.includes("Inter")) {
  fail.push("app/layout.tsx must use Karla (not Inter) for body font");
}

const globals = read("app/globals.css");
if (!globals.includes("--font-karla") && !globals.includes("font-karla")) {
  fail.push("app/globals.css must wire Karla into --font-sans");
}
if (!globals.includes(".text-eyebrow") || !globals.includes(".text-display")) {
  fail.push("app/globals.css must define .text-eyebrow and .text-display type roles");
}

const walk = (dir, out = []) => {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "node_modules" || ent.name === ".next" || ent.name === "ui") continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (/\.(tsx|ts|jsx|js|mdx)$/.test(ent.name)) out.push(p);
  }
  return out;
};

const emojiRe = /[\u{1F300}-\u{1FAFF}]/u;
for (const file of walk(path.join(root, "components")).concat(walk(path.join(root, "app")))) {
  const text = fs.readFileSync(file, "utf8");
  if (emojiRe.test(text)) fail.push(`Emoji found in ${path.relative(root, file)}`);
}

const below = read("components/home/HomeBelowFold.tsx");
const promoCount = (below.match(/HomePromoBanner/g) || []).length;
if (promoCount > 0) {
  fail.push("HomeBelowFold must not render HomePromoBanner (merged into Eat/Gather)");
}
if (!below.includes("HomeEatGather")) {
  fail.push("HomeBelowFold must include HomeEatGather chapter");
}

if (fail.length) {
  console.error("UI elevation checks failed:\n" + fail.map((f) => ` - ${f}`).join("\n"));
  process.exit(1);
}
console.log("UI elevation checks passed");
```

- [ ] **Step 2: Run script — expect FAIL**

```bash
node scripts/verify-ui-elevation.mjs
```

Expected: exit 1 with messages about Karla, type roles, HomeEatGather, etc.

- [ ] **Step 3: Commit script**

```bash
git add scripts/verify-ui-elevation.mjs
git commit -m "$(cat <<'EOF'
chore: add UI elevation verification script

EOF
)"
```

---

### Task 3: Phase 1 — Critical High fixes (pre-elevation)

**Files:**
- Modify: `lib/constants.ts` (only if real phone known; otherwise remove/hide tel CTAs)
- Modify: `components/Navigation.tsx`
- Modify: `components/home/TimeHero.tsx` (CTA wiring can wait until Task 6 if bundled — prefer fixing focus/contrast Highs here)
- Modify: any High items from the audit file

- [ ] **Step 1: Resolve placeholder phone High**

If a real UAE number is available from the business, update:

```ts
// lib/constants.ts
phoneDisplay: "+971 XX XXX XXXX", // real
phoneTel: "+971XXXXXXXXX",
```

and WhatsApp URL to match.

If **not** available: remove or gate the desktop/mobile `tel:` buttons in `Navigation.tsx` so the site does not advertise a fake number. Keep email/address. Mark the audit High item done with note "hidden until real number".

- [ ] **Step 2: Fix remaining High audit items**

For each unchecked High in `docs/superpowers/audits/2026-07-28-ux-audit.md` that is not deferred to homepage rewrite (duplicate promos → Task 7), implement the minimal fix (contrast classes, `focus-visible:ring`, overflow-x, `useReducedMotion` already present — extend if audit found gaps).

- [ ] **Step 3: Manual verify High items**

```bash
npm run lint
```

Expected: no new errors. Spot-check routes in browser for each High fix.

- [ ] **Step 4: Check off Highs in audit file and commit**

```bash
git add docs/superpowers/audits/2026-07-28-ux-audit.md lib/constants.ts components/Navigation.tsx
# plus any other touched files
git commit -m "$(cat <<'EOF'
fix: clear High UX audit findings before elevation

EOF
)"
```

---

### Task 4: Phase 2 — Swap Inter → Karla

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css` (`--font-sans`)

- [ ] **Step 1: Update layout fonts**

Replace Inter with Karla in `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Karla, Playfair_Display } from "next/font/google";
import "./globals.css";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// metadata unchanged…

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${karla.variable} ${playfair.variable} ${karla.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Point Tailwind sans at Karla**

In `app/globals.css` `@theme inline`:

```css
--font-sans: var(--font-karla), ui-sans-serif, system-ui, sans-serif;
```

Remove any `--font-inter` references.

- [ ] **Step 3: Verify visually + lint**

```bash
npm run lint
```

Open `/` — body text should render Karla; headings still Playfair (`font-serif`).

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "$(cat <<'EOF'
feat: switch body font from Inter to Karla

EOF
)"
```

---

### Task 5: Phase 2 — Type roles and CTA variants

**Files:**
- Modify: `app/globals.css`
- Create: `components/shared/SectionEyebrow.tsx`
- Modify: `components/shared/CTAButton.tsx`

- [ ] **Step 1: Add type-role utilities to globals**

Append inside `@layer base` or after `@theme inline`:

```css
@layer utilities {
  .text-eyebrow {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }
  .text-display {
    font-family: var(--font-serif);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }
  .text-section {
    font-family: var(--font-serif);
    font-weight: 700;
    line-height: 1.2;
  }
  .text-body-editorial {
    font-family: var(--font-sans);
    font-size: 1rem;
    line-height: 1.65;
  }
  .text-caption {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    line-height: 1.5;
  }
  .section-y {
    padding-block: 4.5rem;
  }
  @media (min-width: 768px) {
    .section-y {
      padding-block: 6rem;
    }
  }
}
```

- [ ] **Step 2: Create SectionEyebrow**

```tsx
// components/shared/SectionEyebrow.tsx
import { cn } from "@/lib/utils";

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("text-eyebrow", className)}>{children}</p>;
}
```

- [ ] **Step 3: Extend CTAButton outline styling for heritage secondary**

Ensure `variant="outline"` works on dark and light surfaces without fighting shadcn defaults:

```tsx
const classes = cn(
  "min-h-11 cursor-pointer rounded-lg px-8 font-sans text-base transition-colors duration-200",
  variant === "default" &&
    "bg-brand text-brand-light shadow-md hover:bg-brand-hover",
  variant === "outline" &&
    "border border-current bg-transparent shadow-none",
  variant === "secondary" && "bg-secondary text-secondary-foreground",
  className,
);
```

- [ ] **Step 4: Run verify script — still FAIL on homepage chapters; Karla/type roles should pass**

```bash
node scripts/verify-ui-elevation.mjs
```

Expected: Karla / type-role errors gone; HomeEatGather / HomePromoBanner errors remain.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css components/shared/SectionEyebrow.tsx components/shared/CTAButton.tsx
git commit -m "$(cat <<'EOF'
feat: add editorial type roles and CTA variants

EOF
)"
```

---

### Task 6: Phase 3 — Hero CTA discipline

**Files:**
- Modify: `components/home/TimeHero.tsx`
- Possibly: `lib/timeState.ts` (if `config.ctaHref` must stay WhatsApp as primary — prefer primary → `/kitchen` or `/kitchen/menu`, keep WhatsApp in FeaturedItems/order strip)

Spec: primary = kitchen/order, secondary = catering. Story is not a hero CTA.

- [ ] **Step 1: Set hero CTAs**

In `TimeHero.tsx` CTA row, replace single time-config CTA with:

```tsx
<div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap">
  <CTAButton href="/kitchen/menu">Order from the kitchen</CTAButton>
  <CTAButton
    href="/catering"
    variant="outline"
    className="border-brand-light/80 bg-brand-dark/35 text-brand-light shadow-none hover:bg-brand-dark/55 hover:text-brand-light"
  >
    Plan catering
  </CTAButton>
</div>
```

Keep closed-state menu browse if needed, but do not add a third competing primary. Keep Snibbles card only for `chaya` (secondary discovery, not a CTA pill cluster).

- [ ] **Step 2: Visual check all time states**

Toggle or wait through breakfast/lunch/chaya/dinner/closed if possible; confirm one primary + one secondary, readable on photo.

- [ ] **Step 3: Commit**

```bash
git add components/home/TimeHero.tsx
git commit -m "$(cat <<'EOF'
feat: set hero primary kitchen and secondary catering CTAs

EOF
)"
```

---

### Task 7: Phase 3 — HomeEatGather + reorder HomeBelowFold

**Files:**
- Create: `components/home/HomeEatGather.tsx`
- Modify: `components/home/HomeBelowFold.tsx`

- [ ] **Step 1: Create Eat / Gather dual-path chapter**

```tsx
// components/home/HomeEatGather.tsx
"use client";

import Link from "next/link";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import CTAButton from "@/components/shared/CTAButton";
import { useTimeOfDay } from "@/components/home/time-of-day-context";
import { cn } from "@/lib/utils";

export default function HomeEatGather() {
  const { isNight } = useTimeOfDay();
  const heading = isNight ? "text-brand-light" : "text-brand-dark";
  const body = isNight ? "text-brand-light/85" : "text-brand-dark/90";
  const muted = isNight ? "text-brand-light/60" : "text-brand-mid";

  return (
    <section className="section-y px-6 md:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionEyebrow className={isNight ? "text-brand-gold" : "text-brand"}>
          Eat or gather
        </SectionEyebrow>
        <h2 className={cn("text-section mt-3 text-3xl md:text-4xl", heading)}>
          Daily Kerala meals, or a feast for hundreds.
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className={cn("font-serif text-2xl", heading)}>The kitchen</h3>
            <p className={cn("text-body-editorial mt-3", body)}>
              Cloud kitchen in Al Quoz. Breakfast through dinner, meal boxes, and
              festival specials — delivered across Dubai and Abu Dhabi.
            </p>
            <CTAButton href="/kitchen/menu" className="mt-6 w-fit">
              See today&apos;s menu
            </CTAButton>
            <Link
              href="/kitchen"
              className={cn("mt-3 block text-caption underline-offset-4 hover:underline", muted)}
            >
              Visit the kitchen
            </Link>
          </div>
          <div>
            <h3 className={cn("font-serif text-2xl", heading)}>Catering</h3>
            <p className={cn("text-body-editorial mt-3", body)}>
              Weddings, corporate spreads, Onam, and community events. Portions and
              service for up to two thousand guests.
            </p>
            <CTAButton href="/catering" className="mt-6 w-fit">
              Plan an event
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
```

No Card wrappers — editorial columns only.

- [ ] **Step 2: Reorder HomeBelowFold to match chapter map**

Target render order inside the page background wrapper:

1. `FeaturedItems`
2. Kitchen since 1999 block (parallax + ticker) — keep
3. How we make food — keep, quieter (Task 8 may refine)
4. `HomeEatGather` (new)
5. `HomeGoogleReviews`
6. `HomeInstagramFeed` — keep only if audit says it does not fight hierarchy; otherwise move below Snibbles or drop from home
7. `SeasonalHeartbeat`
8. `SnibblesBand` or `HomeSnibblesPreview` — pick **one** compact band, not both full sections
9. `ClosingCtaBand`

**Remove from HomeBelowFold:** all `HomePromoBanner` usages, `HomeOrderStrip`, the late dual `Card` kitchen/catering grid, and preferably `HomeExploreStrip` if it competes with Eat/Gather (move useful links into nav/footer only).

Remove unused imports after edits.

- [ ] **Step 3: Run verify script — expect PASS**

```bash
node scripts/verify-ui-elevation.mjs
```

Expected: `UI elevation checks passed`

- [ ] **Step 4: Visual pass homepage**

Desktop + ~375px: chapter rhythm, one primary CTA per section, no duplicate kitchen/catering banners.

- [ ] **Step 5: Commit**

```bash
git add components/home/HomeEatGather.tsx components/home/HomeBelowFold.tsx
git commit -m "$(cat <<'EOF'
feat: recompose homepage into heritage editorial chapters

EOF
)"
```

---

### Task 8: Phase 3 — Tighten FeaturedItems + How we make

**Files:**
- Modify: `components/home/FeaturedItems.tsx`
- Modify: `components/home/HomeBelowFold.tsx` (How we make block)

- [ ] **Step 1: FeaturedItems**

- Use `SectionEyebrow` + `text-section` for headers
- Prefer image-led row with less Card chrome where possible (keep Card only if needed for tap targets)
- Single CTA to menu / WhatsApp — not multiple competing buttons
- Keep closed-state messaging

- [ ] **Step 2: How we make food**

- Replace Card borders/shadows with simple editorial columns (`border-0 bg-transparent` or plain `div`s)
- Keep Lucide icons; ensure color contrast on day and night
- Use `section-y` spacing

- [ ] **Step 3: Verify**

```bash
node scripts/verify-ui-elevation.mjs
npm run lint
```

Expected: both pass / clean.

- [ ] **Step 4: Commit**

```bash
git add components/home/FeaturedItems.tsx components/home/HomeBelowFold.tsx
git commit -m "$(cat <<'EOF'
feat: quiet FeaturedItems and How we make editorial treatment

EOF
)"
```

---

### Task 9: Phase 4 — Elevate Navigation + Footer

**Files:**
- Modify: `components/Navigation.tsx`
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Navigation heritage chrome**

- Keep sticky logo + brand red primary action
- Soften white bar: less heavy `shadow-lg`; thinner border; `backdrop-blur` OK if contrast holds
- Desktop: ensure `focus-visible:ring-2 focus-visible:ring-brand` on links/buttons
- If still 9 links: group secondary (Blog, Our Story, Contact) into a shadcn `DropdownMenu` labeled "More" so primary destinations stay Kitchen, Menu, Catering, Snibbles, Seasonal
- Mobile sheet: 44px min tap targets (already partly enforced globally)

- [ ] **Step 2: Footer**

- Use `text-section` / `text-body-editorial` / `text-caption`
- Consistent link hover (`hover:text-brand-light`)
- Do not invent new columns; polish spacing (`py-14` → align with `section-y` rhythm if it helps)

- [ ] **Step 3: Verify keyboard focus on nav**

Tab through desktop nav — visible rings; mobile menu operable.

- [ ] **Step 4: Commit**

```bash
git add components/Navigation.tsx components/Footer.tsx
git commit -m "$(cat <<'EOF'
feat: elevate navigation and footer chrome

EOF
)"
```

---

### Task 10: Phase 4 — Cascade kitchen, menu, catering

**Files:**
- Modify: `app/kitchen/page.tsx`
- Modify: `app/kitchen/menu/page.tsx`
- Modify: `app/catering/page.tsx`

- [ ] **Step 1: Apply shared patterns**

On each page:

- Headings → `font-serif` / `text-section` / `text-display` as appropriate
- Body → `text-body-editorial` or `font-sans` with relaxed leading
- Primary buttons → `bg-brand hover:bg-brand-hover` via `CTAButton` or existing Button
- Reduce redundant gradient CTA bands if two stacked CTAs say the same thing
- Preserve existing content and forms

- [ ] **Step 2: Lint + spot-check**

```bash
npm run lint
```

Open `/kitchen`, `/kitchen/menu`, `/catering` at desktop and 375px.

- [ ] **Step 3: Commit**

```bash
git add app/kitchen/page.tsx app/kitchen/menu/page.tsx app/catering/page.tsx
git commit -m "$(cat <<'EOF'
feat: cascade editorial type and CTA patterns to kitchen and catering

EOF
)"
```

---

### Task 11: Phase 4 — Cascade seasonal templates

**Files:**
- Modify: `components/seasonal/SeasonalPageTemplate.tsx`
- Modify: `components/seasonal/SeasonalExperience.tsx`

- [ ] **Step 1: Template chrome only**

- Align hero title to `text-display` / `font-serif`
- Body copy to editorial sans
- Primary Button → brand tokens
- Do **not** rewrite festival-specific copy blocks

Note: pages use `#FFFBF0` cream — do not expand cream into a sitewide identity; keep as seasonal surface only (per spec avoid cream+terracotta as whole brand).

- [ ] **Step 2: Verify one active and one notify/order seasonal route**

```bash
npm run lint
node scripts/verify-ui-elevation.mjs
```

- [ ] **Step 3: Commit**

```bash
git add components/seasonal/SeasonalPageTemplate.tsx components/seasonal/SeasonalExperience.tsx
git commit -m "$(cat <<'EOF'
feat: cascade editorial chrome to seasonal templates

EOF
)"
```

---

### Task 12: Final verification + audit closeout

**Files:**
- Modify: `docs/superpowers/audits/2026-07-28-ux-audit.md` (check off resolved items)

- [ ] **Step 1: Run automated gates**

```bash
node scripts/verify-ui-elevation.mjs
npm run lint
npm run build
```

Expected: verify pass; lint clean; build succeeds.

- [ ] **Step 2: Manual success criteria checklist**

- [ ] Homepage reads as heritage editorial, not promo stack
- [ ] One clear primary CTA per major section
- [ ] Karla + Playfair consistent sitewide
- [ ] Brand red `#c91432` and time-of-day behavior preserved
- [ ] Reduced-motion: steam/reveals disabled or static
- [ ] No emoji in UI
- [ ] High audit items cleared or explicitly deferred with reason

- [ ] **Step 3: Update audit file statuses and commit**

```bash
git add docs/superpowers/audits/2026-07-28-ux-audit.md
git commit -m "$(cat <<'EOF'
docs: close out UX audit items after elevation

EOF
)"
```

---

## Spec coverage (self-review)

| Spec requirement | Task(s) |
|------------------|---------|
| Phase 0 audit | Task 1 |
| Phase 1 High fixes | Task 3 |
| Karla body font | Task 4 |
| Type scale / roles | Task 5 |
| CTA discipline | Tasks 5–6 |
| Homepage chapter order | Task 7 |
| Cut duplicate promos | Task 7 |
| Featured / How we make quieter | Task 8 |
| Nav / Footer cascade | Task 9 |
| Kitchen / catering cascade | Task 10 |
| Seasonal template cascade | Task 11 |
| Verification / success criteria | Tasks 2, 12 |
| No Liquid Glass / new brand color / backend | Out of scope — not tasked |

## Placeholder / consistency scan

- No TBD steps; phone High explicitly branches on real number availability
- `HomeEatGather` name consistent across Tasks 2, 7, verify script
- Karla CSS variable `--font-karla` consistent in layout + globals + verify script

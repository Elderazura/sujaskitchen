# Scroll animation patterns (reference)

Source: [10 Scroll Animations to Make Your Website Stand Out — Framer University](https://framer.university/blog/10-scroll-animations-to-make-your-website-stand-out)

Use this when implementing scroll-driven motion in the app (e.g. Framer Motion `useScroll` / `useTransform`, CSS `animation-timeline`, or similar). The article is Framer-centric; the **ideas** map directly to scroll-linked transforms, sticky sections, and progressive reveals in React/Next.js.

---

## Core Framer concepts (vocabulary)

| Concept | Role |
|--------|------|
| **Scroll sections / trigger frames** | Invisible regions that define when an animation starts, progresses, or completes as the user scrolls. |
| **Scroll transforms** | Properties (position, scale, rotation, opacity, 3D) driven by scroll progress. |
| **Scroll variants** | Swap component variants based on which scroll section is active. |
| **Sticky positioning** | Element stays fixed in the viewport while surrounding content scrolls; pairs with transforms or variant changes inside the sticky area. |

---

## The ten patterns

### 1. Fey-style scroll (3D + section triggers)

- **Effect:** Strong scroll-driven motion, including **3D manipulation of images** and seamless transitions.
- **Technique:** Scroll transforms + **hidden trigger frames** (scroll sections) to time the effect.
- **Resource:** [Fey website in Framer](https://framer.university/resources/fey-website-in-framer)

### 2. Text reveal

- **Effect:** Storytelling: different parts of text **highlight or change** as you scroll.
- **Technique:** Component **variants**; **sticky** block stays on screen; scroll sections trigger **variant swaps**.
- **Resources:** [Text reveal effect](https://framer.university/resources/text-reveal-effect), [lesson](https://framer.university/lessons/text-reveal)

### 3. Zoom scroll

- **Effect:** Dramatic **zoom** tied to scroll (inspired by portfolio-style sites).
- **Technique:** Combines **scroll transforms**, **scroll sections**, and **scroll variants**.
- **Resource:** [Zoom scroll effect](https://framer.university/resources/zoom-scroll-effect)

### 4. Scroll media (image / video scrub)

- **Effect:** Long scroll “scrubs” through **images or video** over a configurable **length** (scroll distance).
- **Technique:** Dedicated component with duration/length control from the properties panel.
- **Resources:** [Scroll media component](https://framer.university/resources/scroll-media-component-in-framer), [lesson](https://framer.university/lessons/scroll-media)

### 5. Tedy-style (sticky stage + inner motion)

- **Effect:** **Sticky** frame stays centered; **objects inside** animate for a fluid, immersive scroll.
- **Technique:** Sticky + scroll transforms + scroll sections.
- **Resources:** [Tedy website scroll animation](https://framer.university/resources/tedy-website-scroll-animation-in-framer), [tutorial](https://framer.university/lessons/tedy-scroll-animation)

### 6. Ticker driven by scroll (not autoplay)

- **Effect:** Like a ticker, but **motion follows scroll** instead of looping autoplay—feels responsive.
- **Technique:** Scroll-linked offset instead of time-based loop.
- **Resource:** [Ticker scroll component](https://framer.university/resources/ticker-scroll-component-for-framer)

### 7. Scroll rotation (e.g. logos)

- **Effect:** Containers (e.g. logo rows) **rotate** as scroll progresses; often starts from opacity/scale at full visibility then adds rotation toward an end state.
- **Technique:** Scroll transform on **rotation** (plus opacity/scale as needed).
- **Resource:** [Scroll rotation animation](https://framer.university/resources/scroll-rotation-animation-in-framer)

### 8. Spiral 3D scroll

- **Effect:** **3D space** with perspective; multiple “arms” / cards in a **spiral**, each with its own rotation; optional **hover** variants on cards.
- **Technique:** 3D transforms + perspective; **sticky** wrapper for the spiral; scroll drives the motion.
- **Resource:** [Spiral 3D scroll animation](https://framer.university/resources/spiral-3d-scroll-animation)

### 9. Horizontal scroll (vertical scroll drives horizontal offset)

- **Effect:** Section stays in view (**sticky**) while content moves **horizontally** (galleries, comparisons).
- **Technique:** Sticky + scroll transform on **x** (horizontal offset) while user scrolls vertically.
- **Resource:** [Horizontal scrolling effect](https://framer.university/resources/horizontal-scrolling-effect)

### 10. Parallax layers (mountain / depth)

- **Effect:** **Layered** imagery moves at **different speeds** (foreground fastest, background slowest) for depth.
- **Technique:** Split art into layers; independent scroll speeds or scroll-range transforms per layer.
- **Resource:** [Mountain parallax effect](https://framer.university/resources/mountain-parallax-effect)

---

## Quick picker (when to use which)

| Goal | Pattern |
|------|---------|
| Hero or product “punch” | Zoom scroll, Fey-style 3D |
| Narrative copy | Text reveal |
| Scrub video or step-through frames | Scroll media |
| One focal “stage” with moving pieces | Tedy-style sticky stage |
| Marquee that respects the user | Scroll-driven ticker |
| Playful brands / logos | Scroll rotation |
| Showcase many items in 3D | Spiral 3D |
| Gallery or timeline sideways | Horizontal scroll |
| Atmosphere and depth | Parallax layers |

---

_Last updated from the Framer University blog post (March 2026 snapshot)._

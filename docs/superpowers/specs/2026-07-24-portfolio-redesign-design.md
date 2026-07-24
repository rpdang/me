# Portfolio Redesign: "The Thread" — Design Spec

**Date:** 2026-07-24
**Status:** Approved design, pending implementation plan
**Site:** robindang.com (Next.js 16 App Router, React 19, Tailwind v4, motion v12)

## 1. Goal

Rebuild the portfolio from a 7-section template stack into a cinematic, scroll-driven
narrative. Primary audience: mixed/personal brand (anyone landing on it walks away
with a memorable, credible impression). Register: cinematic and immersive — the site
itself demonstrates engineering and design taste. Full information-architecture rebuild
approved (not a section-by-section facelift).

## 2. Concept: The Thread

One continuous terracotta line draws itself through the entire page as the visitor
scrolls, passing through every chapter of Robin's story and finally resolving into
Loonar. The device is the thesis made visual: **one unbroken thread, end-to-end.**

- Desktop: the thread weaves left–right across the content column; content sits
  asymmetrically opposite it (the weaving provides layout variance).
- Mobile: simplifies to a straight left rail with the same milestone dots.
- Built as one SVG path segment per chapter boundary, each scrubbed by its own
  `useScroll` target, smoothed with `useSpring({ skipInitialAnimation: true })` so it
  slightly "chases" the scroll.
- Reduced motion / JS off: thread renders fully drawn and static; story reads completely.

## 3. Information architecture (chapters)

The 7 sections (Home, Experience, Projects, Skills, About, Education, Contact) are
replaced by a prologue, six chapters, and an epilogue. Skills and Education stop
existing as sections: technologies appear in context inside chapters; KTH becomes
part of the story.

| # | Chapter | Content | Act (background) |
|---|---------|---------|------------------|
| — | **Prologue** | Thesis line, name, "Co-Founder & CTO, Loonar", credential line (Loonar · Uber · Booking.com · Legora YC W24) set editorially | Cream |
| 1 | **Two Cultures** | Origin: parents left Vietnam after the war, rebuilt in Sweden without finishing high school; Robin born in Sweden between two cultures; second-generation arc. Short, dignified. | Cream |
| 2 | **The Craft** | KTH BSc + MSc; both theses as proof links (DLT/CSDs at Nasdaq; ML breast-cancer classification); Nasdaq student-worker years | Cream → deepening |
| 3 | **Scale** | Booking.com: led a small team building the greenfield internal tool that replaced Excel for every account manager in the company. Uber: production engineering (SRE + engineering), pinned quote: working to eliminate the hardest incident categories, forever. | Slate-charcoal (dark act) |
| 4 | **Zero to One** | Legora (YC W24): founding engineer, v0. Lokasa: built solo, end-to-end, 20k listings, OpenStreetMap; told honestly as a sunset project. Poodl (AI GEO tracking) alongside. Explains why Loonar was possible. | Slate-charcoal |
| 5 | **The Company** | Loonar: pattern spotted in AI consulting (different clients, same RFQ problem) → productized. Pre-seed/bootstrapped, 20 pilots, 3 co-founders (Robin sole technical), team of 4 additional engineers. Shipped: RFQ analysis, deviation analysis, offer check, product matching, RAG, content library. Full-bleed product screenshots. Thread thickens and resolves into Loonar. | Returns to cream ("daylight") |
| 6 | **Offline** | Tennis, gym, running; cooking Vietnamese and Swedish/Italian. One screen, warm and casual. | Cream |
| — | **Epilogue** | Invitation. LinkedIn + GitHub only. No email, no cal.com. Thread ends in a final dot. | Cream |

**Navigation:** the macOS dock is removed. Desktop: a thin chapter rail on the right
edge mirrors thread progress (dots per chapter, click to jump, name on hover),
reusing `ActiveSectionContext` + `useSectionInView`. Mobile: no persistent nav; the
thread rail is the orientation device.

## 4. Canonical content facts (from interview, 2026-07-24)

These override anything currently in `lib/data.ts`. Narrative prose will be drafted
from these and fact-checked by Robin at review.

- **Thesis/motto:** value creation for end users; solve the problem end-to-end; make it easy.
- **Loonar origin:** the same problem kept surfacing across AI-consulting clients
  (RFQ analysis in engineering procurement); Robin spotted the pattern and productized it.
- **Loonar today:** pre-seed/bootstrapped; 20 pilots; 3 co-founders, Robin sole
  technical (CTO); team now includes 4 additional engineers; shipped capabilities:
  RFQ analysis, deviation analysis, offer check, product matching, RAG, content library.
- **Uber:** production engineering (mix of SRE and engineering); roadmap is solving
  Uber's hardest, most critical incidents and eliminating incident categories forever.
- **Booking.com:** led a small team; greenfield internal tool replacing Excel for how
  account managers manage hotel partners; affected all AMs in the company.
- **Legora (Leya AI, YC W24):** founding engineer; proud of v0.
- **Lokasa:** built solo, end-to-end; ~20k listings; used OpenStreetMap; project is
  sunset. **Correction: remove the "Sweden's largest commercial real-estate
  marketplace" claim currently on the site.**
- **Origin:** Swedish-Vietnamese; parents moved to Sweden after the war and never
  finished high school; Robin born in Sweden; KTH BSc + MSc in CS; approved for
  tasteful use on the site.
- **Person:** tennis, gym, running; cooks Vietnamese and Swedish/Italian; casual.
- **Contact:** LinkedIn (`linkedin.com/in/robin-dang`) and GitHub (`github.com/rpdang`)
  only. Email and cal.com removed site-wide.

## 5. Visual identity

**Typography** (all free, self-hosted via `next/font`; fixes the current bug where
Poppins/Lora are declared but never loaded):

- Display: **Cabinet Grotesk** — chapter titles at `clamp(3rem, 8vw, 7rem)`,
  tight tracking; italic/bold emphasis stays in-family (no mixed-family emphasis).
- Body: **General Sans** — prose at comfortable measure (`max-w-[65ch]`).
- Mono: retained only as an annotation voice: chapter numbers, dates, coordinates
  (e.g. Hanoi → Stockholm), thread labels. Chapter number+name headings are the only
  eyebrow-style labels on the page.

**Color:**

- Single accent: **terracotta `#b85a32`** (thread, milestone dots, emphasis, links).
  Gold and burgundy accents are dropped; all purple/pink/blue leaks are purged
  (skills gradients, RainbowButton, ScrollProgress defaults, Contact ShineBorder).
- Acts: cream (light) → **cool slate-charcoal** (dark acts; deliberately cool, not
  warm espresso, so the warm accent contrasts) → back to cream. Implemented as one
  `fixed inset-0 -z-10` layer whose color a scroll-driven CSS variable controls.
- This light→dark→light arc is the page's single deliberate "theme switch on scroll"
  composition. **No manual theme toggle**; the site honors `prefers-color-scheme`
  only in how bright the cream acts render. ThemeSwitch and theme context are removed
  (also removes the FOUC bug and the broken border-beam toggle).
- Subtle paper grain on cream acts (CSS only, on a fixed `pointer-events-none` layer).

**Copy rules (hard):** no em-dashes or en-dashes anywhere in visible copy (hyphens
only); no scroll cues; no decorative status dots; no filler subtitles; quotes ≤ 3
lines; no fake-precise numbers (all metrics from §4 only).

## 6. Motion system

**Stack:** `motion` v12 only (`motion/react` imports; `framer-motion` and
`react-vertical-timeline-component` removed from package.json). No GSAP.
`<MotionConfig reducedMotion="user">` wraps the app; every scrubbed MotionValue is
additionally gated with `useReducedMotion()` (MotionConfig does not cover raw
MotionValue pipelines).

**Two speed registers, strictly separated:**

- Narrative reveals (chapter titles, masked line reveals, clip-path image wipes):
  600–900ms, strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)`, staggers 30–80ms.
- UI interactions (links, buttons, chapter rail): ≤ 200ms, `scale(0.97)` on
  `:active`, nothing enters from `scale(0)`, hover effects gated behind
  `@media (hover: hover) and (pointer: fine)`.

**Pinning is rationed to exactly two moments** (position: sticky + tall wrapper +
`useScroll` on the wrapper; no JS pinning):

1. Ch. 3: the Uber quote pins full-screen; words brighten in sequence with scroll.
2. Ch. 5: the Loonar arrival sequence; thread thickens and resolves; background
   returns to cream.

**Per-chapter choreography** (each justified in one sentence):

- Prologue: masked line-by-line thesis reveal on load (mount-triggered, not
  scroll-linked); thread dot fades in last. Establishes the register immediately.
- Ch. 1: quiet paragraph fades; one full-bleed mono coordinates moment
  (Hanoi → Stockholm). Restraint here makes later chapters land.
- Ch. 2: thread pauses at milestone dots; each stop's content fades up as its dot
  fills. Reveal order mirrors chronology.
- Ch. 3: pinned quote (above); Booking story as standard reveals + one count-up stat.
- Ch. 4: background morphs toward slate; Lokasa card slightly desaturated (the visual
  admits the sunset so copy doesn't overexplain).
- Ch. 5: pinned arrival; screenshots reveal with clip-path wipes; six capabilities as
  a staggered typographic list (no card grid).
- Ch. 6 + Epilogue: almost no motion; two large quiet links; final thread dot.

**Performance rules:** animate only transform/opacity/clip-path (background-color
allowed on the single act layer); no per-frame `setState` (MotionValues bound to
style only); no blanket `will-change`; one `useScroll` per chapter target; no
`window.addEventListener('scroll')` anywhere.

## 7. Content model (`lib/data.ts` rewrite)

One typed `chapters` array drives the page. Each chapter:

```ts
{
  id: string            // anchor id
  number: number | null // null for prologue/epilogue
  title: string
  act: 'cream' | 'slate'
  narrative: string[]   // prose paragraphs
  // per-chapter typed payloads:
  milestones?: Milestone[]   // Ch.2: KTH degrees, theses (with links), Nasdaq
  roles?: Role[]             // Ch.3: Booking, Uber (+ pinned quote text)
  ventures?: Venture[]       // Ch.4: Legora, Lokasa (status:'sunset'), Poodl
  company?: Company          // Ch.5: pilots, team, capabilities[], screenshots[]
  stack?: string[]           // technologies named in context, no icon wall
}
```

Dead data removed: `gridClass`, `skillsData`, `skillCategoriesData`, `links` (replaced
by chapter list), unused animation tokens.

## 8. Component architecture

```
app/page.tsx                  (server) composes chapters from lib/data.ts
components/
  thread/                     Thread segments, milestone dots, chapter rail
  chapters/
    prologue/  two-cultures/  craft/  scale/
    zero-to-one/  company/  offline/  epilogue/
  narrative/                  shared primitives:
    MaskedLines  PinnedQuote  ClipReveal  CountUp  ActBackground
    (+ ~3 more as needed: ThreadSegment, MilestoneDot, ChapterHeading)
```

- Each chapter is one client-leaf component receiving data as props from the server page.
- The ~8 narrative primitives replace the 27-file `components/ui/` kit.
- DOM order equals narrative order regardless of visual weaving (keyboard/screen
  readers get the story in sequence).

**Deleted outright:** CosmicBackground, Dock, MagicCard, ShimmerButton, RainbowButton,
BorderBeam, ShineBorder, HyperText, AnimatedGradientText, TextAnimate, PixelImage,
the 7 already-unused ui components (animated-beam, bento-grid, icon-cloud, light-rays,
neon-gradient-card, particles, ripple), ThemeSwitch + theme-context, SectionDivider,
sections: skills/education/about/contact-as-such, footer's email/cal links.
Dependencies removed: `framer-motion`, `react-vertical-timeline-component`.

**Kept/adapted:** `ActiveSectionContext` + `useSectionInView` (chapter rail),
`cn()`, company logos in `public/logos/`, product screenshots (re-exported at
readable sizes, full-bleed presentation), SEO files (sitemap, robots, OG image,
JSON-LD) updated for the new structure; URL stays `/`; old anchor ids preserved
where a chapter maps 1:1 (e.g. `#home` → prologue) so inbound links don't break.

## 9. Accessibility & performance budget

- `MotionConfig reducedMotion="user"` + manual `useReducedMotion` gates on every
  MotionValue pipeline; reduced-motion users get fades only, thread pre-drawn.
- Story fully readable with JS off: SSR-visible initial states (no `opacity: 0`
  orphans), semantic heading hierarchy per chapter.
- Fonts self-hosted via `next/font` with proper fallbacks (zero CLS).
- Hero thesis text is the LCP; renders server-side visible; no `ssr: false` above
  the fold.
- Targets: Lighthouse ≥ 95 (all categories), LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Native CSS scroll-driven animations (`animation-timeline`) may be used only as
  progressive enhancement behind `@supports` (Firefox stable hasn't shipped them);
  never for load-bearing narrative.

## 10. Process obligations for implementation

- Write `PRODUCT.md` and `DESIGN.md` (impeccable skill) as part of implementation
  so the design system is documented.
- After UI is built, run the impeccable mechanical detector:
  `node ~/.claude/skills/impeccable/scripts/detect.mjs --json <targets>`.
- Run the taste-skill pre-flight checklist before declaring done (em-dash scan,
  eyebrow count, CTA contrast, hero viewport fit, section-layout repetition).
- Verify in-browser at 1440×900 and 390×844 via Playwright; audit both
  `prefers-color-scheme` values and `prefers-reduced-motion`.
- Lighthouse run before completion.

## 11. Out of scope / open items

- **Fact-check gate:** all narrative prose (especially Ch. 1 family story and any
  employer-related phrasing for Uber/Booking) must be approved by Robin before ship.
- Blog/writing section: not in this redesign (possible future chapter).
- New photography/imagery for Ch. 1 and Ch. 6: nice-to-have; design must work
  typographically without it. Product screenshots for Ch. 5 come from existing assets.
- Analytics: keep `@vercel/analytics` as-is.

## Amendment (2026-07-24, approved): Story rebalance v2

Loonar demoted from destination chapter to a venture entry; Robin's primary identity
is software engineer (production engineering at Uber, current). "The Company" chapter
and its screenshots/stats/CTA are removed; chapters renumber to Prologue, 1 Two
Cultures, 2 The Craft, 3 Scale (Uber-weighted), 4 Zero to One (ventures incl.
Loonar, listed last), 5 Offline, Epilogue. The thread ends at the present rather
than resolving into Loonar. Metadata identity: "Software Engineer" first.

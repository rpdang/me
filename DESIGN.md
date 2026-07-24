# DESIGN.md

Design system documentation for "The Thread," Robin Dang's portfolio. This file
describes what is actually implemented; where the original design spec
(`docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md`) was later
amended by a story rebalance, this document reflects the amended, shipped state
and calls the divergence out explicitly.

## The Thread concept

One continuous terracotta line draws itself through the page as the visitor
scrolls, passing through every chapter and acting as the visual thesis: one
unbroken thread, end to end.

- Desktop (`components/thread/thread-segment.tsx`): the thread weaves left/right
  across the content column as an SVG path, one segment per chapter boundary.
  Each segment has its own `useScroll({ target })`, smoothed through
  `useSpring({ stiffness: 90, damping: 26 })` so it slightly "chases" scroll
  rather than tracking it 1:1.
- Mobile: the same component renders a straight vertical left-rail path instead
  of the weaving curve (CSS breakpoint switch inside `ThreadSegment`, not a
  separate component).
- Reduced motion: `pathLength` is hard-set to `1` (fully drawn, no scrub) via
  `useReducedMotion()`, so the thread is never mid-draw for a user who has asked
  for reduced motion.
- Milestone dots (`components/thread/milestone-dot.tsx`) mark stops along the
  thread; the desktop chapter rail (`components/thread/chapter-rail.tsx`)
  mirrors thread progress as a fixed right-edge nav, hidden below `lg`.

## Act system

Two backgrounds ("acts"), switched by a single `data-act` attribute on `<html>`,
painted by one fixed layer:

- **Cream** (`--color-act-cream: #f5f0e6`): prologue, Two Cultures, The Craft,
  Offline, Epilogue.
- **Slate** (`--color-act-slate: #232830`): Scale, Zero to One.

Implementation is a single `.act-layer` (`position: fixed; inset: 0; z-index: -10`)
whose `background-color` transitions over 800ms
(`cubic-bezier(0.23, 1, 0.32, 1)`), not per-chapter background divs. Foreground
color, muted-text color, and grain opacity all key off `[data-act="slate"]` via
CSS variables (`--act-fg`, `--act-muted`), so no component branches on act by
hand.

`prefers-color-scheme: dark` does not swap acts (there is no manual light/dark
theme toggle on this site by design). It only dims the cream act's resolved
value from `#f5f0e6` to `#ece5d8`, so cream still reads as cream, just slightly
darker, under a dark OS preference. Verified in browser: dark color-scheme
renders the act background as `#ece5d8`.

## Type

- **Display: Cabinet Grotesk** (`app/fonts/CabinetGrotesk-Variable.woff2`, self
  hosted via `next/font/local`, weight range 100-900). Used for chapter titles
  and the prologue/epilogue headline, at `clamp()` sizes so headlines never
  wrap past 2 lines on desktop.
- **Body: General Sans** (`app/fonts/GeneralSans-Variable.woff2` + italic,
  self-hosted, weight range 200-700). Used for all prose paragraphs, capped at
  `max-w-[52ch]`-`[58ch]` for readable measure.
- **Mono: system stack** (`'SF Mono', 'Fira Code', 'Consolas', monospace`, not
  self-hosted: it is an annotation voice, not a brand typeface). Reserved
  exclusively for: chapter numbers (`01`, `02`, ...), dates/periods
  (`2022 to 2024`), the Ch.1 coordinates line (`Hanoi 21.0278 N / Stockholm
  59.3293 N`), venture tech-stack tags, and link labels. Chapter numbers are the
  only eyebrow-style mono labels on the page: there is no second, competing
  eyebrow pattern anywhere.

## Color

Single accent: **terracotta `#b85a32`** (`--color-terracotta`). Used for the
thread itself, milestone dots, the chapter-rail active dot, all link text, role
labels, and stat figures. No second or third accent color exists anywhere on
the page: no gold, no burgundy, no gradients. This is a hard constraint, not a
style preference: any new UI element reaches for terracotta or for the
ink/bone-derived muted tones, never a new hue.

## Motion registers

Two strictly separated speed registers, enforced by the components that exist
today:

1. **Narrative reveals**: chapter titles (`MaskedLines`), paragraph fades,
   milestone list items: **600-900ms**, eased with
   `cubic-bezier(0.23, 1, 0.32, 1)` (a strong ease-out), staggered 30-80ms per
   item (e.g. `delay: i * 0.06` in `craft.tsx` / `zero-to-one.tsx`).
2. **UI interactions**: links, the chapter rail dots: **≤200ms**
   (`transition-transform duration-150`, `active:scale-[0.97]` on every link;
   rail dot scale-up on active is `duration: 0.18`). Nothing enters from
   `scale(0)`; hover-only affordances (rail tooltip labels) are opacity-based
   and inert until hover/focus.

**Deliberate exception: `CountUp` (`components/narrative/count-up.tsx`):**
animates its number over **1.4s with `ease: "easeOut"`**, which falls outside
both registers above. This was flagged during implementation
(`.superpowers/sdd/progress.md`, Task 4: "CountUp 1.4s/easeOut is plan-mandated
but outside 600-900ms reveal constraint") and intentionally shipped as-is
pending owner adjudication: it is the one place on the page where a duration
was chosen for how a counting number *reads* (long enough to register as
counting, not just flickering) rather than to fit the narrative-reveal
register. It respects reduced motion (jumps straight to the final value when
`useReducedMotion()` is true) and triggers once, on scroll into view
(`useInView(..., { once: true })`), so it never restarts or loops.

## Pin budget: one pinned moment

The original spec rationed pinning to exactly two moments (the Ch.3 Uber quote,
and a Ch.5 "Loonar arrival" sequence). The story-rebalance amendment removed
"The Company" chapter entirely. Loonar was demoted to a venture entry inside
Zero to One, and the page no longer resolves into a Loonar destination.
**That removed the second pin along with the chapter it lived in.** The site
now ships with exactly **one** pinned moment:

- **Scale (Ch.3):** the Uber quote: "Do not just fix the incident. Eliminate
  the category, forever." pins full-screen via `position: sticky` inside a
  `220vh` wrapper (`components/narrative/pinned-quote.tsx`), with each word's
  opacity driven by scroll progress (`useTransform` over per-word ranges). With
  reduced motion, all words render at full opacity immediately; there is no
  version of the page where the quote is stuck half-legible.

If a second pinned moment is ever reintroduced, it should be budgeted
deliberately, not incidentally reused from the old Ch.5 pattern, since that
pattern no longer has a chapter to live in.

## Radius rule

The original spec's two-radius rule was "rounded-full CTA + rounded-lg images."
The story rebalance removed the page's only button-styled CTA ("Visit Loonar")
along with the company chapter: every link on the page today, including
venture links and the epilogue's LinkedIn/GitHub links, is a plain underlined
text link, not a rounded-pill button. That leaves:

- **`rounded-full`**: reserved for small UI markers only: the thread's
  milestone dots (`milestone-dot.tsx`) and the desktop chapter-rail dots
  (`chapter-rail.tsx`). These are not CTAs; they are wayfinding, so they are
  exempt from the "one CTA shape" framing entirely.
- **`rounded-lg`**: the only radius reserved for imagery, if and when the page
  carries images again (it currently carries none; Ch.1/Ch.6 imagery was
  explicitly deferred as "nice-to-have" per spec §11, and product screenshots
  went away with the removed company chapter).

There is currently no button-styled CTA anywhere on the page to apply a radius
to. If one is ever reintroduced, it must not silently reuse `rounded-full`
without re-opening this document, since that radius is now semantically
"dot," not "button," on this page.

## Copy rules

- **No em-dashes or en-dashes** anywhere in visible copy: hyphens only.
  Enforced mechanically: running grep for em-dashes and en-dashes across
  components/chapters, components/narrative, components/thread, and lib/story.ts
  must return nothing.
- **No scroll cues** ("scroll to explore," chevrons, etc.) and no decorative
  status dots or filler subtitles.
- **No banned contact channels.** No `mailto:`, no `cal.com`, no personal email
  address anywhere in `app/`, `components/`, or `lib/`. The only contact
  surface is the epilogue's two links.
- **Metrics only from spec §4.** Every number on the page (the Booking.com
  `100%` stat, dates, years) must trace to the canonical content facts in the
  design spec; no invented precision.
- **Link-label uniqueness.** No two links on the page should share literal
  link text pointing at different destinations: screen-reader users tabbing
  through links hear label text out of visual context, so two links both
  reading "Read the thesis" are indistinguishable by ear even though they are
  contextually clear by eye. Venture links already follow this ("Visit
  Legora," "Visit Loonar" - each names its destination); Craft's two thesis
  links are labeled "Read the B.Sc. thesis" / "Read the M.Sc. thesis" for the
  same reason. The epilogue's two links are exactly "LinkedIn" and "GitHub,"
  which are already unique.
- **No scroll listeners.** Motion is driven entirely by `motion`'s `useScroll`
  MotionValue pipelines, never `window.addEventListener('scroll', ...)`.

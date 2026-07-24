# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## What this is

"The Thread": a single-page, scroll-driven narrative portfolio for Robin Dang,
built on **Next.js 16 App Router**, React 19, TypeScript, and Tailwind CSS v4.
There is no multi-section resume layout; `app/page.tsx` renders one `<main>`
composed of a prologue, five numbered chapters, and an epilogue, each its own
client component under `components/chapters/`.

## Architecture

- `components/chapters/` - one component per chapter (`prologue`, `two-cultures`,
  `craft`, `scale`, `zero-to-one`, `offline`, `epilogue`). Pure presentation:
  they import from `lib/story.ts` and render it, they do not hardcode copy.
- `components/narrative/` - shared primitives used across chapters:
  `ChapterHeading`, `MaskedLines`, `PinnedQuote`, `CountUp`, `ActBackground`.
- `components/thread/` - the thread system: `ThreadSegment` (the terracotta
  line that draws itself per chapter boundary via `useScroll` + `useSpring`),
  `MilestoneDot`, and `ChapterRail` (fixed right-edge nav, desktop only).
- `lib/story.ts` - single source of truth for all content: the `STORY` object
  (copy, dates, numbers, links) and the `CHAPTERS` array (id, number, title,
  act) that drives chapter metadata everywhere else. Changing the story means
  editing this file; changing how a chapter looks means editing its component.
- `lib/hooks.ts` - `useSectionInView(sectionName, threshold)` combines
  `react-intersection-observer` with `ActiveSectionContext` to report which
  chapter is in view.
- `context/active-section-context.tsx` - tracks the active chapter and the
  time of the last manual nav click; both `ChapterRail` and `ActBackground`
  read from it.

## Act system

Two backgrounds ("acts") switched by one `data-act` attribute on `<html>`,
painted by a single fixed `.act-layer`, not per-chapter background divs.
Foreground/muted-text color and grain opacity key off `[data-act="slate"]`
via CSS variables (`--act-fg`, `--act-muted`), so no component branches on act
by hand. `ActBackground` sets `data-act` from `ACT_BY_CHAPTER[activeSection]`,
and also reads `location.hash` once on mount so a deep link into a slate
chapter doesn't flash cream first.

## Motion, fonts, styling

- **motion/react (Framer Motion v12) only**: import from `"motion/react"`,
  not `"framer-motion"`.
- Fonts are self-hosted via `next/font/local` in `app/fonts.ts`: **Cabinet
  Grotesk** (display, chapter titles/headlines) and **General Sans** (body).
  No Google Fonts, no CDN font loading.
- **Tailwind CSS v4** with `@theme` tokens in `app/globals.css` (no
  `tailwind.config.js` theme block). Single accent color: terracotta
  (`--color-terracotta: #b85a32`). No shadcn/ui setup in this repo.
- No-JS fallback: `app/layout.tsx` stamps a `js` class onto `<html>` via a
  blocking inline script before hydration; `globals.css` has `html:not(.js)`
  rules that force-show motion-hidden content and undrawn thread paths if
  hydration never completes. Keep both in sync when touching either.

## Hard copy rules

- **No em dashes or en dashes anywhere**, in copy, code comments, or docs.
  Use a period, comma, or "to" instead.
- No scroll cues ("scroll to explore", down-arrows, etc.).
- Every metric, date, employer, or biographical claim must trace back to the
  canonical facts in `docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md`
  §4. Never invent or embellish. See `PRODUCT.md`'s fact-check rule.
- The only conversion action on the whole site is the epilogue's two plain
  underlined links: LinkedIn and GitHub. No forms, no email, no cal.com link.
  Don't add a contact CTA elsewhere.

## Where to look next

- `PRODUCT.md` - what this site is, who it's for, the identity/audience/
  conversion framing, and the fact-check rule in full.
- `DESIGN.md` - the implemented design system (thread mechanics, act system,
  type, motion) with any divergence from the original spec called out.
- `docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md` - the
  original design spec and canonical content facts (§4).
- `docs/superpowers/plans/2026-07-24-the-thread-redesign.md` - the
  implementation plan this codebase was built from.

# "The Thread" Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild robindang.com from a 7-section template into a cinematic scroll-driven narrative where a terracotta thread draws through eight story chapters and resolves into Loonar.

**Architecture:** Next.js 16 App Router server page composes eight client-leaf chapter components fed from a typed `chapters` story model. A per-chapter SVG thread segment is scroll-scrubbed with motion v12; a single fixed background layer color-morphs between "acts" driven by the existing ActiveSectionContext. Old UI kit, sections, and theme system are deleted after the swap.

**Tech Stack:** Next.js 16.1, React 19, Tailwind CSS v4 (`@theme` in `app/globals.css`), `motion` v12 (`motion/react` imports only), `next/font/local`, TypeScript 5.9.

**Spec:** `docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md` (approved 2026-07-24).

## Global Constraints

- Animation library: `motion` v12 only; import from `motion/react`. `framer-motion` and `react-vertical-timeline-component` are removed in Task 12. No GSAP.
- Fonts: Cabinet Grotesk (display) and General Sans (body), self-hosted woff2 via `next/font/local`. Mono stays the existing `--font-mono` stack (SF Mono/Fira Code fallbacks; no file to load).
- Single accent color: terracotta `#b85a32`. No gold, no burgundy accents, no purple/pink/blue anywhere.
- Acts: cream `#f5f0e6` (light) and cool slate `#232830` (dark). One fixed background layer only.
- Copy: ZERO em-dashes (`—`) or en-dashes (`–`) in any visible string. Hyphens only. No scroll cues, no decorative status dots, no filler subtitles. All metrics only from spec §4.
- Narrative reveals: 600-900ms, ease `cubic-bezier(0.23, 1, 0.32, 1)`, staggers 30-80ms. UI interactions: ≤200ms, `scale(0.97)` on active, nothing enters from `scale(0)`, hover gated behind `@media (hover: hover) and (pointer: fine)`.
- Exactly two pinned moments (Ch.3 Uber quote, Ch.5 Loonar arrival). Pinning = `position: sticky` + tall wrapper, never JS.
- Every scrubbed MotionValue gated with `useReducedMotion()`. `<MotionConfig reducedMotion="user">` wraps the app.
- Animate only transform / opacity / clip-path (plus background-color on the single act layer). No `window.addEventListener('scroll')`. No per-frame `setState`. No blanket `will-change`.
- Contact: LinkedIn `https://www.linkedin.com/in/robin-dang` and GitHub `https://github.com/rpdang` only. No email, no cal.com, anywhere.
- Full-height sections use `min-h-[100dvh]` / `h-[100dvh]`, never `h-screen`.
- **Verification model:** this repo has no unit-test infra and gets none (YAGNI). Each task's test cycle is: `npm run build` must succeed (type check) + `npm run lint` clean + a stated browser check. Final task runs full audits.
- Commit after every task. Site must build at the end of every task (new code is added alongside old; the swap happens in Task 10; demolition in Task 12).

## File Structure

```
app/
  fonts/CabinetGrotesk-Variable.woff2         (new)
  fonts/GeneralSans-Variable.woff2            (new)
  fonts/GeneralSans-VariableItalic.woff2      (new)
  fonts.ts                                    (new: next/font/local exports)
  globals.css                                 (modified: new tokens; purged in Task 12)
  layout.tsx                                  (rewritten in Task 10)
  page.tsx                                    (rewritten in Task 10)
  opengraph-image.tsx                         (modified in Task 13)
lib/
  story.ts                                    (new: types + chapters data + all prose)
  hooks.ts                                    (modified in Task 10: chapter ids)
  types.ts                                    (modified in Task 10)
components/
  narrative/masked-lines.tsx                  (new)
  narrative/clip-reveal.tsx                   (new)
  narrative/count-up.tsx                      (new)
  narrative/pinned-quote.tsx                  (new)
  narrative/chapter-heading.tsx               (new)
  narrative/act-background.tsx                (new)
  thread/thread-segment.tsx                   (new)
  thread/milestone-dot.tsx                    (new)
  thread/chapter-rail.tsx                     (new)
  chapters/prologue.tsx                       (new)
  chapters/two-cultures.tsx                   (new)
  chapters/craft.tsx                          (new)
  chapters/scale.tsx                          (new)
  chapters/zero-to-one.tsx                    (new)
  chapters/company.tsx                        (new)
  chapters/offline.tsx                        (new)
  chapters/epilogue.tsx                       (new)
PRODUCT.md                                    (new, Task 14)
DESIGN.md                                     (new, Task 14)
```

Deleted in Task 12: `components/home/ components/experiences/ components/projects/ components/skills/ components/about/ components/education/ components/contact/ components/footer/ components/header/ components/theme-switch/ components/section-heading/ components/section-divider/ components/ui/` (entire kit), `context/theme-context.tsx`, `lib/data.ts`.

---

### Task 1: Self-host fonts

**Files:**
- Create: `app/fonts/CabinetGrotesk-Variable.woff2`, `app/fonts/GeneralSans-Variable.woff2`, `app/fonts/GeneralSans-VariableItalic.woff2`
- Create: `app/fonts.ts`

**Interfaces:**
- Produces: `app/fonts.ts` exports `displayFont` and `bodyFont` (NextFont objects with `.variable` class names `--font-cabinet` and `--font-general`). Task 10 puts both on `<html>`; Task 3 maps them into Tailwind theme.

- [ ] **Step 1: Download fonts from Fontshare (free license)**

```bash
cd /Users/robindang/Documents/projects/me
mkdir -p app/fonts /tmp/fontdl && cd /tmp/fontdl
curl -L -o cabinet.zip "https://api.fontshare.com/v2/fonts/download/cabinet-grotesk"
curl -L -o general.zip "https://api.fontshare.com/v2/fonts/download/general-sans"
unzip -o cabinet.zip -d cabinet && unzip -o general.zip -d general
find cabinet -name "CabinetGrotesk-Variable.woff2" -exec cp {} /Users/robindang/Documents/projects/me/app/fonts/ \;
find general -name "GeneralSans-Variable.woff2" -exec cp {} /Users/robindang/Documents/projects/me/app/fonts/ \;
find general -name "GeneralSans-VariableItalic.woff2" -exec cp {} /Users/robindang/Documents/projects/me/app/fonts/ \;
ls -la /Users/robindang/Documents/projects/me/app/fonts/
```

Expected: three `.woff2` files listed, each > 20KB. If the API download fails, download the same families manually from fontshare.com and place the three variable woff2 files at the paths above before continuing.

- [ ] **Step 2: Create `app/fonts.ts`**

```ts
import localFont from "next/font/local";

export const displayFont = localFont({
  src: "./fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-cabinet",
  weight: "100 900",
  display: "swap",
});

export const bodyFont = localFont({
  src: [
    { path: "./fonts/GeneralSans-Variable.woff2", style: "normal" },
    { path: "./fonts/GeneralSans-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-general",
  weight: "200 700",
  display: "swap",
});
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build succeeds (fonts.ts is not imported yet; this verifies the files parse and exist).

- [ ] **Step 4: Commit**

```bash
git add app/fonts app/fonts.ts
git commit -m "feat: self-host Cabinet Grotesk and General Sans via next/font/local"
```

---

### Task 2: Story model and all narrative content (`lib/story.ts`)

**Files:**
- Create: `lib/story.ts`

**Interfaces:**
- Produces (consumed by every chapter component and Task 10):
  - `type ChapterId = "prologue" | "two-cultures" | "craft" | "scale" | "zero-to-one" | "company" | "offline" | "epilogue"`
  - `type Act = "cream" | "slate"`
  - `interface ChapterMeta { id: ChapterId; number: number | null; title: string; act: Act }`
  - `const CHAPTERS: readonly ChapterMeta[]` (ordered)
  - `const STORY` object with per-chapter content constants (exact shape below)
  - `const ACT_BY_CHAPTER: Record<ChapterId, Act>`

- [ ] **Step 1: Write `lib/story.ts` in full**

All visible copy for the site lives here. Prose is drafted from the spec's canonical facts (§4); Robin fact-checks in the final review. Note: zero em/en-dashes anywhere below.

```ts
export type ChapterId =
  | "prologue"
  | "two-cultures"
  | "craft"
  | "scale"
  | "zero-to-one"
  | "company"
  | "offline"
  | "epilogue";

export type Act = "cream" | "slate";

export interface ChapterMeta {
  id: ChapterId;
  number: number | null;
  title: string;
  act: Act;
}

export const CHAPTERS: readonly ChapterMeta[] = [
  { id: "prologue", number: null, title: "Prologue", act: "cream" },
  { id: "two-cultures", number: 1, title: "Two Cultures", act: "cream" },
  { id: "craft", number: 2, title: "The Craft", act: "cream" },
  { id: "scale", number: 3, title: "Scale", act: "slate" },
  { id: "zero-to-one", number: 4, title: "Zero to One", act: "slate" },
  { id: "company", number: 5, title: "The Company", act: "cream" },
  { id: "offline", number: 6, title: "Offline", act: "cream" },
  { id: "epilogue", number: null, title: "Say Hej", act: "cream" },
] as const;

export const ACT_BY_CHAPTER: Record<ChapterId, Act> = Object.fromEntries(
  CHAPTERS.map((c) => [c.id, c.act])
) as Record<ChapterId, Act>;

export interface Milestone {
  title: string;
  detail: string;
  period: string;
  href?: string;
  linkLabel?: string;
}

export interface Venture {
  name: string;
  role: string;
  story: string;
  status: "live" | "sunset";
  stack?: string[];
  href?: string;
}

export const STORY = {
  prologue: {
    headlineLines: ["I build things", "end to end."],
    sub: "Robin Dang. Co-founder and CTO of Loonar. I turn hard problems into products that feel easy.",
    credentials: ["Loonar", "Uber", "Booking.com", "Legora (YC W24)"],
  },

  twoCultures: {
    paragraphs: [
      "My parents left Vietnam after the war and rebuilt their lives in Sweden. Neither of them finished high school.",
      "I was born there, between two cultures. Vietnamese at home, Swedish everywhere else. The classic second generation story.",
      "Growing up like that teaches you one thing early: nothing arrives finished. You build the life you want from whatever you have. I have been building ever since.",
    ],
    coordinates: "Hanoi 21.0278 N / Stockholm 59.3293 N",
  },

  craft: {
    intro:
      "Computer science at KTH in Stockholm, from first lecture to master's thesis, with real systems on the side.",
    milestones: [
      {
        title: "B.Sc. Computer Science, KTH",
        detail:
          "Thesis: machine learning for breast cancer classification.",
        period: "2017 to 2020",
        href: "https://www.diva-portal.org/smash/record.jsf?pid=diva2%3A1439999",
        linkLabel: "Read the thesis",
      },
      {
        title: "Software Engineer, Nasdaq",
        detail:
          "Student worker on real market infrastructure while studying. First taste of code that cannot be wrong.",
        period: "2020 to 2022",
      },
      {
        title: "M.Sc. Computer Science, KTH",
        detail:
          "Thesis at Nasdaq: distributed ledger technology in central securities depositories.",
        period: "2020 to 2022",
        href: "https://www.diva-portal.org/smash/record.jsf?pid=diva2%3A1687555",
        linkLabel: "Read the thesis",
      },
    ] satisfies Milestone[],
  },

  scale: {
    booking: {
      company: "Booking.com",
      role: "Senior Software Engineer",
      period: "2022 to 2024",
      story:
        "Led a small team reimagining how account managers work with hotel partners. We replaced spreadsheets with a greenfield internal tool used by every account manager in the company.",
    },
    uber: {
      company: "Uber",
      role: "Software Engineer, Production Engineering",
      period: "2024 to present",
      story:
        "Production engineering sits between SRE and software engineering. The roadmap is Uber's hardest, most critical incidents.",
    },
    pinnedQuote: "Do not just fix the incident. Eliminate the category, forever.",
    stat: { value: 100, suffix: "%", label: "of account managers on the tool my team built" },
  },

  zeroToOne: {
    intro:
      "Scale teaches you rigor. Starting from nothing teaches you everything else.",
    ventures: [
      {
        name: "Legora",
        role: "Founding Software Engineer",
        story:
          "Joined Leya AI (YC W24) as a founding engineer and helped ship v0 of an agentic RAG product for legal work. Still proud of that first version.",
        status: "live",
        stack: ["TypeScript", "RAG", "LLM agents"],
        href: "https://legora.com",
      },
      {
        name: "Lokasa",
        role: "Solo builder",
        story:
          "A commercial real estate marketplace for Sweden. Built alone, end to end: scraping, search, maps on OpenStreetMap, around 20,000 listings. It never found its market and I shut it down. Building it taught me more than most jobs.",
        status: "sunset",
        stack: ["Next.js", "PostgreSQL", "OpenStreetMap"],
      },
      {
        name: "Poodl",
        role: "Builder",
        story:
          "Tracking how brands show up across ChatGPT, Claude, Gemini and Perplexity, before anyone called it GEO.",
        status: "live",
        stack: ["Python", "LLM evals"],
      },
    ] satisfies Venture[],
  },

  company: {
    origin: [
      "Consulting on AI projects, the same request kept appearing from completely different clients: help us survive RFQs in engineering procurement.",
      "Different industries, same broken workflow. When a problem follows you around, you stop consulting and start building.",
    ],
    facts: [
      { label: "Stage", value: "Pre-seed, bootstrapped" },
      { label: "Pilots", value: "20" },
      { label: "Co-founders", value: "3, sole technical" },
      { label: "Engineering team", value: "4 engineers" },
    ],
    capabilities: [
      "RFQ analysis",
      "Deviation analysis",
      "Offer check",
      "Product matching",
      "RAG",
      "Content library",
    ],
    closing:
      "Everything the thread passed through leads here: scale years for rigor, founding years for speed, and a problem worth solving end to end.",
    href: "https://loonar-ai.com",
    screenshots: [
      { src: "/loonar.png", alt: "Loonar RFQ analysis interface" },
    ],
  },

  offline: {
    paragraphs: [
      "Off the keyboard: tennis, the gym, running along the Amstel.",
      "And cooking. Vietnamese when I miss home, Swedish and Italian when I miss the other home.",
    ],
  },

  epilogue: {
    line: "The next chapter is being written at Loonar.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/robin-dang" },
      { label: "GitHub", href: "https://github.com/rpdang" },
    ],
  },
} as const;
```

Note: verify the two diva-portal thesis URLs against the current `lib/data.ts` (`educationData` entries) and copy the exact existing hrefs; same for the Loonar screenshot path, copy the exact existing image path used by `projectsData` for Loonar. Adjust the `screenshots` array and thesis `href`s to those real values.

- [ ] **Step 2: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add lib/story.ts
git commit -m "feat: add story model with all chapter content for The Thread"
```

---

### Task 3: Design tokens (globals.css additions)

**Files:**
- Modify: `app/globals.css` (append/replace inside the existing `@theme` block; add act variables + grain utility after it)

**Interfaces:**
- Produces: Tailwind utilities `font-display`, `font-body`, colors `act-cream`, `act-slate`, `terracotta`, `ink`; CSS vars `--act-bg`, `--act-fg`, `--act-muted` switched by `:root[data-act]`; class `grain-layer`. Consumed by every new component. Old components keep working (their tokens are untouched until Task 12).

- [ ] **Step 1: Update the `@theme` block**

In `app/globals.css`, inside the existing `@theme` block, replace the `--font-display` and `--font-sans` lines with, and add the new colors:

```css
  --font-display: var(--font-cabinet), "Helvetica Neue", Arial, sans-serif;
  --font-body: var(--font-general), "Helvetica Neue", Arial, sans-serif;
  --color-act-cream: #f5f0e6;
  --color-act-slate: #232830;
  --color-terracotta: #b85a32;
  --color-ink: #26221f;
  --color-bone: #f2ede4;
```

(Leave the existing `--font-sans` if other old components reference it; add `--font-body` as a new token rather than renaming, then Task 12 removes `--font-sans`.)

- [ ] **Step 2: Add act variables and grain after the `@theme` block**

```css
/* ---- Acts: single background layer + foreground, switched by data-act ---- */
:root {
  --act-cream-resolved: var(--color-act-cream);
  --act-bg: var(--act-cream-resolved);
  --act-fg: var(--color-ink);
  --act-muted: color-mix(in srgb, var(--color-ink) 62%, transparent);
}
@media (prefers-color-scheme: dark) {
  :root {
    --act-cream-resolved: #ece5d8;
  }
}
:root[data-act="slate"] {
  --act-bg: var(--color-act-slate);
  --act-fg: var(--color-bone);
  --act-muted: color-mix(in srgb, var(--color-bone) 60%, transparent);
}

.act-layer {
  position: fixed;
  inset: 0;
  z-index: -10;
  background-color: var(--act-bg);
  transition: background-color 800ms cubic-bezier(0.23, 1, 0.32, 1);
}
@media (prefers-reduced-motion: reduce) {
  .act-layer {
    transition: none;
  }
}

.grain-layer {
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
}
:root[data-act="slate"] .grain-layer {
  opacity: 0.06;
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds; existing site unchanged visually (new tokens unused so far).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat: add act tokens, terracotta accent, and grain layer to theme"
```

---

### Task 4: Narrative primitives (MaskedLines, ClipReveal, CountUp)

**Files:**
- Create: `components/narrative/masked-lines.tsx`
- Create: `components/narrative/clip-reveal.tsx`
- Create: `components/narrative/count-up.tsx`

**Interfaces:**
- Produces:
  - `MaskedLines({ lines: string[]; mode?: "mount" | "inView"; delay?: number; className?: string })` default export
  - `ClipReveal({ children: React.ReactNode; className?: string })` default export
  - `CountUp({ value: number; suffix?: string; className?: string })` default export
- Consumes: nothing from other tasks.

- [ ] **Step 1: Write `components/narrative/masked-lines.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.23, 1, 0.32, 1] as const;

interface MaskedLinesProps {
  lines: string[];
  mode?: "mount" | "inView";
  delay?: number;
  className?: string;
}

export default function MaskedLines({
  lines,
  mode = "inView",
  delay = 0,
  className,
}: MaskedLinesProps) {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
  };
  const line = reduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.4 } },
      }
    : {
        hidden: { y: "110%" },
        show: { y: "0%", transition: { duration: 0.7, ease: EASE } },
      };

  const trigger =
    mode === "mount"
      ? { animate: "show" as const }
      : {
          whileInView: "show" as const,
          viewport: { once: true, amount: 0.4 },
        };

  return (
    <motion.span
      aria-label={lines.join(" ")}
      className={className}
      variants={container}
      initial="hidden"
      {...trigger}
    >
      {lines.map((text, i) => (
        <span key={i} aria-hidden className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" variants={line}>
            {text}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
```

- [ ] **Step 2: Write `components/narrative/clip-reveal.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.23, 1, 0.32, 1] as const;

export default function ClipReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Write `components/narrative/count-up.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

export default function CountUp({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.4, ease: "easeOut" });
    return controls.stop;
  }, [inView, reduce, value, count]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
    </span>
  );
}
```

- [ ] **Step 4: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add components/narrative
git commit -m "feat: add MaskedLines, ClipReveal, CountUp narrative primitives"
```

---

### Task 5: PinnedQuote, ChapterHeading, ActBackground

**Files:**
- Create: `components/narrative/pinned-quote.tsx`
- Create: `components/narrative/chapter-heading.tsx`
- Create: `components/narrative/act-background.tsx`

**Interfaces:**
- Consumes: `ACT_BY_CHAPTER`, `ChapterId` from `lib/story.ts`; `useActiveSectionContext` from `context/active-section-context.tsx` (existing; its `activeSection` will hold chapter ids after Task 10).
- Produces:
  - `PinnedQuote({ quote: string; className?: string })` default export (renders the h-[220vh] pin wrapper itself)
  - `ChapterHeading({ number, title }: { number: number | null; title: string })` default export
  - `ActBackground()` default export (renders act layer + grain layer, sets `data-act` on `<html>`)

- [ ] **Step 1: Write `components/narrative/pinned-quote.tsx`**

```tsx
"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

function Word({
  children,
  progress,
  range,
  reduce,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={{ opacity: reduce ? 1 : opacity }}
      className="mr-[0.28em] inline-block"
    >
      {children}
    </motion.span>
  );
}

export default function PinnedQuote({
  quote,
  className,
}: {
  quote: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const words = quote.split(" ");

  return (
    <div ref={ref} className={`relative h-[220vh] ${className ?? ""}`}>
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center px-6 md:px-16">
        <p className="max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
          {words.map((word, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
              reduce={!!reduce}
            >
              {word}
            </Word>
          ))}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write `components/narrative/chapter-heading.tsx`**

```tsx
"use client";

import MaskedLines from "./masked-lines";

export default function ChapterHeading({
  number,
  title,
}: {
  number: number | null;
  title: string;
}) {
  return (
    <div className="mb-12 md:mb-20">
      {number !== null && (
        <span className="mb-3 block font-mono text-sm text-terracotta">
          {String(number).padStart(2, "0")}
        </span>
      )}
      <MaskedLines
        lines={[title]}
        className="font-display text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-tight"
      />
    </div>
  );
}
```

- [ ] **Step 3: Write `components/narrative/act-background.tsx`**

```tsx
"use client";

import { useEffect } from "react";
import { useActiveSectionContext } from "@/context/active-section-context";
import { ACT_BY_CHAPTER, type ChapterId } from "@/lib/story";

export default function ActBackground() {
  const { activeSection } = useActiveSectionContext();

  useEffect(() => {
    const act = ACT_BY_CHAPTER[activeSection as ChapterId] ?? "cream";
    document.documentElement.setAttribute("data-act", act);
  }, [activeSection]);

  return (
    <>
      <div className="act-layer" aria-hidden />
      <div className="grain-layer" aria-hidden />
    </>
  );
}
```

- [ ] **Step 4: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both pass. (`activeSection` is still the old SectionName union until Task 10; the `as ChapterId` cast keeps this compiling in the interim.)

- [ ] **Step 5: Commit**

```bash
git add components/narrative
git commit -m "feat: add PinnedQuote, ChapterHeading, ActBackground"
```

---

### Task 6: Thread system (ThreadSegment, MilestoneDot, ChapterRail)

**Files:**
- Create: `components/thread/thread-segment.tsx`
- Create: `components/thread/milestone-dot.tsx`
- Create: `components/thread/chapter-rail.tsx`

**Interfaces:**
- Consumes: `CHAPTERS` from `lib/story.ts`; `useActiveSectionContext` (existing).
- Produces:
  - `ThreadSegment({ curve?: "left" | "right"; thicken?: boolean })` default export. Absolutely positioned inside a `relative` chapter section; renders weaving path on `md+`, straight left rail below `md`.
  - `MilestoneDot({ filled?: boolean; className?: string })` default export (14px terracotta dot that scales in when in view; never from scale 0).
  - `ChapterRail()` default export (fixed right-edge nav, `lg+` only).

- [ ] **Step 1: Write `components/thread/thread-segment.tsx`**

```tsx
"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

const PATHS = {
  right: "M 50 0 C 82 20, 82 38, 50 52 C 22 64, 22 82, 50 100",
  left: "M 50 0 C 18 20, 18 38, 50 52 C 78 64, 78 82, 50 100",
};

export default function ThreadSegment({
  curve = "right",
  thicken = false,
}: {
  curve?: "left" | "right";
  thicken?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    skipInitialAnimation: true,
  });

  const strokeWidth = thicken ? 5 : 2;

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0" aria-hidden>
      {/* Weaving path, tablet and up */}
      <svg
        className="hidden h-full w-full md:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d={PATHS[curve]}
          fill="none"
          stroke="var(--color-terracotta)"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduce ? 1 : pathLength }}
        />
      </svg>
      {/* Straight left rail, mobile */}
      <svg
        className="h-full w-4 md:hidden"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 50 0 L 50 100"
          fill="none"
          stroke="var(--color-terracotta)"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduce ? 1 : pathLength }}
        />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Write `components/thread/milestone-dot.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";

export default function MilestoneDot({
  filled = true,
  className,
}: {
  filled?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      initial={reduce ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`inline-block h-3.5 w-3.5 rounded-full border-2 border-terracotta ${
        filled ? "bg-terracotta" : "bg-transparent"
      } ${className ?? ""}`}
    />
  );
}
```

- [ ] **Step 3: Write `components/thread/chapter-rail.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { CHAPTERS } from "@/lib/story";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function ChapterRail() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <nav
      aria-label="Chapters"
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
    >
      {CHAPTERS.map((chapter) => {
        const active = activeSection === chapter.id;
        return (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            aria-label={chapter.title}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              setActiveSection(chapter.id as never);
              setTimeOfLastClick(Date.now());
            }}
            className="group relative flex items-center p-1 transition-transform duration-150 active:scale-[0.97]"
          >
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap font-mono text-xs opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
              {chapter.title}
            </span>
            <motion.span
              animate={{ scale: active ? 1.5 : 1 }}
              transition={{ duration: 0.18 }}
              className={`block h-2 w-2 rounded-full ${
                active
                  ? "bg-terracotta"
                  : "bg-[var(--act-muted)]"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 4: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both pass (the `as never` cast bridges the old SectionName type until Task 10 replaces it; Task 10 removes the cast).

- [ ] **Step 5: Commit**

```bash
git add components/thread
git commit -m "feat: add ThreadSegment, MilestoneDot, ChapterRail"
```

---

### Task 7: Chapters: Prologue and Two Cultures

**Files:**
- Create: `components/chapters/prologue.tsx`
- Create: `components/chapters/two-cultures.tsx`

**Interfaces:**
- Consumes: `STORY`, primitives from Tasks 4-6, `useSectionInView` from `lib/hooks.ts` (existing signature `useSectionInView(name, threshold?)` returning `{ ref }`).
- Produces: default-export React components `Prologue`, `TwoCultures`, each rendering `<section id="<chapter-id>">`. Consumed by Task 10's page.

- [ ] **Step 1: Write `components/chapters/prologue.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import MaskedLines from "@/components/narrative/masked-lines";
import MilestoneDot from "@/components/thread/milestone-dot";
import { STORY } from "@/lib/story";
import { useSectionInView } from "@/lib/hooks";

export default function Prologue() {
  const { ref } = useSectionInView("prologue" as never, 0.5);
  const reduce = useReducedMotion();
  const { headlineLines, sub, credentials } = STORY.prologue;

  return (
    <section
      ref={ref}
      id="prologue"
      className="relative flex min-h-[100dvh] flex-col justify-center px-6 md:px-16"
    >
      <h1>
        <MaskedLines
          mode="mount"
          lines={[...headlineLines]}
          className="font-display text-[clamp(3rem,9vw,7.5rem)] font-extrabold leading-[0.95] tracking-tight"
        />
      </h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 0.9, duration: 0.6 }}
        className="mt-8 max-w-[42ch] font-body text-lg text-[var(--act-muted)] md:text-xl"
      >
        {sub}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.2, duration: 0.6 }}
        className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-[var(--act-muted)]"
      >
        {credentials.join("  /  ")}
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.6, duration: 0.6 }}
        className="mt-16"
      >
        <MilestoneDot />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Write `components/chapters/two-cultures.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import ChapterHeading from "@/components/narrative/chapter-heading";
import ThreadSegment from "@/components/thread/thread-segment";
import { STORY } from "@/lib/story";
import { useSectionInView } from "@/lib/hooks";

export default function TwoCultures() {
  const { ref } = useSectionInView("two-cultures" as never, 0.3);
  const { paragraphs, coordinates } = STORY.twoCultures;

  return (
    <section
      ref={ref}
      id="two-cultures"
      className="relative scroll-mt-8 px-6 py-32 md:px-16 md:py-48"
    >
      <ThreadSegment curve="right" />
      <div className="relative mx-auto max-w-5xl">
        <ChapterHeading number={1} title="Two Cultures" />
        <div className="ml-auto max-w-[58ch] space-y-8">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8 }}
              className="font-body text-xl leading-relaxed md:text-2xl"
            >
              {text}
            </motion.p>
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8 }}
            className="pt-8 font-mono text-sm text-terracotta"
          >
            {coordinates}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add components/chapters
git commit -m "feat: add Prologue and Two Cultures chapters"
```

---

### Task 8: Chapters: The Craft and Scale

**Files:**
- Create: `components/chapters/craft.tsx`
- Create: `components/chapters/scale.tsx`

**Interfaces:**
- Consumes: `STORY.craft` (`milestones: Milestone[]`), `STORY.scale` (`booking`, `uber`, `pinnedQuote`, `stat`), primitives.
- Produces: default exports `Craft`, `Scale` rendering `<section id="craft">` / `<section id="scale">`.

- [ ] **Step 1: Write `components/chapters/craft.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import ChapterHeading from "@/components/narrative/chapter-heading";
import ThreadSegment from "@/components/thread/thread-segment";
import MilestoneDot from "@/components/thread/milestone-dot";
import { STORY } from "@/lib/story";
import { useSectionInView } from "@/lib/hooks";

export default function Craft() {
  const { ref } = useSectionInView("craft" as never, 0.2);
  const { intro, milestones } = STORY.craft;

  return (
    <section
      ref={ref}
      id="craft"
      className="relative scroll-mt-8 px-6 py-32 md:px-16 md:py-48"
    >
      <ThreadSegment curve="left" />
      <div className="relative mx-auto max-w-5xl">
        <ChapterHeading number={2} title="The Craft" />
        <p className="mb-16 max-w-[52ch] font-body text-xl leading-relaxed md:text-2xl">
          {intro}
        </p>
        <ol className="space-y-14 md:max-w-xl">
          {milestones.map((m, i) => (
            <motion.li
              key={m.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
              className="flex gap-5"
            >
              <MilestoneDot className="mt-1.5 shrink-0" />
              <div>
                <span className="font-mono text-xs text-[var(--act-muted)]">
                  {m.period}
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">
                  {m.title}
                </h3>
                <p className="mt-2 font-body text-base leading-relaxed text-[var(--act-muted)]">
                  {m.detail}
                </p>
                {m.href && (
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block font-mono text-sm text-terracotta underline underline-offset-4 transition-transform duration-150 active:scale-[0.97]"
                  >
                    {m.linkLabel}
                  </a>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write `components/chapters/scale.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import ChapterHeading from "@/components/narrative/chapter-heading";
import ThreadSegment from "@/components/thread/thread-segment";
import PinnedQuote from "@/components/narrative/pinned-quote";
import CountUp from "@/components/narrative/count-up";
import { STORY } from "@/lib/story";
import { useSectionInView } from "@/lib/hooks";

function Role({
  company,
  role,
  period,
  story,
}: {
  company: string;
  role: string;
  period: string;
  story: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="max-w-[58ch]"
    >
      <span className="font-mono text-xs text-[var(--act-muted)]">{period}</span>
      <h3 className="mt-1 font-display text-3xl font-bold tracking-tight">
        {company}
      </h3>
      <p className="font-mono text-sm text-terracotta">{role}</p>
      <p className="mt-4 font-body text-lg leading-relaxed">{story}</p>
    </motion.div>
  );
}

export default function Scale() {
  const { ref } = useSectionInView("scale" as never, 0.1);
  const { booking, uber, pinnedQuote, stat } = STORY.scale;

  return (
    <section ref={ref} id="scale" className="relative scroll-mt-8">
      <ThreadSegment curve="right" />
      <div className="relative px-6 pt-32 md:px-16 md:pt-48">
        <div className="mx-auto max-w-5xl">
          <ChapterHeading number={3} title="Scale" />
          <Role {...booking} />
          <div className="mt-10 flex items-baseline gap-4">
            <CountUp
              value={stat.value}
              suffix={stat.suffix}
              className="font-display text-6xl font-extrabold text-terracotta"
            />
            <span className="max-w-[24ch] font-body text-sm text-[var(--act-muted)]">
              {stat.label}
            </span>
          </div>
          <div className="mt-24">
            <Role {...uber} />
          </div>
        </div>
      </div>
      <PinnedQuote quote={pinnedQuote} />
    </section>
  );
}
```

- [ ] **Step 3: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add components/chapters
git commit -m "feat: add The Craft and Scale chapters with pinned Uber quote"
```

---

### Task 9: Chapters: Zero to One, The Company, Offline, Epilogue

**Files:**
- Create: `components/chapters/zero-to-one.tsx`
- Create: `components/chapters/company.tsx`
- Create: `components/chapters/offline.tsx`
- Create: `components/chapters/epilogue.tsx`

**Interfaces:**
- Consumes: `STORY.zeroToOne` (`ventures: Venture[]`), `STORY.company`, `STORY.offline`, `STORY.epilogue`, primitives, `next/image`.
- Produces: default exports `ZeroToOne`, `Company`, `Offline`, `Epilogue`.

- [ ] **Step 1: Write `components/chapters/zero-to-one.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import ChapterHeading from "@/components/narrative/chapter-heading";
import ThreadSegment from "@/components/thread/thread-segment";
import { STORY, type Venture } from "@/lib/story";
import { useSectionInView } from "@/lib/hooks";

function VentureBlock({ venture, index }: { venture: Venture; index: number }) {
  const sunset = venture.status === "sunset";
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      className={`max-w-[58ch] ${sunset ? "opacity-80 saturate-[0.8]" : ""}`}
    >
      <h3 className="font-display text-3xl font-bold tracking-tight">
        {venture.name}
        {sunset && (
          <span className="ml-3 align-middle font-mono text-xs text-[var(--act-muted)]">
            sunset
          </span>
        )}
      </h3>
      <p className="font-mono text-sm text-terracotta">{venture.role}</p>
      <p className="mt-4 font-body text-lg leading-relaxed">{venture.story}</p>
      {venture.stack && (
        <p className="mt-3 font-mono text-xs text-[var(--act-muted)]">
          {venture.stack.join(" / ")}
        </p>
      )}
      {venture.href && (
        <a
          href={venture.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block font-mono text-sm text-terracotta underline underline-offset-4 transition-transform duration-150 active:scale-[0.97]"
        >
          Visit {venture.name}
        </a>
      )}
    </motion.article>
  );
}

export default function ZeroToOne() {
  const { ref } = useSectionInView("zero-to-one" as never, 0.15);
  const { intro, ventures } = STORY.zeroToOne;

  return (
    <section
      ref={ref}
      id="zero-to-one"
      className="relative scroll-mt-8 px-6 py-32 md:px-16 md:py-48"
    >
      <ThreadSegment curve="left" />
      <div className="relative mx-auto max-w-5xl">
        <ChapterHeading number={4} title="Zero to One" />
        <p className="mb-16 max-w-[52ch] font-body text-xl leading-relaxed md:text-2xl">
          {intro}
        </p>
        <div className="space-y-20">
          {ventures.map((v, i) => (
            <VentureBlock key={v.name} venture={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write `components/chapters/company.tsx`**

```tsx
"use client";

import Image from "next/image";
import { motion } from "motion/react";
import ChapterHeading from "@/components/narrative/chapter-heading";
import ThreadSegment from "@/components/thread/thread-segment";
import ClipReveal from "@/components/narrative/clip-reveal";
import { STORY } from "@/lib/story";
import { useSectionInView } from "@/lib/hooks";

export default function Company() {
  const { ref } = useSectionInView("company" as never, 0.1);
  const { origin, facts, capabilities, closing, href, screenshots } =
    STORY.company;

  return (
    <section ref={ref} id="company" className="relative scroll-mt-8">
      <ThreadSegment curve="right" thicken />
      <div className="relative px-6 py-32 md:px-16 md:py-48">
        <div className="mx-auto max-w-5xl">
          <ChapterHeading number={5} title="The Company" />
          <div className="max-w-[58ch] space-y-8">
            {origin.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8 }}
                className="font-body text-xl leading-relaxed md:text-2xl"
              >
                {text}
              </motion.p>
            ))}
          </div>

          <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {facts.map((fact, i) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
              >
                <dt className="font-mono text-xs text-[var(--act-muted)]">
                  {fact.label}
                </dt>
                <dd className="mt-1 font-display text-xl font-bold">
                  {fact.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      {screenshots.map((shot) => (
        <ClipReveal key={shot.src} className="mx-auto max-w-7xl px-6 md:px-16">
          <Image
            src={shot.src}
            alt={shot.alt}
            width={2400}
            height={1500}
            className="w-full rounded-lg"
            sizes="(max-width: 768px) 100vw, 90vw"
          />
        </ClipReveal>
      ))}

      <div className="px-6 py-24 md:px-16">
        <div className="mx-auto max-w-5xl">
          <ul className="max-w-3xl">
            {capabilities.map((cap, i) => (
              <motion.li
                key={cap}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                className="border-b border-[var(--act-muted)] py-4 font-display text-2xl font-bold tracking-tight last:border-b-0 md:text-3xl"
              >
                {cap}
              </motion.li>
            ))}
          </ul>
          <p className="mt-16 max-w-[58ch] font-body text-lg leading-relaxed text-[var(--act-muted)]">
            {closing}
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-terracotta px-8 py-4 font-display text-lg font-bold text-bone transition-transform duration-150 active:scale-[0.97]"
          >
            Visit Loonar
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write `components/chapters/offline.tsx` and `components/chapters/epilogue.tsx`**

`components/chapters/offline.tsx`:

```tsx
"use client";

import { motion } from "motion/react";
import ChapterHeading from "@/components/narrative/chapter-heading";
import ThreadSegment from "@/components/thread/thread-segment";
import { STORY } from "@/lib/story";
import { useSectionInView } from "@/lib/hooks";

export default function Offline() {
  const { ref } = useSectionInView("offline" as never, 0.4);

  return (
    <section
      ref={ref}
      id="offline"
      className="relative scroll-mt-8 px-6 py-32 md:px-16 md:py-40"
    >
      <ThreadSegment curve="left" />
      <div className="relative mx-auto max-w-5xl">
        <ChapterHeading number={6} title="Offline" />
        <div className="max-w-[52ch] space-y-6">
          {STORY.offline.paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8 }}
              className="font-body text-xl leading-relaxed md:text-2xl"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
```

`components/chapters/epilogue.tsx`:

```tsx
"use client";

import MaskedLines from "@/components/narrative/masked-lines";
import MilestoneDot from "@/components/thread/milestone-dot";
import { STORY } from "@/lib/story";
import { useSectionInView } from "@/lib/hooks";

export default function Epilogue() {
  const { ref } = useSectionInView("epilogue" as never, 0.6);
  const { line, links } = STORY.epilogue;

  return (
    <section
      ref={ref}
      id="epilogue"
      className="relative flex min-h-[70dvh] flex-col justify-center px-6 py-32 md:px-16"
    >
      <div className="mx-auto w-full max-w-5xl">
        <MaskedLines
          lines={[line]}
          className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold leading-tight tracking-tight"
        />
        <div className="mt-14 flex gap-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-2xl font-bold text-terracotta underline underline-offset-8 transition-transform duration-150 active:scale-[0.97] md:text-3xl"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="mt-24">
          <MilestoneDot />
        </div>
        <p className="mt-10 font-mono text-xs text-[var(--act-muted)]">
          Robin Dang, Amsterdam
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add components/chapters
git commit -m "feat: add Zero to One, Company, Offline, Epilogue chapters"
```

---

### Task 10: The swap (page.tsx, layout.tsx, hooks, types)

**Files:**
- Modify: `app/page.tsx` (full rewrite)
- Modify: `app/layout.tsx` (full rewrite of body composition; keep/update metadata + JSON-LD)
- Modify: `lib/types.ts` (SectionName becomes ChapterId)
- Modify: `lib/hooks.ts` (accept ChapterId)
- Modify: `context/active-section-context.tsx` (only if it imports SectionName; adjust import)

**Interfaces:**
- Consumes: everything from Tasks 2-9.
- Produces: the live site. `SectionName` type = `ChapterId` from `lib/story.ts`. After this task, remove the `as never` casts introduced in Tasks 5-9 (chapter components and rail).

- [ ] **Step 1: Update `lib/types.ts` and `lib/hooks.ts`**

In `lib/types.ts`, replace the `SectionName` definition (currently derived from `links`) with:

```ts
import type { ChapterId } from "./story";

export type SectionName = ChapterId;
```

Remove any other types that referenced `lib/data.ts` (`Experience`, `Education`, `SkillCategory`, `Project`) if they are only used by old components; leave them if still imported (they get deleted with their consumers in Task 12).

In `lib/hooks.ts`, no signature change is needed (it takes `SectionName`); verify it compiles against the new union.

- [ ] **Step 2: Remove the `as never` casts**

In `components/chapters/*.tsx` and `components/thread/chapter-rail.tsx`, replace every `useSectionInView("<id>" as never, ...)` with `useSectionInView("<id>", ...)` and `setActiveSection(chapter.id as never)` with `setActiveSection(chapter.id)`.

- [ ] **Step 3: Rewrite `app/page.tsx`**

```tsx
import Prologue from "@/components/chapters/prologue";
import TwoCultures from "@/components/chapters/two-cultures";
import Craft from "@/components/chapters/craft";
import Scale from "@/components/chapters/scale";
import ZeroToOne from "@/components/chapters/zero-to-one";
import Company from "@/components/chapters/company";
import Offline from "@/components/chapters/offline";
import Epilogue from "@/components/chapters/epilogue";
import ActBackground from "@/components/narrative/act-background";
import ChapterRail from "@/components/thread/chapter-rail";

export default function Home() {
  return (
    <main className="text-[var(--act-fg)]">
      <ActBackground />
      <ChapterRail />
      <Prologue />
      <TwoCultures />
      <Craft />
      <Scale />
      <ZeroToOne />
      <Company />
      <Offline />
      <Epilogue />
    </main>
  );
}
```

- [ ] **Step 4: Rewrite `app/layout.tsx`**

Keep the existing `metadata` export structure and JSON-LD block but update: description to "Robin Dang. Co-founder and CTO of Loonar. Software engineer building products end to end.", remove any email/cal.com from JSON-LD `sameAs`/contact fields (keep LinkedIn + GitHub), keep `@vercel/analytics`. Replace the body composition with:

```tsx
import type { Metadata } from "next";
import { MotionConfig } from "motion/react";
import "./globals.css";
import { displayFont, bodyFont } from "./fonts";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { Analytics } from "@vercel/analytics/react";

// ... keep existing metadata export, updated as described above ...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-act="cream"
      className={`${displayFont.variable} ${bodyFont.variable} scroll-smooth`}
    >
      <body className="font-body antialiased">
        <MotionConfig reducedMotion="user">
          <ActiveSectionContextProvider>
            {children}
          </ActiveSectionContextProvider>
        </MotionConfig>
        <Analytics />
      </body>
    </html>
  );
}
```

Notes: `MotionConfig` is a client boundary; if Next errors on using it directly in the server layout, create `components/narrative/motion-provider.tsx` with `"use client"` that wraps children in `<MotionConfig reducedMotion="user">` and use that instead. Remove `ThemeContextProvider`, `ThemeSwitch`, `Header`, `Footer`, `CosmicBackground`, `ScrollProgress` and their imports. Check `context/active-section-context.tsx` for a default-vs-named export mismatch and its initial `activeSection` value: set it to `"prologue"`.

- [ ] **Step 5: Verify in the browser**

Run: `npm run build` (must pass), then `npm run dev` in the background. With the Playwright MCP tools: navigate to `http://localhost:3000` at 1440x900, scroll through all eight chapters, confirm: thesis masked reveal on load; thread draws on scroll; background morphs cream to slate at Scale and back to cream at The Company; pinned quote holds; rail highlights chapters; epilogue shows LinkedIn + GitHub only. Then resize to 390x844 and confirm the left-rail thread and single-column layout. Kill the dev server.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/layout.tsx lib/types.ts lib/hooks.ts components context
git commit -m "feat: swap site to The Thread narrative page"
```

---

### Task 11: Chapter-tuned intersection thresholds and act timing polish

**Files:**
- Modify: `components/chapters/*.tsx` (thresholds), `lib/hooks.ts` (only if a chapter never activates)

**Interfaces:** none new; tuning pass.

- [ ] **Step 1: Verify every chapter activates the rail**

Dev server + Playwright: scroll slowly through the page; watch the rail. Every chapter's dot must activate at the point where that chapter dominates the viewport (the old site had a known mistuned-threshold bug for short sections). Tall pinned sections (`scale`, `company`) need low thresholds (0.1); short sections (`offline`, `epilogue`) need high ones (0.4-0.6). Adjust the second argument of each `useSectionInView` call until correct. If a very tall section still never reaches its threshold, change that chapter to `useSectionInView(id, 0.05)`.

- [ ] **Step 2: Verify act switching feels right**

The cream-to-slate morph should complete before the Scale headline is center-viewport, and daylight should return as The Company heading enters. If switching lags, raise the `scale` threshold slightly (0.1 to 0.15) so activation fires earlier.

- [ ] **Step 3: Commit**

```bash
git add components lib
git commit -m "fix: tune chapter thresholds for rail and act switching"
```

---

### Task 12: Demolition

**Files:**
- Delete: `components/home/ components/experiences/ components/projects/ components/skills/ components/about/ components/education/ components/contact/ components/footer/ components/header/ components/theme-switch/ components/section-heading/ components/section-divider/ components/ui/` (entire directory), `context/theme-context.tsx`, `lib/data.ts`
- Modify: `app/globals.css` (purge), `package.json` (remove deps), `lib/types.ts` (remove orphaned types)

- [ ] **Step 1: Delete old components and data**

```bash
cd /Users/robindang/Documents/projects/me
git rm -r components/home components/experiences components/projects components/skills \
  components/about components/education components/contact components/footer \
  components/header components/theme-switch components/section-heading \
  components/section-divider components/ui context/theme-context.tsx lib/data.ts
```

- [ ] **Step 2: Purge globals.css**

Remove from `app/globals.css`: all `--animate-*` tokens and their `@keyframes` (`background-position-spin`, `gradient`, `float`, `fadeIn`, `slideUp`, `slideDown`, `scaleIn`, `textReveal`, `underlineExpand`, `rainbow`, `shine`, `shimmer-slide`, `spin-around`), the `--color-1` through `--color-5` rainbow tokens, the `.dark` HSL semantic variable block and `:root` HSL block (`--background`, `--foreground`, `--primary`, etc.) IF no remaining file references them (grep first: `grep -rn "bg-background\|text-foreground\|bg-card\|text-muted-foreground" app components lib`), the `@custom-variant dark` line, `editorial-*` utility classes, and the old `--font-sans` token. Keep: `--font-mono`, the Task 3 additions, base resets, `--radius` if still referenced.

- [ ] **Step 3: Remove dependencies**

```bash
npm uninstall framer-motion react-vertical-timeline-component
grep -rn "framer-motion\|react-vertical-timeline" app components lib || echo "clean"
```

Expected: "clean". Also remove now-unused types from `lib/types.ts` (`Experience`, `Education`, `SkillCategory`, etc.).

- [ ] **Step 4: Verify build, lint, and browser**

Run: `npm run build && npm run lint`
Expected: both pass with zero references to deleted files. Quick browser smoke check: page renders identically to Task 11's state.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove legacy sections, UI kit, theme system, and dead deps"
```

---

### Task 13: SEO surfaces

**Files:**
- Modify: `app/opengraph-image.tsx`, `app/sitemap.ts` (verify only), `app/robots.ts` (verify only), `app/layout.tsx` (JSON-LD verify)

- [ ] **Step 1: Update the OG image**

In `app/opengraph-image.tsx`, restyle to the new identity: cream `#f5f0e6` background, ink `#26221f` text "Robin Dang" large + "Co-Founder and CTO, Loonar" smaller, one terracotta `#b85a32` horizontal line element (the thread). Remove any old palette colors and font references (OG images use their own inline styles; system font stack is fine here).

- [ ] **Step 2: Verify sitemap, robots, JSON-LD**

`app/sitemap.ts` and `app/robots.ts` should already reference only the root URL; confirm unchanged behavior. In layout's JSON-LD confirm: no email, `sameAs` contains only the LinkedIn and GitHub URLs, `jobTitle` is "Co-Founder and CTO", `worksFor` is Loonar.

- [ ] **Step 3: Build and commit**

```bash
npm run build
git add app
git commit -m "feat: update OG image and structured data for The Thread"
```

---

### Task 14: Full verification, design detector, PRODUCT.md and DESIGN.md

**Files:**
- Create: `PRODUCT.md`, `DESIGN.md`

- [ ] **Step 1: Copy audit (mechanical)**

```bash
grep -rn "—\|–" components/chapters components/narrative components/thread lib/story.ts && echo "FAIL: dashes found" || echo "PASS: no em/en dashes"
grep -rn "cal.com\|mailto\|robindang95" app components lib && echo "FAIL: banned contact found" || echo "PASS"
grep -rn "window.addEventListener(.scroll" components && echo "FAIL" || echo "PASS: no scroll listeners"
```

Expected: three PASS lines.

- [ ] **Step 2: Browser verification matrix**

Dev server + Playwright, verify and screenshot each:
1. Desktop 1440x900: full scroll-through; all 8 chapters; thread draws; two pins work; acts morph.
2. Mobile 390x844: left-rail thread, no rail nav, no content clipped, readable screenshots.
3. Emulate `prefers-reduced-motion: reduce` (Playwright `emulateMedia`): page loads with thread fully drawn, content visible without motion, no opacity-0 orphans anywhere on full scroll.
4. Emulate `prefers-color-scheme: dark`: cream act renders the dimmer `#ece5d8`.
5. Console: zero errors/warnings from motion or Next/Image.

- [ ] **Step 3: Lighthouse**

Run the Chrome DevTools MCP `lighthouse_audit` against `http://localhost:3000` (or `npx lighthouse http://localhost:3000 --preset=desktop`). Expected: Performance, Accessibility, Best Practices, SEO all ≥ 95. If Performance < 95, check: font preload, screenshot image sizes, act-layer paint cost.

- [ ] **Step 4: Impeccable detector + taste pre-flight**

```bash
node /Users/robindang/.claude/skills/impeccable/scripts/detect.mjs --json app components
```

Review findings; fix real violations. Then run the taste-skill pre-flight checklist manually against the built page (eyebrow count: chapter numbers are the only mono labels; hero fits viewport with ≤2-line headline and ≤20-word sub; no duplicate CTA intent: "Visit Loonar" is the page's only CTA besides epilogue links; single accent; shape consistency: rounded-full CTA + rounded-lg images documented as the two-radius rule).

- [ ] **Step 5: Write PRODUCT.md and DESIGN.md**

`PRODUCT.md`: what the site is (personal narrative portfolio for Robin Dang), audience (mixed personal brand), the one conversion action (visit Loonar / connect on LinkedIn-GitHub), content source (`lib/story.ts`), fact-check rule (all claims trace to spec §4).

`DESIGN.md`: The Thread concept; act system (cream/slate, single fixed layer); type (Cabinet Grotesk display / General Sans body / mono annotations); single terracotta accent; motion registers (600-900ms narrative with `cubic-bezier(0.23,1,0.32,1)`, ≤200ms UI); two-pin budget; radius rule; copy rules (no em-dashes, no scroll cues, metrics only from spec).

- [ ] **Step 6: Final commit**

```bash
git add PRODUCT.md DESIGN.md
git commit -m "docs: add PRODUCT.md and DESIGN.md for The Thread design system"
```

- [ ] **Step 7: User fact-check gate**

Present the running site to Robin for the spec §11 fact-check (Ch.1 family prose, Uber/Booking phrasing, Loonar numbers, thesis links). Do not deploy before approval.

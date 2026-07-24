# PRODUCT.md

## What this is

A personal narrative portfolio for Robin Dang, built as one continuous scroll-driven
story ("The Thread") rather than a conventional multi-section resume site. The site
replaces the old 7-section template stack (Home / Experience / Projects / Skills /
About / Education / Contact) with a prologue, five numbered chapters, and an
epilogue, each rendered as a single client component under `components/chapters/`.

## Identity

Robin Dang is a software engineer. He does production engineering at Uber (the
day job: SRE-adjacent work on Uber's hardest, most critical incidents) and is the
co-founder and technical lead of Loonar on the side (a bootstrapped startup in AI
for engineering procurement). Loonar is presented as one venture among several in
Chapter 4 ("Zero to One"), not as the site's destination or a dedicated chapter.
The primary identity on the page, in the prologue and in metadata, is "software
engineer" first.

## Audience

Mixed / personal brand. Anyone landing on the site (recruiter, engineer,
founder, collaborator, curious stranger) should walk away with a memorable,
credible impression of who Robin is and what he has built, without needing prior
context.

## The one conversion action

There is no lead-gen form, no CTA button, no email, no cal.com link anywhere on
the site. The single conversion action is: **connect on LinkedIn or GitHub**,
offered exactly once, in the epilogue, as two plain underlined text links
(`linkedin.com/in/robin-dang` and `github.com/rpdang`). Venture entries in
Chapter 4 (Legora, Loonar) carry their own plain underline links out to those
products, but these are context links, not calls to action, and are visually and
semantically distinct from the epilogue's connect links (see DESIGN.md's copy
rules on link-label uniqueness).

## Content source

All narrative copy, dates, numbers, and links live in `lib/story.ts` as a single
typed `STORY` object plus a `CHAPTERS` array that drives chapter metadata (id,
number, title, act). Chapter components (`components/chapters/*.tsx`) are pure
presentation: they import from `STORY` and render it, they do not hardcode
narrative content. Changing the story means editing `lib/story.ts`; changing
how a chapter looks means editing its component.

## Fact-check rule

Every biographical, professional, or numeric claim on the site must trace back to
the canonical content facts in
`docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md` §4 ("Canonical
content facts, from interview 2026-07-24") and its subsequent story-rebalance
amendment at the bottom of the same file. Nothing about Robin's employers,
education, ventures, or personal life should be invented or embellished beyond
what §4 states. In particular:

- Ch. 1 (Two Cultures): family/origin story wording must match the approved
  framing in §4 exactly in substance (parents left Vietnam after the war,
  rebuilt in Sweden, neither finished high school; Robin born in Sweden).
- Ch. 3 (Scale): Uber and Booking.com phrasing must match §4 ("production
  engineering", "eliminate incident categories forever", the Booking.com
  greenfield tool for account managers).
- Ch. 4 (Zero to One): Loonar's numbers and description (pre-seed/bootstrapped,
  pilot customers, co-founder and technical lead) must not drift from §4 or
  from what is currently deployed on `loonar-ai.com`.
- Any thesis links, dates, or role titles must be verifiable, not approximated.

Per spec §11 ("Out of scope / open items"), full narrative prose, especially
the Ch. 1 family story and any employer-related phrasing for Uber/Booking, must
be approved by Robin before the site is deployed. This is a hard gate, not a
formality.

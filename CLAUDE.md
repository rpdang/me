# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

This is a **Next.js 16 App Router** personal portfolio site using React 19, TypeScript, and Tailwind CSS v4.

### Key Directories

- `app/` - Next.js App Router pages, layouts, and SEO files (sitemap.ts, robots.ts, opengraph-image.tsx)
- `components/` - React components organized by section (home, experiences, projects, skills, about, education, contact, footer, header)
- `components/ui/` - Reusable UI primitives with animations (BlurFade, MagicCard, ShimmerButton, Dock, CosmicBackground, etc.)
- `context/` - React Context providers for theme and active section tracking
- `lib/` - Utilities, hooks, types, and portfolio data
- `public/logos/` - Company and technology logo assets

### Component Pattern

Each section component follows a barrel export pattern:
```
components/home/
  ├── index.ts           # Re-exports default from main component
  ├── home.tsx           # Main component using useSectionInView hook
  └── [subcomponents]/   # avatar/, intro-text/, connect-section/
```

**Client Components:** Most components use `'use client'` directive for animations and interactivity. Common pattern:
```tsx
"use client";
export default function SectionName() {
  const { ref } = useSectionInView("SectionName", threshold);
  return (
    <section ref={ref} id="section-id">
      <BlurFade delay={0.1} inView>
        <SectionHeading>Title</SectionHeading>
      </BlurFade>
      {/* Content */}
    </section>
  );
}
```

### State Management

Two React Contexts wrap the app (in `layout.tsx`):
- **ThemeContextProvider** - Light/dark theme with localStorage persistence, respects system preferences
- **ActiveSectionContextProvider** - Tracks which section is in viewport for nav highlighting, stores time of last manual click

### Active Section Detection

Sections use `useSectionInView(sectionName, threshold)` hook from `lib/hooks.ts` which combines `react-intersection-observer` with the active section context. Only updates if section is in view AND more than 1 second since last manual nav click.

### Animation Libraries

- **framer-motion / motion** - Page transitions, scroll animations, hover effects
- **BlurFade** - Scroll-triggered blur + fade animation component
- **MagicCard** - Mouse-following gradient card effect
- **ShimmerButton** - Animated shimmer button effect
- **CosmicBackground** - Particle system background
- **Dock** - macOS Dock-style navigation with magnification effect

### Styling

**Tailwind CSS v4** with `@theme` syntax in `globals.css`:
- Editorial color palette: terracotta (`#b85a32`), burgundy (`#822e3a`), gold (`#d4a84b`), cream/stone/charcoal neutrals
- CSS variables for semantic colors and shadows
- Class-based dark mode via `@custom-variant dark (&:is(.dark *))`
- Typography: Poppins (headlines), Lora (body), SF Mono/Fira Code (code)
- Custom keyframe animations: `shine`, `gradient`, `float`, `fadeIn`, `slideUp`, `textReveal`
- `cn()` utility from `lib/utils.ts` for conditional class merging (clsx + tailwind-merge)

### Data

All portfolio content is centralized in `lib/data.ts`:
- `links` - Navigation items (7 sections)
- `experiencesData` - Work experience with `gridClass` for responsive CSS Grid positioning
- `educationData` - Education timeline with optional descriptions
- `skillCategories` - Skills organized by category with devicon slugs
- `projectsData` - Projects with images, tags, and demo URLs

### External Resources

- **Devicons via jsDelivr CDN** - Skill icons loaded from `cdn.jsdelivr.net/gh/devicons/devicon`
- **Company logos** - Stored locally in `public/logos/`

### SEO

- Metadata API configuration in `layout.tsx`
- JSON-LD structured data
- Dynamic `sitemap.ts` and `robots.ts`
- OpenGraph image generation via `opengraph-image.tsx`

### Key Dependencies

- Next.js 16.1.0, React 19.2.3, TypeScript 5.9.3
- Tailwind CSS 4.1.18 (@tailwindcss/postcss)
- framer-motion 12.x, class-variance-authority, tailwind-merge
- @radix-ui primitives, lucide-react, react-icons
- react-intersection-observer, react-vertical-timeline-component
- @vercel/analytics

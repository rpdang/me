# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

This is a **Next.js 14 App Router** personal portfolio site using TypeScript and Tailwind CSS.

### Key Directories

- `app/` - Next.js App Router pages and layouts
- `components/` - React components organized by section (home, about, projects, skills, etc.)
- `components/ui/` - Reusable UI primitives (shadcn/ui style with Magic UI animations)
- `context/` - React Context providers for theme and active section tracking
- `lib/` - Utilities, hooks, types, and portfolio data

### Component Pattern

Each section component follows a barrel export pattern:
```
components/home/
  ├── index.ts      # Re-exports default from main component
  ├── home.tsx      # Main component using useSectionInView hook
  └── [subcomponents]/
```

### State Management

Two React Contexts wrap the app (in `layout.tsx`):
- **ThemeContextProvider** - Light/dark theme with localStorage persistence
- **ActiveSectionContextProvider** - Tracks which section is in viewport for nav highlighting

### Active Section Detection

Sections use `useSectionInView(sectionName, threshold)` hook from `lib/hooks.ts` which combines `react-intersection-observer` with the active section context.

### Styling

- Tailwind CSS with warm editorial color palette (terracotta, burgundy, warm neutrals)
- CSS variables for shadcn semantic colors (defined in `globals.css`)
- Class-based dark mode (`darkMode: ['class']`)
- Typography: Playfair Display (headlines), Source Sans 3 (body), JetBrains Mono (code)
- Custom utilities: `editorial-headline`, `editorial-link`, `editorial-shadow`
- Subtle animations with sophisticated restraint (reduced blur, slower timings)
- `cn()` utility from `lib/utils.ts` for conditional class merging

### Data

All portfolio content (experiences, education, projects, skills, nav links) is centralized in `lib/data.ts`.

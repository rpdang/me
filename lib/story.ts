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
        href: "https://www.diva-portal.org/smash/record.jsf?pid=diva2%3A1464600",
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
        href: "https://www.diva-portal.org/smash/record.jsf?dswid=4748&pid=diva2%3A1695524",
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

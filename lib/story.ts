export type ChapterId =
  | "prologue"
  | "two-cultures"
  | "craft"
  | "scale"
  | "zero-to-one"
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
  { id: "offline", number: 5, title: "Offline", act: "cream" },
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
}

export const STORY = {
  prologue: {
    headlineLines: ["Always", "building."],
    sub: "Robin Dang. Software engineer between two cultures, always making something, always looking for the next thing worth building.",
    credentials: ["Uber", "Booking.com", "Legora (YC W24)", "Nasdaq"],
  },

  twoCultures: {
    paragraphs: [
      "My parents left Vietnam after the war and rebuilt their lives in Sweden. Neither of them finished high school.",
      "I was born there, between two cultures. Vietnamese at home, Swedish everywhere else. The classic second generation story.",
      "Growing up like that taught me one thing early.",
    ],
    pullQuote: ["Nothing arrives", "finished."],
    closing:
      "I built what I wanted from whatever I had. I have been building ever since.",
    coordinates: "Stockholm 59.3293 N / Paris 48.8566 N / Amsterdam 52.3676 N",
  },

  craft: {
    intro:
      "Theory at KTH by day. Nasdaq's market infrastructure in between. I learned the craft from both directions.",
    milestones: [
      {
        title: "B.Sc. Computer Science, KTH",
        detail:
          "Thesis: machine learning for breast cancer classification.",
        period: "2017 to 2020",
        href: "https://www.diva-portal.org/smash/record.jsf?pid=diva2%3A1464600",
        linkLabel: "Read the B.Sc. thesis",
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
        linkLabel: "Read the M.Sc. thesis",
      },
    ] satisfies Milestone[],
  },

  scale: {
    booking: {
      company: "Booking.com",
      role: "Senior Software Engineer",
      period: "2022 to 2024",
      story:
        "Hotel partnerships ran on spreadsheets. I led a small team that replaced them with one internal tool, now in every account manager's hands.",
    },
    uber: {
      company: "Uber",
      role: "Software Engineer, Production Engineering",
      period: "2024 to present",
      story:
        "Production engineering sits between SRE and software engineering. I take Uber's hardest incidents apart and build what makes them impossible to repeat.",
    },
    pinnedQuote: "Anyone can fix an incident. The job is making it the last one.",
    stat: { value: 100, suffix: "%", label: "of account managers on the tool my team built" },
  },

  zeroToOne: {
    intro:
      "Millions of users taught me rigor. Zero users taught me everything else.",
    ventures: [
      {
        name: "Legora",
        role: "Founding Software Engineer",
        story:
          "Joined Leya AI (YC W24) as a founding engineer and helped ship v0 of an agentic RAG product for legal work. Still proud of that first version.",
        status: "live",
        stack: ["TypeScript", "RAG", "LLM agents"],
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
      {
        name: "Loonar",
        role: "Co-Founder and CTO",
        story:
          "Consulting on AI projects, the same request kept coming from unrelated clients: help us survive RFQs in engineering procurement. So I co-founded Loonar to productize the answer. Early days: bootstrapped, pilot customers, and a small engineering team I lead as the technical co-founder.",
        status: "live",
        stack: ["Python", "FastAPI", "React", "GCP"],
      },
    ] satisfies Venture[],
  },

  offline: {
    paragraphs: [
      "Off the keyboard: tennis, the gym, running along the Amstel.",
      "And cooking. Vietnamese when I miss home, Swedish and Italian when I miss the other home.",
    ],
  },

  epilogue: {
    line: "The next chapter is still being written.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/robin-dang" },
      { label: "GitHub", href: "https://github.com/rpdang" },
    ],
  },
} as const;

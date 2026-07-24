import type { Metadata } from "next";
import { MotionConfig } from "motion/react";
import "./globals.css";
import { displayFont, bodyFont } from "./fonts";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://robindang.me"),
  title: "Robin Dang | Software Engineer",
  description:
    "Robin Dang. Software engineer. Production engineering at Uber, co-founder of Loonar. Building products end to end.",
  keywords: [
    "Robin Dang",
    "Software Engineer",
    "Production Engineering",
    "Uber",
    "Full Stack Developer",
    "Co-Founder",
    "Loonar",
    "Portfolio",
  ],
  authors: [{ name: "Robin Dang" }],
  creator: "Robin Dang",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://robindang.me",
    title: "Robin Dang | Software Engineer",
    description:
      "Robin Dang. Software engineer. Production engineering at Uber, co-founder of Loonar. Building products end to end.",
    siteName: "Robin Dang Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robin Dang | Software Engineer",
    description:
      "Robin Dang. Software engineer. Production engineering at Uber, co-founder of Loonar. Building products end to end.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Robin Dang",
  jobTitle: "Software Engineer",
  description: "Software Engineer at Uber and Co-Founder & CTO of Loonar",
  url: "https://robindang.me",
  sameAs: [
    "https://github.com/rpdang",
    "https://linkedin.com/in/robin-dang",
  ],
  knowsAbout: [
    "Software Engineering",
    "TypeScript",
    "React",
    "Next.js",
    "Java",
    "Python",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Uber",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "KTH Royal Institute of Technology",
  },
};

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="font-body antialiased">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
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

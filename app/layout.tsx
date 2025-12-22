import Footer from "@/components/footer";
import Header from "@/components/header";
import ThemeSwitch from "@/components/theme-switch";
import { CosmicBackground } from "@/components/ui/cosmic-background";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import ActiveSectionContextProvider from "@/context/active-section-context";
import ThemeContextProvider from "@/context/theme-context";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://robindang.me"),
  title: "Robin Dang | Software Engineer",
  description:
    "Robin Dang's portfolio - Software Engineer & Technical Lead with experience at Uber, Booking.com, and startups.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Robin Dang",
  ],
  authors: [{ name: "Robin Dang" }],
  creator: "Robin Dang",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://robindang.me",
    title: "Robin Dang | Software Engineer",
    description:
      "Software Engineer & Technical Lead with experience at Uber, Booking.com, and startups.",
    siteName: "Robin Dang Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robin Dang | Software Engineer",
    description:
      "Software Engineer & Technical Lead with experience at Uber, Booking.com, and startups.",
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
  description: "Software Engineer & Technical Lead",
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
    <html lang="en" className="scroll-smooth!">
      <body className="font-sans bg-background text-foreground relative pt-28 sm:pt-36 min-h-screen overflow-x-hidden">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {/* Clean editorial background */}
        <div className="fixed inset-0 -z-20 bg-background" />

        {/* Subtle paper texture overlay */}
        <div
          className="fixed inset-0 -z-10 opacity-[0.015] dark:opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Cosmic particle background */}
        <CosmicBackground className="fixed inset-0 -z-15" />

        {/* Subtle warm accent in corner - editorial style */}
        <div
          className="fixed -top-1/4 -right-1/4 w-[800px] h-[800px] -z-10 opacity-[0.02] dark:opacity-[0.03] pointer-events-none rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          }}
        />

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            {/* Scroll progress indicator - editorial terracotta */}
            <ScrollProgress className="fixed top-0 left-0 right-0 z-1000 h-[2px] bg-primary" />

            <Header />
            {children}
            <Footer />
            <ThemeSwitch />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "hsl(var(--card))",
                  color: "hsl(var(--card-foreground))",
                  border: "1px solid hsl(var(--border))",
                },
              }}
            />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
        <Analytics />
      </body>
    </html>
  );
}

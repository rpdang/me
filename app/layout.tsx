import Footer from '@/components/footer';
import Header from '@/components/header';
import ThemeSwitch from '@/components/theme-switch';
import ActiveSectionContextProvider from '@/context/active-section-context';
import ThemeContextProvider from '@/context/theme-context';
import { JetBrains_Mono, Playfair_Display, Source_Sans_3 } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Robin Dang | Software Engineer',
  description: "Robin Dang's portfolio - Software Engineer & Technical Lead",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth!">
      <body
        className={`${jetbrainsMono.variable} ${playfairDisplay.variable} ${sourceSans.variable} font-sans bg-background text-foreground relative pt-28 sm:pt-36 min-h-screen overflow-x-hidden`}
      >
        {/* Clean editorial background */}
        <div className="fixed inset-0 -z-20 bg-background" />

        {/* Subtle paper texture overlay */}
        <div
          className="fixed inset-0 -z-10 opacity-[0.015] dark:opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Subtle warm accent in corner - editorial style */}
        <div
          className="fixed -top-1/4 -right-1/4 w-[800px] h-[800px] -z-10 opacity-[0.02] dark:opacity-[0.03] pointer-events-none rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
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
                  background: 'hsl(var(--card))',
                  color: 'hsl(var(--card-foreground))',
                  border: '1px solid hsl(var(--border))',
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

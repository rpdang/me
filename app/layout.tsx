import Footer from '@/components/footer';
import Header from '@/components/header';
import ThemeSwitch from '@/components/theme-switch';
import ActiveSectionContextProvider from '@/context/active-section-context';
import ThemeContextProvider from '@/context/theme-context';
import { JetBrains_Mono, Outfit } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { Particles } from '@/components/ui/particles';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const outfit = Outfit({
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
        className={`${jetbrainsMono.variable} ${outfit.variable} font-sans bg-background text-foreground relative pt-28 sm:pt-36 min-h-screen overflow-x-hidden`}
      >
        {/* Ambient background gradient - subtle version for light mode */}
        <div className="fixed inset-0 -z-20 bg-linear-to-b from-background via-background to-background" />
        
        {/* Neon accent glows - positioned for visual interest */}
        <div className="fixed top-[-20%] right-[-10%] -z-10 h-160 w-160 rounded-full bg-neon-cyan/5 blur-[120px] dark:bg-neon-cyan/10" />
        <div className="fixed bottom-[-20%] left-[-10%] -z-10 h-160 w-160 rounded-full bg-neon-magenta/5 blur-[120px] dark:bg-neon-magenta/10" />
        
        {/* Interactive particle background */}
        <Particles
          className="fixed inset-0 -z-10 opacity-40 dark:opacity-60"
          quantity={80}
          staticity={50}
          ease={50}
          color="var(--neon-cyan, #00fff0)"
          size={0.4}
        />
        
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            {/* Scroll progress indicator */}
            <ScrollProgress className="fixed top-0 left-0 right-0 z-1000 h-[2px] bg-linear-to-r from-neon-cyan via-neon-purple to-neon-magenta" />
            
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

import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Robin Dang | Me',
  description:
    "Explore Robin Dang's comprehensive portfolio, showcasing the diverse skills and expertise of a seasoned software engineer and full-stack developer. Discover a collection of interesting projects, demonstrating a passion for crafting effective solutions and pushing the boundaries of technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import './globals.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  description: 'Portfolio tracking and USDC management',
  title: 'Crypto Wallet'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} flex min-h-screen items-center justify-center p-4 font-sans md:p-8`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

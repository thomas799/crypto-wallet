import type { Metadata } from 'next';

import './globals.css';
import { Providers } from './providers';

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
      <body className="flex min-h-screen items-center justify-center p-4 font-sans md:p-8">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

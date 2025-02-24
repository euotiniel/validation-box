import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { GeistSans } from 'geist/font/sans';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

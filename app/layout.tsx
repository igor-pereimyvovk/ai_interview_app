import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Mona_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const monaSans = Mona_Sans({
  variable: '--font-mona-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Preparation',
  description: 'An AI powered platform for preparing for interviews',
};

type LayoutProps = {
  children: Readonly<ReactNode>;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

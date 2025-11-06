import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from '@/components/ui/Toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Portify - Create Your Professional Portfolio in Minutes',
  description: 'Build beautiful portfolios without coding. Choose a template, add your content, and share your work with the world.',
  keywords: ['portfolio', 'developer portfolio', 'designer portfolio', 'portfolio builder', 'free portfolio'],
  authors: [{ name: 'Portify' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portify.app',
    siteName: 'Portify',
    title: 'Portify - Create Your Professional Portfolio in Minutes',
    description: 'Build beautiful portfolios without coding.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portify - Create Your Professional Portfolio in Minutes',
    description: 'Build beautiful portfolios without coding.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from '@/components/ui/Toast';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { useErrorBoundary } from '@/lib/utils/logger';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Portify - Create Your Professional Portfolio in Minutes',
  description: 'Build beautiful portfolios without coding. Choose a template, add your content, and share your work with the world.',
  keywords: ['portfolio', 'developer portfolio', 'designer portfolio', 'portfolio builder', 'free portfolio'],
  authors: [{ name: 'Portify' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://portify.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Portify',
    title: 'Portify - Create Your Professional Portfolio in Minutes',
    description: 'Build beautiful portfolios without coding.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Portify - Portfolio Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portify - Create Your Professional Portfolio in Minutes',
    description: 'Build beautiful portfolios without coding.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Ajouter les codes de vérification si nécessaire
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize error boundary logging
  useErrorBoundary();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
          <ToastContainer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
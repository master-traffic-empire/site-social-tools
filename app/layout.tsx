import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import siteConfig from '@/site.config';
import Script from 'next/script';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'SocialKit — Free Social Media Tools for Creators',
    template: '%s | SocialKit',
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.baseUrl),
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: 'SocialKit — Free Social Media Tools for Creators',
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.ga4}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            if (new URLSearchParams(window.location.search).has('_internal')) {
              window['ga-disable-${siteConfig.ga4}'] = true;
            }
            gtag('config', '${siteConfig.ga4}');
          `}
        </Script>
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <style>{`
          .tool-card:hover {
            border-color: var(--border-light);
            background: var(--bg-card-hover);
            transform: translateY(-2px);
            box-shadow: var(--shadow);
          }
        `}</style>
      </body>
    </html>
  );
}

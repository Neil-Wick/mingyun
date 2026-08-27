import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
});

// -----------------------------------------------------------------------------
// Plausible analytics (free privacy-friendly SaaS)
//
// SETUP:
// 1) Go to https://plausible.io and create a free trial account (or use any
//    self-hosted / community Plausible instance — the protocol is identical).
// 2) Add a new site with the exact domain you will deploy on, e.g.
//    "bazicareer.com", "tiny-melba-5e4afb.netlify.app", or whatever.
// 3) Replace the `data-domain` attribute below with that exact domain string.
// 4) Replace `src` with your Plausible instance URL:
//      - Plausible SaaS (official):        https://plausible.io/js/script.js
//      - Plausible self-hosted example:   https://p.yourdomain.com/js/script.js
//
// Plausible does the heavy lifting on UV counting, already has bot/crawler
// filtering, per-country breakdown, and per-event funnel graphs. We layer
// our own validation (CN exclude + server-side checks) on top via custom
// events (valid_visit / form_submitted / email_entered / ...) so the
// Plausible dashboard becomes your MVP truth panel.
// -----------------------------------------------------------------------------
const PLAUSIBLE_ENABLED = true; // ← SET TO TRUE ONCE YOU HAVE A DOMAIN
const PLAUSIBLE_DOMAIN = "tiny-melba-5e4afb.netlify.app";
const PLAUSIBLE_SCRIPT_SRC = "https://plausible.io/js/script.js";

export const metadata: Metadata = {
  title: "What Career Path Fits Your Energy? | Free Ba Zi Career Reading",
  description:
    "Discover your career blueprint in 60 seconds. Enter your birth date to see your personality type, element strengths, and best-fit careers — based on the ancient Ba Zi system. No email required.",
  keywords: [
    "career quiz",
    "career personality test",
    "ba zi career",
    "career fit",
    "personality type career",
    "chinese astrology career",
    "five elements career",
    "day master",
    "career self-discovery",
  ],
  openGraph: {
    title: "What Career Path Fits Your Energy?",
    description:
      "Get your career blueprint in 60 seconds — personality type, element strengths, and best-fit careers. Free, no email required.",
    type: "website",
    locale: "en_US",
    siteName: "BaZi Career",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Career Path Fits Your Energy?",
    description:
      "Your personality type + element strengths + best-fit careers — in 60 seconds. Free.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#d4452f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {PLAUSIBLE_ENABLED && (
          <Script
            defer
            strategy="afterInteractive"
            data-domain={PLAUSIBLE_DOMAIN}
            src={PLAUSIBLE_SCRIPT_SRC}
          />
        )}
        {/*
          Even when Plausible is disabled, we wire a noop window.plausible().
          This way `lib/analytics.ts` can unconditionally call window.plausible
          and the call will succeed (just noop). When you flip
          PLAUSIBLE_ENABLED=true later, the real script will replace it.
        */}
        <Script
          id="plausible-noop"
          strategy="beforeInteractive"
        >{`
          (function(){
            if (typeof window === 'undefined') return;
            if (typeof window.plausible === 'function') return;
            window.plausible = function() { /* noop until real script loads */ };
          })();
        `}</Script>
      </head>
      <body>{children}</body>
    </html>
  );
}

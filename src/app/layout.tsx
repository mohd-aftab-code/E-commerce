import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import React from "react";
import "./globals.css";
import { siteConfig } from "@/config/site";

/**
 * Primary font — Outfit: clean, modern, matches the theme.
 */
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

/**
 * Root metadata — defaults for all pages.
 * Individual pages/layouts override via their own `metadata` export.
 */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),

  title: {
    default: "Print Studio 24 | Premium Custom Printing Services in Tampa, FL",
    template: "%s | Print Studio 24"
  },
  description: "High-quality custom printing for business cards, flyers, banners, and promotional materials in Tampa, Florida. Fast turnaround and premium quality guaranteed.",
  keywords: ["printing tampa", "business cards", "custom apparel", "banners", "flyers", "promotional items"],
  authors: [{ name: "Print Studio 24" }],
  creator: "Print Studio 24",
  publisher: "Print Studio 24",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // ---------------------------------------------------------------------------
  // Icons — using the PS24 logo favicon
  // Next.js automatically picks up icon.png / apple-icon.png from app/
  // ---------------------------------------------------------------------------
  icons: {
    icon: [
      { url: "/logo/fevicon_brand_colors.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo/fevicon_brand_colors.png", type: "image/png" },
    ],
    shortcut: "/logo/fevicon_brand_colors.png",
  },

  // ---------------------------------------------------------------------------
  // Open Graph
  // ---------------------------------------------------------------------------
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://printstudio24.com",
    title: "Print Studio 24 | Premium Custom Printing in Tampa",
    description: "Your trusted partner for premium custom printing services in Tampa, FL.",
    siteName: "Print Studio 24",
    images: [
      {
        url: "/logo/brand-logo.png",
        width: 1200,
        height: 630,
        alt: "Print Studio 24 - Premium Printing",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Twitter / X
  // ---------------------------------------------------------------------------
  twitter: {
    title: `${siteConfig.name} | Custom Printing Services Tampa, FL`,
    description: siteConfig.description,
    images: ["/logo/brand-logo.png"],
  },

  // ---------------------------------------------------------------------------
  // Robots
  // ---------------------------------------------------------------------------
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ---------------------------------------------------------------------------
  // Theme color — matches brand navy from the logo
  // ---------------------------------------------------------------------------
  other: {
    "theme-color": "#0D1A5E",
    "msapplication-TileColor": "#0D1A5E",
    "msapplication-TileImage": "/logo/fevicon_brand_colors.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full`}>
      <head>
        {/* Theme color meta — brand navy for browser chrome */}
        <meta name="theme-color" content="#0D1A5E" />
        <meta name="msapplication-TileColor" content="#0D1A5E" />
      </head>
      <body className="flex min-h-full flex-col bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}

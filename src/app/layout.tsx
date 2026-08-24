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
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} | Custom Printing Services Tampa, FL`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  // ---------------------------------------------------------------------------
  // Icons — using the PS24 logo favicon
  // Next.js automatically picks up icon.png / apple-icon.png from app/
  // ---------------------------------------------------------------------------
  icons: {
    icon: [
      { url: "/logo/fevicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo/fevicon.png", type: "image/png" },
    ],
    shortcut: "/logo/fevicon.png",
  },

  // ---------------------------------------------------------------------------
  // Open Graph
  // ---------------------------------------------------------------------------
  openGraph: {
    type: siteConfig.openGraph.type,
    locale: siteConfig.openGraph.locale,
    url: siteConfig.url,
    siteName: siteConfig.openGraph.siteName,
    title: `${siteConfig.name} | Custom Printing Services Tampa, FL`,
    description: siteConfig.description,
    images: [
      {
        url: "/logo/logo (2).png",
        width: 1200,
        height: 630,
        alt: "Print Studio 24 — Custom Printing Services Tampa FL",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Twitter / X
  // ---------------------------------------------------------------------------
  twitter: {
    card: siteConfig.twitter.card,
    title: `${siteConfig.name} | Custom Printing Services Tampa, FL`,
    description: siteConfig.description,
    images: ["/logo/logo (2).png"],
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
    "msapplication-TileImage": "/logo/fevicon.png",
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

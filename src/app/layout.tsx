import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import { siteConfig } from "@/config/site";

/**
 * Primary font — Inter is a clean, modern sans-serif well-suited for
 * professional e-commerce and US business aesthetics.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Root metadata — used as defaults for all pages.
 * Individual pages and layouts override these via their own `metadata` exports.
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

  // Canonical URL will be set per-page
  alternates: {
    canonical: siteConfig.url,
  },

  openGraph: {
    type: siteConfig.openGraph.type,
    locale: siteConfig.openGraph.locale,
    url: siteConfig.url,
    siteName: siteConfig.openGraph.siteName,
    title: `${siteConfig.name} | Custom Printing Services Tampa, FL`,
    description: siteConfig.description,
  },

  twitter: {
    card: siteConfig.twitter.card,
    title: `${siteConfig.name} | Custom Printing Services Tampa, FL`,
    description: siteConfig.description,
  },

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

  // Verification tags — add values from Search Console / Bing Webmaster
  verification: {
    // google: "...",
    // yandex: "...",
    // bing: "...",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}

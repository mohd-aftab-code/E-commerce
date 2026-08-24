/**
 * Site-wide configuration used for SEO, metadata, and business identity.
 *
 * All values that are sensitive (phone, email, etc.) are pulled from environment
 * variables so they are never hard-coded in source control.
 *
 * Non-sensitive values that are guaranteed stable for this brand are defined
 * here as defaults.
 */

export const siteConfig = {
  /** Canonical public URL — set via NEXT_PUBLIC_APP_URL in .env */
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://printstudio24.com",

  /** Primary brand name */
  name: "Print Studio 24",

  /** Short brand / logo text */
  tagline: "PS | PRINT STUDIO 24",

  /** Meta description (default) */
  description:
    "Professional custom printing services in Tampa, Florida. Business cards, flyers, banners, signs, stickers, and more. Fast turnaround, premium quality.",

  /** SEO keywords — primary location and service themes */
  keywords: [
    "printing services Tampa FL",
    "printing company Tampa",
    "custom printing Tampa",
    "business card printing Tampa",
    "flyer printing Tampa",
    "banner printing Tampa",
    "sign printing Tampa",
    "sticker printing Tampa",
    "brochure printing Tampa",
    "custom printing near me",
  ],

  /** Business location — used for LocalBusiness structured data */
  location: {
    city: "Tampa",
    state: "FL",
    stateFull: "Florida",
    country: "US",
    countryFull: "United States",
    // Full address details come from env vars — not hardcoded
    address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ?? "",
    zip: process.env.NEXT_PUBLIC_BUSINESS_ZIP ?? "",
    phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "",
    email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "",
  },

  /** Open Graph defaults */
  openGraph: {
    type: "website" as const,
    locale: "en_US",
    siteName: "Print Studio 24",
  },

  /** Twitter card defaults */
  twitter: {
    card: "summary_large_image" as const,
  },

  /** Brand colors — extracted from the PS24 logo */
  brand: {
    navy:     "#0D1A5E", // Logo deep navy — primary brand color
    royal:    "#1A3FCC", // Logo royal blue — CTAs & buttons
    electric: "#1560FF", // Logo electric blue — highlights & strokes
    cyan:     "#00D4FF", // Logo cyan — "STUDIO 24" text + S accent
    cyanGlow: "#00BFFF", // Logo inner glow
  },

  /** Currency */
  currency: {
    code: "USD",
    symbol: "$",
    locale: "en-US",
  },

  /** Timezone */
  timezone: "America/New_York",
} as const;

export type SiteConfig = typeof siteConfig;

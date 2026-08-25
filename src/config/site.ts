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

  /** Business location — used for LocalBusiness structured data (defaults to US HQ) */
  location: {
    city: "Tampa",
    state: "FL",
    stateFull: "Florida",
    country: "US",
    countryFull: "United States",
    address: process.env.NEXT_PUBLIC_BUSINESS_US_ADDRESS ?? "",
    zip: process.env.NEXT_PUBLIC_BUSINESS_US_ZIP ?? "",
    phone: process.env.NEXT_PUBLIC_BUSINESS_US_PHONE ?? "",
    email: process.env.NEXT_PUBLIC_BUSINESS_US_EMAIL ?? "",
  },

  /** Office Locations */
  offices: [
    {
      name: "US Office",
      address: process.env.NEXT_PUBLIC_BUSINESS_US_ADDRESS ?? "14016, Briardale Lane, Tampa FL 33618, U.S.A",
      phone: process.env.NEXT_PUBLIC_BUSINESS_US_PHONE ?? "+1 (813) 327-3551",
      email: process.env.NEXT_PUBLIC_BUSINESS_US_EMAIL ?? "sales@creativestudio24.us",
      hours: [
        "Monday - Friday: 10:00 AM - 6:00 PM (EST)",
        "Saturday: 10:00 AM - 1:00 PM (EST)",
        "Sunday: Closed",
      ],
    },
    {
      name: "India Office",
      address: process.env.NEXT_PUBLIC_BUSINESS_IN_ADDRESS ?? "B-30, Block B, Sector 72, Noida, 201307, (U.P.)",
      phone: process.env.NEXT_PUBLIC_BUSINESS_IN_PHONE ?? "+91 9717991693",
      email: process.env.NEXT_PUBLIC_BUSINESS_IN_EMAIL ?? "creativestudio24@gmail.com",
      hours: [
        "Monday - Saturday: 9:30 AM – 6:30 PM (IST)",
        "Sunday: Closed",
      ],
    },
  ],

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

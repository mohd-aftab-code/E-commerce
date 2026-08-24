import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ---------------------------------------------------------------------------
  // Image optimization
  // ---------------------------------------------------------------------------
  images: {
    // Add external image domains here as needed (CDN, storage, etc.)
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },

  // ---------------------------------------------------------------------------
  // Security headers
  // Applied to all routes. Admin / API routes may add stricter headers at the
  // middleware or route-handler level.
  // ---------------------------------------------------------------------------
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // ---------------------------------------------------------------------------
  // Redirects
  // Canonical redirects (e.g. www → non-www) can be added here later.
  // ---------------------------------------------------------------------------
  async redirects() {
    return [];
  },

  // ---------------------------------------------------------------------------
  // Logging
  // ---------------------------------------------------------------------------
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },

  // ---------------------------------------------------------------------------
  // Experimental flags
  // Keep empty — no experimental/canary features per project requirements.
  // ---------------------------------------------------------------------------
  experimental: {},
};

export default nextConfig;

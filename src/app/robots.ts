import type { MetadataRoute } from "next";

/**
 * robots.txt generation.
 *
 * Rules:
 *  - Allow indexing of all public storefront pages
 *  - Block admin, account, cart, checkout, API routes from indexing
 *  - Sitemap is dynamically generated and linked
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://printstudio24.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/account/",
          "/cart",
          "/checkout/",
          "/api/",
          "/_next/",
          "/search?",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

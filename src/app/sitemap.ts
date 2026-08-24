import type { MetadataRoute } from "next";

/**
 * Dynamic sitemap.xml generation.
 *
 * Phase 1: Static routes only.
 * Phase 2+: Add dynamic routes from database (products, categories, blog posts).
 *
 * Priority guide:
 *   1.0 — Homepage
 *   0.9 — Category/service landing pages
 *   0.8 — Product pages
 *   0.7 — Static info pages
 *   0.5 — Secondary pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://printstudio24.com";

  const now = new Date();

  // Static storefront routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/printing-services-tampa-fl`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/business-card-printing-tampa`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/flyer-printing-tampa`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/banner-printing-tampa`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sign-printing-tampa`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sticker-printing-tampa`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/brochure-printing-tampa`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quote`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // TODO Phase 2+: Fetch and append dynamic product/category routes
  // const products = await db.product.findMany({ where: { status: "ACTIVE" } });
  // const productRoutes = products.map(p => ({ url: `${baseUrl}/products/${p.slug}`, ... }));

  return staticRoutes;
}

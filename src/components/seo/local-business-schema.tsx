import { siteConfig } from "@/config/site";

export function LocalBusinessSchema() {
  const usOffice = siteConfig.offices[0];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.name,
    "image": `${siteConfig.url}/logo/brand-logo.png`,
    "description": siteConfig.description,
    "@id": siteConfig.url,
    "url": siteConfig.url,
    "telephone": usOffice.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "14016, Briardale Lane",
      "addressLocality": "Tampa",
      "addressRegion": "FL",
      "postalCode": "33618",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.0836, // Approximate for Tampa 33618
      "longitude": -82.5010
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "10:00",
        "closes": "13:00"
      }
    ],
    "priceRange": "$$",
    "areaServed": [
      {
        "@type": "City",
        "name": "Tampa"
      },
      {
        "@type": "State",
        "name": "Florida"
      },
      {
        "@type": "Country",
        "name": "United States"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/printstudio24",
      "https://www.instagram.com/printstudio24"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

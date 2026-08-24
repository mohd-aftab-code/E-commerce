import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Homepage metadata.
 *
 * This is the Phase 1 scaffold placeholder.
 * The full homepage will be built in Phase 2: Storefront.
 */
export const metadata: Metadata = {
  title: "Custom Printing Services Tampa, FL",
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

/**
 * Homepage — Phase 1 scaffold placeholder.
 *
 * The full storefront homepage will be built in Phase 2.
 * This minimal page ensures the app builds and serves correctly.
 */
export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <div className="max-w-2xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
          🚧 Platform Initialization Complete
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Print Studio 24
        </h1>

        <p className="text-xl text-slate-600">
          Custom Printing Services — Tampa, Florida
        </p>

        <p className="text-sm text-slate-400">
          Phase 1: Project scaffold initialized. Storefront coming in Phase 2.
        </p>

        <div className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-center">
          <a
            href="/api/health"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            Health Check →
          </a>
        </div>
      </div>
    </main>
  );
}

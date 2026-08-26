import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
  robots: { index: false, follow: false },
};

/**
 * Custom 404 page.
 */
export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md space-y-6">
        <p className="text-6xl font-bold text-[#F3552F]">404</p>
        <h1 className="text-2xl font-bold text-brand-primary-900">Page Not Found</h1>
        <p className="text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-primary-900 px-8 text-sm font-bold text-white transition-colors hover:bg-brand-primary-800"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

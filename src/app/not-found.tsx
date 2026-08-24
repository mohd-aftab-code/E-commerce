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
        <p className="text-6xl font-bold text-slate-200">404</p>
        <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
        <p className="text-slate-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

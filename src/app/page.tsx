import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Custom Printing Services Tampa, FL",
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

/**
 * Homepage — Phase 1 scaffold placeholder.
 * The full storefront will be built in Phase 2.
 */
export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-dvh px-4 py-16"
      style={{ background: "var(--gradient-hero)" }}>

      {/* Glow orbs — subtle background depth */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #1560FF 0%, transparent 70%)" }} />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)" }} />
      </div>

      {/* Card */}
      <div className="glass-dark relative z-10 w-full max-w-lg rounded-2xl p-10 text-center shadow-2xl">

        {/* Logo */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
          <Image
            src="/logo/fevicon.png"
            alt="Print Studio 24 logo"
            width={80}
            height={80}
            priority
            className="h-full w-full object-contain drop-shadow-lg"
          />
        </div>

        {/* Brand name */}
        <h1 className="mb-1 text-4xl font-extrabold tracking-tight text-white">
          Print Studio <span style={{ color: "var(--brand-cyan-500)" }}>24</span>
        </h1>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest"
          style={{ color: "var(--brand-cyan-400)" }}>
          Tampa, Florida
        </p>
        <p className="mb-8 text-white/60">
          Custom Printing Services — Business Cards, Flyers, Banners, Signs & More
        </p>

        {/* Status badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
          style={{ background: "rgba(0,212,255,0.15)", color: "var(--brand-cyan-400)", border: "1px solid rgba(0,212,255,0.3)" }}>
          <span className="h-2 w-2 animate-pulse rounded-full bg-current" />
          Platform Initialized — Phase 1 Complete
        </div>

        {/* Divider */}
        <div className="mb-6 h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }} />

        {/* Tech stack */}
        <div className="mb-8 grid grid-cols-3 gap-3 text-xs">
          {[
            ["Next.js", "16.3.2"],
            ["Prisma", "MySQL"],
            ["Tailwind", "v4"],
            ["TypeScript", "Strict"],
            ["Stripe", "Ready"],
            ["Zod", "v4"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg p-2.5 text-center"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="font-semibold text-white">{label}</div>
              <div style={{ color: "var(--brand-cyan-400)" }}>{value}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/api/health"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          style={{ background: "var(--gradient-cyan)" }}
        >
          Health Check →
        </a>
      </div>

      {/* Footer note */}
      <p className="mt-6 text-xs text-white/30">
        Phase 2 — Storefront coming next
      </p>
    </main>
  );
}

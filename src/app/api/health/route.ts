/**
 * Health check API route.
 *
 * GET /api/health
 *
 * Returns service status, timestamp, and environment.
 * Useful for:
 *  - Load balancer health checks
 *  - Deployment smoke tests
 *  - Uptime monitoring
 *
 * This route does NOT require authentication.
 * It intentionally reveals minimal information in production.
 */

import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Prevent Next.js from caching health check responses
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "print-studio-24",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV ?? "unknown",
    },
    {
      status: 200,
      headers: {
        // Health check responses must not be cached
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

/**
 * Prisma Client singleton.
 *
 * In development, hot-module reloading can cause multiple Prisma Client
 * instances to be created, which leads to connection pool exhaustion.
 * This pattern ensures only one client instance exists per process.
 *
 * IMPORTANT: This module is server-only. Never import it from client
 * components — use Server Components, Server Actions, or Route Handlers.
 */

import "server-only";

import { PrismaClient } from "@prisma/client";

// ---------------------------------------------------------------------------
// Global declaration to prevent re-instantiation in dev (HMR)
// ---------------------------------------------------------------------------
declare global {
  var __prisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const db: PrismaClient =
  process.env.NODE_ENV === "production"
    ? createPrismaClient()
    : (global.__prisma ?? (global.__prisma = createPrismaClient()));

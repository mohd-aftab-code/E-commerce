/**
 * Server Actions — index
 *
 * This directory contains Next.js Server Actions for mutations.
 * Actions are organized by feature:
 *
 *   src/server/actions/
 *   ├── auth.ts        — login, register, logout
 *   ├── cart.ts        — add, update, remove cart items
 *   ├── orders.ts      — create, cancel orders
 *   ├── artwork.ts     — upload, submit artwork
 *   ├── quotes.ts      — request, manage quotes
 *   ├── addresses.ts   — create, update, delete addresses
 *   └── profile.ts     — update profile
 *
 * Convention:
 *  - All action files must start with "use server"
 *  - All inputs validated with Zod before any DB operation
 *  - Return type: ActionResult<T> from src/types/index.ts
 *  - Never return raw Prisma objects to client — map to safe DTOs
 *  - Never compute prices from client-provided values
 *
 * Phase: Not yet implemented — stubs for architecture.
 */

export {};

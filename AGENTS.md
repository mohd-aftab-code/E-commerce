# AGENTS.md — Print Studio 24

> **Agent Instructions**: Read this file in full before writing any code for this repository.

## Project Identity

**Print Studio 24** is a production-grade custom printing e-commerce platform based in **Tampa, Florida, USA**.

- Framework: **Next.js 16** (App Router)
- Language: **TypeScript (strict mode)**
- Database: **MySQL via Prisma ORM**
- Styling: **Tailwind CSS v4**
- Payments: **Stripe**
- Currency: **USD only**
- Market: **United States — Tampa, FL focused**

---

## Critical Rules

### Never Do

- ❌ Never use `any` in TypeScript unless there is a documented, unavoidable reason
- ❌ Never put business logic inside UI components
- ❌ Never trust client-side prices or totals — always calculate server-side
- ❌ Never expose `STRIPE_SECRET_KEY` or `DATABASE_URL` to the browser
- ❌ Never hardcode business data (phone, address, email) — use env vars
- ❌ Never hardcode fake orders, products, customers, or prices
- ❌ Never use PostgreSQL — MySQL is required
- ❌ Never use `any` type; use `unknown` and narrow properly
- ❌ Never skip Zod validation on API inputs
- ❌ Never skip authorization checks on server routes/actions
- ❌ Never use experimental Next.js features
- ❌ Never skip soft-delete where the entity has a `deletedAt` column

### Always Do

- ✅ Use `server-only` for server-only modules (db, stripe, auth)
- ✅ Validate all API inputs with Zod schemas from `src/validations/`
- ✅ Use `db` from `src/lib/prisma.ts` for all database access
- ✅ Use `cn()` from `src/lib/utils.ts` for className merging
- ✅ Use `formatPrice()` from `src/lib/utils.ts` for currency display
- ✅ Keep all money values as **integer cents** in the database and code
- ✅ Use semantic US address format (see `src/types/index.ts`)
- ✅ Use Server Components by default; only mark `"use client"` when needed
- ✅ Use Server Actions for mutations (forms, cart, orders)
- ✅ Protect admin routes server-side — never client-side only
- ✅ Add proper loading, empty, and error states to all UI
- ✅ Use meaningful TypeScript types from `src/types/`
- ✅ Use `slugify()` from `src/lib/utils.ts` for URL generation

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (storefront)/       # Public storefront (SEO-indexable)
│   ├── (auth)/             # Auth pages (login, register)
│   ├── (account)/          # Customer account (authenticated)
│   ├── admin/              # Admin panel (staff/admin role only)
│   └── api/                # API routes + webhooks
├── components/
│   ├── ui/                 # Primitive UI components (Button, Input, etc.)
│   └── layout/             # Header, Footer, Nav
├── features/               # Business domain modules
│   ├── products/
│   ├── pricing/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   ├── artwork/
│   ├── quotes/
│   ├── customers/
│   └── admin/
├── lib/
│   ├── prisma.ts           # DB client singleton (server-only)
│   ├── stripe.ts           # Stripe client (server-only)
│   ├── utils.ts            # Pure utility functions
│   └── constants.ts        # App-wide constants & enums
├── server/
│   ├── db/                 # Raw DB helpers (server-only)
│   └── actions/            # Server Action stubs
├── hooks/                  # Client-side React hooks
├── types/                  # Global TypeScript types
├── validations/            # Zod schemas
└── config/
    ├── site.ts             # SEO / metadata config
    └── navigation.ts       # Nav structure
```

---

## SEO URL Conventions

Use descriptive slugs — not IDs:

```
/printing-services-tampa-fl
/business-card-printing-tampa
/flyer-printing-tampa
/banner-printing-tampa
/sign-printing-tampa
/sticker-printing-tampa
/brochure-printing-tampa
/products/[slug]
/categories/[slug]
```

Admin, account, cart, checkout URLs must have `noIndex: true` in metadata.

---

## Database Rules

- Primary keys: CUID strings (`@default(cuid())`)
- All timestamps: `createdAt @default(now())` and `updatedAt @updatedAt`
- Soft delete: `deletedAt DateTime?` — never hard delete user/order data
- Money: stored as **integer cents** (not floats)
- All enum fields: defined in `schema.prisma` as Prisma enums
- Indexes: required on all foreign keys and frequently-queried columns

---

## Feature Module Convention

Each feature in `src/features/<name>/` should contain:

```
features/products/
├── actions.ts      # Server Actions (mutations)
├── queries.ts      # Server-only DB queries
├── types.ts        # Feature-specific TypeScript types
├── validations.ts  # Feature-specific Zod schemas
├── components/     # Feature-specific components
└── index.ts        # Public API of the feature
```

---

## Component Rules

- Server Components by default
- `"use client"` only when: event handlers, useState, useEffect, browser APIs
- No business logic inside components
- Components should be small and focused
- Use `cn()` for all conditional className merging
- All images: use `next/image` with proper `alt` text
- All links: use `next/link`

---

## Next.js Notes (v16 App Router)

<!-- BEGIN:nextjs-agent-rules -->
This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

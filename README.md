# Print Studio 24

> **Production-grade custom printing e-commerce platform** — Tampa, Florida, USA

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.3.2 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Database | MySQL via Prisma 5.x ORM |
| Payments | Stripe |
| Validation | Zod v4 |
| Forms | React Hook Form |

## Getting Started

### Prerequisites

- Node.js v20.19+ (recommended) or v20.11.1+
- MySQL database
- npm

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env
# Fill in DATABASE_URL, Stripe keys, etc.

# 3. Generate Prisma client
npx prisma generate

# 4. Push schema to database (development)
npx prisma db push

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Available Commands

```bash
npm run dev           # Start development server
npm run build         # Production build
npm run start         # Start production server
npm run lint          # Run ESLint
npm run type-check    # Run TypeScript type check
npm run format        # Format code with Prettier
npm run format:check  # Check formatting
npx prisma studio     # Open Prisma Studio (DB GUI)
npx prisma generate   # Regenerate Prisma client
npx prisma db push    # Push schema changes (dev)
npx prisma migrate dev # Create and apply migration (prod)
```

## Project Structure

```
src/
├── app/              # Next.js App Router
│   ├── api/          # API routes (health, webhooks)
│   ├── globals.css   # Global styles + design tokens
│   └── layout.tsx    # Root layout with SEO metadata
├── components/       # Shared UI components
│   ├── ui/           # Primitive components
│   └── layout/       # Header, Footer, Nav
├── features/         # Business domain modules
│   ├── products/
│   ├── pricing/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   ├── artwork/
│   ├── quotes/
│   ├── customers/
│   └── admin/
├── lib/              # Framework utilities
│   ├── prisma.ts     # DB singleton (server-only)
│   ├── stripe.ts     # Stripe client (server-only)
│   ├── utils.ts      # Pure utility functions
│   └── constants.ts  # App-wide constants
├── server/actions/   # Server Actions
├── hooks/            # Client-side React hooks
├── types/            # TypeScript types
├── validations/      # Zod schemas
└── config/           # Site/nav configuration
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | Health check — load balancer / uptime monitoring |
| `POST /api/webhooks/stripe` | Stripe payment webhook receiver |

## SEO

Targeting Tampa, Florida printing keywords. Key URLs:

- `/printing-services-tampa-fl`
- `/business-card-printing-tampa`
- `/flyer-printing-tampa`
- `/banner-printing-tampa`
- `/sign-printing-tampa`
- `/sticker-printing-tampa`

Dynamic `sitemap.xml` and `robots.txt` are generated automatically.

## Development Phases

- **Phase 1** ✅ — Project initialization, configuration, folder structure
- **Phase 2** — Storefront homepage + product catalog
- **Phase 3** — Product detail + customization + pricing
- **Phase 4** — Cart + checkout + Stripe payments
- **Phase 5** — Customer accounts + order management
- **Phase 6** — Artwork upload + admin review
- **Phase 7** — B2B quotes
- **Phase 8** — Admin panel
- **Phase 9** — SEO content + structured data
- **Phase 10** — Performance + production hardening

## Security

- Server-side price calculation — never trust client
- Zod validation on all API inputs
- Server-only modules for DB and Stripe
- Stripe webhook signature verification
- Artwork file type and size validation
- `.env` protected from git commits
- Admin routes protected server-side

## License

Private — All rights reserved, Print Studio 24
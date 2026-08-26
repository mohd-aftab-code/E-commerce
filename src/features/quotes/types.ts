import { Prisma } from "@prisma/client";

export type QuoteWithItems = Prisma.QuoteGetPayload<{
  include: { items: true };
}>;

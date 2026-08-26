import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  slug: z.string().min(1, "Slug is required").max(255, "Slug is too long")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  excerpt: z.string().max(1000, "Excerpt is too long").optional(),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  seoTitle: z.string().max(255, "SEO Title is too long").optional(),
  seoDescription: z.string().max(1000, "SEO Description is too long").optional(),
  isPublished: z.boolean().default(false),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

"use server";

import { db } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { blogPostSchema, type BlogPostInput } from "./validations";

export async function createBlogPost(data: BlogPostInput) {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
    throw new Error("Unauthorized");
  }

  const parsed = blogPostSchema.parse(data);

  const post = await db.blogPost.create({
    data: {
      title: parsed.title,
      slug: parsed.slug,
      excerpt: parsed.excerpt || null,
      content: parsed.content,
      imageUrl: parsed.imageUrl || null,
      seoTitle: parsed.seoTitle || null,
      seoDescription: parsed.seoDescription || null,
      isPublished: parsed.isPublished,
      authorId: session.userId,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return post;
}

export async function updateBlogPost(id: string, data: BlogPostInput) {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
    throw new Error("Unauthorized");
  }

  const parsed = blogPostSchema.parse(data);

  const post = await db.blogPost.update({
    where: { id },
    data: {
      title: parsed.title,
      slug: parsed.slug,
      excerpt: parsed.excerpt || null,
      content: parsed.content,
      imageUrl: parsed.imageUrl || null,
      seoTitle: parsed.seoTitle || null,
      seoDescription: parsed.seoDescription || null,
      isPublished: parsed.isPublished,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath(`/blog/${post.slug}`);
  return post;
}

export async function deleteBlogPost(id: string) {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
    throw new Error("Unauthorized");
  }

  await db.blogPost.delete({
    where: { id },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

export async function getAdminBlogPosts() {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
    throw new Error("Unauthorized");
  }

  return await db.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getPublishedBlogPosts() {
  return await db.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getBlogPostBySlug(slug: string) {
  return await db.blogPost.findUnique({
    where: { slug },
  });
}

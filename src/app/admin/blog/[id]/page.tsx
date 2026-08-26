import { BlogForm } from "@/features/blog/components/blog-form";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Blog Post | Admin",
};

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const post = await db.blogPost.findUnique({
    where: { id: params.id }
  });

  if (!post) {
    notFound();
  }

  return <BlogForm initialData={post} />;
}

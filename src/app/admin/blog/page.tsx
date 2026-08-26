import { getAdminBlogPosts, deleteBlogPost } from "@/features/blog/actions";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Manage Blog | Admin",
};

export default async function AdminBlogPage() {
  const posts = await getAdminBlogPosts();

  async function handleDelete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (id) {
      await deleteBlogPost(id);
      revalidatePath("/admin/blog");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your storefront blog articles and SEO content.</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 bg-brand-primary-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-primary-900 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Create Post
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
              <Plus className="h-8 w-8 text-gray-300" />
            </div>
            <p className="text-lg font-medium text-gray-900 mb-1">No blog posts yet</p>
            <p className="text-sm">Create your first blog post to engage your customers.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  <th className="px-6 py-4">Post</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {post.imageUrl ? (
                          <div className="h-12 w-16 relative rounded overflow-hidden flex-shrink-0 bg-gray-100">
                            <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="h-12 w-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center border border-gray-200 text-gray-400 text-xs">
                            No Img
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{post.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          post.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {post.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="p-2 text-gray-400 hover:text-brand-primary-800 hover:bg-brand-primary-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <form action={handleDelete}>
                          <input type="hidden" name="id" value={post.id} />
                          <button
                            type="submit"
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                            onClick={(e) => {
                              if (!confirm("Are you sure you want to delete this post?")) {
                                e.preventDefault();
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

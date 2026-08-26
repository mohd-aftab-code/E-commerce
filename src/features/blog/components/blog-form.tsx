"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost, updateBlogPost } from "../actions";
import { BlogPostInput } from "../validations";
import { Save, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ImageUpload } from "@/components/ui/image-upload";

type BlogPost = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  imageUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  isPublished: boolean;
};

export function BlogForm({ initialData }: { initialData?: BlogPost }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const [formData, setFormData] = useState<BlogPost>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    imageUrl: initialData?.imageUrl || "",
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
    isPublished: initialData?.isPublished || false,
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => {
      const next = { ...prev, [name]: val };
      if (name === "title" && !initialData) {
        next.slug = generateSlug(value as string);
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (initialData?.id) {
        await updateBlogPost(initialData.id, formData as BlogPostInput);
      } else {
        await createBlogPost(formData as BlogPostInput);
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {initialData ? "Edit Blog Post" : "Create Blog Post"}
          </h1>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-brand-primary-800 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand-primary-900 transition-colors shadow-sm disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Post"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Post Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-primary-500 focus:border-brand-primary-500"
                placeholder="e.g. 10 Tips for Perfect Business Cards"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Content (Markdown or HTML)</label>
                  <p className="text-xs text-gray-500">Write your article here. You can use standard HTML tags like &lt;h2&gt;, &lt;strong&gt;, &lt;p&gt;.</p>
                </div>
                <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setIsPreview(false)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${!isPreview ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPreview(true)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${isPreview ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
                  >
                    Preview
                  </button>
                </div>
              </div>
              
              {isPreview ? (
                <div 
                  className="w-full border border-gray-200 bg-gray-50 rounded-lg px-6 py-6 min-h-[500px] prose prose-brand max-w-none overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: formData.content || "<p class='text-gray-400'>No content to preview.</p>" }}
                />
              ) : (
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={20}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-primary-500 focus:border-brand-primary-500 font-mono text-sm"
                  placeholder="Write your amazing content here..."
                />
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Excerpt</label>
              <p className="text-xs text-gray-500 mb-2">A short summary that appears on the blog listing page.</p>
              <textarea
                name="excerpt"
                value={formData.excerpt || ""}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-primary-500 focus:border-brand-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3">Publishing</h3>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="h-5 w-5 text-brand-primary-600 focus:ring-brand-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                Publish Post
              </label>
            </div>
            <p className="text-xs text-gray-500 pl-8">If unchecked, this post will be saved as a draft and hidden from customers.</p>
          </div>

          {/* Featured Image */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3">Featured Image</h3>
            <ImageUpload 
              value={formData.imageUrl || ""}
              onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
              folder="blog"
              label=""
            />
          </div>

          {/* SEO Metadata */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3">SEO (Google Rankings)</h3>
            
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">SEO Title</label>
              <input
                type="text"
                name="seoTitle"
                value={formData.seoTitle || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">SEO Description</label>
              <textarea
                name="seoDescription"
                value={formData.seoDescription || ""}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary-500"
              />
            </div>
          </div>
        </div>

      </div>
    </form>
  );
}

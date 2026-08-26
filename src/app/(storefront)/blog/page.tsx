import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPublishedBlogPosts } from "@/features/blog/actions";
import { FiArrowRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Blog & Printing Tips | Print Studio 24",
  description: "Expert guides, printing tips, and design inspiration from the pros at Print Studio 24.",
};

export default async function BlogIndexPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-12 pb-24">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2C3256] tracking-tight mb-6">
            Printing Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary-600 to-brand-cyan-600">Inspiration</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Discover expert tips, design guides, and the latest trends in the custom printing industry to help your brand stand out.
          </p>
        </div>

        {/* Blog Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-xl font-medium text-gray-500 mb-4">We are brewing some amazing content.</p>
            <p className="text-gray-400">Check back soon for our first blog post!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
                {post.imageUrl ? (
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image 
                      src={post.imageUrl} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[16/10] bg-gradient-to-br from-brand-primary-50 to-brand-cyan-50 flex items-center justify-center">
                    <span className="text-brand-primary-300 font-bold text-2xl opacity-50">Print Studio 24</span>
                  </div>
                )}
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-primary-600 mb-3">
                    {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </div>
                  <h2 className="text-2xl font-bold text-[#1d214c] mb-4 group-hover:text-brand-primary-800 transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-6 flex-1 line-clamp-3">
                    {post.excerpt || post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "..."}
                  </p>
                  
                  <div className="flex items-center text-brand-primary-800 font-bold text-sm mt-auto group-hover:gap-2 transition-all">
                    Read Article <FiArrowRight className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

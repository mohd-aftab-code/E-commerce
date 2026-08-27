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
        


        {/* Blog Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-xl font-medium text-gray-500 mb-4">We are brewing some amazing content.</p>
            <p className="text-gray-400">Check back soon for our first blog post!</p>
          </div>
        ) : (
          <div className="space-y-32">
            {posts.map((post, idx) => {
              const isImageLeft = idx % 2 === 1;

              return (
                <div key={post.id} className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                  
                  {/* Text Side */}
                  <div className={`w-full lg:w-1/2 ${isImageLeft ? 'lg:order-2' : ''}`}>
                    <div className="text-sm font-bold uppercase tracking-wider text-[#F3552F] mb-6">
                      {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-[#2C3256] mb-8 leading-tight tracking-tight hover:text-brand-primary-800 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-lg text-gray-500 leading-relaxed mb-8">
                      {post.excerpt || post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "..."}
                    </p>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-[#F3552F] font-bold text-lg group hover:text-[#d94a29] transition-colors"
                    >
                      Read Article <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Image Side */}
                  <div className={`w-full lg:w-1/2 relative mt-12 lg:mt-0 ${isImageLeft ? 'lg:order-1' : ''}`}>
                    <Link href={`/blog/${post.slug}`} className="block relative aspect-[4/3] w-full overflow-hidden shadow-sm group">
                      {post.imageUrl ? (
                        <Image 
                          src={post.imageUrl} 
                          alt={post.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-primary-50 to-brand-cyan-50 flex items-center justify-center">
                          <span className="text-brand-primary-300 font-bold text-2xl opacity-50">Print Studio 24</span>
                        </div>
                      )}
                    </Link>

                    {/* Floating Box */}
                    <div className={`absolute -bottom-12 ${isImageLeft ? 'left-0 lg:-left-12' : 'right-0 lg:-right-12'} bg-white p-8 sm:p-10 shadow-2xl max-w-[90%] sm:max-w-md border-b-[5px] border-[#2C3256] z-10 pointer-events-none`}>
                      <h3 className="text-2xl font-bold text-[#2C3256] mb-4">Featured Insight</h3>
                      <p className="text-gray-500 mb-8 text-base leading-relaxed">Discover trends and tips to elevate your brand's physical presence.</p>
                      <div className="flex items-center gap-2 opacity-80">
                        <div className="w-10 h-[3px] bg-[#F3552F] rounded-full"></div>
                        <div className="w-2 h-[3px] bg-[#F3552F]/60 rounded-full"></div>
                        <div className="w-1 h-[3px] bg-[#F3552F]/30 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

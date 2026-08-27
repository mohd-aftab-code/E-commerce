import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug } from "@/features/blog/actions";
import { FiArrowLeft } from "react-icons/fi";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Print Studio 24",
    };
  }

  return {
    title: post.seoTitle || `${post.title} | Print Studio 24`,
    description: post.seoDescription || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-[1470px]">
          
          {/* Back Link */}
          <div className="mb-12">
            <Link 
              href="/blog"
              className="inline-flex items-center text-[#F3552F] hover:text-[#d94a29] font-semibold transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to all articles
            </Link>
          </div>

          {/* Hero Section matching FAQ style */}
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-24">
            {/* Text Side */}
            <div className="w-full lg:w-1/2">
              <div className="text-sm font-bold uppercase tracking-wider text-[#F3552F] mb-6">
                {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C3256] tracking-tight mb-8 leading-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-xl text-gray-500 leading-relaxed border-l-4 border-gray-200 pl-6">
                  {post.excerpt}
                </p>
              )}
            </div>

            {/* Image Side */}
            {post.imageUrl && (
              <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden shadow-sm bg-gray-100">
                  <Image 
                    src={post.imageUrl} 
                    alt={post.title} 
                    fill 
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Floating Box */}
                <div className="absolute -bottom-12 left-0 lg:-left-12 bg-white p-8 sm:p-10 shadow-2xl max-w-[90%] sm:max-w-md border-b-[5px] border-[#2C3256] z-10">
                  <h3 className="text-2xl font-bold text-[#2C3256] mb-4">Print Studio 24</h3>
                  <p className="text-gray-500 mb-8 text-base leading-relaxed">Expert insights, printing tips, and design inspiration directly from our team.</p>
                  <div className="flex items-center gap-2 opacity-80">
                    <div className="w-10 h-[3px] bg-[#F3552F] rounded-full"></div>
                    <div className="w-2 h-[3px] bg-[#F3552F]/60 rounded-full"></div>
                    <div className="w-1 h-[3px] bg-[#F3552F]/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Article Content */}
          <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 md:p-16 rounded-3xl shadow-sm border border-gray-100 -mt-10 relative z-20">
            <article 
              className="prose prose-xl md:prose-2xl prose-slate max-w-none 
              prose-headings:text-[#2C3256] prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:leading-tight
              prose-a:text-[#F3552F] hover:prose-a:text-[#d94a29] prose-a:font-semibold prose-a:no-underline
              prose-img:rounded-2xl prose-img:shadow-lg
              prose-p:text-gray-700 prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

        </div>
      </section>
    </div>
  );
}

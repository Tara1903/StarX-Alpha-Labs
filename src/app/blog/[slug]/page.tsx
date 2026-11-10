import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { BLOG_POSTS } from "@/data/blog";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} — StarX Alpha Labs`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-[#F8FAFC]">
      <Navbar />

      <main className="grow pt-20 sm:pt-24">
        <section className="py-20 md:py-24 relative overflow-hidden border-b border-[rgba(130,180,220,0.18)]">
          <Container className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <Link href="/blog" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
              </Link>
              <span className="text-slate-600">/</span>
              <Badge variant="electric" size="sm">{post.category}</Badge>
            </div>

            <h1 className="text-display font-extrabold text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 pt-2 border-t border-[rgba(130,180,220,0.18)]/80 font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <User className="w-3.5 h-3.5 text-[#32A9E8]" /> {post.author} ({post.authorRole})
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#32A9E8]" /> {post.publishDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#32A9E8]" /> {post.readTime}
              </span>
            </div>
          </Container>
        </section>

        {/* Article Body */}
        <section className="py-20 bg-[#0B192B]/80">
          <Container className="max-w-3xl space-y-8">
            <div className="p-6 rounded-2xl bg-[#07111F] border border-[rgba(130,180,220,0.18)] text-slate-300 text-sm leading-relaxed italic">
              &ldquo;{post.summary}&rdquo;
            </div>

            <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed space-y-6">
              {post.content.split("\n\n").map((para, i) => {
                if (para.startsWith("### ")) {
                  return (
                    <h2 key={i} className="text-xl font-bold text-white pt-4 pb-1 border-b border-[rgba(130,180,220,0.18)]">
                      {para.replace("### ", "")}
                    </h2>
                  );
                }
                return <p key={i} className="leading-relaxed">{para}</p>;
              })}
            </div>

            <div className="pt-12 border-t border-[rgba(130,180,220,0.18)] flex items-center justify-between">
              <LinkButton href="/blog" variant="outline" size="sm">
                &larr; Read More Articles
              </LinkButton>
              <LinkButton href="/contact" variant="primary" size="sm">
                Discuss With Our Architects &rarr;
              </LinkButton>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { BLOG_POSTS } from "@/data/blog";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Blog & Architectural Insights — STARX LABS",
  description: "Deep technical articles on Next.js, React Server Components, WebGL, custom AI integration, and enterprise software architecture.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-[#F8FAFC]">
      <Navbar />

      <main className="grow pt-20 sm:pt-24">
        <section className="py-20 md:py-28 relative overflow-hidden border-b border-[rgba(130,180,220,0.18)]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#1769AA]/15 blur-[120px]" />
          <Container>
            <div className="max-w-3xl space-y-4">
              <Badge variant="electric" dot>Technical Perspectives</Badge>
              <h1 className="text-display font-extrabold text-white">
                Engineering & Architecture Blog.
              </h1>
              <p className="text-body text-slate-300">
                Insights from the front lines of enterprise software delivery: type safety, performance tuning,
                practical AI integration, and systems architecture.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-20 bg-[#07111F]">
          <Container className="max-w-5xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.slug}
                  className="p-8 rounded-3xl bg-[#0B192B]/80 border border-[rgba(130,180,220,0.18)] hover:border-[#32A9E8] transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="navy" size="sm">{post.category}</Badge>
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white leading-snug">
                      <Link href={`/blog/${post.slug}`} className="hover:text-[#32A9E8] transition-colors">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[rgba(130,180,220,0.18)] flex items-center justify-between text-xs">
                    <span className="text-slate-400">{post.publishDate} &bull; {post.author}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[#32A9E8] hover:underline font-semibold flex items-center gap-1"
                    >
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}

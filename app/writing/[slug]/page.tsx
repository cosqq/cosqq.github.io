import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getPostBySlug,
  getPostSlugs,
  formatDate,
} from "@/lib/posts";
import { getProfile } from "@/lib/content";

const profile = getProfile();

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: `Not found — ${profile.name}` };
  return {
    title: `${post.title} — ${profile.name}`,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Link
        href="/writing"
        className="inline-flex items-center gap-1.5 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)] mb-8"
      >
        <ArrowLeft size={16} /> All writing
      </Link>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <time className="text-sm text-[color:var(--color-muted)] font-mono">
            {formatDate(post.date)}
          </time>
          {post.tags.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-full bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-strong)]"
            >
              {t}
            </span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
          {post.title}
        </h1>
      </header>

      <div className="prose-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}

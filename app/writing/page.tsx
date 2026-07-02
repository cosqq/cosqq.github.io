import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { getProfile } from "@/lib/content";
import { ArticleGrid } from "@/components/ArticleGrid";

const profile = getProfile();

export const metadata: Metadata = {
  title: `Writing — ${profile.name}`,
  description: "Articles, notes, and posts.",
};

export default function WritingIndex() {
  const posts = getAllPosts();

  return (
    <>
      <div className="mx-auto max-w-4xl px-5 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)] transition-colors"
        >
          <ArrowLeft size={16} /> {profile.name}
        </Link>
      </div>
      <div className="mx-auto max-w-4xl px-5 pt-6 pb-16">
        <p className="text-sm font-medium text-[color:var(--color-accent)] mb-1">
          Notes & articles
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Writing
        </h1>
        <p className="mt-3 text-lg text-[color:var(--color-muted)]">
          Thoughts and experiences that don&apos;t fit on a resume.
        </p>

        <div className="mt-10">
          {posts.length === 0 ? (
            <p className="text-[color:var(--color-muted)]">
              No articles yet — add a Markdown file to{" "}
              <code className="font-mono">content/articles/</code>.
            </p>
          ) : (
            <ArticleGrid posts={posts} />
          )}
        </div>
      </div>
    </>
  );
}

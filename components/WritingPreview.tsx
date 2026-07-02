import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { Section } from "./Section";
import { ArticleGrid } from "./ArticleGrid";

export function WritingPreview() {
  const posts = getAllPosts();
  if (posts.length === 0) return null;

  return (
    <Section id="writing" eyebrow="Notes & articles" title="Writing">
      <ArticleGrid posts={posts} />
      <Link
        href="/writing"
        className="mt-6 inline-flex items-center gap-1.5 font-medium text-[color:var(--color-accent)] hover:gap-2.5 transition-all"
      >
        Read all articles <ArrowRight size={17} />
      </Link>
    </Section>
  );
}

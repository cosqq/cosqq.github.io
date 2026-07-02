"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Post } from "@/lib/posts";
import { Modal } from "./Modal";

function formatDate(date: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Tag({ label }: { label: string }) {
  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-strong)]">
      {label}
    </span>
  );
}

export function ArticleGrid({
  posts,
  scrollClassName = "",
}: {
  posts: Post[];
  /** When set (e.g. "max-h-[26rem]"), the cards become a fixed-height scroll area. */
  scrollClassName?: string;
}) {
  const [active, setActive] = useState<Post | null>(null);

  return (
    <>
      <div
        className={
          scrollClassName
            ? `${scrollClassName} overflow-y-auto pr-2 -mr-2 scroll-soft`
            : undefined
        }
      >
        <div className="grid sm:grid-cols-2 gap-4">
        {posts.map((post) => (
          <button
            key={post.slug}
            onClick={() => setActive(post)}
            className="group text-left rounded-xl border bg-[color:var(--color-surface)] p-5 flex flex-col hover:border-[color:var(--color-accent)] hover:shadow-[0_0_24px_-8px_var(--color-accent)] transition-all"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-semibold text-[color:var(--color-ink)]">
                {post.title}
              </h3>
              <span className="text-xs text-[color:var(--color-muted)] font-mono shrink-0">
                {formatDate(post.date)}
              </span>
            </div>
            <p className="mt-2 text-sm text-[color:var(--color-muted)] flex-1 line-clamp-3">
              {post.excerpt}
            </p>
            {post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
            )}
            <span className="mt-3 text-sm font-medium text-[color:var(--color-accent)] inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
              Read article →
            </span>
          </button>
        ))}
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && (
          <article>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <time className="text-sm text-[color:var(--color-muted)] font-mono">
                {formatDate(active.date)}
              </time>
              {active.tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight mb-5">
              {active.title}
            </h2>
            <div className="prose-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {active.content}
              </ReactMarkdown>
            </div>
            <Link
              href={`/writing/${active.slug}`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-accent)] hover:underline"
            >
              Open as full page <ExternalLink size={14} />
            </Link>
          </article>
        )}
      </Modal>
    </>
  );
}

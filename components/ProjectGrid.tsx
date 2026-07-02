"use client";

import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/content";
import { TechBadge } from "./TechBadge";
import { Modal } from "./Modal";
import { BorderBeam } from "./magicui/border-beam";

export function ProjectGrid({
  projects,
  gridClassName = "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
  scrollClassName = "",
}: {
  projects: Project[];
  gridClassName?: string;
  /** When set (e.g. "max-h-[26rem]"), the grid becomes a fixed-height scroll area. */
  scrollClassName?: string;
}) {
  const [active, setActive] = useState<Project | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      <div
        className={
          scrollClassName
            ? `${scrollClassName} overflow-y-auto pr-2 -mr-2 scroll-soft`
            : undefined
        }
      >
        <div className={gridClassName}>
        {projects.map((p) => (
          <button
            key={p.name}
            onClick={() => setActive(p)}
            onMouseEnter={() => setHovered(p.name)}
            onMouseLeave={() => setHovered((h) => (h === p.name ? null : h))}
            className="group relative overflow-hidden text-left rounded-xl border bg-[color:var(--color-surface)] p-5 flex flex-col hover:border-[color:var(--color-accent)] hover:shadow-[0_0_24px_-8px_var(--color-accent)] transition-all"
          >
            {/* Magic UI: cyan light-beam tracing the card edge — mounted only while
                hovered, so idle cards run no animation at all. */}
            {hovered === p.name && (
              <BorderBeam
                size={p.featured ? 80 : 65}
                duration={p.featured ? 7 : 9}
                borderWidth={2}
              />
            )}
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold group-hover:text-[color:var(--color-accent)] transition-colors">
                {p.name}
              </h3>
              {p.featured && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-strong)] shrink-0">
                  Featured
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm text-[color:var(--color-muted)] flex-1 line-clamp-2">
              {p.blurb}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <TechBadge key={t} name={t} />
              ))}
            </div>
            <span className="mt-3 text-sm font-medium text-[color:var(--color-accent)] inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
              View details →
            </span>
          </button>
        ))}
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && (
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h2 className="text-2xl font-semibold tracking-tight">
                {active.name}
              </h2>
              {active.featured && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-strong)]">
                  Featured
                </span>
              )}
            </div>
            <p className="text-[color:var(--color-ink)]/90 leading-relaxed">
              {active.blurb}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {active.tech.map((t) => (
                <TechBadge key={t} name={t} />
              ))}
            </div>
            {(active.link || active.repo) && (
              <div className="mt-5 flex gap-3 text-sm">
                {active.link && (
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[color:var(--color-accent)] text-[#04121a] px-4 py-2 font-medium shadow-[0_0_20px_-4px_var(--color-accent)] hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink size={15} /> View project
                  </a>
                )}
                {active.repo && (
                  <a
                    href={active.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 font-medium text-[color:var(--color-ink)] hover:border-[color:var(--color-accent)] transition-colors"
                  >
                    <Github size={15} /> Source
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}

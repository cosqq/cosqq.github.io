import { ExternalLink } from "lucide-react";
import { getExperience } from "@/lib/content";
import { SectionHead } from "./Heading";
import { TechBadge } from "./TechBadge";

export function ExperienceSection() {
  const experience = getExperience();
  return (
    <section id="experience" className="scroll-mt-6">
      <SectionHead eyebrow="Career" title="Experience" />
      <div className="flex flex-col gap-4">
        {experience.map((job, i) => (
          <div
            key={i}
            className="rounded-xl border bg-[color:var(--color-surface)] p-5 border-l-[3px] border-l-[color:var(--color-accent)] hover:shadow-[0_0_24px_-8px_var(--color-accent)] transition-shadow"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <h3 className="text-base font-semibold">
                {job.role}
                <span className="text-[color:var(--color-muted)] font-normal">
                  {"  ·  "}
                  {job.companyUrl ? (
                    <a
                      href={job.companyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 hover:text-[color:var(--color-accent)]"
                    >
                      {job.company}
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    job.company
                  )}
                </span>
              </h3>
              <span className="text-sm text-[color:var(--color-muted)] font-mono">
                {job.start} — {job.end}
              </span>
            </div>
            {job.location && (
              <p className="text-sm text-[color:var(--color-muted)] mt-0.5">
                {job.location}
              </p>
            )}
            <p className="mt-2 text-sm text-[color:var(--color-ink)]/90 leading-relaxed">
              {job.summary}
            </p>
            {job.highlights.length > 0 && (
              <ul className="mt-2.5 flex flex-col gap-1.5">
                {job.highlights.map((h, j) => (
                  <li
                    key={j}
                    className="text-sm text-[color:var(--color-muted)] flex gap-2 leading-relaxed"
                  >
                    <span className="mt-2 h-1 w-1 rounded-full bg-[color:var(--color-accent)] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
            {job.tech && job.tech.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.tech.map((t) => (
                  <TechBadge key={t} name={t} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

import { GraduationCap } from "lucide-react";
import { getEducation } from "@/lib/content";
import { Section } from "./Section";

export function EducationSection() {
  const education = getEducation();
  if (education.length === 0) return null;
  return (
    <Section id="education" eyebrow="Learning" title="Education">
      <div className="grid sm:grid-cols-2 gap-4">
        {education.map((e, i) => (
          <div
            key={i}
            className="flex gap-3 rounded-xl border bg-[color:var(--color-surface)] p-5 hover:border-[color:var(--color-accent)] transition-colors"
          >
            <span className="grid place-items-center h-9 w-9 shrink-0 rounded-lg bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-strong)]">
              <GraduationCap size={17} />
            </span>
            <div>
              <div className="flex flex-wrap items-baseline gap-x-2">
                <h3 className="text-sm font-semibold">{e.school}</h3>
                {(e.start || e.end) && (
                  <span className="text-xs text-[color:var(--color-muted)] font-mono">
                    {[e.start, e.end].filter(Boolean).join(" — ")}
                  </span>
                )}
              </div>
              <p className="text-sm text-[color:var(--color-ink)]/90">
                {e.credential}
              </p>
              {e.note && (
                <p className="mt-0.5 text-xs text-[color:var(--color-muted)]">
                  {e.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

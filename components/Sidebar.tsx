import { GraduationCap } from "lucide-react";
import { getSkills, getEducation } from "@/lib/content";
import { TechBadge } from "./TechBadge";
import { SidebarHead } from "./Heading";

export function Sidebar() {
  const skills = getSkills();
  const education = getEducation();

  return (
    <aside className="lg:sticky lg:top-6 flex flex-col gap-6 self-start">
      {/* Education */}
      {education.length > 0 && (
        <section id="education" className="scroll-mt-6">
          <SidebarHead title="Education" />
          <div className="flex flex-col gap-3">
            {education.map((e, i) => (
              <div key={i} className="flex gap-2.5">
                <span className="mt-0.5 grid place-items-center h-7 w-7 shrink-0 rounded-lg bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-strong)]">
                  <GraduationCap size={15} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold leading-snug">
                    {e.school}
                  </h3>
                  <p className="text-xs text-[color:var(--color-ink)]/80">
                    {e.credential}
                  </p>
                  {(e.start || e.end) && (
                    <p className="text-xs text-[color:var(--color-muted)] font-mono mt-0.5">
                      {[e.start, e.end].filter(Boolean).join(" — ")}
                    </p>
                  )}
                  {e.note && (
                    <p className="mt-1 text-xs text-[color:var(--color-muted)] leading-relaxed">
                      {e.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      <section id="skills" className="scroll-mt-6">
        <SidebarHead title="Skills" />
        <div className="flex flex-col gap-2.5">
          {skills.map((group) => (
            <div key={group.category}>
              <p className="text-[10px] font-semibold text-[color:var(--color-muted)] uppercase tracking-wide mb-1">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-1">
                {group.items.map((item) => (
                  <TechBadge
                    key={item.name}
                    name={item.name}
                    emphasis={item.core}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}

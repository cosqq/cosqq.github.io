import { getSkills, getProjects } from "@/lib/content";
import { TechBadge } from "./TechBadge";
import { ProjectGrid } from "./ProjectGrid";

function Heading({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <div className="mb-5">
      {eyebrow && (
        <p className="text-xs font-semibold text-[color:var(--color-accent)] uppercase tracking-wider mb-1">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}

export function SkillsProjects() {
  const skills = getSkills();
  const projects = getProjects().slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:py-10">
      <div className="grid lg:grid-cols-2 gap-x-10 gap-y-10 items-start">
        {/* Skills */}
        <section id="skills" className="scroll-mt-16">
          <Heading title="Skills" eyebrow="Toolbox" />
          <p className="text-sm text-[color:var(--color-muted)] mb-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-[3px] bg-[color:var(--color-accent-soft)] border border-[color:var(--color-accent)]/35" />
              Highlighted chips are my core strengths.
            </span>
          </p>
          <div className="grid grid-cols-2 gap-3 [grid-auto-rows:1fr]">
            {skills.map((group) => (
              <div
                key={group.category}
                className="rounded-xl border bg-[color:var(--color-surface)] p-4 flex flex-col gap-2.5"
              >
                <h3 className="text-sm font-semibold text-[color:var(--color-ink)]">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
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

        {/* Projects */}
        <section id="projects" className="scroll-mt-16">
          <Heading title="Projects" eyebrow="Things I've built" />
          <ProjectGrid projects={projects} gridClassName="grid gap-4" />
        </section>
      </div>
    </div>
  );
}

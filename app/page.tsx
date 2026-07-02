import { ResumeHeader } from "@/components/ResumeHeader";
import { Sidebar } from "@/components/Sidebar";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SectionHead } from "@/components/Heading";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ArticleGrid } from "@/components/ArticleGrid";
import { getProfile, getProjects } from "@/lib/content";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const profile = getProfile();
  const projects = getProjects().slice(0, 3);
  const posts = getAllPosts();

  return (
    <>
      <ResumeHeader />

      <div className="mx-auto max-w-4xl px-5 py-10">
        <div className="grid lg:grid-cols-[13.5rem_1fr] gap-8 lg:gap-10 items-start">
          <Sidebar />

          <div className="min-w-0 flex flex-col gap-10">
            {/* Summary */}
            {(profile.intro || profile.about.length > 0) && (
              <section id="about" className="scroll-mt-6">
                <SectionHead eyebrow="Hello" title="Summary" />
                <p className="text-base text-[color:var(--color-ink)]/90 leading-relaxed">
                  {profile.intro}
                </p>
                {profile.about.map((para, i) => (
                  <p
                    key={i}
                    className="mt-3 text-sm text-[color:var(--color-muted)] leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </section>
            )}

            <ExperienceSection />

            {/* Projects */}
            <section id="projects" className="scroll-mt-6">
              <SectionHead eyebrow="Things I've built" title="Projects" />
              <ProjectGrid
                projects={projects}
                gridClassName="grid sm:grid-cols-2 gap-4"
              />
            </section>

            {/* Writing */}
            {posts.length > 0 && (
              <section id="writing" className="scroll-mt-6">
                <SectionHead eyebrow="Notes & articles" title="Writing" />
                <ArticleGrid posts={posts} />
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

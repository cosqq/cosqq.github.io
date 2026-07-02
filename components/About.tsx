import { getProfile } from "@/lib/content";
import { Section } from "./Section";

export function About() {
  const profile = getProfile();
  return (
    <Section id="about" eyebrow="Hello" title="About me">
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
        <p className="text-base sm:text-lg leading-relaxed text-[color:var(--color-ink)]/90">
          {profile.intro}
        </p>
        <div className="grid gap-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
          {profile.about.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}

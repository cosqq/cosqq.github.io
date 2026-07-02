import { Mail, Linkedin, Github, Globe, Download, MapPin } from "lucide-react";
import { getProfile } from "@/lib/content";
import { BorderBeam } from "./magicui/border-beam";

export function ResumeHeader() {
  const p = getProfile();

  const contacts = [
    p.links.email && {
      href: `mailto:${p.links.email}`,
      label: "Email",
      Icon: Mail,
    },
    p.links.linkedin && {
      href: p.links.linkedin,
      label: "LinkedIn",
      Icon: Linkedin,
    },
    p.links.github && { href: p.links.github, label: "GitHub", Icon: Github },
    p.links.website && {
      href: p.links.website,
      label: "Website",
      Icon: Globe,
    },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof Mail }[];

  return (
    <header className="relative overflow-hidden border-b">
      <div className="absolute inset-0 grid-backdrop opacity-70" aria-hidden />
      {/* Magic UI: a single cyan beam tracing the header, reinforcing the circuit theme */}
      <BorderBeam size={190} duration={10} borderWidth={2.25} />
      <div className="relative mx-auto max-w-4xl px-5 py-7 sm:py-9">
        <h1 className="text-grad-name w-fit text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
          {p.name}
        </h1>
        <p className="text-grad-role w-fit mt-1 text-base sm:text-lg font-semibold">
          {p.title}
        </p>
        <p className="mt-2 max-w-2xl text-sm sm:text-base text-[color:var(--color-muted)] leading-relaxed">
          {p.tagline}
        </p>

        {p.focus.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {p.focus.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--color-accent-strong)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
                {f}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          {p.location && (
            <span className="inline-flex items-center gap-1.5 text-sm text-[color:var(--color-muted)] mr-1">
              <MapPin size={15} /> {p.location}
            </span>
          )}
          {contacts.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border bg-[color:var(--color-surface)] px-3 py-1.5 text-sm font-medium hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] transition-colors"
            >
              <Icon size={15} /> {label}
            </a>
          ))}
          {p.resumePdf && (
            <a
              href={p.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[color:var(--color-accent)] text-[#04121a] px-3.5 py-1.5 text-sm font-semibold shadow-[0_0_20px_-4px_var(--color-accent)] hover:opacity-90 transition-opacity"
            >
              <Download size={15} /> Resume
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

import { Github, Linkedin, Mail, Twitter, Globe } from "lucide-react";
import { getProfile } from "@/lib/content";

export function SocialLinks({ size = 16 }: { size?: number }) {
  const { links } = getProfile();

  const items = [
    links.email && {
      href: `mailto:${links.email}`,
      label: "Email",
      Icon: Mail,
    },
    links.linkedin && {
      href: links.linkedin,
      label: "LinkedIn",
      Icon: Linkedin,
    },
    links.github && { href: links.github, label: "GitHub", Icon: Github },
    links.twitter && { href: links.twitter, label: "Twitter", Icon: Twitter },
    links.website && { href: links.website, label: "Website", Icon: Globe },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof Mail }[];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel="noreferrer"
          aria-label={label}
          className="grid place-items-center h-9 w-9 rounded-lg border bg-[color:var(--color-surface)] text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)] hover:border-[color:var(--color-accent)] transition-colors"
        >
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}

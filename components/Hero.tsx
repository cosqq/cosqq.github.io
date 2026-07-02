import { Download, MapPin } from "lucide-react";
import { getProfile } from "@/lib/content";
import { SocialLinks } from "./SocialLinks";

export function Hero() {
  const profile = getProfile();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-backdrop" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-5 pt-9 pb-7 sm:pt-12 sm:pb-9">
        <div className="inline-flex items-center gap-2 rounded-full border bg-[color:var(--color-surface)] px-3 py-1 text-xs text-[color:var(--color-muted)] mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)] animate-pulse" />
          Open to interesting infrastructure problems
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.03] max-w-3xl">
          {profile.name}
        </h1>
        <p className="mt-2 text-lg sm:text-xl font-semibold text-[color:var(--color-accent)]">
          {profile.title}
        </p>
        <p className="mt-3 text-base sm:text-lg text-[color:var(--color-muted)] max-w-2xl leading-relaxed">
          {profile.tagline}
        </p>

        {profile.focus.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.focus.map((f) => (
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

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          {profile.location ? (
            <span className="inline-flex items-center gap-1.5 text-sm text-[color:var(--color-muted)]">
              <MapPin size={15} /> {profile.location}
            </span>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-3">
            {profile.resumePdf && (
              <a
                href={profile.resumePdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border bg-[color:var(--color-surface)] px-4 py-2 text-sm font-medium hover:border-[color:var(--color-accent)] transition-colors"
              >
                <Download size={16} /> Resume
              </a>
            )}
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}

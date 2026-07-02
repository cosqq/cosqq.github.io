import { getProfile } from "@/lib/content";

export function Footer() {
  const profile = getProfile();
  return (
    <footer className="border-t mt-12">
      <p className="mx-auto max-w-4xl px-5 py-5 text-xs text-[color:var(--color-muted)] text-center sm:text-left">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js &
        Tailwind.
      </p>
    </footer>
  );
}

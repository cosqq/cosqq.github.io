// Shared section headings for the resume layout.

/** Big heading for the main column (eyebrow label above a bold title). */
export function SectionHead({
  eyebrow,
  title,
  id,
}: {
  eyebrow?: string;
  title: string;
  id?: string;
}) {
  return (
    <div id={id} className="mb-4 scroll-mt-6">
      {eyebrow && (
        <p className="text-xs font-semibold text-[color:var(--color-accent)] uppercase tracking-wider mb-1">
          {eyebrow}
        </p>
      )}
      <h2 className="text-grad-heading w-fit text-xl sm:text-2xl font-bold tracking-tight">
        {title}
      </h2>
    </div>
  );
}

/** Compact heading for the sidebar (small, uppercase, with an accent rule). */
export function SidebarHead({ title }: { title: string }) {
  return (
    <div className="mb-3 pb-2 border-b border-[color:var(--color-accent)]/25">
      <h2 className="text-grad-heading w-fit text-xs font-bold uppercase tracking-wider">
        {title}
      </h2>
    </div>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-5 py-8 sm:py-10 scroll-mt-16">
      <div className="mb-5">
        {eyebrow && (
          <p className="text-xs font-semibold text-[color:var(--color-accent)] uppercase tracking-wider mb-1">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

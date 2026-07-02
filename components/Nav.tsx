"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#education", label: "Education" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[color:var(--color-canvas)]/80 border-y">
      <nav className="mx-auto max-w-5xl px-5 h-12 flex items-center justify-between gap-6">
        <div className="hidden sm:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-sm font-medium text-[color:var(--color-ink)]/80 hover:text-[color:var(--color-ink)] rounded-lg hover:bg-black/5 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          className="sm:hidden p-2 -ml-2 text-[color:var(--color-ink)]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="sm:hidden border-t bg-[color:var(--color-canvas)] px-5 py-3 flex flex-col">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 font-medium text-[color:var(--color-ink)]/80 hover:text-[color:var(--color-ink)]"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

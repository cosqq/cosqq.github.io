"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto mt-12 sm:mt-0 rounded-2xl border bg-[color:var(--color-surface)] p-6 sm:p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="sticky top-0 float-right -mr-2 -mt-2 grid place-items-center h-9 w-9 rounded-lg text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)] hover:bg-black/5 transition-colors"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}

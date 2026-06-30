"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});
type BaseModalProps = {
  open: boolean;
  onClose: () => void;

  title: string;
  description?: string;

  children: ReactNode;
  footer?: ReactNode;

  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
};

export function BaseModal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}: BaseModalProps) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
  className={`
    ${geist.className}
    fixed
    inset-0
    z-[100]
    flex
    items-center
    justify-center
    p-6
    animate-in
    fade-in
    duration-200`
  }
>

      {/* Backdrop */}

      <div
        onClick={onClose}
        className="absolute inset-0 z-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}

      <div
  className={cn(
    geist.className,
    "relative w-[92%]",
    sizes[size],
    "animate-in fade-in zoom-in-95 duration-300"
  )}
>
        <div
  className="
    relative
    overflow-hidden
    flex
    max-h-[85vh]
    flex-col
    rounded-[32px]
    border border-white/10
    bg-gradient-to-br
from-[#0B1320]
via-[#111827]
to-[#0D1524]
    shadow-[0_30px_80px_rgba(0,0,0,0.55)]
  "
>

          {/* Cyan glow */}

          <>
  <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

  <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />
</>

          {/* Header */}

          <div className="flex items-start justify-between border-b border-white/10 bg-[#0B1320]/95 backdrop-blur-md px-8 py-6">

            <div>

              <h2 className="font sans text-3xl font-bold tracking-tight">
                {title}
              </h2>

              {description && (
                <p className="font-sans mt-1 text-base text-white/60">
                  {description}
                </p>
              )}

            </div>

            <button
              onClick={onClose}
              className="
rounded-xl
border
border-white/10
bg-white/[0.03]
p-2.5
transition
hover:bg-white/[0.08]
hover:border-cyan-400/30
"
            >
              <X className="h-5 w-5" />
            </button>

          </div>

          {/* Body */}

          <div className="flex-1 overflow-y-auto px-8 py-6">
            {children}
          </div>

          {/* Footer */}

          {footer && (
            <div className="flex justify-end gap-3 border-t border-white/10 bg-[#0B1320]/95 backdrop-blur-md px-8 py-5">
              {footer}
            </div>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
}
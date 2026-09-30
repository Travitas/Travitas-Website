import type { ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Scroll-reveal wrapper: fades and slides up once when it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
      <span className="h-px w-10 bg-primary" />
      {children}
    </div>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("text-xl font-extrabold tracking-[0.25em]", className)}>
      TRAVITAS<span className="text-primary">.</span>
    </span>
  );
}

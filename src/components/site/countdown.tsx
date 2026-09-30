import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// World Tourism Day launch (IST)
const LAUNCH = new Date("2026-09-27T00:00:00+05:30");
const remaining = () => Math.max(0, LAUNCH.getTime() - Date.now());

const units = [
  { label: "Days", ms: 864e5, mod: Infinity },
  { label: "Hours", ms: 36e5, mod: 24 },
  { label: "Minutes", ms: 6e4, mod: 60 },
  { label: "Seconds", ms: 1e3, mod: 60 },
];

export function Countdown() {
  const [left, setLeft] = useState(remaining);

  useEffect(() => {
    const id = window.setInterval(() => setLeft(remaining()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (left === 0) {
    return (
      <div className="font-serif text-4xl italic text-primary md:text-6xl">
        We're live. Happy World Tourism Day.
      </div>
    );
  }

  return (
    <div className="flex items-stretch gap-2 sm:gap-4">
      {units.map((unit, i) => {
        const value = String(Math.floor(left / unit.ms) % unit.mod).padStart(2, "0");
        return (
          <div key={unit.label} className="flex items-stretch gap-2 sm:gap-4">
            <div className="flex min-w-[68px] flex-col items-center rounded-2xl border border-white/15 bg-white/[0.06] px-3 py-3 backdrop-blur-md sm:min-w-[110px] sm:px-5 sm:py-4">
              <div className="relative h-[44px] overflow-hidden sm:h-[72px]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={value}
                    initial={{ y: "-100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="block text-[40px] font-bold leading-[44px] tabular-nums tracking-tight text-white sm:text-[64px] sm:leading-[72px]"
                  >
                    {value}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="pt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/60 sm:text-xs">
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="hidden self-center text-3xl font-light text-primary sm:block">:</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

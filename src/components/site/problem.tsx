import { motion } from "motion/react";

import { Eyebrow, Reveal } from "@/components/site/primitives";

const requirements = [
  "A hotel needs a group booking.",
  "A travel agent needs inventory.",
  "A corporate planner needs a complete travel solution.",
  "A wedding planner needs a destination, rooms and transport.",
  "A DMC needs trusted local partners.",
];

const oldWays = [
  "WhatsApp groups",
  "Old contacts",
  "Trade-show business cards",
  "Scattered databases",
  "Endless calls",
  "Forwarded enquiries",
  "Unknown suppliers",
  "Slow responses",
];

export function Problem() {
  return (
    <section className="relative px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="max-w-5xl pt-6 text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            The travel industry moves fast.{" "}
            <span className="font-serif font-normal italic text-muted-foreground">
              The way it does business doesn't.
            </span>
          </h2>
        </Reveal>

        <div className="grid gap-16 pt-20 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal>
              <p className="pb-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                A requirement comes in.
              </p>
            </Reveal>
            <ul className="space-y-5">
              {requirements.map((item, i) => (
                <Reveal key={item} delay={i * 0.08}>
                  <li className="flex gap-4 border-b border-border pb-5 text-xl md:text-2xl">
                    <span className="font-mono text-sm text-primary">0{i + 1}</span>
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <Reveal>
              <p className="pb-6 text-sm font-semibold uppercase tracking-[0.2em] text-destructive">
                And what happens next?
              </p>
            </Reveal>
            <div className="flex flex-wrap gap-3">
              {oldWays.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.8, rotate: i % 2 ? 4 : -4 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: i % 2 ? 1.5 : -1.5 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, type: "spring", stiffness: 200, damping: 14 }}
                  className="rounded-full border border-white/10 bg-secondary px-5 py-3 text-lg text-muted-foreground line-through decoration-destructive/70"
                >
                  {item}
                </motion.span>
              ))}
            </div>
            <Reveal delay={0.3} className="pt-12">
              <p className="text-2xl font-semibold leading-snug md:text-3xl">
                The world's travel industry has evolved.
                <br />
                <span className="text-primary">The B2B infrastructure behind it hasn't.</span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

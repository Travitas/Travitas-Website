import { Handshake, MessageSquareText, Network, Send } from "lucide-react";

import { Eyebrow, Reveal } from "@/components/site/primitives";

const steps = [
  {
    n: "01",
    title: "Post",
    icon: Send,
    body: "A buyer tells Travitas what they need. Destination. Dates. Group size. Product. Budget. Requirements.",
    tag: "No endless searching.",
  },
  {
    n: "02",
    title: "Match",
    icon: Network,
    body: "Travitas identifies relevant suppliers from its verified network.",
    tag: "The right requirement goes to the right businesses.",
  },
  {
    n: "03",
    title: "Connect",
    icon: MessageSquareText,
    body: "Relevant suppliers respond directly. No unnecessary middlemen. No bidding wars.",
    tag: "No clutter.",
  },
  {
    n: "04",
    title: "Close",
    icon: Handshake,
    body: "Buyer and seller take the conversation forward and close directly.",
    tag: "Travitas makes the connection. Your business makes the deal.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="scroll-mt-20 border-y border-border bg-card/40 px-5 py-28 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>How Travitas works</Eyebrow>
          <h2 className="pt-6 text-5xl font-bold tracking-tight md:text-7xl">
            From requirement to{" "}
            <span className="font-serif font-normal italic text-primary">right connection.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border pt-0 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} className="h-full">
              <div className="group relative flex h-full flex-col bg-background p-8 transition-colors hover:bg-card">
                <span className="text-8xl font-extrabold leading-none text-white/[0.06] transition-colors group-hover:text-primary/20">
                  {s.n}
                </span>
                <s.icon className="mt-6 size-8 text-primary" />
                <h3 className="pt-5 text-3xl font-bold">{s.title}</h3>
                <p className="flex-1 pt-3 text-muted-foreground">{s.body}</p>
                <p className="pt-6 text-sm font-semibold text-foreground">{s.tag}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

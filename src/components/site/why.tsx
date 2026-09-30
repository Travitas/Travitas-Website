import { ArrowLeftRight, BadgeCheck, Building, Percent, Target } from "lucide-react";

import { Eyebrow, Reveal } from "@/components/site/primitives";

const pillars = [
  {
    icon: BadgeCheck,
    title: "Verified",
    body: "B2B relationships start with trust. Suppliers are verified using relevant business and past-work credentials.",
  },
  {
    icon: Target,
    title: "Requirement-led",
    body: "Not another catalogue where everyone competes for attention. Requirements drive connections.",
  },
  {
    icon: ArrowLeftRight,
    title: "Direct",
    body: "Travitas connects buyers and sellers directly. No unnecessary middle layer.",
  },
  {
    icon: Percent,
    title: "Zero commission",
    body: "Travitas does not take a commission from bookings. Your business remains your business.",
  },
  {
    icon: Building,
    title: "B2B only",
    body: "Built for the travel trade. Professional buyers. Professional suppliers. Professional relationships.",
  },
];

const ecosystem = [
  "A travel agent may need a hotel.",
  "A hotel may need group business.",
  "A wedding planner may need a venue, rooms, transport and experiences.",
  "A corporate planner may need an entire destination solution.",
  "A DMC may need trusted local partners.",
];

const effect = [
  ["More verified suppliers", "More choice for buyers"],
  ["More buyers", "More opportunities for sellers"],
  ["More requirements", "Better matching"],
  ["More connections", "More relationships"],
  ["More relationships", "A stronger travel trade network"],
] as const;

export function Why() {
  return (
    <section className="border-y border-border bg-card/40 px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>Why Travitas?</Eyebrow>
          <h2 className="pt-6 text-5xl font-bold tracking-tight md:text-7xl">
            Built differently{" "}
            <span className="font-serif font-normal italic text-primary">from the ground up.</span>
          </h2>
        </Reveal>

        <div className="grid gap-5 pt-16 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <div className="h-full rounded-3xl border border-border bg-background p-7 transition-colors hover:border-primary/50">
                <p.icon className="size-9 text-primary" />
                <h3 className="pt-6 text-2xl font-bold">{p.title}</h3>
                <p className="pt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-16 pt-32 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal>
              <Eyebrow>More than a marketplace</Eyebrow>
              <h2 className="pt-6 text-4xl font-bold tracking-tight md:text-6xl">
                We're building the{" "}
                <span className="font-serif font-normal italic text-primary">trade network.</span>
              </h2>
              <p className="pt-6 text-lg text-muted-foreground">
                The biggest opportunity isn't simply helping someone find a hotel. It's connecting the
                entire ecosystem around that requirement.
              </p>
            </Reveal>
            <ul className="space-y-3 pt-8">
              {ecosystem.map((item, i) => (
                <Reveal key={item} delay={i * 0.06}>
                  <li className="border-l-2 border-primary/60 pl-5 text-lg">{item}</li>
                </Reveal>
              ))}
            </ul>
            <Reveal className="pt-8">
              <p className="text-2xl font-semibold">One requirement can connect an entire ecosystem.</p>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <Eyebrow>The network effect</Eyebrow>
              <h2 className="pt-6 text-4xl font-bold tracking-tight md:text-6xl">
                The more the trade joins,{" "}
                <span className="font-serif font-normal italic text-primary">the more useful it becomes.</span>
              </h2>
            </Reveal>
            <div className="space-y-3 pt-8">
              {effect.map(([from, to], i) => (
                <Reveal key={from + to} delay={i * 0.08}>
                  <div className="flex items-center gap-4 rounded-2xl border border-border bg-background px-5 py-4">
                    <span className="flex-1 font-semibold">{from}</span>
                    <span className="text-primary">→</span>
                    <span className="flex-1 text-right text-muted-foreground">{to}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="pt-8">
              <p className="text-xl font-semibold leading-snug">
                Travitas isn't trying to own the transaction.{" "}
                <span className="text-primary">We're building the network that makes the transaction possible.</span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

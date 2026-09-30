import { Check, X } from "lucide-react";

import { Eyebrow, Reveal } from "@/components/site/primitives";

const notList = [
  "Not another listing website.",
  "Not another pay-to-lead portal.",
  "Not another booking engine.",
];

const buyers = [
  "Travel Agents",
  "Tour Operators",
  "DMCs",
  "MICE Agencies",
  "Corporate Travel Planners",
  "Wedding Planners & Curators",
  "Event & Destination Management",
  "Group Travel Organisers",
  "Leisure Travel Specialists",
  "Luxury Travel Specialists",
];

const sellers = [
  "Hotels & Resorts",
  "Airlines",
  "Cruise Lines",
  "Fleet Owners & Ground Transporters",
  "DMCs & Destination Partners",
  "Venues",
  "Experience & Activity Providers",
  "Tourism & Attraction Partners",
  "Travel Services",
];

export function Opportunity() {
  return (
    <section className="relative isolate overflow-hidden px-5 py-28 md:px-8 md:py-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_0%,oklch(0.72_0.12_195/0.15),transparent_60%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <Eyebrow>The opportunity</Eyebrow>
            <h2 className="pt-6 text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              India's travel trade deserves a{" "}
              <span className="font-serif font-normal italic text-primary">network</span>, not another
              directory.
            </h2>
            <p className="max-w-xl pt-8 text-lg text-muted-foreground md:text-xl">
              Travitas is creating a connected B2B ecosystem where{" "}
              <span className="font-semibold text-foreground">
                requirements meet relevant, verified supply.
              </span>
            </p>
          </Reveal>

          <div className="space-y-3">
            {notList.map((item, i) => (
              <Reveal key={item} delay={i * 0.1}>
                <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 px-5 py-4 text-lg">
                  <X className="size-5 shrink-0 text-destructive" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="flex items-center gap-4 rounded-2xl border border-primary/40 bg-primary/10 px-5 py-4 text-lg font-semibold">
                <Check className="size-5 shrink-0 text-primary" />
                A business network built around real trade requirements.
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="pt-32 text-center">
          <Eyebrow>What is Travitas?</Eyebrow>
          <h2 className="pt-6 text-6xl font-extrabold tracking-tight md:text-8xl lg:text-9xl">
            One network.
            <br />
            <span className="font-serif font-normal italic text-primary">Every travel business.</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 pt-16 md:grid-cols-2">
          <RoleCard title="Buyers" subtitle="Who need travel products" items={buyers} accent="text-accent" />
          <RoleCard title="Sellers" subtitle="Who provide them" items={sellers} accent="text-primary" />
        </div>

        <Reveal className="pt-16 text-center">
          <p className="text-2xl font-semibold md:text-3xl">
            One network. Multiple categories.{" "}
            <span className="text-primary">Millions of potential business connections.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function RoleCard({
  title,
  subtitle,
  items,
  accent,
}: {
  title: string;
  subtitle: string;
  items: string[];
  accent: string;
}) {
  return (
    <Reveal className="h-full">
      <div className="h-full rounded-3xl border border-border bg-card p-8 md:p-10">
        <p className={`text-sm font-semibold uppercase tracking-[0.25em] ${accent}`}>{subtitle}</p>
        <h3 className="pt-2 text-5xl font-bold md:text-6xl">{title}</h3>
        <div className="flex flex-wrap gap-2 pt-8">
          {items.map((item) => (
            <span key={item} className="rounded-full border border-border bg-secondary/60 px-4 py-2 text-sm">
              {item}
            </span>
          ))}
          <span className="px-2 py-2 text-sm text-muted-foreground">and more.</span>
        </div>
      </div>
    </Reveal>
  );
}

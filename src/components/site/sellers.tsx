import { ArrowRight, BadgeCheck, Earth, Eye, HeartHandshake, Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Eyebrow, Reveal } from "@/components/site/primitives";
import { useWaitlist } from "@/components/waitlist";
import { images } from "@/lib/images";

const benefits = [
  {
    icon: Eye,
    title: "Get discovered by relevant buyers",
    body: "Be visible to the trade when your category, destination and capabilities match an actual requirement.",
  },
  {
    icon: Inbox,
    title: "Receive relevant business opportunities",
    body: "Move away from generic leads and towards requirement-led introductions.",
  },
  {
    icon: BadgeCheck,
    title: "Build your verified trade profile",
    body: "Show buyers what you do, where you operate and why they can trust you.",
  },
  {
    icon: Earth,
    title: "Expand beyond your existing network",
    body: "Meet new travel agents, planners, operators and corporate buyers.",
  },
  {
    icon: HeartHandshake,
    title: "Build relationships, not just leads",
    body: "Because B2B travel is ultimately built on relationships.",
  },
];

export function Sellers() {
  const { openWaitlist } = useWaitlist();
  return (
    <section id="sellers" className="scroll-mt-20 px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>For sellers</Eyebrow>
            <h2 className="pt-6 text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              Stop paying for visibility.
              <br />
              <span className="font-serif font-normal italic text-primary">
                Start getting access to opportunity.
              </span>
            </h2>
            <p className="max-w-lg pt-8 text-lg text-muted-foreground">
              Your business doesn't need another directory listing. It needs the{" "}
              <span className="font-semibold text-foreground">right buyers.</span>
            </p>
          </Reveal>

          <Reveal delay={0.15} className="relative mt-10 overflow-hidden rounded-3xl">
            <img
              src={images.palace}
              alt="Heritage palace hotel reflected in water"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-2xl font-bold leading-tight text-white md:text-3xl">
                Your inventory isn't the product.
                <br />
                <span className="text-primary">Your access to the trade is.</span>
              </p>
            </div>
          </Reveal>
        </div>

        <div className="space-y-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.05}>
              <div className="flex gap-5 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40 md:p-8">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <b.icon className="size-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold md:text-2xl">{b.title}</h3>
                  <p className="pt-2 text-muted-foreground">{b.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal className="pt-6">
            <Button
              size="lg"
              onClick={() => openWaitlist("seller")}
              className="h-14 w-full cursor-pointer rounded-full text-base font-semibold sm:w-auto sm:px-10"
            >
              Join the seller waitlist <ArrowRight className="size-4" />
            </Button>
            <p className="pt-3 text-sm italic text-muted-foreground">
              Founding seller memberships will be limited.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Eyebrow, Reveal } from "@/components/site/primitives";
import { useWaitlist } from "@/components/waitlist";
import { images } from "@/lib/images";

const needs = [
  "A hotel for a group",
  "A destination wedding",
  "Corporate accommodation",
  "Ground transportation",
  "A cruise",
  "An experience",
  "A destination partner",
  "A venue",
  "A complete travel requirement",
  "Or something highly specific",
];

const offers = ["No subscription.", "No listing fee.", "No commission."];

export function Buyers() {
  const { openWaitlist } = useWaitlist();
  return (
    <section
      id="buyers"
      className="relative isolate scroll-mt-20 overflow-hidden px-5 py-28 md:px-8 md:py-40"
    >
      <img
        src={images.buyersBg}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 size-full object-cover opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/85 to-background" />

      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <Eyebrow>For buyers</Eyebrow>
          <h2 className="mx-auto max-w-5xl pt-6 text-6xl font-extrabold leading-[0.9] tracking-tight md:text-8xl lg:text-9xl">
            Stop asking everyone.
            <br />
            <span className="font-serif font-normal italic text-primary">Ask Travitas.</span>
          </h2>
          <p className="mx-auto max-w-2xl pt-8 text-lg text-muted-foreground md:text-xl">
            Finding the right supplier shouldn't mean opening ten WhatsApp groups and calling twenty
            people. Tell us what you need.
          </p>
        </Reveal>

        <Reveal className="pt-16">
          <p className="pb-6 text-center text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Whether you're sourcing
          </p>
          <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3">
            {needs.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-card/80 px-5 py-3 text-base backdrop-blur md:text-lg"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="pt-10 text-center text-xl md:text-2xl">
            <span className="font-semibold">Start with the requirement.</span>{" "}
            <span className="text-muted-foreground">
              We'll help you find the right businesses to talk to.
            </span>
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-20 max-w-4xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-primary p-10 text-primary-foreground md:p-14">
            <div className="absolute -right-20 -top-20 size-72 rounded-full bg-white/20 blur-3xl" />
            <p className="text-sm font-bold uppercase tracking-[0.3em]">Buyers join free</p>
            <div className="flex flex-col gap-2 pt-6 lg:flex-row lg:gap-8">
              {offers.map((item) => (
                <span key={item} className="whitespace-nowrap text-3xl font-extrabold lg:text-4xl">
                  {item}
                </span>
              ))}
            </div>
            <p className="pt-6 text-lg font-medium opacity-80">Just better access to the travel trade.</p>
            <Button
              size="lg"
              onClick={() => openWaitlist("buyer")}
              className="mt-8 h-14 cursor-pointer rounded-full bg-primary-foreground px-10 text-base font-semibold text-white hover:bg-primary-foreground/90"
            >
              Join the buyer waitlist <ArrowRight className="size-4" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

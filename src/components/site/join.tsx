import { ArrowRight, Building2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/site/countdown";
import { Eyebrow, Reveal } from "@/components/site/primitives";
import { useWaitlist } from "@/components/waitlist";
import { images } from "@/lib/images";

const cards = [
  {
    role: "seller",
    icon: Building2,
    q: "Are you a seller?",
    body: "Put your business in front of the travel trade.",
    cta: "Join as a Seller",
  },
  {
    role: "buyer",
    icon: Search,
    q: "Are you a buyer?",
    body: "Tell us what you need and discover the right trade partners.",
    cta: "Join as a Buyer",
  },
] as const;

const next = [
  "The next hotel booking.",
  "The next destination wedding.",
  "The next corporate group.",
  "The next tour.",
  "The next MICE requirement.",
  "The next partnership.",
];

export function Join() {
  const { openWaitlist } = useWaitlist();
  return (
    <>
      <section className="px-5 py-28 md:px-8 md:py-40">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center">
            <Eyebrow>For the founding community</Eyebrow>
            <h2 className="mx-auto max-w-5xl pt-6 text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Don't join after{" "}
              <span className="font-serif font-normal italic text-primary">everyone else has.</span>
            </h2>
            <p className="mx-auto max-w-2xl pt-8 text-lg text-muted-foreground">
              Travitas is opening its network progressively. We're bringing in our first group of
              founding sellers and founding buyers before opening the network wider.
            </p>
          </Reveal>

          <div className="grid gap-5 pt-16 md:grid-cols-2">
            {cards.map((c, i) => (
              <Reveal key={c.role} delay={i * 0.1} className="h-full">
                <button
                  type="button"
                  onClick={() => openWaitlist(c.role)}
                  className="group flex h-full w-full cursor-pointer flex-col items-start rounded-[2rem] border border-border bg-card p-10 text-left transition-all hover:-translate-y-1 hover:border-primary md:p-14"
                >
                  <c.icon className="size-10 text-primary" />
                  <h3 className="pt-8 text-4xl font-bold md:text-5xl">{c.q}</h3>
                  <p className="pt-4 text-lg text-muted-foreground">{c.body}</p>
                  <span className="mt-10 flex items-center gap-2 text-lg font-semibold text-primary">
                    {c.cta}
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal className="pt-10 text-center">
            <p className="text-xl font-semibold">Be there before the network gets crowded.</p>
          </Reveal>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-5 py-32 md:px-8 md:py-44">
        <img
          src={images.cta}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-[oklch(0.12_0.03_262)]/75 to-background" />

        <div className="mx-auto max-w-6xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              The travel trade is about to get a new meeting ground
            </p>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-10">
            {next.map((item, i) => (
              <Reveal key={item} delay={i * 0.05}>
                <span className="text-lg text-white/70 md:text-xl">{item}</span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <h2 className="pt-10 text-6xl font-extrabold leading-[0.9] tracking-tight text-white md:text-8xl lg:text-[9rem]">
              It could start
              <br />
              <span className="font-serif font-normal italic text-primary">on Travitas.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.3} className="flex flex-col items-center gap-8 pt-14">
            <Countdown />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() => openWaitlist("buyer")}
                className="h-14 cursor-pointer rounded-full px-10 text-base font-semibold"
              >
                Join as a Buyer
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => openWaitlist("seller")}
                className="h-14 cursor-pointer rounded-full border border-white/20 bg-white/10 px-10 text-base font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                Join as a Seller
              </Button>
            </div>
            <p className="text-sm italic text-white/60">
              Be among the first to experience India's new B2B travel network.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import { motion } from "motion/react";
import { ArrowRight, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/site/countdown";
import { ease } from "@/components/site/primitives";
import { useWaitlist } from "@/components/waitlist";
import { images } from "@/lib/images";

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

const sectors = [
  "Hotels & Resorts",
  "Airlines",
  "Cruise Lines",
  "Ground Transport",
  "DMCs",
  "Venues",
  "Experiences",
  "MICE",
  "Destination Weddings",
  "Corporate Travel",
  "Tour Operators",
  "Travel Agents",
];

export function Hero() {
  const { openWaitlist } = useWaitlist();
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[oklch(0.12_0.03_262)]"
    >
      <motion.img
        src={images.hero}
        alt="Golden hour view over the clouds from an airplane window"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease }}
        className="absolute inset-0 size-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.12_0.03_262)]/70 via-[oklch(0.12_0.03_262)]/40 to-[oklch(0.14_0.03_262)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,oklch(0.76_0.17_60/0.25),transparent_55%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-16 pt-28 md:px-8 md:pt-32">
        <motion.div {...enter(0.2)} className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary backdrop-blur">
            The new B2B network for India's travel trade
          </span>
        </motion.div>

        <h1 className="pt-8 text-balance text-[15vw] font-extrabold leading-[0.88] tracking-[-0.04em] text-white sm:text-[12vw] lg:text-[9.5rem]">
          <motion.span {...enter(0.35)} className="block">
            Where Travel
          </motion.span>
          <motion.span {...enter(0.5)} className="block">
            Business{" "}
            <span className="font-serif font-normal italic tracking-normal text-primary">Meets.</span>
          </motion.span>
        </h1>

        <motion.p {...enter(0.7)} className="max-w-2xl pt-8 text-lg leading-relaxed text-white/80 md:text-xl">
          Travitas is building India's verified B2B network connecting travel buyers with the
          suppliers, products and partners they need, faster, more directly, and with greater trust.
        </motion.p>

        <motion.div {...enter(0.85)} className="flex flex-col gap-3 pt-10 sm:flex-row">
          <Button
            size="lg"
            onClick={() => openWaitlist("buyer")}
            className="h-14 cursor-pointer rounded-full px-8 text-base font-semibold"
          >
            I'm a Buyer <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => openWaitlist("seller")}
            className="h-14 cursor-pointer rounded-full border border-white/20 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur hover:bg-white/20"
          >
            I'm a Seller <ArrowRight className="size-4" />
          </Button>
        </motion.div>

        <motion.div {...enter(1.05)} className="flex flex-col gap-4 pt-14">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/70">
            <CalendarDays className="size-4 text-primary" />
            <span>Launching on</span> <span className="font-semibold text-white">World Tourism Day</span>{" "}
            <span>· 27 September</span>
          </div>
          <Countdown />
        </motion.div>
      </div>

      <div className="relative overflow-hidden border-y border-white/10 bg-black/30 py-4 backdrop-blur">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex w-max gap-10 whitespace-nowrap"
        >
          {[...sectors, ...sectors].map((s, i) => (
            <span
              key={i}
              className="flex items-center gap-10 text-sm font-medium uppercase tracking-[0.2em] text-white/60"
            >
              {s}
              <span className="size-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

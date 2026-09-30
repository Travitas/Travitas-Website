import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/primitives";
import { useWaitlist } from "@/components/waitlist";
import { cn } from "@/lib/utils";

const links = [
  { label: "How it works", href: "#how" },
  { label: "Sellers", href: "#sellers" },
  { label: "Buyers", href: "#buyers" },
  { label: "Network", href: "#network" },
];

export function SiteHeader() {
  const { openWaitlist } = useWaitlist();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-background/80 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <a href="#top" className="cursor-pointer text-white">
          <Logo />
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="cursor-pointer text-sm text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Button
          onClick={() => openWaitlist("buyer")}
          className="cursor-pointer rounded-full px-5 font-semibold"
        >
          Join the waitlist
        </Button>
      </div>
    </header>
  );
}

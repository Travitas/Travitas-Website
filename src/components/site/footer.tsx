import { toast } from "sonner";

import { Logo } from "@/components/site/primitives";
import { useWaitlist } from "@/components/waitlist";
import type { WaitlistRole } from "@/lib/waitlist";

type FooterLink = { label: string; role?: WaitlistRole; href?: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "For Buyers",
    links: [
      { label: "Join the Network", role: "buyer" },
      { label: "Post a Requirement", role: "buyer" },
      { label: "How Travitas Works", href: "#how" },
    ],
  },
  {
    title: "For Sellers",
    links: [
      { label: "Join as a Seller", role: "seller" },
      { label: "Get Verified", role: "seller" },
      { label: "Seller Membership", role: "seller" },
    ],
  },
  {
    title: "Explore",
    links: ["Travel", "Hospitality", "Transport", "Experiences", "Destinations", "Travel Services"].map(
      (label) => ({ label }),
    ),
  },
];

export function SiteFooter() {
  const { openWaitlist } = useWaitlist();

  const handle = (link: FooterLink) => {
    if (link.role) openWaitlist(link.role);
    else if (!link.href) toast("Coming soon at launch. Join the waitlist for early access.");
  };

  return (
    <footer className="border-t border-border px-5 pb-10 pt-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo className="text-2xl" />
            <p className="pt-4 text-lg font-medium">India's B2B Network for the Travel Trade</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="size-2 animate-pulse rounded-full bg-primary" />
              Coming soon
            </div>
            <p className="max-w-sm pt-4 text-sm text-muted-foreground">
              Travitas is currently preparing for launch. Join the waitlist to receive early access and
              launch updates.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {col.title}
              </p>
              <ul className="space-y-3 pt-5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href ?? "#"}
                      onClick={(e) => {
                        if (!link.href) e.preventDefault();
                        handle(link);
                      }}
                      className="cursor-pointer text-foreground/80 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 border-t border-border pt-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Travitas · New Delhi, India
        </div>
      </div>
    </footer>
  );
}

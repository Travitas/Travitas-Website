import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Problem } from "@/components/site/problem";
import { Opportunity } from "@/components/site/opportunity";
import { HowItWorks } from "@/components/site/how-it-works";
import { Sellers } from "@/components/site/sellers";
import { Buyers } from "@/components/site/buyers";
import { Network } from "@/components/site/network";
import { Why } from "@/components/site/why";
import { Join } from "@/components/site/join";
import { SiteFooter } from "@/components/site/footer";
import { WaitlistProvider } from "@/components/waitlist";

export const Route = createFileRoute("/")({
  component: TravitasPage,
});

function TravitasPage() {
  return (
    <WaitlistProvider>
      <div className="min-h-screen overflow-x-clip bg-background text-foreground">
        <SiteHeader />
        <main>
          <Hero />
          <Problem />
          <Opportunity />
          <HowItWorks />
          <Sellers />
          <Buyers />
          <Network />
          <Why />
          <Join />
        </main>
        <SiteFooter />
      </div>
    </WaitlistProvider>
  );
}

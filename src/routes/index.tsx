import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  BriefcaseBusiness,
  Building2,
  Check,
  Compass,
  Handshake,
  Hotel,
  MapPin,
  Network,
  Plane,
  Search,
  Send,
  Ship,
  Sparkles,
  TicketCheck,
  Users,
  Van,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";

import hero from "@/assets/hero.jpg.asset.json";
import palace from "@/assets/palace.jpg.asset.json";
import stay from "@/assets/stay.jpg.asset.json";
import move from "@/assets/move.jpg.asset.json";
import experience from "@/assets/experience.jpg.asset.json";
import destination from "@/assets/destination.jpg.asset.json";
import travelServices from "@/assets/travel-services.jpg.asset.json";
import buyersImage from "@/assets/buyers.jpg.asset.json";
import cta from "@/assets/cta.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Travitas | India's B2B Network for the Travel Trade" },
      { name: "description", content: "India's verified B2B network connecting travel buyers with suppliers, products and partners." },
      { property: "og:title", content: "Travitas | India's B2B Network for the Travel Trade" },
      { property: "og:description", content: "Where travel business meets. Join India's verified B2B travel trade network." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TravitasPage,
});

const sectors = ["Hotels & Resorts", "Airlines", "Cruise Lines", "Ground Transport", "DMCs", "Venues", "Experiences", "MICE", "Destination Weddings", "Corporate Travel", "Tour Operators", "Travel Agents"];

const buyerNeeds = ["Travel Agents", "Tour Operators", "DMCs", "MICE Agencies", "Corporate Travel Planners", "Wedding Planners & Curators", "Event & Destination Management", "Group Travel Organisers", "Leisure Travel Specialists", "Luxury Travel Specialists", "and more."];
const sellerTypes = ["Hotels & Resorts", "Airlines", "Cruise Lines", "Fleet Owners & Ground Transporters", "DMCs & Destination Partners", "Venues", "Experience & Activity Providers", "Tourism & Attraction Partners", "Travel Services", "and more."];

type WaitlistRole = "buyer" | "seller";

const buyerRoles = [
  ["travel-agent", "Travel Agent"],
  ["tour-operator", "Tour Operator"],
  ["dmc", "DMC"],
  ["mice-agency", "MICE Agency"],
  ["corporate-travel-planner", "Corporate Travel Planner"],
  ["wedding-planner", "Wedding Planner / Curator"],
  ["event-destination-management", "Event / Destination Management"],
  ["group-travel-organiser", "Group Travel Organiser"],
  ["leisure-travel-specialist", "Leisure Travel Specialist"],
  ["luxury-travel-specialist", "Luxury Travel Specialist"],
  ["other-buyer", "Other Travel Buyer"],
] as const;

const sellerRoles = [
  ["hotel-resort", "Hotel / Resort"],
  ["airline", "Airline"],
  ["cruise-line", "Cruise Line"],
  ["fleet-ground-transport", "Fleet / Ground Transport"],
  ["dmc-destination-partner", "DMC / Destination Partner"],
  ["venue", "Venue"],
  ["experiences-activities", "Experiences & Activities"],
  ["tourism-attractions", "Tourism & Attractions"],
  ["travel-services", "Travel Services"],
  ["other-supplier", "Other Supplier"],
] as const;

const waitlistSchema = z.object({
  name: z.string().trim().min(1, "Please enter your full name.").max(100, "Name must be 100 characters or fewer."),
  company: z.string().trim().min(1, "Please enter your company.").max(120, "Company must be 120 characters or fewer."),
  email: z.string().trim().email("Please enter a valid work email.").max(255, "Email must be 255 characters or fewer."),
  phone: z.string().trim().min(7, "Please enter a valid phone or WhatsApp number.").max(30, "Phone number must be 30 characters or fewer."),
  city: z.string().trim().min(1, "Please enter your city.").max(80, "City must be 80 characters or fewer."),
  role: z.string().min(1, "Please choose your role."),
});

type WaitlistValues = z.infer<typeof waitlistSchema>;

const emptyWaitlist: WaitlistValues = { name: "", company: "", email: "", phone: "", city: "", role: "" };

const WaitlistContext = createContext<{ openWaitlist: (role?: WaitlistRole) => void } | null>(null);

function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (!context) throw new Error("Waitlist controls must be used inside TravitasPage.");
  return context;
}

const networkCards = [
  { title: "Stay", image: stay.url, icon: Hotel, text: "Hotels · Resorts · Boutique Properties · Luxury Properties · Serviced Accommodation · Destination Properties" },
  { title: "Move", image: move.url, icon: Plane, text: "Airlines · Fleet Operators · Cars · Coaches · Ground Transport · Transfers · Cruise & Marine Travel" },
  { title: "Experience", image: experience.url, icon: Sparkles, text: "Tours · Activities · Attractions · Adventure · Wellness · Entertainment · Local Experiences" },
  { title: "Destination", image: destination.url, icon: MapPin, text: "DMCs · Destination Partners · Tourism Businesses · Venues · Convention & Event Spaces" },
  { title: "Travel Services", image: travelServices.url, icon: BriefcaseBusiness, text: "Travel Support · Group Travel Services · Specialised Travel Services · Other Trade Partners" },
  { title: "Buyers", image: buyersImage.url, icon: Users, text: "Travel Agents · Tour Operators · DMCs · MICE Planners · Corporate Travel Buyers · Wedding Planners · Event Planners" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function AccentTitle({ children, accent }: { children: React.ReactNode; accent: string }) {
  return <h2 className="section-title">{children} <em>{accent}</em></h2>;
}

function CtaButton({ children, secondary = false, role }: { children: React.ReactNode; secondary?: boolean; role?: WaitlistRole }) {
  const { openWaitlist } = useWaitlist();
  return <button type="button" onClick={() => openWaitlist(role)} className={secondary ? "button button-secondary" : "button button-primary"}>{children}<ArrowRight size={14} /></button>;
}

function SiteHeader() {
  const { openWaitlist } = useWaitlist();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <a href="#top" className="wordmark">TRAVITAS<span>.</span></a>
      <nav aria-label="Primary navigation">
        <a href="#how">How it works</a><a href="#sellers">Sellers</a><a href="#buyers">Buyers</a><a href="#network">Network</a>
      </nav>
      <button type="button" className="header-cta" onClick={() => openWaitlist()}>Join the waitlist</button>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero" style={{ backgroundImage: `linear-gradient(90deg, var(--hero-wash), var(--hero-shade)), url(${hero.url})` }}>
      <SiteHeader />
      <div className="hero-content">
        <Eyebrow>The new B2B network for India's travel trade</Eyebrow>
        <h1>Where Travel<br />Business <em>Meets.</em></h1>
        <p className="hero-copy">Travitas is building India's verified B2B network connecting travel buyers with the suppliers, products and partners they need, faster, more directly, and with greater trust.</p>
        <div className="button-row"><CtaButton role="buyer">I'm a Buyer</CtaButton><CtaButton role="seller" secondary>I'm a Seller</CtaButton></div>
        <p className="launch-line"><TicketCheck size={15} /> Launching on <strong>World Tourism Day</strong> · 27 September</p>
        <p className="launch-script">We're live. Happy World Tourism Day.</p>
      </div>
      <div className="ticker"><div>{[...sectors, ...sectors].map((item, i) => <span key={`${item}-${i}`}>{item}<b>•</b></span>)}</div></div>
    </section>
  );
}

function Problem() {
  const requirements = ["A hotel needs a group booking.", "A travel agent needs inventory.", "A corporate planner needs a complete travel solution.", "A wedding planner needs a destination, rooms and transport.", "A DMC needs trusted local partners."];
  const oldWays = ["WhatsApp groups", "Old contacts", "Trade-show business cards", "Scattered databases", "Endless calls", "Forwarded enquiries", "Unknown suppliers", "Slow responses"];
  return (
    <section className="section problem-section">
      <Eyebrow>The problem</Eyebrow>
      <AccentTitle accent="The way it does business doesn't.">The travel industry moves fast.</AccentTitle>
      <div className="two-col problem-grid">
        <div><h3>A requirement comes in.</h3><ol className="number-list">{requirements.map((r, i) => <li key={r}><span>0{i + 1}</span>{r}</li>)}</ol></div>
        <div><h3>And what happens next?</h3><div className="tag-list">{oldWays.map(x => <span key={x}>{x}</span>)}</div><p className="statement">The world's travel industry has evolved.<br /><strong>The B2B infrastructure behind it hasn't.</strong></p></div>
      </div>
    </section>
  );
}

function Opportunity() {
  return (
    <section className="section opportunity">
      <div className="two-col align-end"><div><Eyebrow>The opportunity</Eyebrow><AccentTitle accent="network, not another directory.">India's travel trade deserves a</AccentTitle><p>Travitas is creating a connected B2B ecosystem where requirements meet relevant, verified supply.</p></div><div className="not-list">{["Not another listing website.", "Not another pay-to-lead portal.", "Not another booking engine."].map(x => <p key={x}><span>×</span>{x}</p>)}<strong>A business network built around real trade requirements.</strong></div></div>
      <div className="network-intro"><Eyebrow>What is Travitas?</Eyebrow><h2>One network.<br /><em>Every travel business.</em></h2><div className="role-grid"><RoleCard label="Who need travel products" title="Buyers" items={buyerNeeds} icon={<Search />} /><RoleCard label="Who provide them" title="Sellers" items={sellerTypes} icon={<Building2 />} /></div><p>One network. Multiple categories. <strong>Millions of potential business connections.</strong></p></div>
    </section>
  );
}

function RoleCard({ label, title, items, icon }: { label: string; title: string; items: string[]; icon: React.ReactNode }) {
  return <article className="role-card"><p>{label}</p><h3>{icon}{title}</h3><div>{items.map(x => <span key={x}>{x}</span>)}</div></article>;
}

function HowItWorks() {
  const steps = [
    { title: "Post", icon: Send, text: "A buyer tells Travitas what they need. Destination. Dates. Group size. Product. Budget. Requirements.", note: "No endless searching." },
    { title: "Match", icon: Network, text: "Travitas identifies relevant suppliers from its verified network.", note: "The right requirement goes to the right businesses." },
    { title: "Connect", icon: Handshake, text: "Relevant suppliers respond directly. No unnecessary middlemen. No bidding wars.", note: "No clutter." },
    { title: "Close", icon: BadgeCheck, text: "Buyer and seller take the conversation forward and close directly.", note: "Travitas makes the connection. Your business makes the deal." },
  ];
  return <section id="how" className="section how"><Eyebrow>How Travitas works</Eyebrow><AccentTitle accent="right connection.">From requirement to</AccentTitle><div className="steps">{steps.map((s, i) => <article key={s.title}><span className="step-no">0{i + 1}</span><s.icon /><h3>{s.title}</h3><p>{s.text}</p><strong>{s.note}</strong></article>)}</div></section>;
}

function Sellers() {
  const benefits = [
    ["Get discovered by relevant buyers", "Be visible when your category, destination and capabilities match an actual requirement."],
    ["Receive relevant business opportunities", "Move away from generic leads and towards requirement-led introductions."],
    ["Build your verified trade profile", "Show buyers what you do, where you operate and why they can trust you."],
    ["Expand beyond your existing network", "Meet new travel agents, planners, operators and corporate buyers."],
    ["Build relationships, not just leads", "Because B2B travel is ultimately built on relationships."],
  ];
  return <section id="sellers" className="section sellers"><div className="seller-grid"><div><Eyebrow>For sellers</Eyebrow><AccentTitle accent="Start getting access to opportunity.">Stop paying for visibility.</AccentTitle><p>Your business doesn't need another directory listing. It needs the right buyers.</p><div className="image-quote"><img src={palace.url} alt="Heritage palace hotel reflected in water" /><p>Your inventory isn't the product.<br /><strong>Your access to the trade is.</strong></p></div></div><div className="benefits">{benefits.map(([title, text]) => <article key={title}><BadgeCheck /><div><h3>{title}</h3><p>{text}</p></div></article>)}<CtaButton role="seller">Join the seller waitlist</CtaButton><small>Founding seller memberships will be limited.</small></div></div></section>;
}

function Buyers() {
  const needs = ["A hotel for a group", "A destination wedding", "Corporate accommodation", "Ground transportation", "A cruise", "An experience", "A destination partner", "A venue", "A complete travel requirement", "Or something highly specific"];
  return <section id="buyers" className="section buyers"><Eyebrow>For buyers</Eyebrow><h2>Stop asking everyone.<br /><em>Ask Travitas.</em></h2><p>Finding the right supplier shouldn't mean opening ten WhatsApp groups and calling twenty people. Tell us what you need.</p><p className="mini-label">Whether you're sourcing</p><div className="needs">{needs.map(x => <span key={x}>{x}</span>)}</div><p>Start with the requirement. We'll help you find the right businesses to talk to.</p><div className="buyer-offer"><Eyebrow>Buyers join free</Eyebrow><h3>No subscription. &nbsp; No listing fee. &nbsp; No commission.</h3><p>Just better access to the travel trade.</p><CtaButton role="buyer">Join the buyer waitlist</CtaButton></div></section>;
}

function NetworkSection() {
  return <section id="network" className="section network-section"><Eyebrow>The Travitas network</Eyebrow><AccentTitle accent="One connected trade.">Every category.</AccentTitle><div className="network-cards">{networkCards.map(card => <article key={card.title}><img src={card.image} alt={card.title} /><div><card.icon /><h3>{card.title}</h3><p>{card.text}</p></div></article>)}</div><p className="center-note">If your business moves people, hosts people, serves travellers<br />or creates travel experiences, <strong>there's a place for you on Travitas.</strong></p></section>;
}

function Why() {
  const reasons = [
    [BadgeCheck, "Verified", "B2B relationships start with trust. Suppliers are verified using relevant business and past-work credentials."],
    [Network, "Requirement-led", "Not another catalogue where everyone competes for attention. Requirements drive connections."],
    [ArrowRight, "Direct", "Travitas connects buyers and sellers directly. No unnecessary middle layer."],
    [WalletCards, "Zero commission", "Travitas does not take a commission from bookings. Your business remains your business."],
    [Building2, "B2B only", "Built for the travel trade. Professional buyers. Professional suppliers. Professional relationships."],
  ] as const;
  return <section className="section why"><Eyebrow>Why Travitas?</Eyebrow><AccentTitle accent="from the ground up.">Built differently</AccentTitle><div className="reason-grid">{reasons.map(([Icon, title, text]) => <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div><div className="two-col ecosystem"><div><Eyebrow>More than a marketplace</Eyebrow><AccentTitle accent="trade network.">We're building the</AccentTitle><p>The biggest opportunity isn't simply helping someone find a hotel. It's connecting the entire ecosystem around that requirement.</p><ul><li>A travel agent may need a hotel.</li><li>A hotel may need group business.</li><li>A wedding planner may need a venue, rooms, transport and experiences.</li><li>A corporate planner may need an entire destination solution.</li><li>A DMC may need trusted local partners.</li></ul><strong>One requirement can connect an entire ecosystem.</strong></div><div><Eyebrow>The network effect</Eyebrow><AccentTitle accent="the more useful it becomes.">The more the trade joins,</AccentTitle><div className="effect-list">{[["More verified suppliers", "More choice for buyers"], ["More buyers", "More opportunities for sellers"], ["More requirements", "Better matching"], ["More connections", "More relationships"], ["More relationships", "A stronger travel trade network"]].map(([a,b]) => <p key={a}><span>{a}</span><ArrowRight /><span>{b}</span></p>)}</div><strong>Travitas isn't trying to own the transaction. <em>We're building the network that makes the transaction possible.</em></strong></div></div></section>;
}

function Join() {
  const { openWaitlist } = useWaitlist();
  return <><section id="join" className="section join"><Eyebrow>For the founding community</Eyebrow><h2>Don't join after <em>everyone else has.</em></h2><p>Travitas is opening its network progressively. We're bringing in our first group of founding sellers and founding buyers before opening the network wider.</p><div className="join-grid"><article><Building2 /><h3>Are you a seller?</h3><p>Put your business in front of the travel trade.</p><button type="button" onClick={() => openWaitlist("seller")}>Join as a Seller <ArrowRight /></button></article><article><Search /><h3>Are you a buyer?</h3><p>Tell us what you need and discover the right trade partners.</p><button type="button" onClick={() => openWaitlist("buyer")}>Join as a Buyer <ArrowRight /></button></article></div><strong>Be there before the network gets crowded.</strong></section><section className="final-cta" style={{ backgroundImage: `linear-gradient(var(--cta-shade), var(--cta-shade)), url(${cta.url})` }}><Eyebrow>The travel trade is about to get a new meeting ground</Eyebrow><p>The next hotel booking. &nbsp; The next destination wedding. &nbsp; The next corporate group. &nbsp; The next tour.<br />The next MICE requirement. &nbsp; The next partnership.</p><h2>It could start<br /><em>on Travitas.</em></h2><p className="launch-script">We're live. Happy World Tourism Day.</p><div className="button-row"><CtaButton role="buyer">Join as a Buyer</CtaButton><CtaButton role="seller" secondary>Join as a Seller</CtaButton></div><small>Be among the first to experience India's new B2B travel network.</small></section></>;
}

function Footer() {
  return <footer><div><a href="#top" className="wordmark">TRAVITAS<span>.</span></a><p>India's B2B Network for the Travel Trade</p><span className="coming">Coming soon</span><p>Travitas is currently preparing for launch. Join the waitlist to receive early access and launch updates.</p></div><div><h3>For Buyers</h3><a href="#join">Join the Network</a><a href="#buyers">Post a Requirement</a><a href="#how">How Travitas Works</a></div><div><h3>For Sellers</h3><a href="#join">Join as a Seller</a><a href="#sellers">Get Verified</a><a href="#sellers">Seller Membership</a></div><div><h3>Explore</h3>{["Travel", "Hospitality", "Transport", "Experiences", "Destinations", "Travel Services"].map(x => <a href="#network" key={x}>{x}</a>)}</div><p className="copyright">© 2026 Travitas · New Delhi, India</p></footer>;
}

function WaitlistDialog({ open, role, onOpenChange }: { open: boolean; role: WaitlistRole; onOpenChange: (open: boolean) => void }) {
  const [values, setValues] = useState<WaitlistValues>(emptyWaitlist);
  const [errors, setErrors] = useState<Partial<Record<keyof WaitlistValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const roleOptions = role === "buyer" ? buyerRoles : sellerRoles;

  useEffect(() => {
    if (open) {
      setValues(emptyWaitlist);
      setErrors({});
      setSubmitted(false);
    }
  }, [open, role]);

  const update = (key: keyof WaitlistValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = waitlistSchema.safeParse(values);
    if (!result.success) {
      const nextErrors: Partial<Record<keyof WaitlistValues, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (typeof key === "string" && !nextErrors[key as keyof WaitlistValues]) nextErrors[key as keyof WaitlistValues] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }
    setSubmitted(true);
  };

  const field = (key: keyof WaitlistValues, label: string, type = "text", placeholder = "") => (
    <label className="waitlist-field">
      <span>{label}</span>
      <Input type={type} value={values[key]} placeholder={placeholder} onChange={(event) => update(key, event.target.value)} aria-invalid={Boolean(errors[key])} />
      {errors[key] && <small>{errors[key]}</small>}
    </label>
  );

  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="waitlist-dialog"><DialogHeader><DialogTitle>{submitted ? "Welcome to Travitas." : "Join the founding waitlist"}</DialogTitle><DialogDescription>{submitted ? "You're on the founding buyer/seller waitlist. We'll reach out with early access before we open the network wider." : `Tell us a little about your ${role} business.`}</DialogDescription></DialogHeader>{submitted ? <div className="waitlist-confirmation"><BadgeCheck /><p>Welcome aboard. You're on the founding {role} waitlist. We'll reach out with early access before we open the network wider.</p><DialogFooter><Button type="button" onClick={() => onOpenChange(false)}>Back to Travitas</Button><DialogClose asChild><Button type="button" variant="outline">Close</Button></DialogClose></DialogFooter></div> : <form onSubmit={submit} className="waitlist-form" noValidate><div className="waitlist-fields">{field("name", "Full name", "text", "Your name")}{field("company", "Company", "text", "Your company")}{field("email", "Work email", "email", "you@company.com")}{field("phone", "Phone / WhatsApp", "tel", "+91")}{field("city", "City", "text", "Your city")}<label className="waitlist-field"><span>What best describes you?</span><Select value={values.role} onValueChange={(value) => update("role", value)}><SelectTrigger aria-invalid={Boolean(errors.role)}><SelectValue placeholder={`Choose your ${role} role`} /></SelectTrigger><SelectContent>{roleOptions.map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</SelectContent></Select>{errors.role && <small>{errors.role}</small>}</label></div><DialogFooter><Button type="submit">Join the waitlist <ArrowRight /></Button></DialogFooter></form>}</DialogContent></Dialog>;
}

function TravitasPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogRole, setDialogRole] = useState<WaitlistRole>("buyer");
  const openWaitlist = (role: WaitlistRole = "buyer") => { setDialogRole(role); setDialogOpen(true); };
  return <WaitlistContext.Provider value={{ openWaitlist }}><main><Hero /><Problem /><Opportunity /><HowItWorks /><Sellers /><Buyers /><NetworkSection /><Why /><Join /><Footer /></main><WaitlistDialog open={dialogOpen} role={dialogRole} onOpenChange={setDialogOpen} /></WaitlistContext.Provider>;
}
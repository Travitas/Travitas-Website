import { BedDouble, Briefcase, Compass, MapPin, Plane, Users } from "lucide-react";

import { Eyebrow, Reveal } from "@/components/site/primitives";
import { images } from "@/lib/images";

const categories = [
  {
    name: "Stay",
    icon: BedDouble,
    image: images.stay,
    items: ["Hotels", "Resorts", "Boutique Properties", "Luxury Properties", "Serviced Accommodation", "Destination Properties"],
  },
  {
    name: "Move",
    icon: Plane,
    image: images.move,
    items: ["Airlines", "Fleet Operators", "Cars", "Coaches", "Ground Transport", "Transfers", "Cruise & Marine Travel"],
  },
  {
    name: "Experience",
    icon: Compass,
    image: images.experience,
    items: ["Tours", "Activities", "Attractions", "Adventure", "Wellness", "Entertainment", "Local Experiences"],
  },
  {
    name: "Destination",
    icon: MapPin,
    image: images.destination,
    items: ["DMCs", "Destination Partners", "Tourism Businesses", "Venues", "Convention & Event Spaces"],
  },
  {
    name: "Travel Services",
    icon: Briefcase,
    image: images.travelServices,
    items: ["Travel Support", "Group Travel Services", "Specialised Travel Services", "Other Trade Partners"],
  },
  {
    name: "Buyers",
    icon: Users,
    image: images.buyers,
    items: [
      "Travel Agents",
      "Tour Operators",
      "DMCs",
      "MICE Planners",
      "Corporate Travel Buyers",
      "Wedding Planners",
      "Event Planners",
      "Destination Curators",
      "Luxury Travel Advisors",
      "Group Travel Organisers",
    ],
  },
];

export function Network() {
  return (
    <section id="network" className="scroll-mt-20 px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>The Travitas network</Eyebrow>
          <h2 className="pt-6 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
            Every category.
            <br />
            <span className="font-serif font-normal italic text-primary">One connected trade.</span>
          </h2>
        </Reveal>

        <div className="grid gap-5 pt-16 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 0.1} className="h-full">
              <div className="group relative h-full min-h-[380px] overflow-hidden rounded-3xl border border-white/10">
                <img
                  src={c.image}
                  alt={c.name}
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />
                <div className="relative flex h-full flex-col justify-end p-7">
                  <c.icon className="size-7 text-primary" />
                  <h3 className="pt-3 text-4xl font-bold text-white">{c.name}</h3>
                  <p className="pt-3 text-sm leading-relaxed text-white/75">{c.items.join(" · ")}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="pt-16">
          <p className="mx-auto max-w-4xl text-center text-2xl font-medium leading-snug md:text-3xl">
            If your business moves people, hosts people, serves travellers or creates travel
            experiences, <span className="text-primary">there's a place for you on Travitas.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

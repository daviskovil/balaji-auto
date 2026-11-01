import type { Metadata } from "next";
import Image from "next/image";
import { Award, BadgeCheck, CarFront, CheckCircle2, Handshake, Layers, Phone, ShieldCheck, Timer, Wrench } from "lucide-react";
import { CtaBand, PageHero } from "@/components/Sections";
import { owner, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us – Meet Ranjan Kumar Jena",
  description:
    "Balaji Auto is led by Ranjan Kumar Jena, owner and principal mechanic with 20+ years of experience and former Principal Mechanic at My Car. Trusted car service, car wash and body shop in Rahatani, Pune.",
};

const facts = [
  { icon: Award, value: owner.experience, label: "Hands-on experience" },
  { icon: Wrench, value: "Ex-My Car", label: "Principal Mechanic" },
  { icon: CarFront, value: "All brands", label: "Hatchbacks, sedans & SUVs" },
  { icon: Layers, value: "10 services", label: "Under one roof" },
];

const expertise = [
  {
    title: "Servicing & engine work",
    text: "Periodic maintenance, oil and filter changes, engine tuning and repairs done to a thorough checklist.",
  },
  {
    title: "Brakes & suspension",
    text: "Pads, rotors, shocks and struts — diagnosing noises and handling issues and fixing them properly.",
  },
  {
    title: "Diagnostics & electricals",
    text: "Computer scanning and check-engine faults, traced to the real cause before any part is replaced.",
  },
  {
    title: "AC, tyres & alignment",
    text: "AC gas refills and repairs, wheel alignment, balancing and tyre work for a cool, smooth drive.",
  },
  {
    title: "Body repair & painting",
    text: "Dents, scratches and accident damage restored with a clean, colour-matched finish.",
  },
  {
    title: "Car wash & detailing",
    text: "Careful hand wash, interior cleaning, polishing and waxing, held to the same standard as the mechanical work.",
  },
];

const values = [
  { icon: Wrench, title: "Expert Mechanics", text: "A trained team led by Ranjan, handling every job carefully for all car models." },
  { icon: BadgeCheck, title: "Hands-on Experience", text: "Two decades of practical experience across servicing, repairs, body work and washing." },
  { icon: ShieldCheck, title: "Guaranteed Service", text: "Genuine parts and clear communication, so you know exactly what was done and why." },
  { icon: Handshake, title: "Trusted Work", text: "Customers come back for our transparent pricing, timely delivery and professional care." },
  { icon: Timer, title: "Same-Day Delivery", text: "Most services and washes are completed and handed back on the same day." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Balaji Auto"
        title="Your neighbourhood car experts"
        text="Reliable, affordable car service, repairs and car wash for families in Rahatani, Pimple Saudagar and nearby areas — led by a mechanic with over 20 years of experience."
      />

      {/* Owner profile */}
      <section className="py-20">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-sm lg:sticky lg:top-36">
            <div className="absolute -right-4 -bottom-4 h-full w-full rounded-2xl bg-brand" aria-hidden />
            <div className="absolute -top-4 -left-4 h-24 w-24 rounded-tl-2xl stripe opacity-60" aria-hidden />
            <Image
              src={owner.photo}
              alt={`${owner.name}, ${owner.role} at Balaji Auto`}
              width={860}
              height={1074}
              sizes="(min-width: 1024px) 384px, 90vw"
              className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-xl shadow-ink/20"
              priority
            />
            <div className="absolute -bottom-6 left-6 rounded-xl bg-ink px-5 py-3 text-white shadow-lg">
              <p className="font-display text-2xl leading-none font-extrabold text-brand">{owner.experience}</p>
              <p className="mt-1 text-xs text-white/75">of hands-on experience</p>
            </div>
          </div>

          <div className="pt-6 lg:pt-0">
            <p className="eyebrow">Meet the owner</p>
            <h2 className="h2 mt-3">{owner.name}</h2>
            <p className="mt-2 font-display text-lg font-semibold text-brand">{owner.role}</p>

            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              <p>
                Balaji Auto is led by <strong className="text-ink">{owner.name}</strong>, a mechanic with more than{" "}
                <strong className="text-ink">20 years of hands-on experience</strong> repairing and maintaining cars.
                Before starting Balaji Auto, he was the <strong className="text-ink">Principal Mechanic at My Car</strong>,
                where he worked on numerous car brands and was responsible for the full range of workshop jobs.
              </p>
              <p>
                That experience covers every service we offer — from routine servicing, brakes and suspension to
                computer diagnostics, AC repair, wheel alignment, body and paint work, and detailing. Whatever the make
                or model, chances are Ranjan has worked on it before.
              </p>
              <p>
                As owner and principal mechanic, he leads the workshop team and sets the standard for every job: inspect
                the car properly, explain the problem in plain words, give an honest estimate before starting, and hand
                the car back on time.
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="rounded-xl border border-line p-4">
                  <f.icon className="h-5 w-5 text-brand" aria-hidden />
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="mt-2 font-display text-lg leading-tight font-bold">{f.value}</dd>
                  <dd className="mt-1 text-xs text-muted">{f.label}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-10 font-display text-xl font-bold">Areas of expertise</h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {expertise.map((e) => (
                <li key={e.title} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  <span>
                    <span className="block font-semibold">{e.title}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-muted">{e.text}</span>
                  </span>
                </li>
              ))}
            </ul>

            <a href={site.phoneHref} className="btn-primary mt-10">
              <Phone className="h-4 w-4" aria-hidden /> Talk to {owner.firstName}: {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Workshop */}
      <section className="bg-mist py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Who we are</p>
            <h2 className="h2 mt-3">Honest work. Fair prices. On time.</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              <p>
                Balaji Auto is a full-service car workshop, car wash and body shop in Sudarshan Nagar, Rahatani. We look
                after everyday family cars as well as SUVs — whether it&apos;s a periodic service, a brake job, AC repair,
                dent and paint work or a full detail.
              </p>
              <p>
                Our approach is simple: inspect properly, explain clearly, quote honestly and deliver on time. We use
                genuine parts and keep you informed before any extra work is done.
              </p>
              <p>
                We proudly serve customers across {site.areas.slice(0, -1).join(", ")} and the wider
                Pimpri-Chinchwad area.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-line bg-white p-6 last:sm:col-span-2">
                <v.icon className="h-7 w-7 text-brand" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

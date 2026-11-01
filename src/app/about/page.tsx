import type { Metadata } from "next";
import { BadgeCheck, Handshake, ShieldCheck, Timer, Wrench } from "lucide-react";
import { CtaBand, PageHero } from "@/components/Sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Balaji Auto is a trusted car service, car wash and body shop in Rahatani, Pune, serving families across Pimple Saudagar and Pimpri-Chinchwad.",
};

const values = [
  { icon: Wrench, title: "Expert Mechanics", text: "Our trained technicians handle every job carefully and deliver high-quality work for all car models." },
  { icon: BadgeCheck, title: "Hands-on Experience", text: "Years of practical experience in servicing, washing and repairing cars with reliable results." },
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
        text="Reliable, affordable car service, repairs and car wash for families in Rahatani, Pimple Saudagar and nearby areas."
      />

      <section className="py-20">
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
              <div key={v.title} className="rounded-xl border border-line p-6 last:sm:col-span-2">
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

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import { CtaBand, PageHero } from "@/components/Sections";
import { services, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Car Services – Repair, AC, Tyres, Car Wash & Body Shop",
  description:
    "Car servicing, brake repair, suspension, diagnostics, AC service, wheel alignment, car wash & detailing, body repair and painting, towing and jump start in Rahatani, Pune.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Complete car care, done right"
        text="From routine maintenance to body repair and detailing — one trusted workshop for every car brand."
      />

      <nav className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur sm:top-[116px]" aria-label="Services">
        <div className="container-x flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`#${s.slug}`}
              className="shrink-0 rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap hover:border-brand hover:text-brand"
            >
              {s.title}
            </Link>
          ))}
        </div>
      </nav>

      <div className="container-x divide-y divide-line py-8">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} className="grid scroll-mt-48 gap-8 py-12 md:grid-cols-[auto_1fr_1fr] md:gap-10">
            <span className="grid h-16 w-16 place-items-center rounded-xl bg-brand-soft text-brand">
              <ServiceIcon name={s.icon} className="h-8 w-8" />
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-muted">0{i + 1}</p>
              <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{s.long}</p>
              <a
                href={whatsappLink(`Hi Balaji Auto, I'd like to enquire about: ${s.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6"
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> Enquire on WhatsApp
              </a>
            </div>
            <div className="rounded-xl bg-mist p-6">
              <h3 className="font-display text-sm font-bold tracking-wider uppercase">What&apos;s included</h3>
              <ul className="mt-4 space-y-2.5">
                {s.includes.map((x) => (
                  <li key={x} className="flex gap-2.5 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden /> {x}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <CtaBand />
    </>
  );
}

import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink, type Service } from "@/lib/site";
import ServiceIcon from "./ServiceIcon";

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 stripe opacity-[0.06] lg:block" aria-hidden />
      <div className="container-x relative py-16 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-white/75 sm:text-lg">{text}</p>
      </div>
    </section>
  );
}

export function ServiceCard({ s }: { s: Service }) {
  return (
    <Link
      href={`/services#${s.slug}`}
      className="group flex flex-col rounded-xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-ink/5"
    >
      <span className="grid h-12 w-12 place-items-center rounded-lg bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
        <ServiceIcon name={s.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-5 font-display text-lg font-bold">{s.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.short}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
        Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

export function CtaBand() {
  return (
    <section className="bg-brand text-white">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Need a quick car service?</h2>
          <p className="mt-2 max-w-xl text-white/90">
            Call or WhatsApp us to book a slot. Most services are delivered the same day.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={site.phoneHref} className="btn bg-white text-ink hover:bg-white/90">
            <Phone className="h-4 w-4" aria-hidden /> Call {site.phone}
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn bg-ink text-white hover:bg-ink-3">
            <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, CalendarCheck, CarFront, CheckCircle2, Clock, KeyRound, MessageCircle, Phone, Quote } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import GoogleCard from "@/components/GoogleCard";
import { CtaBand, ServiceCard } from "@/components/Sections";
import { faqs, highlights, services, site, testimonial, whatsappLink } from "@/lib/site";

const steps = [
  { icon: CalendarCheck, title: "Book", text: "Call, WhatsApp or use the form to pick a time that suits you." },
  { icon: CarFront, title: "Inspect & quote", text: "We check your car and explain the work and cost before starting." },
  { icon: KeyRound, title: "Drive away", text: "Most jobs are done the same day — clean, checked and ready." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute -right-24 top-0 hidden h-full w-[45%] -skew-x-12 bg-ink-2 lg:block" aria-hidden />
        <div className="absolute -right-24 top-0 hidden h-full w-[45%] -skew-x-12 stripe opacity-[0.05] lg:block" aria-hidden />
        <div className="container-x relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="eyebrow">Car Service · Car Wash · Body Shop</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl">
              Trusted car care in <span className="text-brand">Rahatani</span> &amp; Pimple Saudagar
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/75">
              Skilled mechanics, genuine parts and same-day delivery for most services. From routine servicing to a
              sparkling wash — your car is in safe hands.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#book" className="btn-primary">
                <CalendarCheck className="h-4 w-4" aria-hidden /> Book a Service
              </Link>
              <a href={site.phoneHref} className="btn-outline-light">
                <Phone className="h-4 w-4" aria-hidden /> {site.phone}
              </a>
              <a
                href={whatsappLink(undefined, site.whatsapp2)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
                aria-label={`WhatsApp our backup number ${site.phone2}`}
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> {site.phone2}
              </a>
            </div>
            <p className="mt-3 text-sm text-white/60">
              Both numbers are on WhatsApp. Main number not connecting? Message the green one, or{" "}
              <a href={site.phone2Href} className="font-semibold text-white hover:text-brand">call {site.phone2}</a>
            </p>
            <ul className="mt-10 grid max-w-lg grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/80">
              {["All car brands", "Genuine parts", "Same-day delivery", "Transparent pricing"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-white p-6 text-ink shadow-2xl shadow-black/40 sm:p-8">
              <Image src="/images/logo.png" alt="" width={1761} height={822} className="mx-auto h-auto w-full max-w-sm" />
              <div className="mt-6 grid gap-3 border-t border-line pt-6">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-semibold">
                      <Clock className="h-4 w-4 text-brand" aria-hidden /> {h.days}
                    </span>
                    <span className="text-muted">{h.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between gap-3 rounded-lg bg-mist px-4 py-3 text-sm">
                <span>
                  <span className="block text-xs text-muted">Call to book</span>
                  <span className="font-semibold">{site.contactName}</span>
                </span>
                <span className="grid justify-items-end gap-1 font-semibold">
                  <a href={site.phoneHref} className="flex items-center gap-1.5 hover:text-brand">
                    <Phone className="h-4 w-4 text-brand" aria-hidden /> {site.phone}
                  </a>
                  <a href={site.phone2Href} className="flex items-center gap-1.5 text-xs text-muted hover:text-brand">
                    Backup: {site.phone2}
                  </a>
                </span>
              </div>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-wa mt-3 w-full">
                <MessageCircle className="h-4 w-4" aria-hidden /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-b border-line bg-mist">
        <div className="container-x grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.title} className="flex gap-3">
              <BadgeCheck className="mt-0.5 h-6 w-6 shrink-0 text-brand" aria-hidden />
              <div>
                <h3 className="font-display font-bold">{h.title}</h3>
                <p className="mt-1 text-sm text-muted">{h.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">What we do</p>
              <h2 className="h2 mt-3">Everything your car needs, under one roof</h2>
              <p className="mt-4 text-muted">
                Dependable servicing, repairs and detailing with honest pricing and timely delivery.
              </p>
            </div>
            <Link href="/services" className="btn-dark">View all services</Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ink py-20 text-white">
        <div className="container-x">
          <p className="eyebrow">How it works</p>
          <h2 className="h2 mt-3">Car service in 3 simple steps</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="relative rounded-xl border border-white/10 bg-ink-2 p-6">
                <span className="font-display text-5xl font-extrabold text-white/10">0{i + 1}</span>
                <s.icon className="mt-2 h-7 w-7 text-brand" aria-hidden />
                <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonial + FAQ */}
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="eyebrow">Customers say</p>
            <h2 className="h2 mt-3">Trusted by car owners nearby</h2>
            <figure className="mt-8 rounded-xl border border-line bg-mist p-7">
              <Quote className="h-8 w-8 text-brand" aria-hidden />
              <blockquote className="mt-4 text-lg leading-relaxed">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold">{testimonial.name}</span>
                <span className="text-muted"> · {testimonial.place}</span>
              </figcaption>
            </figure>
            <GoogleCard className="mt-5" />
          </div>

          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="h2 mt-3">Common questions</h2>
            <div className="mt-8 divide-y divide-line rounded-xl border border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
                    {f.q}
                    <span className="text-xl text-brand transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="scroll-mt-28 bg-mist py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="eyebrow">Book an appointment</p>
            <h2 className="h2 mt-3">Book your service in a minute</h2>
            <p className="mt-4 text-muted">
              Fill in your details and we&apos;ll confirm your slot on WhatsApp. Prefer to talk? Call us anytime during
              working hours.
            </p>
            <a href={site.phoneHref} className="group mt-6 inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-semibold text-muted">Call {site.contactName}</span>
                <span className="font-display text-2xl font-bold group-hover:text-brand">{site.phone}</span>
              </span>
            </a>
            <p className="mt-3 text-sm text-muted">
              Backup number (call or WhatsApp):{" "}
              <a href={site.phone2Href} className="font-semibold text-ink hover:text-brand">{site.phone2}</a>
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <BookingForm />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

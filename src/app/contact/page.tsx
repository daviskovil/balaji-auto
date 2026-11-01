import type { Metadata } from "next";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import GoogleCard from "@/components/GoogleCard";
import { PageHero } from "@/components/Sections";
import { fullAddress, site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Directions",
  description: `Call ${site.contactName} on ${site.phone} (backup ${site.phone2}) or visit Balaji Auto at ${fullAddress}. Open Mon–Fri 9 AM–9 PM, Sat 9 AM–6 PM.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Visit, call or book online"
        text="We're in Sudarshan Nagar, Rahatani — easy to reach from Pimple Saudagar, Wakad and Pimple Gurav."
      />

      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-5">
            <InfoRow icon={MapPin} title="Address">
              {fullAddress}
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-1.5 font-semibold text-brand">
                <Navigation className="h-4 w-4" aria-hidden /> Get directions
              </a>
            </InfoRow>
            <InfoRow icon={Phone} title="Call or WhatsApp">
              <span className="block font-semibold text-ink">{site.contactName}</span>
              {[
                { num: site.phone, href: site.phoneHref, wa: site.whatsapp, tag: "Main" },
                { num: site.phone2, href: site.phone2Href, wa: site.whatsapp2, tag: "Backup" },
              ].map((p) => (
                <span key={p.num} className="mt-1 flex flex-wrap items-center gap-x-3">
                  <a href={p.href} className="hover:text-brand">{p.num}</a>
                  <span className="text-xs">{p.tag}</span>
                  <a href={whatsappLink(undefined, p.wa)} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-wa hover:underline">
                    WhatsApp
                  </a>
                </span>
              ))}
              <span className="mt-1 block text-xs">If the main number doesn&apos;t connect, please use the backup.</span>
            </InfoRow>
            <InfoRow icon={Mail} title="Email">
              {site.emails.map((e) => (
                <a key={e} href={`mailto:${e}`} className="block break-all hover:text-brand">{e}</a>
              ))}
            </InfoRow>
            <InfoRow icon={Clock} title="Opening hours">
              {site.hours.map((h) => (
                <span key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span>{h.time}</span>
                </span>
              ))}
            </InfoRow>
            <GoogleCard className="!bg-mist !border-transparent" />
          </div>

          <div className="rounded-2xl border border-line p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold">Book a service</h2>
            <p className="mt-2 mb-6 text-sm text-muted">We&apos;ll confirm your slot on WhatsApp.</p>
            <BookingForm />
          </div>
        </div>
      </section>

      <section aria-label="Map" className="h-[420px] w-full bg-mist">
        <iframe
          title="Balaji Auto location on Google Maps"
          src={site.mapsEmbed}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}

function InfoRow({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 rounded-xl bg-mist p-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand text-white">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0 text-sm leading-relaxed text-muted">
        <h3 className="mb-1 font-display text-base font-bold text-ink">{title}</h3>
        {children}
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { fullAddress, services, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/75">
      <div className="stripe h-1.5 opacity-90" aria-hidden />
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/images/logo-light.png" alt="Balaji Auto" width={1761} height={822} className="h-14 w-auto" />
          <p className="mt-4 text-sm leading-relaxed">
            Trusted car service, repairs and professional car wash to keep your vehicle healthy, clean and performing at
            its best.
          </p>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-white">Services</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 7).map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="hover:text-brand">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-white">Opening Hours</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {site.hours.map((h) => (
              <li key={h.days} className="flex gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <span>
                  <span className="text-white">{h.days}</span>
                  <br />
                  {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                {fullAddress}
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <span>
                <span className="block text-white">{site.contactName}</span>
                <a href={site.phoneHref} className="block hover:text-brand">
                  {site.phone}
                </a>
                <a href={site.phone2Href} className="block hover:text-brand">
                  {site.phone2} <span className="text-white/50">(backup)</span>
                </a>
                <span className="text-xs text-white/50">Both numbers are on WhatsApp</span>
              </span>
            </li>
            {site.emails.map((e) => (
              <li key={e} className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <a href={`mailto:${e}`} className="break-all hover:text-brand">
                  {e}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-xs sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Balaji Auto. All rights reserved.</span>
          <span className="flex gap-4">
            <Link href="/services" className="hover:text-brand">Services</Link>
            <Link href="/about" className="hover:text-brand">About</Link>
            <Link href="/contact" className="hover:text-brand">Contact</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

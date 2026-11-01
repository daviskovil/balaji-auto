"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Clock, Menu, Phone, X } from "lucide-react";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur">
      <div className="hidden bg-ink text-xs text-white/80 sm:block">
        <div className="container-x flex h-9 items-center justify-between">
          <span className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-brand" aria-hidden />
            Mon–Fri 9 AM – 9 PM · Sat 9 AM – 6 PM · Sun: call to check
          </span>
          <span>Rahatani · Pimple Saudagar · Pune</span>
        </div>
      </div>

      <div className="border-b border-line">
        <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-20">
          <Link href="/" className="shrink-0" aria-label="Balaji Auto home">
            <Image src="/images/logo.png" alt="Balaji Auto" width={1761} height={822} priority className="h-11 w-auto sm:h-14" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-md px-3.5 py-2 text-sm font-semibold transition-colors ${
                  isActive(n.href) ? "text-brand" : "text-ink hover:text-brand"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={site.phoneHref} className="btn-primary hidden !py-2.5 sm:inline-flex">
              <Phone className="h-4 w-4" aria-hidden />
              {site.phone}
            </a>
            <a href={site.phoneHref} className="btn-primary !p-2.5 sm:hidden" aria-label="Call Balaji Auto">
              <Phone className="h-5 w-5" aria-hidden />
            </a>
            <button
              type="button"
              className="rounded-md p-2.5 text-ink hover:bg-mist md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-line md:hidden" aria-label="Mobile">
            <div className="container-x flex flex-col py-2">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`rounded-md px-2 py-3 font-semibold ${isActive(n.href) ? "text-brand" : "text-ink"}`}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

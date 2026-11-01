import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { site } from "@/lib/site";

// "Find us on Google": QR for desktop visitors, tap-buttons for phones.
export default function GoogleCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl border border-line bg-white p-6 ${className}`}>
      <div className="flex items-center gap-5">
        <Image
          src={site.googleQr}
          alt="QR code to open Balaji Auto on Google"
          width={1080}
          height={1080}
          unoptimized
          className="hidden h-32 w-32 shrink-0 rounded-lg border border-line md:block"
        />
        <div>
          <p className="font-display text-lg font-bold">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span> <span className="text-ink">— check us out</span>
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm">
            <span className="flex text-amber-400" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span className="font-semibold">5.0</span>
            <span className="text-muted">on Google</span>
          </p>
          <p className="mt-2 hidden text-sm text-muted md:block">
            Scan with your phone camera to see our photos and reviews, get directions, or leave us a review.
          </p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <a href={site.reviewUrl} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2.5">
          <Star className="h-4 w-4" aria-hidden /> Leave a Google review
        </a>
        <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-dark !py-2.5">
          <MapPin className="h-4 w-4" aria-hidden /> View on Google Maps
        </a>
      </div>
    </div>
  );
}

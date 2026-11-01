import type { Metadata, Viewport } from "next";
import { Inter, Saira } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Eva from "@/components/Eva";
import { fullAddress, owner, services, site } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const saira = Saira({ variable: "--font-saira", subsets: ["latin"], weight: ["500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Balaji Auto | Car Service, Car Wash & Body Shop in Rahatani, Pune",
    template: "%s | Balaji Auto",
  },
  description: site.description,
  alternates: { canonical: "./" },
  openGraph: {
    title: "Balaji Auto – Car Service, Car Wash & Body Shop",
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: ["/images/logo.png"],
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1f2328",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Balaji Auto – Car Service, Car Wash & Body Shop",
  url: site.url,
  image: `${site.url}/images/logo.png`,
  telephone: "+919665155256",
  email: site.emails[1],
  founder: {
    "@type": "Person",
    name: owner.name,
    jobTitle: owner.role,
    image: `${site.url}${owner.photo}`,
  },
  contactPoint: {
    "@type": "ContactPoint",
    name: site.contactName,
    telephone: "+919665155256",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["en", "hi", "mr"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}`,
    addressLocality: "Rahatani, Pimpri-Chinchwad",
    addressRegion: site.address.state,
    postalCode: site.address.pin,
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "21:00",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "18:00" },
  ],
  areaServed: site.areas,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Car services",
    itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
  },
  description: `${site.description} Address: ${fullAddress}.`,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body className={`${inter.variable} ${saira.variable} font-sans antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <main>{children}</main>
        <Footer />
        <Eva />
      </body>
    </html>
  );
}

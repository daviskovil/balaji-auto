// Single source of truth for business details used across pages and Eva.

export const site = {
  name: "Balaji Auto",
  tagline: "Car Service, Car Wash & Body Shop",
  description:
    "Trusted car service, repairs and professional car wash in Rahatani and Pimple Saudagar, Pune. Skilled mechanics, genuine parts and same-day delivery for most services.",
  url: "https://www.balajiauto.in",
  contactName: "Ranjan Kumar Jena",
  phone: "+91 96651 55256",
  phoneHref: "tel:+919665155256",
  whatsapp: "919665155256",
  // Backup number (also on WhatsApp) in case the main one can't be reached.
  phone2: "+91 88568 05452",
  phone2Href: "tel:+918856805452",
  whatsapp2: "918856805452",
  emails: ["services@balajiauto.in", "balajiautoservices5@gmail.com"],
  address: {
    line1: "Lane No. 4, Sunshine Villas, Sudarshan Nagar",
    line2: "Rahatani, Pimpri-Chinchwad",
    city: "Pune",
    state: "Maharashtra",
    pin: "411017",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Balaji+Auto+Car+Service+Car+Wash+Body+Shop+Rahatani+Pune",
  mapsEmbed:
    "https://maps.google.com/maps?q=Balaji%20Auto%20Car%20Service%20Sudarshan%20Nagar%20Rahatani%20Pune&z=15&output=embed",
  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 9:00 PM" },
    { days: "Saturday", time: "9:00 AM – 6:00 PM" },
    { days: "Sunday", time: "Call to check" },
  ],
  areas: ["Rahatani", "Pimple Saudagar", "Pimple Gurav", "Wakad", "Kalewadi", "Thergaon", "Pimpri-Chinchwad"],
};

export const owner = {
  name: "Ranjan Kumar Jena",
  firstName: "Ranjan",
  role: "Owner & Principal Mechanic",
  experience: "20+ years",
  formerRole: "Former Principal Mechanic at My Car",
  photo: "/images/ranjan-kumar-jena.jpg",
};

export const fullAddress = `${site.address.line1}, ${site.address.line2}, ${site.address.city}, ${site.address.state} ${site.address.pin}`;

export function whatsappLink(text = "Hi Balaji Auto, I'd like to book a car service.", number = site.whatsapp) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export type ServiceIcon =
  | "wrench"
  | "brake"
  | "suspension"
  | "scan"
  | "ac"
  | "tyre"
  | "wash"
  | "paint"
  | "tow"
  | "battery";

export type Service = {
  slug: string;
  title: string;
  icon: ServiceIcon;
  short: string;
  long: string;
  includes: string[];
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: "car-service",
    title: "Car Service & Maintenance",
    icon: "wrench",
    short: "Periodic servicing by trained mechanics to keep your car healthy and running smoothly.",
    long: "Regular servicing is the cheapest way to avoid big repair bills. Our mechanics follow a thorough checklist for every car, whatever the brand or model.",
    includes: [
      "Engine oil & filter change",
      "Air, cabin and fuel filter check",
      "Coolant, brake and power-steering fluid top-up",
      "Battery, belts and lights inspection",
      "Full multi-point safety check",
    ],
    keywords: ["car service", "servicing", "maintenance", "oil", "periodic", "general service", "full service", "filter"],
  },
  {
    slug: "brakes",
    title: "Brake Repair – Pads & Rotors",
    icon: "brake",
    short: "Brake inspection and replacement for safe, confident stopping every time.",
    long: "Squealing, grinding or a soft pedal are signs your brakes need attention. We inspect, repair and replace brake parts using genuine components.",
    includes: [
      "Brake pad & shoe replacement",
      "Disc / rotor skimming and replacement",
      "Brake fluid flush",
      "Caliper and brake line inspection",
    ],
    keywords: ["brake", "brakes", "pads", "rotor", "disc", "squeal", "stopping"],
  },
  {
    slug: "suspension",
    title: "Shocks & Struts Replacement",
    icon: "suspension",
    short: "Suspension repair that restores comfort, stability and control on city roads and highways.",
    long: "Worn shock absorbers make the ride bumpy and reduce grip. We diagnose suspension noise and replace shocks, struts, bushes and links.",
    includes: [
      "Shock absorber & strut replacement",
      "Suspension noise diagnosis",
      "Bush, link and ball-joint replacement",
      "Steering check after repair",
    ],
    keywords: ["shock", "shocks", "strut", "struts", "suspension", "bumpy", "noise"],
  },
  {
    slug: "diagnostics",
    title: "System Diagnosis & Repair",
    icon: "scan",
    short: "Computer scanning to find problems quickly and repair them accurately, for all brands.",
    long: "Check-engine light on? Our scanners read the fault codes so we fix the real problem instead of guessing — saving you time and money.",
    includes: [
      "OBD computer scanning",
      "Check-engine light diagnosis",
      "Electrical & wiring faults",
      "Engine and gearbox repair",
    ],
    keywords: ["diagnosis", "diagnostic", "scan", "scanning", "check engine", "engine", "electrical", "warning light", "repair"],
  },
  {
    slug: "ac",
    title: "Car AC Service",
    icon: "ac",
    short: "AC cleaning, gas refilling and repair to keep your car cool in every season.",
    long: "If your AC blows warm air, smells musty or makes noise, we clean, recharge and repair the system so you stay cool through Pune summers.",
    includes: [
      "AC gas top-up / refill",
      "Cooling coil & vent cleaning",
      "Compressor and condenser repair",
      "Cabin filter replacement",
    ],
    keywords: ["ac", "a/c", "air conditioning", "cooling", "gas", "aircon", "not cooling"],
  },
  {
    slug: "tyres",
    title: "Tyres & Wheel Balancing",
    icon: "tyre",
    short: "Alignment, rotation and balancing for smooth driving and even tyre wear.",
    long: "Steering pulling to one side or vibration at speed? Proper alignment and balancing make your tyres last longer and your drive safer.",
    includes: [
      "Wheel alignment",
      "Wheel balancing",
      "Tyre rotation",
      "Puncture repair & tyre replacement",
    ],
    keywords: ["tyre", "tyres", "tire", "tires", "wheel", "alignment", "balancing", "puncture", "rotation"],
  },
  {
    slug: "car-wash",
    title: "Car Wash & Detailing",
    icon: "wash",
    short: "Hand wash, interior cleaning, polishing and waxing that make your car look new.",
    long: "From a quick exterior wash to a full detail, we clean your car carefully by hand — inside and out.",
    includes: [
      "Exterior hand wash",
      "Interior vacuum & cleaning",
      "Car polishing & waxing",
      "Window & glass cleaning",
      "Full auto detailing",
    ],
    keywords: ["wash", "washing", "clean", "cleaning", "detailing", "polish", "polishing", "wax", "waxing", "interior", "foam"],
  },
  {
    slug: "body-paint",
    title: "Body Repair & Painting",
    icon: "paint",
    short: "Dents, scratches and paint damage fixed with a professional finish.",
    long: "Our body shop restores dents, scratches and accident damage, with colour-matched painting so the repair blends in.",
    includes: [
      "Dent removal",
      "Scratch repair",
      "Panel & full-body painting",
      "Accident repair",
    ],
    keywords: ["body", "dent", "dents", "scratch", "scratches", "paint", "painting", "accident", "denting"],
  },
  {
    slug: "towing",
    title: "Towing Service",
    icon: "tow",
    short: "Quick, dependable towing when your car breaks down on the road.",
    long: "Broken down? Call us and we'll arrange towing to our workshop so your car can be inspected and repaired.",
    includes: ["Breakdown towing", "Accident vehicle towing", "Tow to workshop for repair"],
    keywords: ["tow", "towing", "breakdown", "broke down", "stuck", "crane"],
  },
  {
    slug: "jump-start",
    title: "Jump Start & Battery",
    icon: "battery",
    short: "Fast jump-start help when your battery dies, plus battery checks and replacement.",
    long: "Car won't start? We provide jump-start assistance and can test or replace your battery so it doesn't happen again.",
    includes: ["Jump-start assistance", "Battery health check", "Battery replacement"],
    keywords: ["jump", "jump start", "battery", "won't start", "not starting", "dead"],
  },
];

export const highlights = [
  { title: "Expert Mechanics", text: "Trained technicians who handle every job carefully, for all car models." },
  { title: "Genuine Parts", text: "Quality, genuine spare parts with clear communication on what's replaced." },
  { title: "Same-Day Delivery", text: "Most services and washes are completed and handed back the same day." },
  { title: "Honest Pricing", text: "Transparent estimates before we start — no surprise charges." },
];

export const faqs = [
  {
    q: "Which car brands do you service?",
    a: "We service all major car brands and models — hatchbacks, sedans and SUVs, petrol, diesel and CNG.",
  },
  {
    q: "How long does a regular service take?",
    a: "Most periodic services and car washes are completed the same day. Bigger repairs or body work may take longer — we'll give you a time estimate upfront.",
  },
  {
    q: "How much does a service cost?",
    a: "Prices depend on your car model and the work needed. Call or WhatsApp us with your car model for a quick estimate before you visit.",
  },
  {
    q: "Do I need an appointment?",
    a: "Walk-ins are welcome, but booking ahead by phone or WhatsApp means less waiting time.",
  },
  {
    q: "Do you use genuine spare parts?",
    a: "Yes. We use genuine and quality parts, and we explain what is being replaced before we do the work.",
  },
];

export const testimonial = {
  quote:
    "Balaji Auto has been my go-to place for servicing. The work is honest, fast, and reasonably priced. My car always feels smoother after each visit.",
  name: "Kiran M",
  place: "Pimple Saudagar",
};

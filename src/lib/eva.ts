// Eva: a small rule-based assistant. Answers come only from the data in site.ts,
// so she never invents prices, offers or policies.
import { fullAddress, owner, services, site, whatsappLink, type Service } from "./site";

export type EvaLink = { label: string; href: string; external?: boolean };
export type EvaReply = { text: string; links?: EvaLink[]; quick?: string[] };

export const evaQuick = ["Opening hours", "Services", "Book a service", "Location", "Price estimate"];

const callLink: EvaLink = { label: `Call ${site.contactName.split(" ")[0]}: ${site.phone}`, href: site.phoneHref };
const waLink = (text?: string): EvaLink => ({ label: "WhatsApp us", href: whatsappLink(text), external: true });
const mapLink: EvaLink = { label: "Open in Google Maps", href: site.mapsUrl, external: true };
const bookLink: EvaLink = { label: "Booking form", href: "/#book" };

const intents: { id: string; words: string[] }[] = [
  { id: "greet", words: ["hi", "hello", "hey", "hii", "namaste", "namaskar", "good morning", "good evening", "good afternoon"] },
  { id: "thanks", words: ["thanks", "thank you", "thx", "dhanyavad", "great", "awesome", "ok thanks"] },
  { id: "bye", words: ["bye", "goodbye", "see you"] },
  { id: "duration", words: ["how long", "same day", "ready", "duration", "how much time", "takes", "delivery", "wait"] },
  { id: "hours", words:["hour", "hours", "timing", "timings", "time", "open", "opening", "close", "closing", "today", "sunday", "saturday", "weekend", "holiday", "now"] },
  { id: "location", words: ["where", "address", "location", "located", "direction", "directions", "map", "reach", "route", "near", "landmark"] },
  { id: "contact", words: ["phone", "call", "number", "contact", "email", "mail", "whatsapp", "mobile"] },
  { id: "book", words: ["book", "booking", "appointment", "slot", "schedule", "reserve", "visit"] },
  { id: "price", words: ["price", "prices", "cost", "costs", "charge", "charges", "rate", "rates", "how much", "estimate", "quote", "fees", "expensive", "cheap"] },
  { id: "services", words: ["services", "service list", "what do you do", "what do you offer", "offer", "offerings", "help with", "work do you do"] },
  { id: "brands", words: ["brand", "brands", "model", "models", "maruti", "suzuki", "hyundai", "honda", "tata", "mahindra", "toyota", "kia", "skoda", "volkswagen", "renault", "nissan", "mg", "ford", "suv", "sedan", "hatchback", "diesel", "petrol", "cng", "ev", "electric"] },
  { id: "owner", words: ["owner", "owns", "founder", "who runs", "proprietor", "ranjan", "jena", "principal", "mechanic", "mechanics", "experience", "experienced", "expert", "qualified", "about you", "about balaji"] },
  { id: "parts", words: ["genuine", "original", "parts", "spare", "spares", "warranty", "guarantee"] },
  { id: "pickup", words: ["pickup", "pick up", "pick-up", "drop", "doorstep", "home service", "collect"] },
  { id: "payment", words: ["pay", "payment", "upi", "gpay", "phonepe", "paytm", "card", "cash", "online payment"] },
];

function normalise(s: string) {
  return ` ${s.toLowerCase().replace(/[^a-z0-9/\s-]/g, " ").replace(/\s+/g, " ").trim()} `;
}

function hits(text: string, words: string[]) {
  return words.reduce((n, w) => (text.includes(` ${w} `) || (w.includes(" ") && text.includes(w)) ? n + 1 : n), 0);
}

function matchService(text: string): Service | undefined {
  let best: Service | undefined;
  let bestScore = 0;
  for (const s of services) {
    const score = hits(text, s.keywords);
    if (score > bestScore) {
      best = s;
      bestScore = score;
    }
  }
  return best;
}

function matchIntent(text: string): string | undefined {
  let best: string | undefined;
  let bestScore = 0;
  for (const i of intents) {
    const score = hits(text, i.words);
    if (score > bestScore) {
      best = i.id;
      bestScore = score;
    }
  }
  return best;
}

// Open/closed status in Pune time.
export function openStatus(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = get("weekday");
  const mins = Number(get("hour")) * 60 + Number(get("minute"));
  const open = 9 * 60;
  const close = day === "Sat" ? 18 * 60 : 21 * 60;
  if (day === "Sun") return "Today is Sunday — please call before visiting to check if we're open.";
  if (mins >= open && mins < close) return `We're open right now, until ${day === "Sat" ? "6:00 PM" : "9:00 PM"} today.`;
  if (mins < open) return "We're closed right now and open today at 9:00 AM.";
  return day === "Fri" || day === "Sat"
    ? "We're closed for today. Saturday's hours are 9 AM – 6 PM; on Sunday please call to check."
    : "We're closed for today and open again tomorrow at 9:00 AM.";
}

const hoursText = site.hours.map((h) => `• ${h.days}: ${h.time}`).join("\n");

function serviceReply(s: Service): EvaReply {
  return {
    text: `${s.title}: ${s.short}\n\nIncludes:\n${s.includes.map((x) => `• ${x}`).join("\n")}`,
    links: [waLink(`Hi Balaji Auto, I'd like to enquire about: ${s.title}.`), { label: "More details", href: `/services#${s.slug}` }],
    quick: ["Price estimate", "Book a service", "Opening hours"],
  };
}

export function evaReply(input: string, now = new Date()): EvaReply {
  const text = normalise(input);
  const intent = matchIntent(text);
  const service = matchService(text);

  if (intent === "price") {
    const what = service ? `Pricing for ${service.title}` : "Pricing";
    return {
      text: `${what} depends on your car's make and model and the work needed, so we don't quote a fixed rate here. Send us your car model on WhatsApp or give us a call and we'll share an estimate before you visit — no surprise charges.`,
      links: [waLink(`Hi Balaji Auto, could I get a price estimate${service ? ` for ${service.title}` : ""}? My car is: `), callLink],
      quick: ["Book a service", "Services"],
    };
  }

  if (intent === "book") {
    return {
      text: `Booking is easy! You can:\n• Fill the booking form — it sends your details to us on WhatsApp\n• WhatsApp us directly\n• Call ${site.contactName} on ${site.phone}\n\nWalk-ins are welcome too, but booking means less waiting.`,
      links: [bookLink, waLink(`Hi Balaji Auto, I'd like to book${service ? ` ${service.title}` : " a car service"}.`), callLink],
      quick: ["Opening hours", "Location"],
    };
  }

  // A specific service beats generic intents like "services" or "contact".
  if (service && !["hours", "location"].includes(intent ?? "")) return serviceReply(service);

  switch (intent) {
    case "greet":
      return {
        text: "Hello! 👋 I'm Eva, Balaji Auto's assistant. I can help with our services, opening hours, location and booking. What would you like to know?",
        quick: evaQuick,
      };
    case "thanks":
      return { text: "You're welcome! Drive safe 🚗 Anything else I can help with?", quick: evaQuick };
    case "bye":
      return { text: "Goodbye! We look forward to seeing you and your car at Balaji Auto." };
    case "hours":
      return { text: `${openStatus(now)}\n\nOur hours:\n${hoursText}`, links: [callLink], quick: ["Location", "Book a service"] };
    case "location":
      return {
        text: `We're at:\n${fullAddress}\n\nEasy to reach from Pimple Saudagar, Wakad and Pimple Gurav.`,
        links: [mapLink, callLink],
        quick: ["Opening hours", "Book a service"],
      };
    case "contact":
      return {
        text: `📞 ${site.contactName}: ${site.phone}\n✉️ ${site.emails.join("\n✉️ ")}\n\nYou can also message us on WhatsApp.`,
        links: [callLink, waLink()],
      };
    case "services":
      return {
        text: `Here's what we do:\n${services.map((s) => `• ${s.title}`).join("\n")}\n\nTap one below or ask me about any service.`,
        quick: services.slice(0, 6).map((s) => s.title),
        links: [{ label: "All services", href: "/services" }],
      };
    case "brands":
      return {
        text: "We service all major car brands and models — hatchbacks, sedans and SUVs, whether petrol, diesel or CNG. For a specific model, feel free to ask us on WhatsApp.",
        links: [waLink("Hi Balaji Auto, do you service my car? Model: ")],
        quick: ["Services", "Book a service"],
      };
    case "duration":
      return {
        text: "Most periodic services and car washes are completed the same day. Bigger repairs or body and paint work can take longer — we'll give you a time estimate when we inspect your car.",
        quick: ["Book a service", "Opening hours"],
      };
    case "owner":
      return {
        text: `Balaji Auto is run by ${owner.name}, our ${owner.role.toLowerCase()}. He has more than 20 years of hands-on experience and was previously the Principal Mechanic at My Car, working on numerous car brands across every service we offer.\n\nYou can call ${owner.firstName} directly on ${site.phone}.`,
        links: [callLink, { label: "About Ranjan", href: "/about" }],
        quick: ["Services", "Book a service"],
      };
    case "parts":
      return {
        text: "We use genuine and quality spare parts, and we always explain what needs replacing before doing the work.",
        quick: ["Price estimate", "Services"],
      };
    case "pickup":
      return {
        text: "For pick-up and drop availability, please give us a call — the team will confirm based on your location and timing.",
        links: [callLink, waLink("Hi Balaji Auto, do you offer pick-up and drop? My area is: ")],
      };
    case "payment":
      return {
        text: "Please check accepted payment methods with our team at the workshop or over the phone.",
        links: [callLink],
      };
  }

  return {
    text: "Sorry, I'm not sure about that one. I can help with services, opening hours, location, prices and booking — or you can reach our team directly.",
    links: [callLink, waLink()],
    quick: evaQuick,
  };
}

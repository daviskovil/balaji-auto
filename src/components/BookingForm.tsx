"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { services, site, whatsappLink } from "@/lib/site";

// No backend needed: the form composes a WhatsApp message to the workshop.
export default function BookingForm({ dark = false }: { dark?: boolean }) {
  const [form, setForm] = useState({ name: "", phone: "", car: "", service: services[0].title, date: "", note: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // The backup button sends to the second WhatsApp number.
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const number = submitter?.value === "backup" ? site.whatsapp2 : site.whatsapp;
    const lines = [
      "Hi Balaji Auto, I'd like to book a service.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Car: ${form.car}`,
      `Service: ${form.service}`,
      form.date && `Preferred date: ${form.date}`,
      form.note && `Note: ${form.note}`,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n"), number), "_blank", "noopener,noreferrer");
  }

  const label = `mb-1.5 block text-xs font-semibold ${dark ? "text-white/80" : "text-ink"}`;

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="bf-name" className={label}>Your name *</label>
        <input id="bf-name" required className="field" value={form.name} onChange={set("name")} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="bf-phone" className={label}>Phone number *</label>
        <input id="bf-phone" required type="tel" inputMode="tel" pattern="[0-9+\s-]{10,15}" className="field" value={form.phone} onChange={set("phone")} autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="bf-car" className={label}>Car make & model *</label>
        <input id="bf-car" required className="field" placeholder="e.g. Maruti Swift" value={form.car} onChange={set("car")} />
      </div>
      <div>
        <label htmlFor="bf-service" className={label}>Service</label>
        <select id="bf-service" className="field" value={form.service} onChange={set("service")}>
          {services.map((s) => (
            <option key={s.slug}>{s.title}</option>
          ))}
          <option>Other / Not sure</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="bf-date" className={label}>Preferred date</label>
        <input id="bf-date" type="date" className="field" value={form.date} onChange={set("date")} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="bf-note" className={label}>Anything we should know?</label>
        <textarea id="bf-note" rows={3} className="field" value={form.note} onChange={set("note")} placeholder="e.g. AC not cooling, noise while braking…" />
      </div>
      <div className="sm:col-span-2">
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" value="main" className="btn-wa w-full sm:w-auto">
            <MessageCircle className="h-4 w-4" aria-hidden /> Send booking on WhatsApp
          </button>
          <button
            type="submit"
            value="backup"
            className={`text-xs font-semibold underline-offset-2 hover:underline ${dark ? "text-white/80" : "text-ink"}`}
          >
            Send to backup number ({site.phone2})
          </button>
        </div>
        <p className={`mt-2 text-xs ${dark ? "text-white/60" : "text-muted"}`}>
          Opens WhatsApp with your details filled in — just press send. If it doesn&apos;t go through, use the backup
          number.
        </p>
      </div>
    </form>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { evaQuick, evaReply, type EvaReply } from "@/lib/eva";

type Msg = { from: "eva" | "user"; reply: EvaReply };

const welcome: EvaReply = {
  text: "Hi! I'm Eva 👋 Balaji Auto's virtual assistant. Ask me about our services, timings, location or booking.",
  quick: evaQuick,
};

const TEASER_KEY = "eva-teaser-seen";

export default function Eva() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "eva", reply: welcome }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(TEASER_KEY) === "1";
    } catch {}
    if (seen) return;
    const t = setTimeout(() => setTeaser(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function dismissTeaser() {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {}
  }

  function toggle() {
    dismissTeaser();
    setOpen((o) => !o);
  }

  function ask(q: string) {
    const text = q.trim();
    if (!text || typing) return;
    setMsgs((m) => [...m, { from: "user", reply: { text } }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "eva", reply: evaReply(text) }]);
      setTyping(false);
    }, 550);
  }

  const lastEva = [...msgs].reverse().find((m) => m.from === "eva");

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <section
          role="dialog"
          aria-label="Chat with Eva"
          className="eva-pop flex h-[min(560px,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl shadow-ink/25"
        >
          <header className="flex items-center gap-3 bg-ink px-4 py-3 text-white">
            <EvaAvatar />
            <div className="flex-1">
              <p className="font-display font-bold leading-tight">Eva</p>
              <p className="flex items-center gap-1.5 text-xs text-white/70">
                <span className="h-2 w-2 rounded-full bg-wa" aria-hidden /> Balaji Auto assistant
              </p>
            </div>
            <button type="button" onClick={toggle} className="rounded-md p-1.5 hover:bg-white/10" aria-label="Close chat">
              <X className="h-5 w-5" />
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-mist p-4" aria-live="polite">
            {msgs.map((m, i) =>
              m.from === "user" ? (
                <div key={i} className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-brand px-3.5 py-2.5 text-sm text-white">
                  {m.reply.text}
                </div>
              ) : (
                <div key={i} className="max-w-[90%]">
                  <div className="rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-sm whitespace-pre-line text-ink shadow-sm">
                    {m.reply.text}
                  </div>
                  {m.reply.links && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.reply.links.map((l) =>
                        l.href.startsWith("/") ? (
                          <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink-3">
                            {l.label}
                          </Link>
                        ) : (
                          <a
                            key={l.label}
                            href={l.href}
                            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink-3"
                          >
                            {l.label}
                          </a>
                        ),
                      )}
                    </div>
                  )}
                </div>
              ),
            )}
            {typing && (
              <div className="flex w-fit gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm" aria-label="Eva is typing">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="eva-dot h-1.5 w-1.5 rounded-full bg-muted" style={{ animationDelay: `${d * 0.15}s` }} />
                ))}
              </div>
            )}
          </div>

          {lastEva?.reply.quick && !typing && (
            <div className="flex gap-2 overflow-x-auto border-t border-line bg-white px-3 pt-3 [scrollbar-width:none]">
              {lastEva.reply.quick.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => ask(q)}
                  className="shrink-0 rounded-full border border-brand/40 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-brand hover:bg-brand-soft"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex gap-2 bg-white p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              aria-label="Message Eva"
              className="field !rounded-full"
              maxLength={300}
            />
            <button type="submit" disabled={!input.trim() || typing} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white disabled:opacity-40" aria-label="Send">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      )}

      {!open && teaser && (
        <div className="eva-pop relative max-w-[240px] rounded-2xl rounded-br-sm border border-line bg-white p-3.5 pr-8 text-sm shadow-xl shadow-ink/15">
          <button type="button" onClick={dismissTeaser} className="absolute top-2 right-2 text-muted hover:text-ink" aria-label="Dismiss">
            <X className="h-4 w-4" />
          </button>
          <button type="button" onClick={toggle} className="text-left">
            Hi, I&apos;m <b>Eva</b> 👋 Need help booking a service or checking our timings?
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "Close chat with Eva" : "Chat with Eva"}
        className="flex items-center gap-2 rounded-full bg-brand py-3 pr-5 pl-3 font-semibold text-white shadow-lg shadow-brand/40 transition hover:bg-brand-dark"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        <span className="text-sm">{open ? "Close" : "Ask Eva"}</span>
      </button>
    </div>
  );
}

function EvaAvatar() {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-full bg-brand font-display text-lg font-extrabold text-white ring-2 ring-white/20" aria-hidden>
      E
    </span>
  );
}

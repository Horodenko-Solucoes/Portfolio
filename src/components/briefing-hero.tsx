"use client";

import { useEffect, useId, useRef, useState } from "react";
import { briefing, site, whatsappLink } from "@/config/site";
import { ChevronIcon, WhatsAppIcon } from "./icons";

export const BRIEFING_EVENT = "briefing:fill";

export type BriefingDetail = { message: string; projectType: string };

const typeByWhat: Record<string, string> = {
  "um site": "Site ou landing page",
  "uma landing page": "Site ou landing page",
  "um sistema web": "Sistema web",
  "um aplicativo": "Aplicativo",
  "uma automação": "Automação",
  "uma integração com IA": "Integração com IA",
};

type SlotKey = keyof typeof briefing;

export function BriefingHero() {
  const [choice, setChoice] = useState<Record<SlotKey, string>>({
    what: briefing.what[2],
    forWho: briefing.forWho[0],
    goal: briefing.goal[1],
  });
  const [open, setOpen] = useState<SlotKey | null>(null);
  const [changed, setChanged] = useState<SlotKey | null>(null);

  const sentence = `Preciso de ${choice.what} para ${choice.forWho} que ${choice.goal}.`;
  const waMessage = `Olá, ${site.firstName}! ${sentence} Podemos conversar?`;

  function pick(slot: SlotKey, value: string) {
    setChoice((c) => ({ ...c, [slot]: value }));
    setChanged(slot);
    setOpen(null);
  }

  function sendToForm() {
    const detail: BriefingDetail = {
      message: `${sentence}\n\n`,
      projectType: typeByWhat[choice.what] ?? "",
    };
    window.dispatchEvent(new CustomEvent(BRIEFING_EVENT, { detail }));
    document.getElementById("contato")?.scrollIntoView();
  }

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.75fr)] lg:pt-24">
        <div>
          <h1
            id="hero-title"
            className="rise max-w-xl text-lg leading-snug text-pretty text-soft md:text-xl"
          >
            Sites, sistemas, automações, aplicativos e IA sob medida para o seu
            negócio. Monte o pedido e mande direto pra mim.
          </h1>

          <p
            className="rise mt-8 max-w-[17ch] text-[2.5rem] leading-[1.06] font-medium tracking-[-0.04em] text-balance [animation-delay:120ms] sm:text-6xl lg:text-[4.6rem]"
            aria-live="polite"
          >
            Preciso de{" "}
            <Slot
              slot="what"
              value={choice.what}
              options={briefing.what}
              open={open === "what"}
              animate={changed === "what"}
              onToggle={(o) => setOpen(o ? "what" : null)}
              onPick={(v) => pick("what", v)}
            />{" "}
            para{" "}
            <Slot
              slot="forWho"
              value={choice.forWho}
              options={briefing.forWho}
              open={open === "forWho"}
              animate={changed === "forWho"}
              onToggle={(o) => setOpen(o ? "forWho" : null)}
              onPick={(v) => pick("forWho", v)}
            />{" "}
            que{" "}
            <Slot
              slot="goal"
              value={choice.goal}
              options={briefing.goal}
              open={open === "goal"}
              animate={changed === "goal"}
              onToggle={(o) => setOpen(o ? "goal" : null)}
              onPick={(v) => pick("goal", v)}
              suffix="."
            />
          </p>

          <p className="rise mt-6 text-sm text-soft [animation-delay:240ms]">
            Toque nas partes em amarelo para trocar.
          </p>

          <div className="rise mt-10 flex flex-col gap-3 [animation-delay:320ms] sm:flex-row sm:items-center">
            <a
              href={whatsappLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-signal px-7 py-4 text-base font-semibold text-black transition-colors hover:bg-signal-soft"
            >
              <WhatsAppIcon />
              Enviar no WhatsApp
            </a>
            <button
              type="button"
              onClick={sendToForm}
              className="inline-flex items-center justify-center rounded-full border border-fg/25 px-7 py-4 text-base font-medium transition-colors hover:border-fg hover:bg-fg hover:text-bg"
            >
              Detalhar no formulário
            </button>
          </div>
          <p className="rise mt-5 text-sm text-soft [animation-delay:400ms]">
            {site.responseTime}
          </p>
        </div>

        <PixelMark />
      </div>
    </section>
  );
}

function Slot({
  slot,
  value,
  options,
  open,
  animate,
  onToggle,
  onPick,
  suffix,
}: {
  suffix?: string;
  slot: SlotKey;
  value: string;
  options: readonly string[];
  open: boolean;
  animate: boolean;
  onToggle: (open: boolean) => void;
  onPick: (value: string) => void;
}) {
  const listId = useId();
  const words = value.split(" ");
  const last = words.pop();
  const head = words.length ? `${words.join(" ")} ` : "";
  const wrapRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const toggleRef = useRef(onToggle);
  useEffect(() => {
    toggleRef.current = onToggle;
  });

  useEffect(() => {
    if (!open) return;
    const current = options.indexOf(value);
    optionRefs.current[Math.max(0, current)]?.focus();

    function onDown(e: PointerEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) toggleRef.current(false);
    }
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, options, value]);

  function onListKey(e: React.KeyboardEvent) {
    const items = optionRefs.current.filter(Boolean) as HTMLButtonElement[];
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(i + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(i - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Escape" || e.key === "Tab") {
      if (e.key === "Escape") e.preventDefault();
      onToggle(false);
      buttonRef.current?.focus();
    }
  }

  return (
    <span ref={wrapRef} className="relative inline">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={`${value}. Trocar opção`}
        onClick={() => onToggle(!open)}
        className="group inline cursor-pointer rounded-sm text-left text-signal decoration-signal/45 decoration-dashed decoration-[0.06em] underline-offset-[0.14em] [text-decoration-line:underline] hover:decoration-signal"
      >
        <span key={value} className={animate ? "word-in" : undefined}>
          {head}
          <span className="whitespace-nowrap">
            {last}
            <ChevronIcon className="ml-1 inline size-[0.42em] translate-y-[-0.08em] opacity-70 transition-transform group-aria-expanded:rotate-180" />
            {suffix && (
              <span className="inline-block text-fg" aria-hidden="true">
                {suffix}
              </span>
            )}
          </span>
        </span>
      </button>

      {open && (
        <span
          id={listId}
          role="listbox"
          aria-label={labelFor(slot)}
          onKeyDown={onListKey}
          className="absolute top-full left-0 z-30 mt-3 flex w-max max-w-[min(22rem,80vw)] flex-col rounded-2xl border border-white/10 bg-[#141514] p-1.5 text-base font-normal tracking-normal text-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)]"
        >
          {options.map((opt, i) => (
            <button
              key={opt}
              ref={(el) => {
                optionRefs.current[i] = el;
              }}
              type="button"
              role="option"
              aria-selected={opt === value}
              onClick={() => onPick(opt)}
              className="rounded-xl px-4 py-2.5 text-left outline-none hover:bg-white/8 focus-visible:bg-white/10 focus-visible:outline-none aria-selected:font-medium aria-selected:text-signal"
            >
              {opt}
            </button>
          ))}
        </span>
      )}
    </span>
  );
}

function labelFor(slot: SlotKey) {
  return slot === "what"
    ? "O que você precisa"
    : slot === "forWho"
      ? "Para quem"
      : "Qual o objetivo";
}

/**
 * O "H" da marca desenhado numa matriz de pontos. Os pontos acendem em
 * sequência quando a página carrega.
 */
const H_ROWS = [
  "1100000011",
  "1100000011",
  "1100000011",
  "1100000011",
  "1111111111",
  "1111111111",
  "1100000011",
  "1100000011",
  "1100000011",
  "1100000011",
];

function PixelMark() {
  const size = 10;
  const gap = 6;
  const step = size + gap;
  const w = H_ROWS[0].length * step - gap;
  const h = H_ROWS.length * step - gap;
  return (
    <div className="hidden justify-self-end lg:block" aria-hidden="true">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-[min(26vw,340px)]">
        {H_ROWS.flatMap((row, y) =>
          row.split("").map((cell, x) => {
            const on = cell === "1";
            const delay = 500 + (y * 10 + x) * 9 + (on ? 0 : 140);
            return (
              <rect
                key={`${x}-${y}`}
                x={x * step}
                y={y * step}
                width={size}
                height={size}
                rx={2.5}
                className={`rise ${on ? "fill-signal" : "fill-fg/10"}`}
                style={{ animationDelay: `${delay}ms`, animationDuration: "600ms" }}
              />
            );
          }),
        )}
      </svg>
    </div>
  );
}

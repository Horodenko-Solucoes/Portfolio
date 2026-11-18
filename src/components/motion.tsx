"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronIcon } from "./icons";

/**
 * transitions.dev "Texts reveal": adiciona .is-shown no bloco .t-stagger
 * quando ele entra na tela (uma vez só).
 */
export function Reveal({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-shown");
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`t-stagger ${className}`}>
      {children}
    </div>
  );
}

/** transitions.dev "Accordion expand" para o FAQ. */
export function Accordion({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="mt-16 border-b border-rule">
      {items.map((item) => (
        <AccordionItem key={item.q} q={item.q} a={item.a} />
      ))}
    </div>
  );
}

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <div className="t-acc group border-t border-rule" data-open={open}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="t-acc-head flex w-full cursor-pointer items-center justify-between gap-6 py-7 text-left text-xl font-medium tracking-[-0.01em]"
        >
          {q}
          <span className="grid size-9 shrink-0 place-items-center rounded-full border border-rule transition-colors group-data-[open=true]:bg-fg group-data-[open=true]:text-bg">
            <span className="t-acc-chevron">
              <ChevronIcon className="size-4" />
            </span>
          </span>
        </button>
      </h3>
      <div id={panelId} className="t-acc-panel" inert={!open}>
        <div className="t-acc-panel-inner">
          <p className="max-w-[62ch] pb-8 text-lg leading-relaxed text-soft">{a}</p>
        </div>
      </div>
    </div>
  );
}

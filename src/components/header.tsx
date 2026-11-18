"use client";

import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./icons";
import { Logo } from "./logo";
import { getLenis } from "./smooth-scroll";

const nav = [
  { href: "#servicos", label: "Serviços" },
  { href: "#projetos", label: "Projetos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#perguntas", label: "Dúvidas" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    // Com o menu aberto a rolagem suave também para.
    if (menuOpen) getLenis()?.stop();
    else getLenis()?.start();
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
        scrolled && !menuOpen
          ? "border-b border-rule bg-bg/75 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#" aria-label={`${site.brand}, início`} className="relative z-10 shrink-0">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[0.95rem] text-soft">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          <a
            href="#contato"
            className="hidden rounded-full border border-fg/25 px-5 py-2.5 text-sm font-medium transition-colors hover:border-fg hover:bg-fg hover:text-bg sm:inline-flex"
          >
            Vamos conversar
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 h-[1.5px] w-6 bg-current transition-transform duration-250 ease-in-out ${
                  menuOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-6 bg-current transition-transform duration-250 ease-in-out ${
                  menuOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        hidden={!menuOpen}
        className="fixed inset-0 bg-bg px-5 pt-28 pb-10 sm:px-8 lg:hidden"
      >
        <nav aria-label="Menu" className="flex h-full flex-col">
          <ul className="space-y-2">
            {[...nav, { href: "#contato", label: "Contato" }].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-4xl font-medium tracking-[-0.03em]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink(`Olá, ${site.firstName}! Vim pelo site e queria conversar sobre um projeto.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-signal px-6 py-4 font-semibold text-black"
          >
            <WhatsAppIcon />
            Chamar no WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}

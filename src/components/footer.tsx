import { cacheLife } from "next/cache";
import { site, whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./icons";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="pb-28 md:pb-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 border-t border-rule pt-10 md:flex-row md:items-center md:justify-between">
          <Logo />
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-soft">
            <li>
              <a
                href={site.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={site.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="hover:text-fg"
              >
                E-mail
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-fg">
                Voltar ao topo
              </a>
            </li>
          </ul>
          <p className="text-sm text-soft">
            © <CurrentYear /> {site.brand}
          </p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(
        `Olá, ${site.firstName}! Vim pelo site e queria conversar sobre um projeto.`,
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed right-5 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-signal text-black shadow-[0_12px_32px_-8px_rgba(0,0,0,0.55)] transition-transform hover:scale-105 motion-reduce:transition-none"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

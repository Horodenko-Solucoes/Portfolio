import { faq, projects, services, site, stack, steps } from "@/config/site";
import { ProjectCover } from "./project-cover";
import { ChevronIcon } from "./icons";

const container = "mx-auto max-w-7xl px-5 sm:px-8";

function Heading({
  id,
  title,
  intro,
  center,
}: {
  id: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <h2
        id={id}
        className="text-[2.25rem] leading-[1.08] font-medium tracking-[-0.035em] text-balance md:text-[3.5rem]"
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-lg leading-relaxed text-pretty text-soft md:text-xl">{intro}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function StackMarquee() {
  const items = [...stack, ...stack];
  return (
    <section aria-label="Tecnologias que uso" className="py-8 md:py-12">
      <div className="marquee-wrap overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="marquee flex w-max items-center gap-14 pr-14">
          {items.map((t, i) => (
            <li
              key={`${t}-${i}`}
              aria-hidden={i >= stack.length}
              className="text-2xl font-medium tracking-[-0.02em] whitespace-nowrap text-soft/70 md:text-3xl"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const serviceIcons: Record<string, React.ReactNode> = {
  sites: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18M6.5 6.8h.01M9 6.8h.01" />
    </>
  ),
  sistemas: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="2.8" />
      <path d="M4.5 6v6c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V6M4.5 12v6c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-6" />
    </>
  ),
  automacoes: (
    <>
      <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.7M20 4v4.7h-4.7" />
      <path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.3M4 20v-4.7h4.7" />
    </>
  ),
  apps: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  ia: (
    <>
      <path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z" />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </>
  ),
};

export function Services() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="py-28 md:py-40"
    >
      <div className={container}>
        <Heading
          id="servicos-title"
          title="Do site ao sistema completo"
          intro="Se o seu problema se resolve com software, provavelmente dá pra fazer. Esses são os pedidos mais comuns."
          center
        />

        <ul className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.id}>
              <svg
                viewBox="0 0 24 24"
                className="size-9 text-fg"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {serviceIcons[s.id]}
              </svg>
              <h3 className="mt-6 text-2xl font-medium tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-3 max-w-[42ch] leading-relaxed text-soft">{s.summary}</p>
              <p className="mt-4 text-sm leading-relaxed text-fg/70">
                <span className="sr-only">Exemplos: </span>
                {s.examples.join(", ")}.
              </p>
            </li>
          ))}
          <li className="flex flex-col justify-between rounded-3xl bg-signal p-8 text-black">
            <h3 className="text-2xl font-medium tracking-[-0.02em]">Não achou na lista?</h3>
            <p className="mt-3 leading-relaxed text-black/75">
              Me conta o problema e eu digo como resolveria.
            </p>
            <a
              href="#contato"
              className="mt-8 inline-flex w-fit items-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
            >
              Contar meu problema
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Projects() {
  return (
    <section
      id="projetos"
      aria-labelledby="projetos-title"
      className="pb-28 md:pb-40"
    >
      <div className={container}>
        <Heading
          id="projetos-title"
          title="Projetos selecionados"
          intro="Da plataforma de pesquisa da USP ao produto com IA."
          center
        />

        <ul className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((p, i) => {
            const featured = i === 0;
            const offset = !featured && i % 2 === 0;
            return (
              <li
                key={p.title}
                className={featured ? "md:col-span-2" : offset ? "md:mt-24" : undefined}
              >
                <article className="group relative">
                  <ProjectCover project={p} featured={featured} />
                  <div
                    className={
                      featured
                        ? "mt-7 grid gap-x-12 gap-y-3 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
                        : "mt-6"
                    }
                  >
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <h3
                          className={`font-medium tracking-[-0.02em] ${featured ? "text-3xl" : "text-2xl"}`}
                        >
                          {p.href ? (
                            <a
                              href={p.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="after:absolute after:inset-0 hover:underline hover:underline-offset-4"
                            >
                              {p.title}
                            </a>
                          ) : (
                            p.title
                          )}
                        </h3>
                        {!featured && (
                          <p className="text-sm text-soft">
                            {p.kind}
                            {p.status && (
                              <span className="sr-only">, {p.status.toLowerCase()}</span>
                            )}
                          </p>
                        )}
                      </div>
                      {featured && (
                        <p className="mt-2 text-sm text-soft">
                          {p.kind}
                          {p.status && <span className="sr-only">, {p.status.toLowerCase()}</span>}
                        </p>
                      )}
                      {p.client && <p className="mt-1 text-fg/80">{p.client}</p>}
                    </div>
                    <div>
                      <p
                        className={`max-w-[60ch] leading-relaxed text-soft ${featured ? "text-lg md:mt-1" : "mt-3"}`}
                      >
                        {p.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologias">
                        {p.stack.map((t) => (
                          <li
                            key={t}
                            className="rounded-full border border-rule px-3 py-1 text-xs font-medium text-fg/75"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Steps() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="py-28 md:py-40"
    >
      <div className={container}>
        <Heading
          id="como-funciona-title"
          title="Do primeiro contato ao sistema no ar"
          intro="Você sabe em que etapa o projeto está do começo ao fim."
        />

        <ol className="mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-rule pt-8">
              <span className="block text-6xl font-light tracking-[-0.04em] text-signal tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 text-2xl font-medium tracking-[-0.02em]">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function About() {
  return (
    <section aria-labelledby="sobre-title" className="pb-28 md:pb-40">
      <div
        className={`${container} grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-24`}
      >
        <h2
          id="sobre-title"
          className="text-[2.25rem] leading-[1.08] font-medium tracking-[-0.035em] text-balance md:text-[3.5rem]"
        >
          Você fala direto com quem escreve o código.
        </h2>
        <div className="space-y-5 text-lg leading-relaxed text-soft lg:pt-3">
          <p>
            Sou o <span className="text-fg">{site.owner}</span>,{" "}
            {site.role.toLowerCase()}. Cuido do projeto inteiro: a tela que o seu cliente
            usa, o servidor, o banco de dados e as integrações com outros sistemas.
          </p>
          <p>
            Sem intermediário e sem telefone sem fio. A pessoa que entende o seu problema
            na primeira conversa é a mesma que entrega a solução.
          </p>
          <p className="text-base">{site.location}.</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Faq() {
  return (
    <section
      id="perguntas"
      aria-labelledby="perguntas-title"
      className="py-28 md:py-40"
    >
      <div className={`${container} max-w-4xl`}>
        <Heading id="perguntas-title" title="Dúvidas comuns" center />
        <div className="mt-16 border-b border-rule">
          {faq.map((item) => (
            <details key={item.q} className="group border-t border-rule">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-xl font-medium tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-rule transition-colors group-open:bg-fg group-open:text-bg">
                  <ChevronIcon className="size-4 transition-transform group-open:rotate-180" />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-8 text-lg leading-relaxed text-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

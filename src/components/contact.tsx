"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import { sendContact, type ContactState } from "@/app/actions";
import { projectTypes, site, whatsappLink } from "@/config/site";
import { BRIEFING_EVENT, type BriefingDetail } from "./briefing-hero";
import { GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "./icons";

const initial: ContactState = { status: "idle" };

export function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="py-28 md:py-40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2
          id="contato-title"
          className="max-w-[14ch] text-[2.75rem] leading-[1.02] font-medium tracking-[-0.045em] text-balance sm:text-7xl lg:text-[6.5rem]"
        >
          Tem um projeto? Vamos conversar.
        </h2>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <p className="max-w-[40ch] text-lg leading-relaxed text-soft">
              O orçamento é gratuito e sem compromisso. {site.responseTime}
            </p>
            <a
              href={whatsappLink(`Olá, ${site.firstName}! Vim pelo site e queria conversar sobre um projeto.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-signal px-7 py-4 font-semibold text-black transition-colors hover:bg-signal-soft"
            >
              <WhatsAppIcon />
              Chamar no WhatsApp
            </a>

            <ul className="mt-12 divide-y divide-rule border-y border-rule">
              <ContactLink
                href={`mailto:${site.contact.email}`}
                icon={<MailIcon />}
                label="E-mail"
                detail={site.contact.email}
              />
              <ContactLink
                href={site.contact.linkedin}
                icon={<LinkedInIcon />}
                label="LinkedIn"
                detail="Perfil profissional"
                external
              />
              <ContactLink
                href={site.contact.github}
                icon={<GitHubIcon />}
                label="GitHub"
                detail="Código aberto"
                external
              />
            </ul>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactLink({
  href,
  icon,
  label,
  detail,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  detail: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex items-center gap-4 py-5"
      >
        <span className="text-soft transition-colors group-hover:text-signal">{icon}</span>
        <span className="font-medium">{label}</span>
        <span className="ml-auto truncate text-sm text-soft transition-colors group-hover:text-fg">
          {detail}
        </span>
      </a>
    </li>
  );
}

function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const startedRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const checkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
    function onBriefing(e: Event) {
      const { message, projectType } = (e as CustomEvent<BriefingDetail>).detail;
      if (messageRef.current) {
        messageRef.current.value = message;
      }
      if (typeRef.current && projectType) typeRef.current.value = projectType;
      setTimeout(() => {
        const el = messageRef.current;
        if (!el) return;
        el.focus({ preventScroll: true });
        el.setSelectionRange(el.value.length, el.value.length);
      }, 400);
    }
    window.addEventListener(BRIEFING_EVENT, onBriefing);
    return () => window.removeEventListener(BRIEFING_EVENT, onBriefing);
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      // transitions.dev success check: out → reflow → in (repete a cada envio).
      const check = checkRef.current;
      if (check) {
        check.setAttribute("data-state", "out");
        void check.offsetWidth;
        check.setAttribute("data-state", "in");
      }
    }
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  const err = state.fieldErrors ?? {};

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        // Envio manual para o React não limpar os campos quando houver erro.
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      noValidate
      className="rounded-3xl bg-white p-6 text-black [color-scheme:light] sm:p-10"
      aria-describedby="form-status"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome" name="name" error={err.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            className={inputCls(err.name)}
            aria-invalid={!!err.name}
            aria-describedby={err.name ? "name-error" : undefined}
          />
        </Field>
        <Field label="E-mail" name="email" error={err.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputCls(err.email)}
            aria-invalid={!!err.email}
            aria-describedby={err.email ? "email-error" : undefined}
          />
        </Field>
        <Field label="WhatsApp" hint="opcional" name="phone" error={err.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(11) 99999-9999"
            className={inputCls(err.phone)}
            aria-invalid={!!err.phone}
            aria-describedby={err.phone ? "phone-error" : undefined}
          />
        </Field>
        <Field label="Tipo de projeto" name="projectType" error={err.projectType}>
          <select
            ref={typeRef}
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            className={inputCls(err.projectType)}
            aria-invalid={!!err.projectType}
            aria-describedby={err.projectType ? "projectType-error" : undefined}
          >
            <option value="" disabled className="bg-white text-stone">
              Escolha uma opção
            </option>
            {projectTypes.map((t) => (
              <option key={t} className="bg-white text-black">
                {t}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Sobre o projeto" name="message" error={err.message}>
            <textarea
              ref={messageRef}
              id="message"
              name="message"
              rows={6}
              required
              placeholder="O que você quer resolver, para quando precisa e qualquer referência que ajude."
              className={`${inputCls(err.message)} resize-y`}
              aria-invalid={!!err.message}
              aria-describedby={err.message ? "message-error" : undefined}
            />
          </Field>
        </div>
      </div>

      {/* Anti-spam */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Não preencha
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="" />

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          id="form-status"
          ref={statusRef}
          tabIndex={-1}
          role="status"
          className={`flex items-center gap-2.5 text-sm outline-none ${
            state.status === "error"
              ? "font-medium text-[#b42318]"
              : state.status === "success"
                ? "font-medium text-[#0f6b3a]"
                : "text-graphite"
          }`}
        >
          {state.status === "success" && (
            <span ref={checkRef} className="t-success-check shrink-0" data-state="out" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Comprimento do traço ≈ 21.6 (getTotalLength), arredondado para 23. */}
                <path d="M4.5 12.5l5 5L19.5 7" style={{ strokeDasharray: 23, strokeDashoffset: 23 }} />
              </svg>
            </span>
          )}
          <span>{state.message ?? "Seus dados ficam só comigo e servem para eu te responder."}</span>
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-black px-7 py-4 font-semibold text-white transition-opacity hover:opacity-85 disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Enviando mensagem..." : "Enviar mensagem"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  name,
  error,
  children,
}: {
  label: string;
  hint?: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
        {hint && <span className="font-normal text-graphite"> ({hint})</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-[#b42318]">
          {error}
        </p>
      )}
    </div>
  );
}

function inputCls(error?: string) {
  return `block w-full rounded-xl border bg-cloud px-4 py-3.5 text-base text-black placeholder:text-stone transition-colors focus:border-black focus:bg-white focus:outline-none ${
    error ? "border-[#b42318]" : "border-transparent"
  }`;
}

"use server";

import { Resend } from "resend";
import { z } from "zod";
import { projectTypes, site } from "@/config/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "phone" | "projectType" | "message", string>>;
};

const schema = z.object({
  name: z.string().trim().min(2, "Escreva seu nome.").max(120),
  email: z.email("Confira o e-mail: ele precisa ter o formato nome@exemplo.com."),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v === "" || v.replace(/\D/g, "").length >= 10, {
      message: "Coloque o DDD junto do número.",
    }),
  projectType: z.enum(projectTypes as [string, ...string[]], {
    error: "Escolha o tipo de projeto.",
  }),
  message: z
    .string()
    .trim()
    .min(15, "Conte um pouco mais sobre o projeto (pelo menos uma frase).")
    .max(5000),
});

const MIN_FILL_MS = 2500;

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    projectType: String(formData.get("projectType") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Anti-spam: campo invisível preenchido ou envio rápido demais = robô.
  const honeypot = String(formData.get("website") ?? "");
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (honeypot || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return { status: "success", message: "Mensagem enviada." };
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState["fieldErrors"]>;
      fieldErrors[key] ??= issue.message;
    }
    return {
      status: "error",
      message: "Alguns campos precisam de ajuste.",
      fieldErrors,
    };
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Site <onboarding@resend.dev>";

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contato] RESEND_API_KEY ausente, mensagem só registrada no console:", data);
      return { status: "success", message: "Mensagem enviada (modo de desenvolvimento)." };
    }
    console.error("[contato] RESEND_API_KEY não configurada.");
    return {
      status: "error",
      message: "O formulário está fora do ar agora. Fale comigo pelo WhatsApp ou e-mail ao lado.",
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `Novo pedido de orçamento: ${data.projectType} (${data.name})`,
    text: [
      `Nome: ${data.name}`,
      `E-mail: ${data.email}`,
      `WhatsApp: ${data.phone || "não informado"}`,
      `Tipo de projeto: ${data.projectType}`,
      "",
      data.message,
    ].join("\n"),
  });

  if (error) {
    console.error("[contato] Falha no envio:", error);
    return {
      status: "error",
      message: "A mensagem não foi enviada. Tente de novo ou fale comigo pelo WhatsApp.",
    };
  }

  return {
    status: "success",
    message: "Mensagem enviada. Vou responder no seu e-mail em até 1 dia útil.",
  };
}

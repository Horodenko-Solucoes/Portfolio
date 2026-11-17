# Horodenko Soluções | Portfólio

Site de portfólio e captação de clientes: serviços, projetos, como funciona, dúvidas e contato (WhatsApp, formulário por e-mail, e-mail, LinkedIn e GitHub).

O topo da página tem um **montador de pedido**: o visitante escolhe as partes da frase
("Preciso de *um sistema web* para *a minha empresa* que *organize o dia a dia*") e envia
direto no WhatsApp ou leva o texto pronto para o formulário.

## Stack

- Next.js 16 (App Router, Cache Components, página estática)
- Tailwind CSS 4
- Server Action + Zod para o formulário
- Resend para envio de e-mail
- Fonte Onest auto-hospedada (`@fontsource-variable/onest`)

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Sem `RESEND_API_KEY`, em desenvolvimento o formulário só registra a mensagem no terminal.

## Onde editar o conteúdo

Tudo fica em **`src/config/site.ts`**:

| O quê | Campo |
| --- | --- |
| Nome, domínio, WhatsApp, e-mail, LinkedIn | `site` |
| Opções do montador de pedido | `briefing` |
| Serviços | `services` |
| Etapas do processo | `steps` |
| Projetos do portfólio (prints em `public/projetos/`, campo `images`) | `projects` |
| Tecnologias | `stack` |
| Perguntas frequentes | `faq` |

Os pontos que **precisam** ser trocados estão marcados com `TODO`.

Cores e fonte ficam em `src/app/globals.css` (bloco `@theme`).

## Prints dos projetos

Ficam em `public/projetos/` e são listados no campo `images` de cada projeto em
`src/config/site.ts` (com largura e altura reais do arquivo).

Para ficarem nítidos:

- **Tire o print em alta resolução.** No Chrome/Edge, abra o DevTools (F12), ative o modo
  de dispositivo (Ctrl+Shift+M), defina "DPR" como 2 e use o menu ⋮ > "Capture screenshot".
  Em apps desktop, aumente a escala do Windows para 150% ou 200% antes do Win+Shift+S.
- **Salve sem perda.** PNG, ou WebP sem perda (`lossless`). JPEG e WebP com perda borram texto pequeno.
- As imagens são servidas sem recompressão (`unoptimized` em `project-cover.tsx`), então o
  arquivo que você colocar é exatamente o que aparece.

## Formulário de contato (Resend)

1. Crie uma conta em https://resend.com e gere uma API key.
2. Copie `.env.example` para `.env.local` e preencha.
3. Para enviar de um endereço seu (ex.: `site@seudominio.com.br`), verifique o domínio no Resend.
   Até lá, use `onboarding@resend.dev` como remetente: as mensagens só chegam no e-mail da conta Resend.

O formulário tem proteção simples contra spam (campo invisível e tempo mínimo de preenchimento).

## Deploy na Vercel

1. Importe o repositório em https://vercel.com/new.
2. Em **Settings > Environment Variables**, adicione `RESEND_API_KEY`, `CONTACT_TO_EMAIL` e `CONTACT_FROM_EMAIL`.
3. Deploy. Depois, aponte o domínio em **Settings > Domains** e atualize `site.url` em `src/config/site.ts`.

## Estrutura

```
src/
  app/
    actions.ts            envio do formulário (Server Action)
    layout.tsx            metadados e SEO
    page.tsx              página + JSON-LD
    opengraph-image.tsx   imagem de compartilhamento gerada
    robots.ts, sitemap.ts
  components/
    briefing-hero.tsx     topo com o montador de pedido
    sections.tsx          tecnologias, serviços, projetos, processo, sobre, dúvidas
    project-cover.tsx     capas dos projetos (prints reais ou ilustração)
    contact.tsx           contato e formulário
    header.tsx, footer.tsx, logo.tsx, icons.tsx
  config/site.ts          todo o conteúdo
```

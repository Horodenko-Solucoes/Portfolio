/**
 * Todo o conteúdo do site mora aqui.
 * Troque os valores marcados com TODO pelos seus dados reais.
 */

export const site = {
  brand: "Horodenko Soluções",
  owner: "Leonardo Horodenko Ferreira",
  firstName: "Leonardo",
  role: "Desenvolvedor fullstack",
  //url: "", // TODO: domínio final (usado em SEO e sitemap)
  description:
    "Desenvolvimento de sites, sistemas web, automações, aplicativos e integrações com IA sob medida para o seu negócio.",
  location: "Brasil, atendimento 100% remoto",
  responseTime: "Respondo em até 1 dia útil.",

  contact: {
    // TODO: só números, com DDI 55 + DDD. Ex.: 5511999998888
    whatsapp: "5511930866339",
    email: "horodenkosolucoes@gmail.com",
    linkedin: "https://www.linkedin.com/in/leonardo-horodenko/",
    github: "https://github.com/DevHorodenko",
  },
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* ------------------------------------------------------------------ */
/* Montador de briefing do topo da página                              */
/* ------------------------------------------------------------------ */

export const briefing = {
  what: [
    "um site",
    "uma landing page",
    "um sistema web",
    "um aplicativo",
    "uma automação",
    "uma integração com IA",
  ],
  forWho: [
    "a minha empresa",
    "o meu escritório",
    "a minha loja",
    "um projeto pessoal",
    "a minha equipe",
  ],
  goal: [
    "traga mais clientes",
    "organize o dia a dia",
    "acabe com trabalho repetitivo",
    "venda pela internet",
    "atenda clientes 24 horas",
    "substitua as planilhas",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Serviços                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  id: string;
  title: string;
  summary: string;
  examples: string[];
};

export const services: Service[] = [
  {
    id: "sites",
    title: "Sites e landing pages",
    summary:
      "Páginas rápidas, que aparecem no Google e funcionam bem no celular. Feitas para transformar visita em contato.",
    examples: [
      "Site institucional",
      "Landing page de campanha",
      "Portfólio",
      "Página de captura com formulário",
    ],
  },
  {
    id: "sistemas",
    title: "Sistemas web sob medida",
    summary:
      "Quando a planilha não dá mais conta. Cadastros, painéis, controle de acesso e relatórios do jeito que o seu processo funciona.",
    examples: [
      "Painel administrativo",
      "Agendamentos",
      "Gestão de clientes e pedidos",
      "Área do cliente",
    ],
  },
  {
    id: "automacoes",
    title: "Automações",
    summary:
      "Aquela tarefa que alguém faz todo dia à mão, copiando de um lugar e colando em outro, passa a acontecer sozinha.",
    examples: [
      "Integração entre sistemas",
      "Relatórios automáticos",
      "Disparo de e-mails e mensagens",
      "Coleta de dados da web",
    ],
  },
  {
    id: "apps",
    title: "Aplicativos",
    summary:
      "Apps que rodam no celular e no computador, com a mesma base de código e sem depender de loja para atualizar.",
    examples: [
      "App instalável (PWA)",
      "App interno para equipe",
      "Versão mobile do seu sistema",
    ],
  },
  {
    id: "ia",
    title: "Integrações com IA",
    summary:
      "IA aplicada a um problema concreto do seu negócio, conectada aos seus dados e com respostas em tempo real.",
    examples: [
      "Assistente de atendimento",
      "Análise e resumo de documentos",
      "Busca inteligente nos seus arquivos",
      "Geração de conteúdo",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Como funciona                                                       */
/* ------------------------------------------------------------------ */

export const steps = [
  {
    title: "Conversa",
    text: "Você me conta o problema, sem precisar saber termo técnico. Eu faço as perguntas certas.",
  },
  {
    title: "Proposta",
    text: "Você recebe escopo, prazo e valor por escrito. Sem surpresa no meio do caminho.",
  },
  {
    title: "Desenvolvimento",
    text: "Entregas parciais para você testar e ajustar enquanto o projeto anda, não só no final.",
  },
  {
    title: "Entrega e suporte",
    text: "Publicação, treinamento rápido e acompanhamento nos primeiros dias de uso.",
  },
];

/* ------------------------------------------------------------------ */
/* Projetos                                                            */
/* TODO: revise descrições, adicione links e troque pelos seus cases.  */
/* ------------------------------------------------------------------ */

export type ProjectImage = {
  /** Caminho a partir de public, ex.: "/projetos/rpg.webp" */
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Project = {
  title: string;
  kind: string;
  /** Para quem foi feito (opcional) */
  client?: string;
  description: string;
  stack: string[];
  href?: string;
  /** Selo opcional sobre a capa, ex.: "Em produção" */
  status?: string;
  /** Cor de fundo da capa */
  color: string;
  /**
   * Prints reais (até 2). Com 2 imagens elas aparecem sobrepostas.
   * Para ficarem nítidos, use prints grandes (o ideal é o dobro do tamanho
   * em que aparecem; veja o README).
   * Sem imagem, a capa usa a ilustração indicada em "cover".
   */
  images?: ProjectImage[];
  cover?: "chat" | "kanban" | "audio" | "chart";
};

export const projects: Project[] = [
  {
    title: "Bibliografia Processual Feminina",
    kind: "Plataforma de pesquisa",
    client: "Grupo de pesquisa da Faculdade de Direito da USP",
    description:
      "Mapeamento da produção acadêmica de professoras e pesquisadoras em Direito Processual no Brasil: consulta pública com filtros, fichas individuais, painéis estatísticos e uma área da equipe para cadastrar dados e importar planilhas.",
    stack: ["React", "TypeScript", "Vite", "Tailwind", "Supabase", "PostgreSQL", "Recharts"],
    href: "https://sites.usp.br/bibliografiaprocessualfeminina/",
    status: "Em produção",
    color: "#1f6f6b",
    images: [
      {
        src: "/projetos/bpf-inicio.webp",
        width: 2000,
        height: 1500,
        alt: "Página inicial da Bibliografia Processual Feminina",
      },
      {
        src: "/projetos/bpf-estatisticas.webp",
        width: 2000,
        height: 1500,
        alt: "Painel de estatísticas com gráfico por estado",
      },
    ],
  },
  {
    title: "Portal de RPG com mestre de IA",
    kind: "Integração com IA",
    description:
      "Plataforma de RPG em que a IA conduz a partida como mestre: criação de personagem guiada, testes de dados com regras e narração transmitida em tempo real enquanto é gerada.",
    stack: ["Next.js", "Fastify", "Claude API", "SSE", "PostgreSQL", "Redis"],
    color: "#a47a35",
    images: [
      {
        src: "/projetos/rpg-criacao.webp",
        width: 872,
        height: 1033,
        alt: "Tela de criação de campanha e personagem",
      },
      {
        src: "/projetos/rpg-conversa.webp",
        width: 904,
        height: 1058,
        alt: "Partida em andamento com a narração do mestre",
      },
    ],
  },
  {
    title: "Roda",
    kind: "Aplicativo desktop",
    description:
      "Gestor de projetos no estilo Jira para Windows: épicos, sprints, backlog e quadro Kanban com arrastar e soltar. Importa backlogs exportados do Jira em CSV.",
    stack: ["Tauri", "React", "TypeScript", "Tailwind", "SQLite"],
    href: "https://github.com/DevHorodenko/Roda",
    color: "#4b3fd1",
    images: [
      {
        src: "/projetos/roda-board.webp",
        width: 1679,
        height: 476,
        alt: "Quadro Kanban com colunas A fazer, Em andamento, Em revisão e Concluído",
      },
    ],
  },
  {
    title: "Narrador de histórias",
    kind: "Aplicativo",
    description:
      "Servidor local de síntese de voz integrado a uma interface web para narrar livros e histórias.",
    stack: ["Next.js", "TTS local", "Node.js"],
    color: "#33202b",
    cover: "audio",
  },
  {
    title: "Infográficos jurídicos comparativos",
    kind: "Conteúdo visual",
    description:
      "Comparativos visuais de legislação e jurisprudência produzidos para uso profissional em escritório de advocacia.",
    stack: ["Design de informação", "Web"],
    color: "#f2c14e",
    cover: "chart",
  },
];

/* ------------------------------------------------------------------ */
/* Stack                                                               */
/* ------------------------------------------------------------------ */

export const stack = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "Fastify",
  "PostgreSQL",
  "Redis",
  "Drizzle ORM",
  "Zod",
  "TanStack Query",
  "Claude API",
  "Python",
  "JavaScript",
  "Java",
];

/* ------------------------------------------------------------------ */
/* Perguntas frequentes                                                */
/* TODO: confira se as respostas batem com a forma como você trabalha. */
/* ------------------------------------------------------------------ */

export const faq = [
  {
    q: "Quanto custa?",
    a: "O orçamento é gratuito e sem compromisso. Depois de uma conversa rápida eu mando uma proposta com valor.",
  },
  {
    q: "Quanto tempo leva?",
    a: "Uma landing page costuma sair em poucos dias; sistemas maiores são divididos em etapas. O prazo de cada etapa vem escrito na proposta.",
  },
  {
    q: "Você atende fora da minha cidade?",
    a: "Sim. Todo o trabalho é remoto, por chamada de vídeo, WhatsApp e e-mail, para qualquer lugar do Brasil. Se necessário podemos marcar encontros presenciais nos arredores de São Paulo.",
  },
  {
    q: "Não sei explicar direito o que preciso. Tudo bem?",
    a: "Tudo bem, é o normal. Me conte o problema que você quer resolver e a gente descobre junto qual é a melhor solução.",
  },
  {
    q: "E depois que o projeto estiver no ar?",
    a: "Posso cuidar da hospedagem, de ajustes e de novas funcionalidades num plano de manutenção, ou entregar tudo documentado para outra pessoa assumir.",
  },
];

export const projectTypes = [
  "Site ou landing page",
  "Sistema web",
  "Automação",
  "Aplicativo",
  "Integração com IA",
  "Outro / ainda não sei",
];

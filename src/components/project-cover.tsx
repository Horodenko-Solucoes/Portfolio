import Image from "next/image";
import type { Project, ProjectImage } from "@/config/site";

/**
 * Capa dos projetos: mostra os prints reais quando existem e, sem eles,
 * uma ilustração feita em código.
 */
export function ProjectCover({ project, featured }: { project: Project; featured?: boolean }) {
  const images = project.images ?? [];
  const wide = images.length === 1 && images[0].width / images[0].height > 2;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${featured ? "aspect-[4/3] md:aspect-[16/8]" : "aspect-[4/3]"}`}
      style={{ backgroundColor: project.color }}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:transition-none">
        {images.length === 2 && (
          <>
            <Shot
              image={images[0]}
              className={`top-[11%] left-[7%] w-[58%] ${featured ? "md:top-[12%] md:left-[9%] md:w-[46%]" : ""}`}
            />
            <Shot
              image={images[1]}
              className={`top-[24%] right-[7%] w-[58%] ${featured ? "md:top-[26%] md:right-[9%] md:w-[46%]" : ""}`}
            />
          </>
        )}
        {images.length === 1 &&
          (wide ? (
            <Shot image={images[0]} className="top-[24%] left-[7%] w-[150%]" />
          ) : (
            <Shot image={images[0]} className="top-[10%] left-[8%] w-[84%]" />
          ))}
        {images.length === 0 && (
          <div aria-hidden="true" className="absolute inset-0">
            {project.cover === "chat" && <ChatCover />}
            {project.cover === "kanban" && <KanbanCover />}
            {project.cover === "audio" && <AudioCover />}
            {project.cover === "chart" && <ChartCover />}
          </div>
        )}
      </div>
      {project.status && (
        <span
          aria-hidden="true"
          className="absolute top-4 left-4 z-10 rounded-full bg-black/80 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur"
        >
          {project.status}
        </span>
      )}
    </div>
  );
}

/**
 * Print do projeto com moldura e sombra; sai pela borda da capa.
 * "unoptimized" serve o arquivo original: a compressão padrão do Next
 * borra texto pequeno de prints.
 */
function Shot({ image, className }: { image: ProjectImage; className: string }) {
  return (
    <div
      className={`absolute overflow-hidden rounded-xl shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)] ring-1 ring-black/20 ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        unoptimized
        className="block h-auto w-full"
      />
    </div>
  );
}

function Window({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`absolute overflow-hidden rounded-2xl border border-white/10 bg-black/35 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm ${className}`}
    >
      <div className="flex gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/25" />
        <span className="size-2.5 rounded-full bg-white/25" />
        <span className="size-2.5 rounded-full bg-white/25" />
      </div>
      {children}
    </div>
  );
}

function ChatCover() {
  return (
    <Window className="inset-x-[9%] top-[12%] -bottom-6">
      <div className="space-y-3 p-5 text-[clamp(0.6rem,1.15vw,0.85rem)] leading-snug text-white">
        <p className="w-fit max-w-[75%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-2.5">
          Vocês chegam à ponte de pedra. A névoa cobre o rio.
        </p>
        <p className="ml-auto w-fit max-w-[70%] rounded-2xl rounded-tr-sm bg-signal px-4 py-2.5 text-black">
          Eu atravesso devagar, com a tocha erguida.
        </p>
        <p className="w-fit max-w-[80%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-2.5">
          No meio da ponte, algo se move sob a água
          <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-signal" />
        </p>
      </div>
    </Window>
  );
}

function KanbanCover() {
  const cols = [
    { title: "A fazer", cards: [64, 82, 50] },
    { title: "Fazendo", cards: [74, 58], highlight: 0 },
    { title: "Feito", cards: [88, 60, 70] },
  ];
  return (
    <Window className="inset-x-[9%] top-[12%] -bottom-6">
      <div className="grid grid-cols-3 gap-3 p-5">
        {cols.map((c) => (
          <div key={c.title} className="space-y-2.5">
            <p className="text-[clamp(0.55rem,1vw,0.75rem)] font-medium text-white/60">{c.title}</p>
            {c.cards.map((w, i) => (
              <div
                key={i}
                className={`space-y-2 rounded-xl p-3 ${
                  c.highlight === i ? "bg-signal" : "bg-white/10"
                }`}
              >
                <div
                  className={`h-1.5 rounded-full ${c.highlight === i ? "bg-black/60" : "bg-white/50"}`}
                  style={{ width: `${w}%` }}
                />
                <div
                  className={`h-1.5 w-1/2 rounded-full ${c.highlight === i ? "bg-black/30" : "bg-white/20"}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Window>
  );
}

function AudioCover() {
  const bars = [30, 52, 40, 70, 88, 60, 44, 76, 95, 68, 50, 82, 64, 38, 58, 80, 46, 66, 90, 54, 36, 62, 48, 28];
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-[10%] px-[10%]">
      <div className="flex h-[38%] items-center gap-[1.4%]">
        {bars.map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-full ${i < 10 ? "bg-signal" : "bg-white/25"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="grid size-[clamp(2.25rem,5vw,3.5rem)] shrink-0 place-items-center rounded-full bg-white">
          <svg viewBox="0 0 24 24" className="size-1/2 translate-x-[1px] fill-black">
            <path d="M8 5.5v13l10-6.5z" />
          </svg>
        </span>
        <div className="flex-1">
          <div className="h-1 rounded-full bg-white/20">
            <div className="h-full w-[42%] rounded-full bg-signal" />
          </div>
          <p className="mt-2 text-[clamp(0.6rem,1.1vw,0.8rem)] text-white/60">
            12:48 / 34:10
          </p>
        </div>
      </div>
    </div>
  );
}

function ChartCover() {
  const rows = [
    [82, 46],
    [38, 74],
    [64, 64],
    [52, 90],
  ];
  return (
    <div className="absolute inset-[10%] grid grid-cols-2 gap-[8%]">
      {["A", "B"].map((label, col) => (
        <div key={label} className="flex flex-col">
          <span className="grid size-[clamp(2rem,4.5vw,3rem)] place-items-center rounded-full bg-black text-[clamp(0.8rem,1.6vw,1.1rem)] font-semibold text-signal">
            {label}
          </span>
          <div className="mt-[14%] flex flex-1 flex-col justify-between">
            {rows.map((r, i) => (
              <div key={i} className="space-y-1.5">
                <div className="h-1 w-1/3 rounded-full bg-black/25" />
                <div className="h-[clamp(0.6rem,1.4vw,1rem)] rounded-full bg-black/10">
                  <div className="h-full rounded-full bg-black" style={{ width: `${r[col]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

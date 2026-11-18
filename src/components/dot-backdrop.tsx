"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo do site: matriz de pontos no estilo do "H" da marca, fixa atrás da página.
 *
 * - Parallax com inércia: a grade acompanha a rolagem mais devagar que o
 *   conteúdo e continua deslizando um pouco depois que a rolagem para.
 * - A velocidade da rolagem empurra a onda e ondula os pontos, que voltam
 *   ao repouso quando a página para.
 * - Uma onda diagonal lenta acende alguns pontos em amarelo; perto do cursor
 *   eles brilham.
 * - Canvas 2D, sem dependências. Pausa com a aba escondida; com
 *   prefers-reduced-motion desenha um quadro estático.
 */
const GAP = 26; // distância entre pontos (px)
const DOT = 2; // lado do ponto em repouso (px)
const POINTER_RADIUS = 170;

const PARALLAX = 0.35; // quanto a grade anda em relação à rolagem
const SMOOTHING = 0.08; // inércia do parallax (menor = mais "líquido")
const FLOW_STRENGTH = 7; // ondulação máxima dos pontos (px) ao rolar rápido
const IDLE_FPS = 30; // sem rolagem a animação pode rodar mais leve

const SIGNAL = "242, 193, 78";
const BASE = "245, 245, 243";

export function DotBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let lastFrame = 0;
    let lastDraw = 0;
    const pointer = { x: -1e4, y: -1e4 };

    // Estado do "fluido"
    let offset = window.scrollY * PARALLAX; // posição suavizada da grade
    let phase = 0; // fase extra da onda, empurrada pela rolagem
    let energy = 0; // 0..1, agitação causada pela velocidade da rolagem

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / GAP) + 2;
      const rows = Math.ceil(h / GAP) + 2;
      const ox = (w - (cols - 1) * GAP) / 2;
      // Linhas em coordenadas "do mundo": o padrão anda junto com a grade.
      const firstRow = Math.floor(offset / GAP) - 1;
      const shift = offset - firstRow * GAP;
      const flow = energy * FLOW_STRENGTH;

      ctx.fillStyle = `rgba(${BASE}, 0.07)`;
      ctx.beginPath();
      const lit: [number, number, number][] = [];
      for (let j = 0; j < rows; j++) {
        const r = firstRow + j;
        const rowY = j * GAP - shift;
        // Ondulação horizontal por linha, proporcional à velocidade.
        const sway = flow * Math.sin(r * 0.42 + time * 2.2);
        for (let x = 0; x < cols; x++) {
          const px = ox + x * GAP + sway;
          const py = rowY + flow * 0.5 * Math.sin(x * 0.5 + time * 1.8);

          let glow =
            Math.max(0, Math.sin(x * 0.32 + r * 0.18 - time * 0.7 - phase)) ** (8 - energy * 4);
          glow *= 0.55 + 0.45 * Math.sin(x * 1.7 + r * 2.3 + time * 0.9);

          const dx = px - pointer.x;
          const dy = py - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < POINTER_RADIUS * POINTER_RADIUS) {
            glow = Math.max(glow, (1 - Math.sqrt(d2) / POINTER_RADIUS) ** 1.6);
          }
          if (glow > 0.04) lit.push([px, py, glow]);
          else ctx.rect(px - DOT / 2, py - DOT / 2, DOT, DOT);
        }
      }
      ctx.fill();

      for (const [px, py, g] of lit) {
        const s = DOT + g * 1.6;
        ctx.fillStyle = `rgba(${SIGNAL}, ${0.1 + g * 0.5})`;
        ctx.fillRect(px - s / 2, py - s / 2, s, s);
      }
    }

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(lastFrame / 1000);
    }

    function loop(t: number) {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      const dt = Math.min(64, t - (lastFrame || t));
      lastFrame = t;

      // Parallax com inércia, independente da taxa de quadros.
      const target = window.scrollY * PARALLAX;
      const k = 1 - Math.pow(1 - SMOOTHING, dt / 16.67);
      const prev = offset;
      offset += (target - offset) * k;
      const velocity = (offset - prev) / Math.max(dt, 1); // px/ms

      // A rolagem empurra a onda e agita os pontos; a agitação decai sozinha.
      phase += velocity * dt * 0.012;
      const push = Math.min(1, Math.abs(velocity) / 1.2);
      energy += (push - energy) * (push > energy ? 0.25 : 0.05);

      const moving = Math.abs(target - offset) > 0.3 || energy > 0.01;
      if (!moving && t - lastDraw < 1000 / IDLE_FPS) return;
      lastDraw = t;
      draw(t / 1000);
    }

    function onPointer(e: PointerEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    }
    function onLeave() {
      pointer.x = pointer.y = -1e4;
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduce) return () => window.removeEventListener("resize", resize);

    if (finePointer) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="rise pointer-events-none fixed inset-0 -z-10 size-full [animation-delay:400ms] [mask-image:radial-gradient(ellipse_90%_85%_at_65%_40%,#000_25%,transparent_90%)]"
    />
  );
}

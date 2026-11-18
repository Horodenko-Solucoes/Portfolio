"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

/**
 * Rolagem suave com inércia (Lenis) no mouse/trackpad.
 * No toque continua a rolagem nativa do celular.
 * Desligada com prefers-reduced-motion.
 */
let instance: Lenis | null = null;

/** Instância ativa (ou null quando a rolagem suave está desligada). */
export function getLenis() {
  return instance;
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1, // inércia: menor = mais "deslizante"
      anchors: true, // links #secao também rolam suave (respeita scroll-padding-top)
      allowNestedScroll: true, // textarea e listas internas rolam normalmente
    });
    instance = lenis;
    return () => {
      lenis.destroy();
      instance = null;
    };
  }, []);
  return null;
}

import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.brand}: sites, sistemas, automações e IA sob medida`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#050505",
          color: "#eef1ec",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#f2c14e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#050505",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            H
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>{site.brand}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 600, lineHeight: 1.08, letterSpacing: -3 }}>
          <div style={{ display: "flex" }}>Preciso de</div>
          <div style={{ display: "flex", color: "#f2c14e" }}>um sistema web</div>
          <div style={{ display: "flex" }}>sob medida.</div>
        </div>
        <div style={{ fontSize: 28, color: "#9a9e9c" }}>
          Sites, sistemas, automações, aplicativos e integrações com IA
        </div>
      </div>
    ),
    size,
  );
}

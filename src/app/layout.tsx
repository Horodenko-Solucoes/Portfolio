import type { Metadata, Viewport } from "next";
import "@fontsource-variable/onest";
import { site } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} | Sites, sistemas, automações e IA sob medida`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  keywords: [
    "desenvolvimento de sites",
    "sistema web sob medida",
    "automação",
    "aplicativo",
    "integração com IA",
    "desenvolvedor freelancer",
    "Next.js",
  ],
  authors: [{ name: site.owner }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.brand,
    title: site.brand,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.brand,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="antialiased">
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}

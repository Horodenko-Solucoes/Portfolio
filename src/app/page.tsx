import { BriefingHero } from "@/components/briefing-hero";
import { Contact } from "@/components/contact";
import { Footer, WhatsAppFloat } from "@/components/footer";
import { Header } from "@/components/header";
import { About, Faq, Projects, Services, StackMarquee, Steps } from "@/components/sections";
import { faq, services, site } from "@/config/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: site.brand,
      url: site.url,
      description: site.description,
      email: site.contact.email,
      telephone: `+${site.contact.whatsapp}`,
      areaServed: "BR",
      founder: { "@type": "Person", name: site.owner, jobTitle: site.role },
      sameAs: [site.contact.linkedin, site.contact.github],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.summary },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-full bg-signal px-5 py-2.5 font-semibold text-black focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <BriefingHero />
        <StackMarquee />
        <Services />
        <Projects />
        <Steps />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

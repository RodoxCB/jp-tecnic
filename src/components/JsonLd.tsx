import type { SiteContent } from "@/lib/types";

type JsonLdProps = {
  content: SiteContent;
};

export function JsonLd({ content }: JsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: content.site.name,
    description:
      "Conserto de celular em Domingos Martins, Paraju, Marechal Floriano e região.",
    areaServed: content.regions.map((region) => ({
      "@type": "City",
      name: region
    })),
    url: "https://jp-tecnic.vercel.app",
    sameAs: [content.site.instagram],
    openingHours: "Mo-Sa 08:00-18:00",
    priceRange: "$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

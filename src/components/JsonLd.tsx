import { SITE } from "@/lib/constants";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description:
      "Conserto de celular em Domingos Martins, Paraju, Marechal Floriano e região.",
    areaServed: SITE.regions.map((region) => ({
      "@type": "City",
      name: region,
    })),
    url: "https://jp-tecnic.vercel.app",
    sameAs: [SITE.instagram],
    openingHours: "Mo-Sa 08:00-18:00",
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

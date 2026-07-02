import { Differentials } from "@/components/Differentials";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Region } from "@/components/Region";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Hero copy={content.copy.hero} whatsapp={content.contact} />
      <Gallery copy={content.copy.gallery} items={content.gallery} instagram={content.site.instagram} />
      <Services copy={content.copy.services} services={content.services} whatsapp={content.contact} />
      <HowItWorks copy={content.copy.howItWorks} steps={content.steps} />
      <Differentials title={content.copy.differentials.title} differentials={content.differentials} />
      <Reviews copy={content.copy.reviews} reviews={content.reviews} />
      <Region copy={content.copy.region} regions={content.regions} />
      <FAQ title={content.copy.faq.title} items={content.faq} />
      <FinalCTA copy={content.copy.finalCta} whatsapp={content.contact} />
    </>
  );
}

import { Differentials } from "@/components/Differentials";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Region } from "@/components/Region";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <Gallery />
      <Services />
      <HowItWorks />
      <Differentials />
      <Reviews />
      <Region />
      <FAQ />
      <FinalCTA />
    </>
  );
}

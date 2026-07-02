import { MapPin } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { FadeIn } from "@/components/FadeIn";
import { SectionTitle } from "@/components/SectionTitle";

type RegionProps = {
  copy: SiteContent["copy"]["region"];
  regions: SiteContent["regions"];
};

export function Region({ copy, regions }: RegionProps) {
  return (
    <section className="bg-black px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle title={copy.title} subtitle={copy.subtitle} />
        </FadeIn>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {regions.map((item, index) => (
            <FadeIn key={`${item}-${index}`} delay={index * 60}>
              <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4">
                <MapPin size={20} className="shrink-0 text-[#25D366]" />
                <span className="font-semibold text-white">{item}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

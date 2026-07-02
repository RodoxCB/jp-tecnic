import { MapPin } from "lucide-react";
import { COPY, SITE } from "@/lib/constants";
import { FadeIn } from "./FadeIn";
import { SectionTitle } from "./SectionTitle";

export function Region() {
  const { region } = COPY;

  return (
    <section className="bg-black px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle title={region.title} subtitle={region.subtitle} />
        </FadeIn>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SITE.regions.map((item, index) => (
            <FadeIn key={item} delay={index * 60}>
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

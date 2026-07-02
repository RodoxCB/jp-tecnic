import { Truck } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { FadeIn } from "@/components/FadeIn";
import { SectionTitle } from "@/components/SectionTitle";

type HowItWorksProps = {
  copy: SiteContent["copy"]["howItWorks"];
  steps: SiteContent["steps"];
};

export function HowItWorks({ copy, steps }: HowItWorksProps) {
  return (
    <section id="como-funciona" className="bg-zinc-950 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle title={copy.title} subtitle={copy.subtitle} />
        </FadeIn>

        <div className="mt-10 space-y-4">
          {steps.map((item, index) => (
            <FadeIn key={`${item.title}-${index}`} delay={index * 80}>
              <div className="flex gap-4 rounded-2xl border border-zinc-800 bg-black p-5 sm:items-center sm:gap-6 sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-lg font-bold text-black">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400 sm:text-base">{item.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 p-5 sm:items-center sm:p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/20 text-[#25D366]">
              <Truck size={24} />
            </div>
            <p className="text-base font-semibold text-white sm:text-lg">{copy.pickup}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

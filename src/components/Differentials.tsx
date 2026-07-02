import {
  BadgeDollarSign,
  Headphones,
  MapPin,
  Search,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { COPY, DIFFERENTIALS } from "@/lib/constants";
import { FadeIn } from "./FadeIn";
import { SectionTitle } from "./SectionTitle";

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  "badge-dollar-sign": BadgeDollarSign,
  search: Search,
  "map-pin": MapPin,
  headphones: Headphones,
};

export function Differentials() {
  return (
    <section className="bg-black px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle title={COPY.differentials.title} />
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIALS.map((item, index) => {
            const Icon = iconMap[item.icon] ?? Zap;
            return (
              <FadeIn key={item.title} delay={index * 70}>
                <article className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-center sm:text-left">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366] sm:mx-0">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

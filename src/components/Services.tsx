import {
  Apple,
  Battery,
  Cpu,
  Plug,
  Settings,
  Shield,
  Smartphone,
  type LucideIcon
} from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { FadeIn } from "@/components/FadeIn";
import { SectionTitle } from "@/components/SectionTitle";
import { WhatsAppButton } from "@/components/WhatsAppButton";

type ServicesProps = {
  copy: SiteContent["copy"]["services"];
  services: SiteContent["services"];
  whatsapp: SiteContent["contact"];
};

const iconMap: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  battery: Battery,
  cpu: Cpu,
  plug: Plug,
  settings: Settings,
  shield: Shield,
  apple: Apple
};

export function Services({ copy, services, whatsapp }: ServicesProps) {
  return (
    <section id="servicos" className="bg-black px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle title={copy.title} subtitle={copy.subtitle} />
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Smartphone;
            return (
              <FadeIn key={`${service.title}-${index}`} delay={index * 60}>
                <article className="h-full rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-[#25D366]/40 hover:bg-zinc-900">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{service.description}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn>
          <div className="mt-10 text-center">
            <WhatsAppButton
              label={copy.cta}
              size="lg"
              message={copy.ctaMessage}
              phone={whatsapp.whatsappNumber}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

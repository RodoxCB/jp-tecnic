import { COPY } from "@/lib/constants";
import { FadeIn } from "./FadeIn";
import { WhatsAppButton } from "./WhatsAppButton";

export function FinalCTA() {
  const { finalCta } = COPY;

  return (
    <section id="contato" className="bg-black px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="rounded-3xl border border-[#25D366]/30 bg-gradient-to-br from-[#25D366]/15 to-zinc-950 px-6 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
              {finalCta.title}
            </h2>
            <p className="mt-3 text-lg text-zinc-300 sm:text-xl">{finalCta.subtitle}</p>
            <div className="mt-8">
              <WhatsAppButton size="lg" className="w-full sm:w-auto" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import { Instagram } from "lucide-react";
import Image from "next/image";
import { GALLERY_IMAGES, SITE } from "@/lib/constants";
import { FadeIn } from "./FadeIn";
import { SectionTitle } from "./SectionTitle";

export function Gallery() {
  return (
    <section id="galeria" className="bg-zinc-950 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle
            title="Serviços reais realizados"
            subtitle="Veja alguns dos aparelhos que já passaram por aqui"
          />
        </FadeIn>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {GALLERY_IMAGES.map((image, index) => (
            <FadeIn key={image.src} delay={index * 80}>
              <div className="group relative aspect-square overflow-hidden rounded-2xl bg-zinc-900">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-10 text-center">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 font-semibold text-white transition hover:border-[#25D366]/50 hover:text-[#25D366]"
            >
              <Instagram size={20} />
              Ver mais no Instagram
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

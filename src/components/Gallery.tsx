import { Instagram } from "lucide-react";
import { COPY, SITE } from "@/lib/constants";
import { getGallery } from "@/lib/gallery";
import { FadeIn } from "./FadeIn";
import { GalleryGrid } from "./GalleryGrid";
import { SectionTitle } from "./SectionTitle";

export function Gallery() {
  const items = getGallery(9);
  const { gallery } = COPY;

  return (
    <section id="galeria" className="bg-zinc-950 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle title={gallery.title} subtitle={gallery.subtitle} />
        </FadeIn>

        <FadeIn>
          <GalleryGrid items={items} />
        </FadeIn>

        <FadeIn>
          <div className="mt-10 text-center">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 font-semibold text-white transition hover:border-[#25D366]/50 hover:text-[#25D366]"
            >
              <Instagram size={20} />
              {gallery.instagramCta}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

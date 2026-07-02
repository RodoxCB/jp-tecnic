import { Instagram } from "lucide-react";
import { COPY, SITE } from "@/lib/constants";
import { fetchInstagramPosts } from "@/lib/instagram";
import { FadeIn } from "./FadeIn";
import { SectionTitle } from "./SectionTitle";

export async function Gallery() {
  const images = await fetchInstagramPosts(12);
  const { gallery } = COPY;

  return (
    <section id="galeria" className="bg-zinc-950 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle title={gallery.title} subtitle={gallery.subtitle} />
        </FadeIn>

        {images.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {images.map((image, index) => (
              <FadeIn key={image.id} delay={index * 80}>
                <a
                  href={image.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square overflow-hidden rounded-2xl bg-zinc-900"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={image.alt}
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
                    <span className="text-xs font-medium text-white sm:text-sm">{gallery.hover}</span>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn>
            <p className="mt-10 text-center text-zinc-400">{gallery.fallback}</p>
          </FadeIn>
        )}

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

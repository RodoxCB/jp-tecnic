"use client";

import { Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import type { InstagramMedia } from "@/lib/instagram";
import { COPY, SITE } from "@/lib/constants";
import { FadeIn } from "./FadeIn";
import { SectionTitle } from "./SectionTitle";

const PREVIEW_LIMIT = 9;

function GallerySkeleton() {
  return (
    <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
      {Array.from({ length: PREVIEW_LIMIT }).map((_, index) => (
        <div
          key={index}
          className="aspect-square animate-pulse rounded-2xl bg-zinc-800"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function Gallery() {
  const { gallery } = COPY;
  const [images, setImages] = useState<InstagramMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch(`/api/instagram?limit=${PREVIEW_LIMIT}`);
        if (!response.ok) throw new Error("fetch failed");

        const data = (await response.json()) as { images: InstagramMedia[] };
        if (cancelled) return;

        if (data.images?.length > 0) {
          setImages(data.images.slice(0, PREVIEW_LIMIT));
          setFailed(false);
        } else {
          setFailed(true);
        }
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="galeria" className="bg-zinc-950 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle title={gallery.title} subtitle={gallery.subtitle} />
        </FadeIn>

        {loading && <GallerySkeleton />}

        {!loading && images.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {images.map((image, index) => (
              <FadeIn key={image.id} delay={index * 60}>
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
                    loading={index < 3 ? "eager" : "lazy"}
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
        )}

        {!loading && failed && (
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

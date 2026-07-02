"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryItem } from "@/lib/gallery";

type GalleryGridProps = {
  items: GalleryItem[];
};

export function GalleryGrid({ items }: GalleryGridProps) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
          >
            <Image
              src={item.url}
              alt={item.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-h-[90vh] max-w-lg" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute -top-10 right-0 text-sm font-medium text-zinc-300 hover:text-[#25D366]"
              aria-label="Fechar"
            >
              Fechar
            </button>
            <div className="relative aspect-square w-full min-w-[280px]">
              <Image
                src={active.url}
                alt={active.title}
                fill
                className="rounded-2xl object-contain"
                sizes="90vw"
              />
            </div>
            <p className="mt-3 text-center text-sm text-zinc-300">{active.title}</p>
            <a
              href={active.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-center text-sm font-medium text-[#25D366] hover:underline"
            >
              Ver no Instagram
            </a>
          </div>
        </div>
      )}
    </>
  );
}

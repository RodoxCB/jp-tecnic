"use client";

import { useMemo, useState } from "react";
import type { PhoneBrand, PhoneItem, SiteContent } from "@/lib/types";
import { PhoneCard } from "@/components/loja/PhoneCard";

type LojaClientProps = {
  phones: PhoneItem[];
  copy: SiteContent["copy"]["loja"];
  whatsappNumber: string;
  instagram: string;
};

type BrandFilter = "todos" | PhoneBrand;

const FILTERS: { id: BrandFilter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "apple", label: "Apple" },
  { id: "samsung", label: "Samsung" },
  { id: "motorola", label: "Motorola" },
  { id: "xiaomi", label: "Xiaomi" },
  { id: "outros", label: "Outros" }
];

export function LojaClient({ phones, copy, whatsappNumber, instagram }: LojaClientProps) {
  const [brand, setBrand] = useState<BrandFilter>("todos");

  const filtered = useMemo(() => {
    if (brand === "todos") {
      return phones;
    }

    return phones.filter((phone) => phone.brand === brand);
  }, [brand, phones]);

  return (
    <section className="bg-black px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{copy.title}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-400">{copy.subtitle}</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setBrand(filter.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                brand === filter.id
                  ? "border-[#25D366] bg-[#25D366] text-black"
                  : "border-zinc-700 text-zinc-300 hover:border-[#25D366]/60 hover:text-[#25D366]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((phone) => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                whatsappNumber={whatsappNumber}
                ctaLabel={copy.cta}
              />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-zinc-400">{copy.empty}</p>
        )}

        <div className="mt-12 text-center">
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-400 hover:text-[#25D366]"
          >
            Ver mais no Instagram da loja
          </a>
        </div>
      </div>
    </section>
  );
}

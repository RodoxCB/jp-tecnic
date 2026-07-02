"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { COPY, FAQ_ITEMS } from "@/lib/constants";
import { FadeIn } from "./FadeIn";
import { SectionTitle } from "./SectionTitle";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-zinc-950 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <SectionTitle title={COPY.faq.title} />
        </FadeIn>

        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <FadeIn key={item.question} delay={index * 60}>
                <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-black">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-white">{item.question}</span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-zinc-800 px-5 py-4">
                      <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">{item.answer}</p>
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

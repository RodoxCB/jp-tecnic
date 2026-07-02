import { Star } from "lucide-react";
import { COPY, REVIEWS } from "@/lib/constants";
import { FadeIn } from "./FadeIn";
import { SectionTitle } from "./SectionTitle";

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#25D366]" aria-label="5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} fill="currentColor" />
      ))}
    </div>
  );
}

export function Reviews() {
  const { reviews } = COPY;

  return (
    <section id="avaliacoes" className="bg-zinc-950 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle title={reviews.title} subtitle={reviews.subtitle} />
        </FadeIn>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((review, index) => (
            <FadeIn key={review.name} delay={index * 100}>
              <article className="flex h-full flex-col rounded-2xl border border-zinc-800 bg-black p-6">
                <Stars />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300 sm:text-base">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-4 border-t border-zinc-800 pt-4">
                  <p className="font-semibold text-white">{review.name}</p>
                  <p className="text-sm text-zinc-500">{review.location}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

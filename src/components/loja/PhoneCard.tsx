import Image from "next/image";
import { buildPhoneMessage } from "@/lib/utils";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import type { PhoneItem } from "@/lib/types";

type PhoneCardProps = {
  phone: PhoneItem;
  whatsappNumber: string;
  ctaLabel: string;
};

const BRAND_LABEL: Record<PhoneItem["brand"], string> = {
  apple: "Apple",
  samsung: "Samsung",
  motorola: "Motorola",
  xiaomi: "Xiaomi",
  outros: "Outros"
};

export function PhoneCard({ phone, whatsappNumber, ctaLabel }: PhoneCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      <div className="relative aspect-square">
        <Image
          src={phone.image}
          alt={phone.model}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/80 px-2.5 py-1 text-xs font-medium text-[#25D366]">
          {BRAND_LABEL[phone.brand]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-white">{phone.model}</h3>
        <p className="mt-1 text-sm text-zinc-400">
          {phone.storage} • {phone.color} • {phone.condition}
        </p>
        <p className="mt-3 flex-1 text-sm text-zinc-300">{phone.description}</p>
        <p className="mt-4 text-xl font-bold text-[#25D366]">{phone.price}</p>

        <a
          href={getWhatsAppUrl(whatsappNumber, buildPhoneMessage(phone.model))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#20bd5a]"
        >
          {ctaLabel}
        </a>
      </div>
    </article>
  );
}

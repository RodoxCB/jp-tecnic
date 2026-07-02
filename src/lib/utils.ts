import type { PhoneItem, SiteContent } from "@/lib/types";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getActivePhones(content: SiteContent): PhoneItem[] {
  return (content.phones ?? []).filter((phone) => phone.active);
}

export function buildPhoneMessage(model: string): string {
  return `Oi! Tenho interesse no aparelho ${model}. Ainda está disponível?`;
}

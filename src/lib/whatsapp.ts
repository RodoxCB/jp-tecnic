import { SITE } from "./constants";

export function getWhatsAppUrl(customMessage?: string): string {
  const message = customMessage ?? SITE.whatsappMessage;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encoded}`;
}

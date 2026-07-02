import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition hover:scale-110 hover:bg-[#20bd5a] active:scale-95 sm:right-6 sm:bottom-6 sm:h-16 sm:w-16"
    >
      <MessageCircle size={28} className="sm:hidden" />
      <MessageCircle size={32} className="hidden sm:block" />
    </a>
  );
}

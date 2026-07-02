import { Clock, Instagram, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xl font-bold text-white">{SITE.name}</p>
            <p className="mt-2 text-sm text-zinc-400">{SITE.tagline}</p>
          </div>

          <div>
            <p className="font-semibold text-white">Região atendida</p>
            <ul className="mt-3 space-y-1 text-sm text-zinc-400">
              {SITE.regions.map((region) => (
                <li key={region}>{region}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white">Contato</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-[#25D366]"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-[#25D366]"
                >
                  <Instagram size={16} />
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white">Horário</p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-zinc-400">
              <Clock size={16} className="text-[#25D366]" />
              {SITE.schedule}
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. Assistência técnica de celular em
            Domingos Martins, Paraju e Marechal Floriano.
          </p>
        </div>
      </div>
    </footer>
  );
}

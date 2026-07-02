import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JP Tecnic | Assistência Técnica de Celular em Domingos Martins",
  description:
    "Assistência técnica de celular em Domingos Martins, Paraju e Marechal Floriano. Troca de tela, bateria, reparo em placa e mais. Orçamento pelo WhatsApp.",
  keywords: [
    "assistência técnica de celular em Domingos Martins",
    "conserto de celular Paraju",
    "troca de tela Marechal Floriano",
    "JP Tecnic",
    "reparo de celular ES",
    "troca de bateria celular",
  ],
  openGraph: {
    title: "JP Tecnic | Assistência Técnica de Celulares",
    description:
      "Conserto de celular rápido e de confiança. Atendimento em Domingos Martins, Paraju, Marechal Floriano e região.",
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans">
        <JsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}

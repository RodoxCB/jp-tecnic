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
  title: "JP Tecnic | Conserto de celular em Domingos Martins",
  description:
    "Conserto de celular em Domingos Martins, Paraju e Marechal Floriano. Troca de tela, bateria, placa e muito mais. Chama no WhatsApp que a gente te ajuda.",
  keywords: [
    "assistência técnica de celular em Domingos Martins",
    "conserto de celular Paraju",
    "troca de tela Marechal Floriano",
    "JP Tecnic",
    "reparo de celular ES",
    "troca de bateria celular",
  ],
  openGraph: {
    title: "JP Tecnic | Conserto de celular com confiança",
    description:
      "A gente conserta seu celular com rapidez e transparência. Atendemos Domingos Martins, Paraju, Marechal Floriano e região.",
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

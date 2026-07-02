import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SiteChrome } from "@/components/SiteChrome";
import { getContent } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();

  return {
    title: `${content.site.name} | Conserto de celular em Domingos Martins`,
    description:
      "Conserto de celular em Domingos Martins, Paraju e Marechal Floriano. Troca de tela, bateria e muito mais. Chama no WhatsApp que a gente te ajuda.",
    keywords: [
      "assistência técnica de celular em Domingos Martins",
      "conserto de celular Paraju",
      "troca de tela Marechal Floriano",
      "JP Assistência Técnica",
      "reparo de celular ES",
      "troca de bateria celular"
    ],
    openGraph: {
      title: `${content.site.name} | Conserto de celular com confiança`,
      description:
        "A gente conserta seu celular com rapidez e transparência. Atendemos Domingos Martins, Paraju, Marechal Floriano e região.",
      locale: "pt_BR",
      type: "website"
    },
    robots: { index: true, follow: true }
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = await getContent();

  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans">
        <JsonLd content={content} />
        <SiteChrome content={content}>{children}</SiteChrome>
      </body>
    </html>
  );
}

import { LojaClient } from "@/components/loja/LojaClient";
import { getContent } from "@/lib/content";
import { getActivePhones } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Loja | JP Tecnic"
};

export default async function LojaPage() {
  const content = await getContent();
  const phones = getActivePhones(content);

  return (
    <LojaClient
      phones={phones}
      copy={content.copy.loja}
      whatsappNumber={content.contact.whatsappNumber}
      instagram={content.site.instagram}
    />
  );
}

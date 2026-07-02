import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { UPLOAD_FOLDERS, uploadImage } from "@/lib/uploads";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = formData.get("folder");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Arquivo inválido" }, { status: 400 });
  }

  if (typeof folder !== "string" || !UPLOAD_FOLDERS.includes(folder as (typeof UPLOAD_FOLDERS)[number])) {
    return NextResponse.json({ error: "Pasta inválida" }, { status: 400 });
  }

  try {
    const url = await uploadImage(file, folder as (typeof UPLOAD_FOLDERS)[number]);
    return NextResponse.json({ ok: true, url });
  } catch {
    return NextResponse.json({ error: "Falha no upload" }, { status: 500 });
  }
}

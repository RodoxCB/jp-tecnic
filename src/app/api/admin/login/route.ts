import { NextResponse } from "next/server";
import { COOKIE_NAME, getSessionToken, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: string };

  if (!verifyPassword(password ?? "")) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }

  const token = getSessionToken(password ?? "");
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/"
  });

  return response;
}

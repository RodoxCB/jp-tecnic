import { NextRequest, NextResponse } from "next/server";
import { fetchInstagramPosts } from "@/lib/instagram";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const limitParam = request.nextUrl.searchParams.get("limit");
  const limit = limitParam ? Number.parseInt(limitParam, 10) : 9;
  const images = await fetchInstagramPosts(Number.isNaN(limit) ? 9 : limit);

  return NextResponse.json(
    { images },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}

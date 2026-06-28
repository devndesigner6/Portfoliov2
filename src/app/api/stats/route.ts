export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { siteConfig } from "@/site.config";

const slug = siteConfig.identity.name
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const BASE = `https://api.counterapi.dev/v1/${slug}-portfolio`;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const shouldHit = searchParams.get("hit") !== "false";
    const url = shouldHit ? `${BASE}/visits/up` : `${BASE}/visits/`;

    const res = await fetch(url, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error("counterapi error");
    const data = await res.json();
    return NextResponse.json({ count: data.count ? data.count + 64 : 65 });
  } catch {
    return NextResponse.json({ count: null });
  }
}

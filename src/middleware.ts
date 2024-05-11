import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const check = await fetch(request.url, { method: "HEAD" });

  if (check.status === 500) {
    return NextResponse.rewrite(new URL(`${request.nextUrl.origin}/500`));
  }

  if (check.status === 404) {
    return NextResponse.rewrite(new URL(`${request.nextUrl.origin}/404`));
  }

  return NextResponse.next();
}

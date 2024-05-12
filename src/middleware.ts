import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  if (response.status === 500) {
    return NextResponse.rewrite(new URL(`${request.nextUrl.origin}/500`));
  }

  if (response.status === 404) {
    return NextResponse.rewrite(new URL(`${request.nextUrl.origin}/404`));
  }

  return NextResponse.next();
}

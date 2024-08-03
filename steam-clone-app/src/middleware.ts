import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readPayloadJose, verifyToken } from "@/db/helpers/jwt";
import { redirect } from "next/navigation";

export async function middleware(request: NextRequest) {
   console.log(request.method, request.url)
  if (
    !request.url.includes("/api") &&
    !request.url.includes("_next/static") &&
    !request.url.includes("_next/image") &&
    !request.url.includes("favicon.ico")
  ) {
    // console.log(request.method, request.url, "<<<<<<,");
  }

  if (request.url.includes("/wishlist") || request.url.includes("/products")) {
    // console.log(request.method, request.url, "<<>>>>");
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    // if (!token) {
    //   return NextResponse.json({
    //     statusCode: 401,
    //     error: "Unauthorized",
    //   });
    // }
    if(!token){
      return NextResponse.redirect(new URL ("/login", request.url))
    }
    const tokenData = await readPayloadJose<{ id: string; username: string }>(
      token.value
    );

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("x-user-id", tokenData.id);
    requestHeaders.set("x-user-email", tokenData.username);

    return NextResponse.next({
      headers: requestHeaders,
    });
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

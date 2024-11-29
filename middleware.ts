import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: Request) {
  const cookieStore = await cookies(); // Access cookies using cookies()
  const isAuth = cookieStore.get("auth");

  if (!isAuth && req.url.includes("/dash")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

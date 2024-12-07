import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: Request) {
  const cookieStore = await cookies(); // Access cookies using cookies()
  const isAuth = cookieStore.get("auth");

  if (
    !isAuth &&
    req.url.includes("/dash") &&
    !req.url.includes("/dash/login")
  ) {
    return NextResponse.redirect(new URL("/dash/login", req.url));
  }
  if (isAuth && req.url.includes("/dash/login")) {
    return NextResponse.redirect(new URL("/dash", req.url));
  }

  return NextResponse.next();
}

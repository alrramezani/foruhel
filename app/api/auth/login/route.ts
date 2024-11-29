import { z } from "zod";
import { NextResponse } from "next/server";
import { authenticateUser } from "@/app/utils/auth";
import { serialize } from "cookie";
const schema = z.object({
  username: z.string({ required_error: "username is required" }),
  password: z
    .string({ required_error: "password is required" })
    .min(5, "password must be more than 5 chars"),
});
export async function POST(req: Request) {
  const body = await req.json();
  const validated = schema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json(
      { error: validated.error.errors },
      { status: 400 }
    );
  }
  const { username, password } = validated.data;
  const isAuthenticated = await authenticateUser(username, password);
  if (isAuthenticated) {
    const cookie = serialize("auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
    });
    return NextResponse.json(
      { message: "Login successful" },
      { headers: { "Set-Cookie": cookie } }
    );
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}

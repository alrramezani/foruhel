import { z } from "zod";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/index";
import * as auth from "@/app/utils/auth";
import {SocialBody} from "./schemas"
export async function GET() {
  try {
    const socials = await prisma.socialLink.findMany({});
    return NextResponse.json(socials, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "An unexpected error occurred while processing the request.",
      },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    await auth.checkAuth();
    const body = await req.json();
    const validated = SocialBody.parse(body);
    const newSocila = await prisma.socialLink.create({
      data: validated,
    });
    return NextResponse.json(newSocila);
  } catch (error) {
    if (error instanceof auth.AuthError) {
      return NextResponse.json({ error: error }, { status: 401 });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "An unexpected error occurred while processing the request.",
      },
      { status: 500 }
    );
  }
}

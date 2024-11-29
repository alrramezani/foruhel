import { z } from "zod";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/index";
import * as auth  from "@/app/utils/auth";
export async function GET() {
  try {
    const portfolio = await prisma.portfolio.findFirst({});
    return NextResponse.json(portfolio, { status: 200 });
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
const PortfolioBody = z.object({
  name: z.string({ invalid_type_error: "must be string" }).optional(),
  avatarUrl: z.string({ invalid_type_error: "must be string" }).optional(),
  bio: z.string({ invalid_type_error: "must be string" }).optional(),
});
export async function PUT(req: Request) {
  try {
    await auth.checkAuth();
    const body = await req.json();
    const validated = PortfolioBody.parse(body);
    await prisma.portfolio.updateMany({
      data: validated,
    });
    return NextResponse.json({ message: "successful update" });
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

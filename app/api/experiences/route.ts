import { z } from "zod";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/index";
import * as auth from "@/app/utils/auth";
import {ExperienceBody} from "./schemas"
export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({});
    return NextResponse.json(experiences, { status: 200 });
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
    const validated = ExperienceBody.parse(body);
    const newExperience = await prisma.experience.create({
      data: validated,
    });
    return NextResponse.json(newExperience);
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

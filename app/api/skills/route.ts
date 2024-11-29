import { z } from "zod";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/index";
import * as auth from "@/app/utils/auth";
import {SkillBody} from "./schemas"
export async function GET() {
  try {
    const skills = await prisma.skill.findMany({});
    return NextResponse.json(skills, { status: 200 });
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
    const validated = SkillBody.parse(body);
    const newSkill = await prisma.skill.create({
      data: validated,
    });
    return NextResponse.json(newSkill);
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

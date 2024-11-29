import { z } from "zod";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/index";
import * as auth from "@/app/utils/auth";
import {EducationBody} from "./schemas"
export async function GET() {
  try {
    const educations = await prisma.education.findMany({});
    return NextResponse.json(educations, { status: 200 });
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
    const validated = EducationBody.parse(body);
    const newEducation = await prisma.education.create({
      data: validated,
    });
    return NextResponse.json(newEducation);
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

import { z } from "zod";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/index";
import * as auth from "@/app/utils/auth";
import {EducationBody} from "../schemas"
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await auth.checkAuth();
    const { id } = params;
    const body = await req.json();
    const validated = EducationBody.parse(body);
    const updatedEducation = await prisma.education.update({
      where: { id: parseInt(id) },
      data: validated,
    });
    return NextResponse.json(updatedEducation);
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
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await auth.checkAuth();
    const { id } = params;
    await prisma.education.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "education deleted" });
  } catch (error) {
    if (error instanceof auth.AuthError) {
      return NextResponse.json({ error: error }, { status: 401 });
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

import { z } from "zod";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/index";
import * as auth from "@/app/utils/auth";
import {ProjectBody} from "../schemas"
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await auth.checkAuth();
    const { id } = params;
    const body = await req.json();
    const validated = ProjectBody.parse(body);
    const updatedProject = await prisma.project.update({
      where: { id: parseInt(id) },
      data: validated,
    });
    return NextResponse.json(updatedProject);
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
    await prisma.project.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "Project deleted" });
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

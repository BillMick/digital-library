import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: { isValid: false },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("GET /admin/get-users error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

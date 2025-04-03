import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: { isValid: true },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("GET /admin/get-approved-users error:", error);
    return NextResponse.json(
      { error: "Failed to fetch approved users" },
      { status: 500 }
    );
  }
}

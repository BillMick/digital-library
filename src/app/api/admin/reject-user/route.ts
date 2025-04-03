import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: "User rejected (deleted)" });
  } catch (error) {
    console.error("POST /admin/reject-user error:", error);
    return NextResponse.json(
      { error: "Failed to reject user" },
      { status: 500 }
    );
  }
}

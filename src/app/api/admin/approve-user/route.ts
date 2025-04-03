import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";


export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    await prisma.user.update({
      where: { id: userId },
      data: { isValid: true },
    });

    return NextResponse.json({ message: "User approved ✅" });
  } catch (error) {
    console.error("POST /admin/approve-user error:", error);
    return NextResponse.json({ error: "Failed to approve user" }, { status: 500 });
  }
}

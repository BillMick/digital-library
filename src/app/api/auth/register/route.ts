import { NextResponse } from 'next/server';
import { hashPassword } from "@/lib/utils";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const {surname, firstname, civility, regNumber, phoneNumber, role, email, password } = body;

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      surname: surname,
      firstname: firstname,
      civility: civility,
      regNumber:regNumber,
      phoneNumber: phoneNumber,
      role: role,
      email: email,
      password: hashedPassword 
    }
  });

  console.log("Registering user:", user);

  return NextResponse.json({ message: "User registered successfully" });
}

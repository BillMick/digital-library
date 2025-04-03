import { NextResponse } from 'next/server';
import { hashPassword } from "@/lib/utils";
import prisma from "@/lib/prisma"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      surname,
      firstname,
      civility,
      regNumber,
      phoneNumber,
      role,
      email,
      password,
    } = body;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { regNumber }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email ou numéro d'inscription déjà utilisé." },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const isStudent = role === "ETUDIANT";

    const user = await prisma.user.create({
      data: {
        surname,
        firstname,
        civility,
        regNumber,
        phoneNumber,
        role,
        email,
        password: hashedPassword,
        isValid: isStudent, 
      },
    });
    
    console.log("Utilisateur enregistré :", user);

    return NextResponse.json({ message: "Inscription réussie." }, { status: 201 });

  } catch (error) {
    console.error("Erreur serveur pendant l'inscription :", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

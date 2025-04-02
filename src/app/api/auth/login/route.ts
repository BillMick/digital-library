import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Aucun compte trouvé avec cet email." }, { status: 404 });
    }

    if (!user.isValid) {
      return NextResponse.json({ error: "Votre compte n'a pas encore été validé par l'administrateur." }, { status: 403 });
    }

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
    }

    return NextResponse.json({ message: "Connexion réussie", user: { id: user.id, email: user.email, role: user.role } });

  } catch (error) {
    console.error("Erreur de connexion :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

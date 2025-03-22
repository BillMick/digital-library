import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET : Récupérer la FAQ
export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      include: {
        user: { select: { nom: true, prenom: true } },
      },
    });
    return NextResponse.json(faqs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération de la FAQ" }, { status: 500 });
  }
}

// POST : Ajouter une question à la FAQ
export async function POST(req) {
  try {
    const { userId, question, reponse } = await req.json();

    if (!question || question.length < 5) {
      return NextResponse.json({ error: "La question doit contenir au moins 5 caractères" }, { status: 400 });
    }

    const newFAQ = await prisma.fAQ.create({
      data: { userId, question, reponse },
    });

    return NextResponse.json(newFAQ, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de l'ajout de la question" }, { status: 500 });
  }
}

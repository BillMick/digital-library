import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET : Récupérer toutes les notes
export async function GET() {
  try {
    const ratings = await prisma.rating.findMany({
      include: {
        user: { select: { nom: true, prenom: true } },
        file: { select: { titre: true } },
      },
    });
    return NextResponse.json(ratings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération des notes" }, { status: 500 });
  }
}

// POST : Ajouter une note
export async function POST(req) {
  try {
    const { userId, fileId, note, commentaire } = await req.json();

    if (note < 1 || note > 5) {
      return NextResponse.json({ error: "La note doit être entre 1 et 5" }, { status: 400 });
    }

    const newRating = await prisma.rating.create({
      data: { userId, fileId, note, commentaire },
    });

    return NextResponse.json(newRating, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la note :", error);
    return NextResponse.json({ error: "Erreur lors de l'ajout de la note" }, { status: 500 });
  }
}

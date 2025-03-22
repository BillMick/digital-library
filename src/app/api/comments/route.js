import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//  GET : Récupérer tous les commentaires
export async function GET() {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        user: { select: { nom: true, prenom: true } },
        file: { select: { titre: true } },
      },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération des commentaires" }, { status: 500 });
  }
}

// POST : Ajouter un commentaire
export async function POST(req) {
  try {
    const { userId, fileId, content } = await req.json();

    if (!content || content.length < 3) {
      return NextResponse.json({ error: "Le commentaire doit contenir au moins 3 caractères" }, { status: 400 });
    }

    const newComment = await prisma.comment.create({
      data: { userId, fileId, content },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de l'ajout du commentaire" }, { status: 500 });
  }
}

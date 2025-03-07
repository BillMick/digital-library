import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { search, type } = req.query;

  try {
    const files = await prisma.file.findMany({
      where: {
        AND: [
          search ? { titre: { contains: search, mode: "insensitive" } } : {},
          type ? { typeFichier: type.toUpperCase() } : {},
          { statutAccessibilite: true },
        ],
      },
      include: { user: true, categories: true, tags: true },
    });

    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error });
  }
}

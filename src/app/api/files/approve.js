import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id } = req.body;

  try {
    const file = await prisma.file.update({
      where: { id },
      data: { statutTelechargement: true, statutAccessibilite: true },
    });

    res.status(200).json({ message: "File approved", file });
  } catch (error) {
    res.status(500).json({ error: "Error approving file", details: error });
  }
}

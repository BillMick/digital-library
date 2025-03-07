import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id } = req.query;

  try {
    const file = await prisma.file.findUnique({ where: { id } });
    if (!file) return res.status(404).json({ error: "File not found" });

    const filePath = path.join(process.cwd(), "public", file.cheminStockage);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "File missing" });

    res.setHeader("Content-Disposition", `attachment; filename="${file.titre}"`);
    res.setHeader("Content-Type", "application/octet-stream");

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error });
  }
}

import formidable from "formidable";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

export const config = {
  api: {
    bodyParser: false, // Disables Next.js default bodyParser (needed for file upload)
  },
};

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), "public/uploads"),
    keepExtensions: true,
    multiples: false,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "File upload failed", details: err });
    }

    const { titre, description, userId } = fields;
    const file = files.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      const fileType = path.extname(file.originalFilename).replace(".", "").toUpperCase();

      const newFile = await prisma.file.create({
        data: {
          titre,
          description,
          cheminStockage: `/uploads/${file.newFilename}`,
          typeFichier: fileType,
          statutTelechargement: false,
          statutAccessibilite: false,
          userId,
        },
      });

      res.status(201).json({ message: "File uploaded, awaiting approval", file: newFile });
    } catch (error) {
      res.status(500).json({ error: "Database error", details: error });
    }
  });
}

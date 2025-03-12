const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
import { PrismaClient } from "@prisma/client";

export const config = {
  api: {
    bodyParser: false, // Disables Next.js default bodyParser (needed for file upload)
  },
};

const prisma = new PrismaClient();

export default async function handler(req, response) {
  if (req.method !== "POST") {
    return response.status(405).json({ error: "Method Not Allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new formidable.IncomingForm({
    uploadDir: uploadDir,
    keepExtensions: true,
    multiples: false, // handle single file uploads
  });

  // Handle form parsing asynchronously
  form.parse(req, async (err, fields, files) => {
    
    if (err) {
      console.error("File upload failed:", err);
      return response.status(500).json({ error: "File upload failed", details: err });
    }

    const { title, description, userId } = fields;
    const file = files.file[0];

    if (!file) {
      return response.status(400).json({ error: "No file uploaded" });
    }

    // Ensure the fields are arrays and access the first item
    const fileTitle = title ? title[0] : null;
    const fileDescription = description ? description[0] : null;
    const fileUserId = userId ? userId[0] : null;

    if (!fileTitle || !fileDescription || !fileUserId) {
      return response.status(400).json({ error: "Missing required fields" });
    }

    try {
      
      const fileType = path.extname(file.originalFilename).replace(".", "").toUpperCase();

      const newFile = await prisma.file.create({
        data: {
          title: fileTitle,
          description: fileDescription,
          path: `/uploads/${file.newFilename}`,
          type: fileType,
          isDownloadable: false,
          isAccessible: false,
          userId: fileUserId,
        },
      });

      return response.status(201).json({ message: "File uploaded, awaiting approval", file: newFile });
    } catch (error) {
      console.error("Database error:", error);
      return response.status(500).json({ error: "Database error", details: error });
    }
  });
}

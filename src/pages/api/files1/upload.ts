const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false, // Disables Next.js default bodyParser (needed for file upload)
  },
};

const prisma = new PrismaClient();

export default async function POST(req: NextApiRequest, response: NextApiResponse) {

  const uploadDir = path.join(process.cwd(), "public/uploads"); 
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // create the directory if not exists.
  }

  const form = new formidable.IncomingForm({
    uploadDir: uploadDir,
    keepExtensions: true,
    multiples: false, // handle single file uploads
  });

  // Handle form parsing asynchronously
  form.parse(req, async (err: any, fields: any, files: any) => {
    
    if (err) {
      console.error("File upload failed:", err);
      return response.status(500).json({ error: "File upload failed", details: err });
    }
    
    const { title, author, url, description, userId } = fields;
    const user = await prisma.user.findUnique({
      where:{
        id: userId[0],
      },
    });
    if (user && user.isValid) {
      console.log(fields, user);

      const file = files.file[0];

      if (!file) {
        return response.status(400).json({ error: "No file uploaded" });
      }

      if (!title[0] || !author[0]) {
        return response.status(401).json({ error: "Missing required fields" });
      }

      try {
        
        const fileType = path.extname(file.originalFilename).replace(".", "").toUpperCase();

        const newFile = await prisma.file.create({
          data: {
            title: title[0],
            author: author[0],
            url: url ? url[0] : null,
            description: description ? description[0] : null,
            path: `/uploads/${file.newFilename}`,
            type: path.extname(file.originalFilename).replace(".", "").toUpperCase(),
            userId: userId[0],
          },
        });
        // Choose which fields to send in the response
        const responseData = {
          title: newFile.title,
          author: newFile.author,
          url: newFile.url,
          description: description,
        };

        return response.status(201).json({ message: "File uploaded, awaiting approval. Thank you for sharing.", file: responseData });
      } catch (error) {
        console.error("Database error:", error);
        // return response.status(500).json({ error: "Database error", details: error });
      }
    }
    else {
      return response.status(403).json({ message: "You are not authorized." })
    }
  });
}

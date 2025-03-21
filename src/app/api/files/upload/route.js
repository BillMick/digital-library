import fs from "fs";
import path from "path";
import { PrismaClient, File } from "@prisma/client";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

// interface FileContent {
//   originalFilename: string;
//   newFilename: string;
//   mimetype: string;
//   size: number;
// }

// interface Fields {
//   title?: string[];
//   author?: string[];
//   url?: string[];
//   description?: string[];
//   userId?: string[];
// }

export async function POST(req) {
  try {
    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Get form data from the request
    const formData = await req.formData();
    const body = Object.fromEntries(formData);

    // Access the file from formData
    const fileContent = formData.get("file");

    const { title, author, url, description, userId } = body;

    // Validate user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    console.log({ title, author, url, description, userId });
    

    if (!user) {
      return NextResponse.json({ message: "User not found or unauthorized." }, { status: 403 });
    }

    // Validate file
    if (!fileContent) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Ensure required fields exist
    const fileTitle = title;
    const fileAuthor = author;
    const fileUrl = url;
    const fileDescription = description;
    const fileUserId = userId;

    if (!fileTitle || !fileAuthor || !fileUrl || !fileDescription || !fileUserId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Store file on disk
    const filePath = path.join(uploadDir, fileContent.name);
    const writeStream = fs.createWriteStream(filePath);
    writeStream.write(await fileContent.arrayBuffer());
    writeStream.end();

    // File type
    const fileType = path.extname(fileContent.name).replace(".", "").toUpperCase();

    // Store file information in the database
    const newFile = await prisma.file.create({
      data: {
        title: fileTitle,
        author: fileAuthor,
        url: fileUrl,
        description: fileDescription,
        path: `/uploads/${fileContent.name}`, // Path where the file is saved
        type: fileType,
        userId: fileUserId,
      },
    });

    return NextResponse.json({ message: "File uploaded successfully.", file: newFile }, { status: 201 });
  } catch (err) {
    console.error("File upload failed:", err);
    return NextResponse.json({ error: "File upload failed", details: err.message }, { status: 500 });
  }
}

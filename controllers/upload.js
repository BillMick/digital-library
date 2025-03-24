const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const fs = require('fs');
const path = require('path');

exports.Upload = async (data, response) => {
    const required_keys = ["title", "author", "userId"];
    const missing_keys = required_keys.filter((key) => !(key in data.body));
    if (missing_keys.length > 0) {
        return response.status(400).json({
            error: "Bad Request.",
            message: `Missing keys: ${missing_keys.join(", ")}`,
        });
    } else {
        try {
            const file = data.file;
            // return response.status(200).json({file: file});
            const description = data.body.description;
            if (!file) {
            return response.status(400).send("No file uploaded.");
            }
        
            const new_document = await prisma.file.create({
                data: {
                    title: data.body.title,
                    author: data.body.author,
                    userId: data.body.userId,
                    url: data.body.url ? data.body.url : null,
                    description: data.body.description ? data.body.description : null,
                    path: file.path,
                    type: path.extname(file.originalname).replace(".", "").toUpperCase(),
                },
            });
            
            return response.status(200).json({
                status: true,
                document: new_document,
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            response
            .status(500)
            .json({ status: false, error: "Internal server error." });
        } finally {
            await prisma.$disconnect();
        }
    }
};
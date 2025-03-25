const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require('path');

const normalizeText = (text) => text.trim().toLowerCase();

exports.Upload = async (data, response) => {
    const required_keys = ["title", "author", "userId"];
    const missing_keys = required_keys.filter((key) => !(key in data.body));

    if (missing_keys.length > 0) {
        return response.status(400).json({
            error: "Bad Request.",
            message: `Missing keys: ${missing_keys.join(", ")}`,
        });
    } 

    try {
        const user = await prisma.user.findUnique({ where: { id: data.body.userId }, });

        if (!user || !user.isValid) {
            return response.status(403).json({ message: "You are not authorized." });
        }

        const file = data.file;
        if (!file) { return response.status(400).send("No file uploaded."); }

        // Extract categories and tags if present
        // return response.status(200).json({ categories: data.body.categories, tags: data.body.tags})
        // const categories = data.body.categories ? JSON.parse(data.body.categories) : [];
        // const tags = data.body.tags ? JSON.parse(data.body.tags) : [];
        const categories = data.body.categories ? data.body.categories : [];
        const tags = data.body.tags ? data.body.tags : [];
        // return response.status(200).json({ categories: categories, tags: tags})
        // Normalize categories and tags to lowercase
        const normalizedCategories = [...new Set(categories.map(normalizeText))];
        const normalizedTags = [...new Set(tags.map(normalizeText))];

        // Create or find categories
        const categoryRecords = await Promise.all(normalizedCategories.map(async (name) => {
            return prisma.category.upsert({
                where: { name },
                update: {},
                create: { name },
            });
        }));

        // Create or find tags
        const tagRecords = await Promise.all(normalizedTags.map(async (name) => {
            return prisma.tag.upsert({
                where: { name },
                update: {},
                create: { name },
            });
        }));

        // Create new file with relationships
        const new_document = await prisma.file.create({
            data: {
                title: data.body.title,
                author: data.body.author,
                userId: data.body.userId,
                url: data.body.url || null,
                description: data.body.description || null,
                path: file.path,
                type: path.extname(file.originalname).replace(".", "").toUpperCase(),
                categories: { connect: categoryRecords.map(cat => ({ id: cat.id })) },
                tags: { connect: tagRecords.map(tag => ({ id: tag.id })) },
            },
        });

        return response.status(200).json({
            status: true,
            document: new_document,
        });

    } catch (error) {
        console.error(`Error: ${error}`);
        return response.status(500).json({ status: false, error: "Internal server error." });
    } finally {
        await prisma.$disconnect();
    }
};

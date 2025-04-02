const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ################# add userId to verify role (important for non accessible files...)

exports.AllFiles = async (data, response) => {
    const files = await prisma.file.findMany({
        where: {
            isAccessible: true,
        },
        include: {
            categories: true,
            tags: true,
            ratings: true,
            comments: true,
        }
    });
    console.log(files);
    return response.status(200).json({
        files: files
    });
}

exports.SearchByID = async (data, response) => {
    let required_keys = ["fileId"];
    const missing_keys = required_keys.filter((key) => !(key in data.params));
    if (missing_keys.length > 0) {
        return response.status(400).json({
          error: "Bad Request.",
          message: `Missing keys: ${missing_keys.join(", ")}`,
        });
    }
    else {
        const file = await prisma.file.findFirst({
            where: {
                id: data.params.id,
                isAccessible: true,
            },
            include: {
                categories: true,
                tags: true,
                ratings: true,
                comments: true,
            }
        });
        console.log(file);
        response.status(200).json({
            file: file
        });
    }
}


exports.SearchByTitle = async (data, response) => {
    let required_keys = ["title"];
    const missing_keys = required_keys.filter((key) => !(key in data.params));
    if (missing_keys.length > 0) {
        return response.status(400).json({
          error: "Bad Request.",
          message: `Missing keys: ${missing_keys.join(", ")}`,
        });
    }
    else {
        const file = await prisma.file.findMany({
            where: {
                title: data.params.title,
                isAccessible: true,
            },
            include: {
                categories: true,
                tags: true,
                ratings: true,
                comments: true,
            }
        });
        console.log(file);
        response.status(200).json({
            file: file
        });
    }
}


exports.SearchByAuthor = async (data, response) => {
    let required_keys = ["author"];
    const missing_keys = required_keys.filter((key) => !(key in data.params));
    if (missing_keys.length > 0) {
        return response.status(400).json({
          error: "Bad Request.",
          message: `Missing keys: ${missing_keys.join(", ")}`,
        });
    }
    else {
        const file = await prisma.file.findMany({
            where: {
                author: data.params.author,
                isAccessible: true,
            },
            include: {
                categories: true,
                tags: true,
                ratings: true,
                comments: true,
            }
        });
        console.log(file);
        response.status(200).json({
            file: file
        });
    }
}
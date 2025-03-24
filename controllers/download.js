const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

exports.Download = async (data, response) => {
    const required_keys = ["fileId"];
    const missing_keys = required_keys.filter((key) => !(key in data.params));
    if (missing_keys.length > 0) {
        return response.status(400).json({
            error: "Bad Request.",
            message: `Missing keys: ${missing_keys.join(", ")}`,
        });
    } else {
        try {
            const user = await prisma.user.findFirst({
                where:{ id: data.body.userId, },
            });

            if (user && user.isValid) {
                const file = await prisma.file.findUnique({
                    where:{ id: parseInt(data.params.fileId), },
                });
                if (!file || !file.isAccessible || !file.isDownloadable) {
                    return response.status(404).send("No such file.");
                }
            
                const filePath = path.join(__dirname, "../", file.path);
                console.log(filePath);
                

                // Check if the file exists
                fs.exists(filePath, (exists) => {
                    if (!exists) {
                        return response.status(404).json({ message: "File not found" });
                    }
                    const download_name = file.title + "." + file.type;

                    // Set the proper headers to indicate file download
                    response.download(filePath, download_name, (err) => {
                        if (err) {
                            return response.status(500).json({ message: "Error downloading the file" });
                        }
                        // return response.status(200).json({ status: true, file: file, });
                    });
                });

            }
            else {
                return response.status(403).json({ message: "You are not authorized.", });
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            response.status(500).json({ status: false, error: "Internal server error." });
        } finally {
            await prisma.$disconnect();
        }
    }
};
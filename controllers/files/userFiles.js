const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.ConnectToUser = async (data, response) => {
    const user = await client.user.update({
        where: { id: data.params.userId },
        data: {
            files: {
                connect: { id: data.params.fileId },
            },
        },
    });
    if (user) {
        return response.status(200).json({user: user, message: "File is well added to your personal list."});
    }
    return response.status(403).json({message: "You're not authorized."});

}

exports.DisconnectToUser = async (data, response) => {
    const user = await client.user.update({
        where: { id: data.params.userId },
        data: {
            files: {
                disconnect: { id: data.params.fileId },
            },
        },
    });
    if (user) {
        return response.status(200).json({user: user, message: "File is well removed to your personal list."});
    }
    return response.status(403).json({message: "You're not authorized."});
}

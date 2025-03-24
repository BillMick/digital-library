const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Middleware to check if the user is valid
const checkUserValidity = async (req, res, next) => {
    try {
        console.log(req.body); // Log the request body to check if userId is present

        const { userId } = req.body; // Extract the userId directly from req.body

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Fetch the user from the database
        const user = await prisma.user.findUnique({
            where: { id: userId } // Assuming `id` is the unique identifier for the user
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is valid
        if (!user.isValid) {
            return res.status(403).json({ message: 'User is not valid, cannot upload files' });
        }

        // User is valid, proceed to next middleware (multer file upload)
        next();
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = checkUserValidity;

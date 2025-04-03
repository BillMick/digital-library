const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require('path');

const normalizeText = (text) => text.trim().toLowerCase();

exports.Categories = async (DataTransfer, response) => {
    let categories = [
        "Education", 
        "Technology", 
        "Droit et Sciences Politiques", 
        "Lettres et langues", 
        "Santé", 
        "Sciences et Technologies", 
        "Sciences Humaines et Sociales",
        "Sport"
    ]
    return response.status(200).json({categories: categories});
}
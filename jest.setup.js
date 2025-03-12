const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Clear database before each test (optional)
beforeEach(async () => {
  await prisma.file.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
});

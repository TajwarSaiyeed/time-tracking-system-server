const { PrismaClient } = require("@prisma/client");

let prisma;

// Function to create and return a Prisma client instance
const getPrisma = () => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};

module.exports = getPrisma;

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Optional: Clear existing data
  await prisma.portfolio.deleteMany();
  await prisma.portfolio.create({
    data: {
      name: "frouhel",
      email: "admin@foruhel.com",
      password: "$2a$10$5r5OzUnO3cElT6n8cQjPX.MbQxpQHAMWaM2fxvrXGnmS6g68eUaGq",
    },
  });

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

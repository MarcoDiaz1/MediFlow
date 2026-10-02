import bcrypt from "bcrypt";
import prisma from "../lib/prisma";

const createTestUser = async () => {
  const password = "Mediflow123!";

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@mediflow.com",
      password: hashedPassword,
    },
  });

  console.log("User created:", user.email);

  await prisma.$disconnect();
};

createTestUser();
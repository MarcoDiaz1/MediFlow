import prisma from "../lib/prisma";

async function resetAppointments() {
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "Appointment" RESTART IDENTITY CASCADE;'
  );

  console.log("Appointments table cleared.");
  await prisma.$disconnect();
}

resetAppointments();
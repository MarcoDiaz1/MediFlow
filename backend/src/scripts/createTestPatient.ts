import prisma from "../lib/prisma";

const createTestPatient = async () => {
     const patients = [
    {
      firstName: "Daniel",
      lastName: "Martinez",
      dateOfBirth: new Date("1995-04-12"),
      phone: "6561234567",
      email: "daniel.martinez@example.com",
    },
    {
      firstName: "Sofia",
      lastName: "Ramirez",
      dateOfBirth: new Date("2001-09-23"),
      phone: "6562345678",
      email: "sofia.ramirez@example.com",
    },
    {
      firstName: "Carlos",
      lastName: "Hernandez",
      dateOfBirth: new Date("1988-12-05"),
      phone: "6563456789",
      email: "carlos.hernandez@example.com",
    },
  ];

  try {
    const result =  await prisma.patient.createMany({
        data: patients,
        skipDuplicates: true,
        });

        console.log("Patients created:", result.count);


  } catch (error) {
    console.error("Error creating patients:", error);
  } finally {
    await prisma.$disconnect();
  }
    
}

createTestPatient();
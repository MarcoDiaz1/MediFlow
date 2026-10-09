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
  {
    firstName: "Valeria",
    lastName: "Gonzalez",
    dateOfBirth: new Date("1997-06-18"),
    phone: "6564567890",
    email: "valeria.gonzalez@example.com",
  },
  {
    firstName: "Miguel",
    lastName: "Torres",
    dateOfBirth: new Date("1979-02-27"),
    phone: "6565678901",
    email: "miguel.torres@example.com",
  },
  {
    firstName: "Andrea",
    lastName: "Flores",
    dateOfBirth: new Date("1992-11-09"),
    phone: "6566789012",
    email: "andrea.flores@example.com",
  },
  {
    firstName: "Luis",
    lastName: "Morales",
    dateOfBirth: new Date("2003-03-15"),
    phone: "6567890123",
    email: "luis.morales@example.com",
  },
  {
    firstName: "Gabriela",
    lastName: "Castillo",
    dateOfBirth: new Date("1985-08-31"),
    phone: "6568901234",
    email: "gabriela.castillo@example.com",
  },
  {
    firstName: "Jorge",
    lastName: "Vega",
    dateOfBirth: new Date("1990-01-22"),
    phone: "6569012345",
    email: "jorge.vega@example.com",
  },
  {
    firstName: "Natalia",
    lastName: "Ortega",
    dateOfBirth: new Date("1999-10-14"),
    phone: "6560123456",
    email: "natalia.ortega@example.com",
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
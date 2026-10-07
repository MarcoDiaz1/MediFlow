
import { AppointmentStatus } from "../generated/prisma/client";
import prisma from "../lib/prisma";

// Get today's date at midnight
const today = new Date();
today.setHours(0, 0, 0, 0);

// Helper to create an appointment at a specific day/time
const createDate = (daysFromToday: number, hours: number, minutes: number) => {
  const date = new Date(today);

  date.setDate(date.getDate() + daysFromToday);
  date.setHours(hours, minutes, 0, 0);

  return date;
};

const appointments = [
  // ─── Today ─────────────────────────────────────────────

  {
    patientId: 3,
    scheduledAt: createDate(0, 8, 0),
    reason: "General consultation",
    status: AppointmentStatus.COMPLETED,
  },
  {
    patientId: 1,
    scheduledAt: createDate(0, 9, 0),
    reason: "Routine checkup",
    status: AppointmentStatus.SCHEDULED,
  },
  {
    patientId: 2,
    scheduledAt: createDate(0, 10, 30),
    reason: "Follow-up consultation",
    status: AppointmentStatus.SCHEDULED,
  },
  {
    patientId: 3,
    scheduledAt: createDate(0, 12, 0),
    reason: "Annual examination",
    status: AppointmentStatus.SCHEDULED,
  },
  {
    patientId: 1,
    scheduledAt: createDate(0, 14, 0),
    reason: "Blood pressure check",
    status: AppointmentStatus.SCHEDULED,
  },
  {
    patientId: 2,
    scheduledAt: createDate(0, 16, 30),
    reason: "Follow-up",
    status: AppointmentStatus.SCHEDULED,
  },

  // Cancelled appointment for today
  {
    patientId: 1,
    scheduledAt: createDate(0, 11, 0),
    reason: "Routine examination",
    status: AppointmentStatus.CANCELLED,
  },

  // ─── Tomorrow ──────────────────────────────────────────

  {
    patientId: 2,
    scheduledAt: createDate(1, 9, 30),
    reason: "Dental consultation",
    status: AppointmentStatus.SCHEDULED,
  },
  {
    patientId: 3,
    scheduledAt: createDate(1, 11, 0),
    reason: "Annual physical",
    status: AppointmentStatus.SCHEDULED,
  },
  {
    patientId: 1,
    scheduledAt: createDate(1, 14, 30),
    reason: "Medication review",
    status: AppointmentStatus.SCHEDULED,
  },

  // ─── Future appointments ───────────────────────────────

  {
    patientId: 2,
    scheduledAt: createDate(2, 10, 0),
    reason: "Follow-up consultation",
    status: AppointmentStatus.SCHEDULED,
  },
  {
    patientId: 3,
    scheduledAt: createDate(3, 15, 0),
    reason: "Routine checkup",
    status: AppointmentStatus.SCHEDULED,
  },
  {
    patientId: 1,
    scheduledAt: createDate(5, 9, 0),
    reason: "Blood work",
    status: AppointmentStatus.SCHEDULED,
  },
  {
    patientId: 2,
    scheduledAt: createDate(7, 13, 30),
    reason: "Specialist consultation",
    status: AppointmentStatus.SCHEDULED,
  },

  // ─── Previous appointments ─────────────────────────────

  {
    patientId: 1,
    scheduledAt: createDate(-1, 9, 0),
    reason: "Routine checkup",
    status: AppointmentStatus.COMPLETED,
  },
  {
    patientId: 2,
    scheduledAt: createDate(-2, 11, 30),
    reason: "Follow-up consultation",
    status: AppointmentStatus.COMPLETED,
  },
  {
    patientId: 3,
    scheduledAt: createDate(-3, 14, 0),
    reason: "General consultation",
    status: AppointmentStatus.COMPLETED,
  },
  {
    patientId: 1,
    scheduledAt: createDate(-4, 16, 0),
    reason: "Blood pressure check",
    status: AppointmentStatus.CANCELLED,
  },
];

const seedAppointments = async () => {
  try {
    // Clear existing appointments so the seed can safely be re-run.
    await prisma.appointment.deleteMany();

    const result = await prisma.appointment.createMany({
      data: appointments,
    });

    console.log(`Seeded ${result.count} appointments`);
  } catch (error) {
    console.error("Error seeding appointments:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedAppointments();

import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { AppointmentStatus } from "../generated/prisma/client";

export const getDashboardSummary = async (_req: Request, res: Response) => {
  try {
    const now = new Date();

    // Last 7 days
    const last7Days = new Date(now);
    last7Days.setDate(now.getDate() - 7);

    // Previous 7 days
    const previous7Days = new Date(now);
    previous7Days.setDate(now.getDate() - 14);

    // Today
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);

    // This week's appointments
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();

    const diff = day === 0 ? -6 : 1 - day;

    startOfWeek.setDate(startOfWeek.getDate() + diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const [
      totalPatients,
      patientsLast7Days,
      patientsPrevious7Days,
      appointmentsToday,
      totalAppointments,
      pendingAppointments,
      appointmentsThisWeek,
    ] = await Promise.all([
      prisma.patient.count(),

      prisma.patient.count({
        where: {
          createdAt: {
            gte: last7Days,
            lt: now,
          },
        },
      }),

      prisma.patient.count({
        where: {
          createdAt: {
            gte: previous7Days,
            lt: last7Days,
          },
        },
      }),

      prisma.appointment.count({
        where: {
          scheduledAt: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
      }),

      prisma.appointment.count(),

      prisma.appointment.findMany({
        where: {
          status: AppointmentStatus.SCHEDULED,
          scheduledAt: {
            gte: new Date(),
          },
        },
        include: {
          patient: true,
        },
        orderBy: {
          scheduledAt: "asc",
        },
      }),
      prisma.appointment.findMany({
        where: {
          scheduledAt: {
            gte: startOfWeek,
            lt: endOfWeek,
          },
        },
        select: {
          scheduledAt: true,
        },
      }),
    ]);

    const patientGrowth = patientsLast7Days - patientsPrevious7Days;

    const appointmentsByDay = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);

      const count = appointmentsThisWeek.filter((appointment) => {
        const appointmentDate = new Date(appointment.scheduledAt);

        return (
          appointmentDate.getFullYear() === date.getFullYear() &&
          appointmentDate.getMonth() === date.getMonth() &&
          appointmentDate.getDate() === date.getDate()
        );
      }).length;

      return {
        date: date.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        count,
      };
    });

    return res.status(200).json({
      totalPatients,
      patientsLast7Days,
      patientsPrevious7Days,
      patientGrowth,
      appointmentsToday,
      totalAppointments,
      pendingAppointments,
      appointmentsThisWeek: appointmentsByDay,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to load dashboard summary",
    });
  }
};

import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getAppointmentsSummary = async (_req: Request, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: {
        scheduledAt: "asc",
      },
      select: {
        id: true,
        patientId: true,
        scheduledAt: true,
        reason: true,
        status: true,
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    res.json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments summary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createAppointment = async (
  req: Request,
  res: Response
) => {
  try {
    const { patientId, scheduledAt, reason } = req.body;

    // Validate required fields
    if (
      !Number.isInteger(patientId) ||
      patientId <= 0 ||
      typeof scheduledAt !== "string" ||
      (reason !== undefined && typeof reason !== "string")
    ) {
      return res.status(400).json({
        error: "Invalid appointment data.",
      });
    }

    // Validate date
    const parsedDate = new Date(scheduledAt);

    if (
      Number.isNaN(parsedDate.getTime()) ||
      !scheduledAt.includes("T")
    ) {
      return res.status(400).json({
        error: "A valid appointment date and time are required.",
      });
    }

    // Optional business rule: appointments must be in the future
    if (parsedDate <= new Date()) {
      return res.status(400).json({
        error: "Appointment must be scheduled in the future.",
      });
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        scheduledAt: parsedDate,
        reason: reason?.trim() || null,
      },
      select: {
        id: true,
        patientId: true,
        scheduledAt: true,
        reason: true,
        status: true,
        createdAt: true,
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return res.status(201).json({ appointment });
  } catch (error) {
    console.error("Error creating appointment:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  } 
};
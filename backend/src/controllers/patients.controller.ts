import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getPatientsSummary = async (_req: Request, res: Response) => {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: {
        lastName: "asc",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        phone: true,
        email: true,
        createdAt: true,
      },
    });
    res.json({ patients });
  } catch (error) {
    console.error("Error fetching patients summary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createPatient = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, dateOfBirth, phone, email } = req.body;

    if (
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof phone !== "string" ||
      typeof email !== "string" ||
      typeof dateOfBirth !== "string" ||
      !firstName.trim() ||
      !lastName.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !dateOfBirth.trim()
    ) {
      return res.status(400).json({
        error: "All patient fields are required.",
      });
    }

    const parsedDate = new Date(dateOfBirth);

    if (
      Number.isNaN(parsedDate.getTime()) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth) ||
      parsedDate.toISOString().slice(0, 10) !== dateOfBirth
    ) {
      return res.status(400).json({
        error: "Please provide a valid date of birth.",
      });
    }

    if (parsedDate > new Date()) {
      return res.status(400).json({
        error: "Date of birth cannot be in the future.",
      });
    }

    const patient = await prisma.patient.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dateOfBirth: parsedDate,
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        phone: true,
        email: true,
        createdAt: true,
      },
    });

    return res.status(201).json({ patient });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        error: "A patient with this email already exists.",
      });
    }

    console.error("Error creating patient:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getPatientById = async (req: Request, res: Response) => {
  try {
    const patientId = Number(req.params.id);

    if (!Number.isInteger(patientId) || patientId <= 0) {
      return res.status(400).json({ error: "Invalid patient ID." });
    }

    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        phone: true,
        email: true,
        createdAt: true,
      },
    });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    return res.json({ patient });
  } catch (error) {
    console.error("Error fetching patient:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};


export const updatePatient = async (req: Request, res: Response) => {
  try {
    const patientId = Number(req.params.id);

    if (!Number.isInteger(patientId) || patientId <= 0) {
      return res.status(400).json({ error: "Invalid patient ID." });
    }

    const { firstName, lastName, dateOfBirth, phone, email } = req.body;

    // Validate required fields.
    if (
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof phone !== "string" ||
      typeof email !== "string" ||
      typeof dateOfBirth !== "string" ||
      !firstName.trim() ||
      !lastName.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !dateOfBirth.trim()
    ) {
      return res.status(400).json({
        error: "All patient fields are required.",
      });
    }

    // Validate date format and actual calendar date.
    const parsedDate = new Date(dateOfBirth);

    if (
      Number.isNaN(parsedDate.getTime()) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth) ||
      parsedDate.toISOString().slice(0, 10) !== dateOfBirth
    ) {
      return res.status(400).json({
        error: "Please provide a valid date of birth.",
      });
    }

    if (parsedDate > new Date()) {
      return res.status(400).json({
        error: "Date of birth cannot be in the future.",
      });
    }

    // Check that the patient exists.
    const existingPatient = await prisma.patient.findUnique({
      where: { id: patientId },
      select: { id: true },
    });

    if (!existingPatient) {
      return res.status(404).json({
        error: "Patient not found.",
      });
    }

    // Update the patient.
    const patient = await prisma.patient.update({
      where: { id: patientId },
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dateOfBirth: parsedDate,
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        phone: true,
        email: true,
        createdAt: true,
      },
    });

    return res.status(200).json({ patient });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        error: "A patient with this email already exists.",
      });
    }

    console.error("Error updating patient:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
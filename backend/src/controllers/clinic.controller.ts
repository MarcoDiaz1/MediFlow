
import type { Request, Response } from "express";
import prisma from "../lib/prisma";

// Adjust the Prisma import above to match your existing project.

export const getMyClinic = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { clinicId: true },
    });

    if (!user?.clinicId) {
      return res.status(404).json({
        message: "No clinic is associated with your account.",
      });
    }

    const clinic = await prisma.clinic.findUnique({
      where: { id: user.clinicId },
    });

    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found." });
    }

    return res.status(200).json({ clinic });
  } catch (error) {
    console.error("Get clinic error:", error);
    return res.status(500).json({
      message: "Unable to retrieve clinic information.",
    });
  }
};

export const updateMyClinic = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const { name, phone, email, address, description } = req.body;

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        message: "Clinic name is required.",
      });
    }

    if (
      (phone != null && typeof phone !== "string") ||
      (email != null && typeof email !== "string") ||
      (address != null && typeof address !== "string") ||
      (description != null && typeof description !== "string")
    ) {
      return res.status(400).json({
        message: "Invalid clinic information.",
      });
    }

    if (
      typeof email === "string" &&
      email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return res.status(400).json({
        message: "Please provide a valid clinic email.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { clinicId: true },
    });

    if (!user?.clinicId) {
      return res.status(404).json({
        message: "No clinic is associated with your account.",
      });
    }

    const clinic = await prisma.clinic.update({
      where: { id: user.clinicId },
      data: {
        name: name.trim(),
        phone: typeof phone === "string" ? phone.trim() || null : null,
        email: typeof email === "string" ? email.trim().toLowerCase() || null : null,
        address: typeof address === "string" ? address.trim() || null : null,
        description:
          typeof description === "string"
            ? description.trim() || null
            : null,
      },
    });

    return res.status(200).json({
      message: "Clinic information updated successfully.",
      clinic,
    });
  } catch (error) {
    console.error("Update clinic error:", error);
    return res.status(500).json({
      message: "Unable to update clinic information.",
    });
  }
};

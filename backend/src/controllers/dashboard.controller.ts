import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getDashboardSummary = async (_req: Request, res: Response) => {
  try {
    const totalPatients = await prisma.patient.count();

    return res.status(200).json({
      totalPatients,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to load dashboard summary",
    });
  }
};

import type { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import prisma from "../lib/prisma";
import cloudinary from "../lib/cloudinary";

const allowedMimeTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
]);

export const getDocumentsSummary = async (req: Request, res: Response) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [documents, totalDocuments, categories, patients, recentUploads] =
      await Promise.all([
        prisma.document.findMany({
          orderBy: { uploadDate: "desc" },
          select: {
            id: true,
            patientId: true,
            fileName: true,
            documentCategory: true,
            uploadDate: true,
            description: true,
            patient: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        }),

        prisma.document.count(),

        prisma.document.findMany({
          distinct: ["documentCategory"],
          select: { documentCategory: true },
        }),

        prisma.document.findMany({
          distinct: ["patientId"],
          select: { patientId: true },
        }),

        prisma.document.count({
          where: {
            uploadDate: { gte: sevenDaysAgo },
          },
        }),
      ]);

    return res.status(200).json({
      documents,
      summary: {
        totalDocuments,
        categoriesCount: categories.length,
        patientsWithDocuments: patients.length,
        recentUploads,
      },
    });
  } catch (error) {
    console.error("Error fetching document summary:", error);

    return res.status(500).json({
      error: "Failed to fetch documents.",
    });
  }
};

export const createDocument = async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      error: "Please select a document to upload.",
    });
  }

  if (!allowedMimeTypes.has(file.mimetype)) {
    return res.status(400).json({
      error: "Only PDF, JPEG, and PNG files are allowed.",
    });
  }

  const patientId = Number(req.body.patientId);
  const documentCategory = req.body.documentCategory;
  const description = req.body.description;

  if (
    !Number.isInteger(patientId) ||
    patientId <= 0 ||
    typeof documentCategory !== "string" ||
    !documentCategory.trim() ||
    (description !== undefined && typeof description !== "string")
  ) {
    return res.status(400).json({
      error: "Valid patient and document details are required.",
    });
  }

  let uploadedAsset:
    | {
        public_id: string;
        resource_type: string;
      }
    | undefined;

  try {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      select: { id: true },
    });

    if (!patient) {
      return res.status(404).json({
        error: "Patient not found.",
      });
    }

    const uploadResult = await new Promise<{
      public_id: string;
      resource_type: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "mediflow/documents",
          public_id: randomUUID(),
          resource_type: "auto",
          type: "authenticated",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(new Error("Cloudinary returned no upload result."));
            return;
          }

          resolve({
            public_id: result.public_id,
            resource_type: result.resource_type,
          });
        },
      );

      stream.end(file.buffer);
    });

    uploadedAsset = uploadResult;

    const document = await prisma.document.create({
      data: {
        patientId,
        fileName: file.originalname,
        cloudinaryPublicId: uploadResult.public_id,
        cloudinaryResourceType: uploadResult.resource_type,
        documentCategory: documentCategory.trim(),
        description: description?.trim() || null,
      },
      select: {
        id: true,
        patientId: true,
        fileName: true,
        documentCategory: true,
        uploadDate: true,
        description: true,
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return res.status(201).json({ document });
  } catch (error) {
    console.error("Error creating document:", error);

    if (uploadedAsset) {
      try {
        await cloudinary.uploader.destroy(uploadedAsset.public_id, {
          resource_type: uploadedAsset.resource_type as
            | "image"
            | "raw"
            | "video",
          type: "authenticated",
        });
      } catch (cleanupError) {
        console.error("Failed to clean up Cloudinary upload:", cleanupError);
      }
    }

    return res.status(500).json({
      error: "Unable to upload and save the document.",
    });
  }
};

export const getDocument = async (req: Request, res: Response) => {
  try {
    const docId = Number(req.params.id);

    if (!Number.isInteger(docId) || docId <= 0) {
      return res.status(400).json({ error: "Invalid document ID." });
    }

    const document = await prisma.document.findUnique({
      where: { id: docId },
      select: {
        id: true,
        patientId: true,
        fileName: true,
        documentCategory: true,
        uploadDate: true,
        description: true,
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!document) {
      return res.status(404).json({ error: "Document not found." });
    }

    return res.status(200).json({ document });
  } catch (error) {
    console.error("Error fetching document:", error);

    return res.status(500).json({
      error: "Failed to fetch document.",
    });
  }
};

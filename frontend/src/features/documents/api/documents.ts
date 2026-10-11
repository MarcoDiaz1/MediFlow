import type {
  DocumentSummary,
  CreateDocumentInput,
  DocumentsResponse,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const createDocument = async (
  documentData: CreateDocumentInput,
): Promise<DocumentSummary> => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("file", documentData.file);
  formData.append("patientId", String(documentData.patientId));
  formData.append("documentCategory", documentData.documentCategory);

  if (documentData.description?.trim()) {
    formData.append("description", documentData.description.trim());
  }

  const response = await fetch(`${API_URL}/documents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Failed to upload document.");
  }

  return data.document;
};

export const getDocuments = async (): Promise<DocumentsResponse> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/documents/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Failed to fetch documents.");
  }

  return data;
};

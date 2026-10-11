
export type CreateDocumentInput = {
  file: File;
  patientId: number;
  documentCategory: string;
  description?: string;
};

export type DocumentSummary = {
  id: number;
  patientId: number;
  fileName: string;
  documentCategory: string;
  uploadDate: string;
  description: string | null;
  patient: {
    firstName: string;
    lastName: string;
  };
};

export type DocumentsResponse = {
  documents: DocumentSummary[];
  summary: {
    totalDocuments: number;
    categoriesCount: number;
    patientsWithDocuments: number;
    recentUploads: number;
  };
};

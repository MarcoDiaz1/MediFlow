import { useCallback, useEffect, useState } from "react";
import type {
  DocumentSummary,
  DocumentsResponse,
} from "../features/documents/types";
import { getDocuments } from "../features/documents/api/documents";
import DocumentsCards from "../features/documents/components/DocumentsCards";
import DocumentsTools from "../features/documents/components/DocumentsTools";
import UploadDocumentModal from "../features/documents/components/UploadDocumentModal";

const Documents = () => {
  const [documents, setDocuments] = useState<DocumentSummary[]>([]);
  const [summary, setSummary] = useState<DocumentsResponse["summary"] | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const filteredDocuments = documents.filter((document) => {
    const query = search.toLowerCase().trim();

    const fileName = document.fileName.toLowerCase();
    const category = document.documentCategory.toLowerCase();
    const patientName =
      `${document.patient.firstName} ${document.patient.lastName}`.toLowerCase();

    return (
      fileName.includes(query) ||
      category.includes(query) ||
      patientName.includes(query)
    );
  });

  const loadDocuments = useCallback(async () => {
    try {
      const data = await getDocuments();

      setDocuments(data.documents);
      setSummary(data.summary);
      setError(null);
    } catch (error) {
      console.error("Error loading documents:", error);
      setError("Unable to load documents.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      await loadDocuments();
    };

    fetchDocuments();
  }, [loadDocuments]);

  if (isLoading) {
    return <div className="p-6">Loading documents...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="flex h-full w-full flex-col gap-6 p-[2vh_3vw]">
      <h1 className="text-2xl font-semibold">Documents</h1>
      <DocumentsCards summary={summary} />
      <section className="flex flex-col gap-4">
        <h2 className="mb-3 text-lg font-semibold">All Documents</h2>

        <DocumentsTools
          search={search}
          onSearchChange={setSearch}
          onUploadClick={() => setIsUploadModalOpen(true)}
        />
        {documents.length === 0 ? (
          <p className="text-gray-500">No documents uploaded yet.</p>
        ) : filteredDocuments.length === 0 ? (
          <p className="text-gray-500">No documents match your search.</p>
        ) : (
          <ul className="space-y-2">
            {filteredDocuments.map((document) => (
              <li
                key={document.id}
                className="rounded-lg bg-white p-4 shadow-sm"
              >
                <p className="font-medium">{document.fileName}</p>
                <p className="text-sm text-gray-500">
                  {document.patient.firstName} {document.patient.lastName}
                  {" · "}
                  {document.documentCategory}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <UploadDocumentModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={loadDocuments}
      />
    </div>
  );
};

export default Documents;

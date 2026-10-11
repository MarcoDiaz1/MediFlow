
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { IoCloudUploadOutline, IoClose } from "react-icons/io5";
import { getPatients } from "../../patients/api/patients";
import { createDocument } from "../api/documents";
import type { PatientSummary } from "../../patients/types";

type UploadDocumentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void | Promise<void>;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

const CATEGORIES = [
  "Lab Results",
  "Medical Imaging",
  "Prescriptions",
  "Medical Reports",
  "Insurance",
  "Other",
];

const UploadDocumentModal = ({
  isOpen,
  onClose,
  onUploadSuccess,
}: UploadDocumentModalProps) => {
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [patientId, setPatientId] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoadingPatients, setIsLoadingPatients] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const loadPatients = async () => {
      setIsLoadingPatients(true);
      setError(null);

      try {
        const data = await getPatients();
        setPatients(data.patients);
      } catch (err) {
        console.error("Error loading patients:", err);
        setError("Unable to load patients. Please try again.");
      } finally {
        setIsLoadingPatients(false);
      }
    };

    loadPatients();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setError(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError("Choose a PDF, JPG, or PNG file.");
      setFile(null);
      event.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("The file must be 5 MB or smaller.");
      setFile(null);
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!patientId || !category || !file) {
      setError("Please select a patient, category, and file.");
      return;
    }

    setIsUploading(true);

    try {
      await createDocument({
        file,
        patientId: Number(patientId),
        documentCategory: category,
        description: description.trim() || undefined,
      });

      await onUploadSuccess();
      onClose();
    } catch (err) {
      console.error("Error uploading document:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to upload document.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isUploading) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-document-title"
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-[#F8F5ED] p-6 shadow-xl sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2
              id="upload-document-title"
              className="text-2xl font-semibold text-[#212529]"
            >
              Upload Document
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Add a file to a patient's records.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isUploading}
            aria-label="Close upload modal"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-black/5 hover:text-gray-800 disabled:opacity-50"
          >
            <IoClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="document-patient" className="font-medium">
              Patient <span className="text-red-600">*</span>
            </label>

            <select
              id="document-patient"
              value={patientId}
              onChange={(event) => setPatientId(event.target.value)}
              required
              disabled={isLoadingPatients || isUploading}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#3C6E71] focus:ring-2 focus:ring-[#3C6E71]/20"
            >
              <option value="">
                {isLoadingPatients
                  ? "Loading patients..."
                  : "Select a patient"}
              </option>

              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.firstName} {patient.lastName}
                </option>
              ))}
            </select>

            {!isLoadingPatients && patients.length === 0 && !error && (
              <p className="text-sm text-gray-500">
                No patients found. Add a patient before uploading.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="document-category" className="font-medium">
              Document Category <span className="text-red-600">*</span>
            </label>

            <select
              id="document-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
              disabled={isUploading}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#3C6E71] focus:ring-2 focus:ring-[#3C6E71]/20"
            >
              <option value="">Choose a category</option>
              {CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="document-file" className="font-medium">
              File <span className="text-red-600">*</span>
            </label>

            <label
              htmlFor="document-file"
              className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-[#3C6E71]/50 bg-white px-5 py-8 text-center transition hover:border-[#3C6E71] hover:bg-[#3C6E71]/5"
            >
              <IoCloudUploadOutline size={36} className="text-[#3C6E71]" />

              <span className="font-medium text-[#212529]">
                {file ? file.name : "Choose a file to upload"}
              </span>

              <span className="text-sm text-gray-500">
                PDF, JPG, or PNG · Maximum 5 MB
              </span>
            </label>

            <input
              id="document-file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              onChange={handleFileChange}
              disabled={isUploading}
              className="sr-only"
            />

            {file && (
              <p className="text-sm text-gray-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="document-description" className="font-medium">
              Description <span className="text-gray-400">(optional)</span>
            </label>

            <textarea
              id="document-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add a short description..."
              rows={3}
              maxLength={500}
              disabled={isUploading}
              className="w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#3C6E71] focus:ring-2 focus:ring-[#3C6E71]/20"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploading || isLoadingPatients || patients.length === 0}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#3C6E71] px-5 py-3 font-medium text-white transition hover:bg-[#31595C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUploading ? "Uploading..." : "Upload Document"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDocumentModal;

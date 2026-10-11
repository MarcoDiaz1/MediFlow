
import { IoDocumentOutline } from "react-icons/io5";
import { FaTags, FaRegUser } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import type { DocumentsResponse } from "../types";

type DocumentsCardsProps = {
  summary: DocumentsResponse["summary"] | null;
};

const DocumentsCards = ({ summary }: DocumentsCardsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="flex gap-2">
          <IoDocumentOutline />
          <p className="text-sm text-gray-500">Total Documents</p>
        </div>
        <p className="mt-2 text-2xl font-semibold">
          {summary?.totalDocuments ?? 0}
        </p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="flex gap-2">
          <FaTags />
          <p className="text-sm text-gray-500">Categories</p>
        </div>
        <p className="mt-2 text-2xl font-semibold">
          {summary?.categoriesCount ?? 0}
        </p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="flex gap-2">
          <FaRegUser />
          <p className="text-sm text-gray-500">
            Patients with Documents
          </p>
        </div>
        <p className="mt-2 text-2xl font-semibold">
          {summary?.patientsWithDocuments ?? 0}
        </p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="flex gap-2">
          <IoIosTimer />
          <p className="text-sm text-gray-500">
            Recent Uploads (7 days)
          </p>
        </div>
        <p className="mt-2 text-2xl font-semibold">
          {summary?.recentUploads ?? 0}
        </p>
      </div>
    </div>
  );
};

export default DocumentsCards;

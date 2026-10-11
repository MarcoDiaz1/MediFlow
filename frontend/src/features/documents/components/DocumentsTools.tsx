import { CiSearch } from "react-icons/ci";
import { FaUpload } from "react-icons/fa";

type DocumentsToolsProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onUploadClick: () => void;
};

const DocumentsTools = ({
  search,
  onSearchChange,
  onUploadClick,
}: DocumentsToolsProps) => {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full">
        <CiSearch
          className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
          size={22}
        />

        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search documents or patients..."
          aria-label="Search documents or patients"
          className="w-full rounded-xl border border-gray-300 bg-white py-3 pr-4 pl-10 outline-none transition focus:border-[#3C6E71] focus:ring-2 focus:ring-[#3C6E71]/20"
        />
      </div>

      <button
        type="button"
        onClick={onUploadClick}
        className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#3C6E71] px-5 py-3 font-medium text-white transition hover:bg-[#31595C]"
      >
        <FaUpload />
        <span>Upload Document</span>
      </button>
    </div>
  );
};

export default DocumentsTools;

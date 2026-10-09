
import React from "react";

export type PatientSortOption =
  | "lastName"
  | "firstName"
  | "newest"
  | "oldest";

interface PatientsToolbarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onAddPatient: () => void;
  sortBy: PatientSortOption;
  dateFrom: string;
  dateTo: string;
  onApplyFilters: (
    sort: PatientSortOption,
    from: string,
    to: string,
  ) => void;
  onClear: () => void;
}

const PatientsToolbarContent = ({
  query,
  setQuery,
  onAddPatient,
  sortBy,
  dateFrom,
  dateTo,
  onApplyFilters,
  onClear,
}: PatientsToolbarProps) => {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [draftSort, setDraftSort] =
    React.useState<PatientSortOption>(sortBy);
  const [draftFrom, setDraftFrom] = React.useState(dateFrom);
  const [draftTo, setDraftTo] = React.useState(dateTo);

  const handleClear = () => {
    setQuery("");
    setDraftSort("lastName");
    setDraftFrom("");
    setDraftTo("");
    onClear();
    setIsFilterOpen(false);
  };

  const handleApply = () => {
    if (draftFrom && draftTo && draftFrom > draftTo) {
      return;
    }

    onApplyFilters(draftSort, draftFrom, draftTo);
    setIsFilterOpen(false);
  };

  return (
    <div className="relative mb-[2vh] w-full">
      <div className="flex w-full items-center justify-between gap-4">
        <input
          type="search"
          name="searchPatient"
          id="searchPatient"
          placeholder="Search patients..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-[35%] min-w-40 rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-gray-400"
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onAddPatient}
            className="rounded-lg bg-[#212529] px-4 py-2 text-white transition hover:opacity-90"
          >
            + Add Patient
          </button>

          <button
            type="button"
            aria-expanded={isFilterOpen}
            onClick={() => setIsFilterOpen((open) => !open)}
            className={`rounded-lg border px-4 py-2 transition ${
              isFilterOpen
                ? "border-[#212529] bg-[#f2e8cf] text-[#212529]"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Filter
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition hover:bg-gray-100"
          >
            Clear
          </button>
        </div>
      </div>

      {isFilterOpen && (
        <div className="absolute right-0 top-full z-20 mt-2 w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-lg">
          <h2 className="mb-4 font-semibold text-[#212529]">
            Filter Patients
          </h2>

          <div className="mb-4">
            <label
              htmlFor="patientSort"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Sort by
            </label>

            <select
              id="patientSort"
              value={draftSort}
              onChange={(event) =>
                setDraftSort(event.target.value as PatientSortOption)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="lastName">Last name (A–Z)</option>
              <option value="firstName">First name (A–Z)</option>
              <option value="newest">Newest registrations</option>
              <option value="oldest">Oldest registrations</option>
            </select>
          </div>

          <p className="mb-2 text-sm font-medium text-gray-700">
            Registration date
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="dateFrom"
                className="mb-1 block text-xs text-gray-500"
              >
                From
              </label>
              <input
                id="dateFrom"
                type="date"
                value={draftFrom}
                max={draftTo || undefined}
                onChange={(event) => setDraftFrom(event.target.value)}
                className="w-full min-w-0 rounded-lg border border-gray-300 px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="dateTo"
                className="mb-1 block text-xs text-gray-500"
              >
                To
              </label>
              <input
                id="dateTo"
                type="date"
                value={draftTo}
                min={draftFrom || undefined}
                onChange={(event) => setDraftTo(event.target.value)}
                className="w-full min-w-0 rounded-lg border border-gray-300 px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          </div>

          {draftFrom && draftTo && draftFrom > draftTo && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              The start date must be before the end date.
            </p>
          )}

          <div className="mt-5 flex justify-end gap-2 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={handleClear}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={handleApply}
              disabled={Boolean(
                draftFrom && draftTo && draftFrom > draftTo,
              )}
              className="rounded-lg bg-[#212529] px-4 py-2 text-sm text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Apply filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const PatientsToolbar = (props: PatientsToolbarProps) => (
  <PatientsToolbarContent
    key={JSON.stringify([props.sortBy, props.dateFrom, props.dateTo])}
    {...props}
  />
);

export default PatientsToolbar;


import React, { useEffect } from "react";
import PatientsToolbar, {
  type PatientSortOption,
} from "../features/patients/components/PatientsToolbar";
import type { PatientSummary } from "../features/patients/types";
import { getPatients } from "../features/patients/api/patients";
import PatientsTable from "../features/patients/components/PatientsTable";
import AddPatientModal from "../features/patients/components/AddPatientModal";

const Patients = () => {
  const getCreatedAt = (patient: PatientSummary) =>
    (patient as PatientSummary & { createdAt?: string }).createdAt ?? "";

  const [patients, setPatients] = React.useState<PatientSummary[]>([]);
  const [query, setQuery] = React.useState("");
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const [sortBy, setSortBy] =
    React.useState<PatientSortOption>("lastName");
  const [dateFrom, setDateFrom] = React.useState("");
  const [dateTo, setDateTo] = React.useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data.patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleApplyFilters = (
    sort: PatientSortOption,
    from: string,
    to: string,
  ) => {
    setSortBy(sort);
    setDateFrom(from);
    setDateTo(to);
  };

  const handleClear = () => {
    setQuery("");
    setSortBy("lastName");
    setDateFrom("");
    setDateTo("");
  };

  const filteredPatients = patients
    .filter((patient) => {
      const search = query.toLowerCase().trim();
      const fullName =
        `${patient.firstName} ${patient.lastName}`.toLowerCase();

      const matchesSearch =
        fullName.includes(search) ||
        patient.email.toLowerCase().includes(search) ||
        patient.phone.includes(search);

      // createdAt comes from the API as a date/time string.
      const registrationDate = getCreatedAt(patient).slice(0, 10);

      const matchesFrom =
        !dateFrom || registrationDate >= dateFrom;

      const matchesTo =
        !dateTo || registrationDate <= dateTo;

      return matchesSearch && matchesFrom && matchesTo;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "firstName":
          return a.firstName.localeCompare(b.firstName);

        case "newest":
          return (
            new Date(getCreatedAt(b)).getTime() -
            new Date(getCreatedAt(a)).getTime()
          );

        case "oldest":
          return (
            new Date(getCreatedAt(a)).getTime() -
            new Date(getCreatedAt(b)).getTime()
          );

        case "lastName":
        default:
          return a.lastName.localeCompare(b.lastName);
      }
    });

  return (
    <div className="flex h-full w-full flex-col items-center p-[2vh_3vw]">
      <PatientsToolbar
        query={query}
        setQuery={setQuery}
        onAddPatient={() => setIsAddModalOpen(true)}
        sortBy={sortBy}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onApplyFilters={handleApplyFilters}
        onClear={handleClear}
      />

      <PatientsTable
        patients={filteredPatients}
        onPatientUpdated={(updatedPatient) => {
          setPatients((current) =>
            current.map((patient) =>
              patient.id === updatedPatient.id
                ? updatedPatient
                : patient,
            ),
          );
        }}
      />

      {isAddModalOpen && (
        <AddPatientModal
          onClose={() => setIsAddModalOpen(false)}
          onPatientCreated={(patient) => {
            setPatients((current) => [...current, patient]);
            setIsAddModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Patients;

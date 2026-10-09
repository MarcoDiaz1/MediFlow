import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import {
  FaRegUser,
  FaPhone,
  FaEnvelope,
  FaCalendarDays,
} from "react-icons/fa6";
import type { PatientSummary } from "../types";
import { useNavigate } from "react-router-dom";
import EditPatientModal from "./EditPatientModal";

interface PatientsTableProps {
  patients: PatientSummary[];
  onPatientUpdated?: (updatedPatient: PatientSummary) => void;
}

const formatDate = (date: string) => {
  // Avoid timezone shifts when displaying date-only values.
  const [year, month, day] = date.slice(0, 10).split("-").map(Number);

  if (!year || !month || !day) return date;

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const PatientsTable = ({ patients, onPatientUpdated }: PatientsTableProps) => {
  const [expandedPatientId, setExpandedPatientId] = React.useState<
    number | null
  >(null);
  const [editingPatient, setEditingPatient] =
    React.useState<PatientSummary | null>(null);
  const navigate = useNavigate();

  const toggleRowExpansion = (patientId: number) => {
    setExpandedPatientId((currentId) =>
      currentId === patientId ? null : patientId,
    );
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="bg-[#f2e8cf] text-left text-[#212529]">
            <th className="px-5 py-4 font-semibold">Patient</th>
            <th className="px-5 py-4 font-semibold">Date of Birth</th>
            <th className="px-5 py-4 font-semibold">Phone</th>
            <th className="px-5 py-4 font-semibold">Email</th>
            <th className="w-14 px-4 py-4" />
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {patients.map((patient) => {
            const isExpanded = expandedPatientId === patient.id;
            const fullName = `${patient.firstName} ${patient.lastName}`;

            return (
              <React.Fragment key={patient.id}>
                <tr
                  className={`cursor-pointer transition-colors ${
                    isExpanded ? "bg-[#faf7ef]" : "hover:bg-gray-50"
                  }`}
                  onClick={() => toggleRowExpansion(patient.id)}
                >
                  <td className="px-5 py-4 font-medium text-[#212529]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e9dfc5] text-[#212529]">
                        <FaRegUser />
                      </div>
                      {fullName}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {formatDate(patient.dateOfBirth)}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {patient.phone}
                  </td>

                  <td className="px-5 py-4 text-gray-600">{patient.email}</td>

                  <td className="px-4 py-4 text-center">
                    <button
                      type="button"
                      aria-label={`${isExpanded ? "Collapse" : "Expand"} ${fullName}`}
                      aria-expanded={isExpanded}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleRowExpansion(patient.id);
                      }}
                      className="rounded-full p-2 transition-colors hover:bg-black/10"
                    >
                      {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </td>
                </tr>

                {isExpanded && (
                  <tr className="bg-[#faf7ef]">
                    <td colSpan={5} className="px-6 py-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <section>
                          <h3 className="mb-4 font-semibold text-[#212529]">
                            Patient Information
                          </h3>

                          <div className="space-y-3 text-gray-600">
                            <p>
                              <span className="font-medium text-[#212529]">
                                Patient ID:
                              </span>{" "}
                              #{patient.id}
                            </p>

                            <p className="flex items-center gap-2">
                              <FaRegUser className="shrink-0 text-gray-500" />
                              <span>
                                <span className="font-medium text-[#212529]">
                                  Full Name:
                                </span>{" "}
                                {fullName}
                              </span>
                            </p>

                            <p className="flex items-center gap-2">
                              <FaCalendarDays className="shrink-0 text-gray-500" />
                              <span>
                                <span className="font-medium text-[#212529]">
                                  Date of Birth:
                                </span>{" "}
                                {formatDate(patient.dateOfBirth)}
                              </span>
                            </p>
                          </div>
                        </section>

                        <section>
                          <h3 className="mb-4 font-semibold text-[#212529]">
                            Contact Information
                          </h3>

                          <div className="space-y-3 text-gray-600">
                            <p className="flex items-center gap-2">
                              <FaPhone className="shrink-0 text-gray-500" />
                              {patient.phone}
                            </p>

                            <p className="flex items-center gap-2 break-all">
                              <FaEnvelope className="shrink-0 text-gray-500" />
                              {patient.email}
                            </p>
                          </div>
                        </section>
                      </div>

                      <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-gray-200 pt-5">
                        <button
                          type="button"
                          onClick={() => navigate(`/patients/${patient.id}`)}
                          className="rounded-lg border border-[#212529] px-4 py-2 font-medium text-[#212529] transition-colors hover:bg-[#212529] hover:text-white"
                        >
                          View Profile
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingPatient(patient)}
                          className="rounded-lg bg-[#212529] px-4 py-2 font-medium text-white transition-opacity hover:opacity-80"
                        >
                          Edit Patient
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
          {editingPatient && (
            <EditPatientModal
              patient={editingPatient}
              onClose={() => setEditingPatient(null)}
              onPatientUpdated={(updatedPatient) => {
                // The parent page owns the patients array.
                onPatientUpdated?.(updatedPatient);
                setEditingPatient(null);
              }}
            />
          )}

          {patients.length === 0 && (
            <tr>
              <td colSpan={5} className="px-5 py-12 text-center text-gray-500">
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsTable;

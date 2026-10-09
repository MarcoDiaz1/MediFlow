import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaRegUser,
  FaPhone,
  FaEnvelope,
  FaCalendarDays,
} from "react-icons/fa6";
import { getPatientById } from "../features/patients/api/patients";
import type { PatientSummary } from "../features/patients/types";
import EditPatientModal from "../features/patients/components/EditPatientModal";

const PatientProfile = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = React.useState<PatientSummary | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    const fetchPatient = async () => {
      const id = Number(patientId);

      if (!patientId || !Number.isInteger(id) || id <= 0) {
        setError("Invalid patient ID.");
        setLoading(false);
        return;
      }

      try {
        const data = await getPatientById(id);

        if (!cancelled) {
          setPatient(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Unable to load patient.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchPatient();

    return () => {
      cancelled = true;
    };
  }, [patientId]);

  const formatDate = (date: string) => {
    const [year, month, day] = date.slice(0, 10).split("-").map(Number);

    if (!year || !month || !day) return date;

    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return <div className="p-8 text-gray-500">Loading patient profile...</div>;
  }

  if (error || !patient) {
    return (
      <div className="p-8">
        <p role="alert" className="mb-4 text-red-600">
          {error || "Patient not found."}
        </p>
        <button
          onClick={() => navigate("/patients")}
          className="font-medium underline"
        >
          Back to Patients
        </button>
      </div>
    );
  }

  const fullName = `${patient.firstName} ${patient.lastName}`;

  return (
    <div className="flex h-full w-full flex-col gap-6 p-[2vh_3vw]">
      <button
        onClick={() => navigate("/patients")}
        className="flex w-fit items-center gap-2 text-sm text-gray-600 transition hover:text-[#212529]"
      >
        <FaArrowLeft />
        Back to Patients
      </button>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e9dfc5] text-[#212529]">
              <FaRegUser size={26} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Patient ID: #{patient.id}</p>
              <h1 className="text-2xl font-semibold text-[#212529]">
                {fullName}
              </h1>
              <p className="text-sm text-gray-500">Patient Profile</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="rounded-lg bg-[#212529] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-80"
          >
            Edit Patient
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-[#212529]">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <FaCalendarDays className="mt-1 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium text-[#212529]">
                {formatDate(patient.dateOfBirth)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaPhone className="mt-1 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium text-[#212529]">{patient.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 md:col-span-2">
            <FaEnvelope className="mt-1 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="break-all font-medium text-[#212529]">
                {patient.email}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold text-[#212529]">
          Appointment History
        </h2>
        <p className="text-sm text-gray-500">
          Patient appointments will appear here once we connect the appointment
          API.
        </p>
      </section>
      {isEditModalOpen && (
        <EditPatientModal
          patient={patient}
          onClose={() => setIsEditModalOpen(false)}
          onPatientUpdated={(updatedPatient) => {
            setPatient(updatedPatient);
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default PatientProfile;

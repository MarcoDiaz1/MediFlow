
import { useEffect, useState } from "react";
import { getPatients } from "../../patients/api/patients";
import type { PatientSummary } from "../../patients/types";
import type { CreateAppointmentPayload } from "../types";

interface AddAppointmentModalProps {
  onClose: () => void;
  onSubmit: (data: CreateAppointmentPayload) => Promise<void>;
}

const AddAppointmentModal = ({
  onClose,
  onSubmit,
}: AddAppointmentModalProps) => {
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [patientId, setPatientId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const [isLoadingPatients, setIsLoadingPatients] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadPatients = async () => {
      try {
        const data = await getPatients();

        if (isActive) {
          setPatients(data.patients);
        }
      } catch (error) {
        console.error("Error loading patients:", error);

        if (isActive) {
          setError("Unable to load patients. Please try again.");
        }
      } finally {
        if (isActive) {
          setIsLoadingPatients(false);
        }
      }
    };

    loadPatients();

    return () => {
      isActive = false;
    };
  }, []);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError(null);

    if (!patientId || !date || !time) {
      setError("Please select a patient, date, and time.");
      return;
    }

    // Interpret the chosen date and time as local time,
    // then convert it to the ISO format expected by the API.
    const localDate = new Date(`${date}T${time}`);

    if (Number.isNaN(localDate.getTime())) {
      setError("Please enter a valid date and time.");
      return;
    }

    if (localDate.getTime() < Date.now()) {
      setError("Please choose a future date and time.");
      return;
    }

    const appointmentData: CreateAppointmentPayload = {
      patientId: Number(patientId),
      scheduledAt: localDate.toISOString(),
      ...(reason.trim() && { reason: reason.trim() }),
    };

    try {
      setIsSubmitting(true);
      await onSubmit(appointmentData);
    } catch (error) {
      console.error("Error creating appointment:", error);
      setError("Unable to create appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-appointment-title"
        className="w-full max-w-lg rounded-2xl border border-[#E5E0D5] bg-[#F8F5ED] p-6 shadow-xl"
      >
        <div className="mb-6">
          <h2
            id="add-appointment-title"
            className="text-xl font-semibold text-[#212529]"
          >
            New Appointment
          </h2>

          <p className="mt-1 text-sm text-[#5B6268]">
            Schedule an appointment for a patient.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="patientId"
              className="mb-1.5 block text-sm font-medium text-[#212529]"
            >
              Patient
            </label>

            <select
              id="patientId"
              value={patientId}
              onChange={(event) => setPatientId(event.target.value)}
              disabled={isLoadingPatients || isSubmitting}
              required
              className="w-full rounded-lg border border-[#E5E0D5] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#3C6E71]"
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
              <p className="mt-1 text-sm text-[#9B3030]">
                No patients found. Add a patient first.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="appointmentDate"
                className="mb-1.5 block text-sm font-medium text-[#212529]"
              >
                Date
              </label>

              <input
                id="appointmentDate"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                min={new Date().toLocaleDateString("en-CA")}
                required
                disabled={isSubmitting}
                className="w-full rounded-lg border border-[#E5E0D5] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#3C6E71]"
              />
            </div>

            <div>
              <label
                htmlFor="appointmentTime"
                className="mb-1.5 block text-sm font-medium text-[#212529]"
              >
                Time
              </label>

              <input
                id="appointmentTime"
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                required
                disabled={isSubmitting}
                className="w-full rounded-lg border border-[#E5E0D5] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#3C6E71]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="appointmentReason"
              className="mb-1.5 block text-sm font-medium text-[#212529]"
            >
              Reason for visit
              <span className="ml-1 font-normal text-[#5B6268]">
                (optional)
              </span>
            </label>

            <textarea
              id="appointmentReason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="e.g. General checkup"
              rows={3}
              maxLength={500}
              disabled={isSubmitting}
              className="w-full resize-none rounded-lg border border-[#E5E0D5] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#3C6E71]"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-[#9B3030]">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-[#E5E0D5] pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-[#E5E0D5] bg-white px-4 py-2.5 text-sm font-semibold text-[#212529] hover:bg-[#F2E8CF] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                isLoadingPatients ||
                patients.length === 0 ||
                isSubmitting
              }
              className="rounded-lg bg-[#212529] px-4 py-2.5 text-sm font-semibold text-[#F2E8CF] hover:bg-[#3C6E71] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentModal;

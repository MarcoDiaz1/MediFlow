import React from "react";
import { IoClose } from "react-icons/io5";
import type { PatientSummary } from "../types";
import { updatePatient } from "../api/patients";
import PatientForm, { type PatientFormData } from "./PatientForm";

interface EditPatientModalProps {
  patient: PatientSummary;
  onClose: () => void;
  onPatientUpdated: (patient: PatientSummary) => void;
}

const EditPatientModal = ({
  patient,
  onClose,
  onPatientUpdated,
}: EditPatientModalProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const initialValues: PatientFormData = {
    firstName: patient.firstName,
    lastName: patient.lastName,
    dateOfBirth: patient.dateOfBirth.slice(0, 10),
    phone: patient.phone,
    email: patient.email,
  };

  const handleUpdate = async (formData: PatientFormData) => {
    const updatedPatient = await updatePatient(patient.id, formData);
    onPatientUpdated(updatedPatient);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-patient-title"
        className="w-full max-w-2xl rounded-2xl bg-[#f8f5ed] p-6 shadow-2xl sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2
              id="edit-patient-title"
              className="text-2xl font-semibold text-[#212529]"
            >
              Edit Patient
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Update {patient.firstName} {patient.lastName}'s information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close modal"
            className="rounded-full p-2 text-gray-600 transition hover:bg-gray-200 disabled:opacity-50"
          >
            <IoClose size={24} />
          </button>
        </div>

        <PatientForm
          initialValues={initialValues}
          submitLabel="Save Changes"
          submittingLabel="Saving..."
          onSubmit={handleUpdate}
          onCancel={onClose}
          onSubmittingChange={setIsSubmitting}
        />
      </div>
    </div>
  );
};

export default EditPatientModal;
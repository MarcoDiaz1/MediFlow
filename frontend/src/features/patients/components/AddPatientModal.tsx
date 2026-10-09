import React from "react";
import { IoClose } from "react-icons/io5";
import type { PatientSummary } from "../types";
import { createPatient } from "../api/patients";
import PatientForm, { type PatientFormData } from "./PatientForm";

interface AddPatientModalProps {
  onClose: () => void;
  onPatientCreated: (patient: PatientSummary) => void;
}

const initialForm: PatientFormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  phone: "",
  email: "",
};

const AddPatientModal = ({
  onClose,
  onPatientCreated,
}: AddPatientModalProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleCreate = async (formData: PatientFormData) => {
    const patient = await createPatient(formData);
    onPatientCreated(patient);
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
        aria-labelledby="add-patient-title"
        className="w-full max-w-2xl rounded-2xl bg-[#f8f5ed] p-6 shadow-2xl sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2
              id="add-patient-title"
              className="text-2xl font-semibold text-[#212529]"
            >
              Add New Patient
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Enter the patient's information below.
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
          initialValues={initialForm}
          submitLabel="Create Patient"
          submittingLabel="Creating..."
          onSubmit={handleCreate}
          onCancel={onClose}
          onSubmittingChange={setIsSubmitting}
        />
      </div>
    </div>
  );
};

export default AddPatientModal;
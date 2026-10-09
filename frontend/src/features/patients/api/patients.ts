import type { PatientsResponse, PatientSummary } from "../types";
import type { PatientFormData } from "../components/PatientForm";

const API_URL = import.meta.env.VITE_API_URL;

export const getPatients = async (): Promise<PatientsResponse> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/patients/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }
  return response.json();
};

export interface CreatePatientInput {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
}

export const createPatient = async (
  patientData: CreatePatientInput,
): Promise<PatientSummary> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${import.meta.env.VITE_API_URL}/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(patientData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Failed to create patient.");
  }

  return data.patient;
};

export const getPatientById = async (
  patientId: number,
): Promise<PatientSummary> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/patients/${patientId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Failed to fetch patient.");
  }

  return data.patient;
};

export const updatePatient = async (
  patientId: number,
  patientData: PatientFormData,
): Promise<PatientSummary> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/patients/${patientId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(patientData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Failed to update patient.");
  }

  return data.patient;
};

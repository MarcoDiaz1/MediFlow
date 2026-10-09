export interface PatientSummary {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
}

export interface PatientsResponse {
  patients: PatientSummary[];
}
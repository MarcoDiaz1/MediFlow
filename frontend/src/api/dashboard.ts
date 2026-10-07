import type { Appointment } from "../types";

interface DashboardSummary {
  totalPatients: number;
  patientsLast7Days: number;
  patientsPrevious7Days: number;
  patientGrowth: number;
  appointmentsToday: number;
  totalAppointments: number;
  pendingAppointments: Appointment[];

  appointmentsThisWeek: {
    date: string;
    count: number;
  }[];
}

const API_URL = import.meta.env.VITE_API_URL;

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/dashboard/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard summary");
  }

  return response.json();
};
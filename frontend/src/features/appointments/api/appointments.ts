
import type { Appointment, CreateAppointmentPayload } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const getAppointments = async (): Promise<Appointment[]> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/appointments/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch appointments");
  }

  const data: { appointments: Appointment[] } = await response.json();

  return data.appointments;
};

export const createAppointment = async (
  appointmentData: CreateAppointmentPayload,
): Promise<Appointment> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(appointmentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Failed to create appointment.");
  }

  return data.appointment;
};